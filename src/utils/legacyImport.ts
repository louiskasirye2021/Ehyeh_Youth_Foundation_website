import { supabase, IMAGE_BUCKET } from '../lib/supabase';
import { saveSection, type SectionKey } from './adminStorage';

// The old admin panel saved edits only in the browser it was used in
// (localStorage). These helpers find those edits and copy them to the live
// database, uploading any embedded images to Storage on the way.

const LEGACY_KEYS: Record<SectionKey, string> = {
  programs: 'eyf_admin_programs',
  testimonials: 'eyf_admin_testimonials',
  blog: 'eyf_admin_blog',
  gallery: 'eyf_admin_gallery',
  team: 'eyf_admin_team',
  about: 'eyf_admin_about',
};

const OTHER_LEGACY_KEYS = ['eyf_admin_initialized', 'eyf_admin_token'];

export function findLegacyEdits(): Partial<Record<SectionKey, any>> {
  const found: Partial<Record<SectionKey, any>> = {};
  try {
    for (const [section, key] of Object.entries(LEGACY_KEYS) as [SectionKey, string][]) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        found[section] = JSON.parse(raw);
      } catch {
        // Corrupt entry; skip it.
      }
    }
  } catch {
    // localStorage unavailable
  }
  return found;
}

export function clearLegacyEdits() {
  try {
    [...Object.values(LEGACY_KEYS), ...OTHER_LEGACY_KEYS].forEach((key) =>
      localStorage.removeItem(key)
    );
  } catch {
    // ignore
  }
}

async function uploadDataUrl(dataUrl: string): Promise<string> {
  const blob = await (await fetch(dataUrl)).blob();
  const extension = (blob.type.split('/')[1] || 'png').replace(/[^a-z0-9]/g, '') || 'png';
  const path = `imported/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, blob, {
    cacheControl: '31536000',
    contentType: blob.type,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

// blob: URLs only ever lived in one browser tab and can't be recovered.
function isUsableString(value: string) {
  return !value.startsWith('blob:');
}

async function moveEmbeddedImages(value: any): Promise<any> {
  if (typeof value === 'string') {
    if (value.startsWith('data:image/')) return uploadDataUrl(value);
    return isUsableString(value) ? value : '';
  }
  if (Array.isArray(value)) return Promise.all(value.map(moveEmbeddedImages));
  if (value && typeof value === 'object') {
    const entries = await Promise.all(
      Object.entries(value).map(async ([k, v]) => [k, await moveEmbeddedImages(v)] as const)
    );
    return Object.fromEntries(entries);
  }
  return value;
}

/** Copies every section found in this browser to the live site. */
export async function publishLegacyEdits(edits: Partial<Record<SectionKey, any>>) {
  for (const [section, data] of Object.entries(edits) as [SectionKey, any][]) {
    const cleaned = await moveEmbeddedImages(data);
    await saveSection(section, cleaned);
  }
  clearLegacyEdits();
}
