import { toast } from 'sonner@2.0.3';
import { supabase, DOCUMENT_BUCKET } from '../lib/supabase';
import type { ReportFile } from '../content/defaults';

export const MAX_DOCUMENT_MB = 25;

const TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
};

/** Uploads a PDF or Word file to Supabase Storage. Returns its details, or null on failure. */
export async function uploadDocument(file: File): Promise<ReportFile | null> {
  const extension = (file.name.split('.').pop() || '').toLowerCase();
  if (!TYPES[extension]) {
    toast.error('Choose a PDF or Word file (.pdf, .docx or .doc).');
    return null;
  }
  if (file.size > MAX_DOCUMENT_MB * 1024 * 1024) {
    toast.error(`Files must be smaller than ${MAX_DOCUMENT_MB}MB. Compress the PDF or split the report and try again.`);
    return null;
  }

  const safeName = file.name
    .replace(/\.[^.]+$/, '')
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'report';
  const path = `reports/${new Date().getFullYear()}/${crypto.randomUUID().slice(0, 8)}-${safeName}.${extension}`;
  const toastId = toast.loading('Uploading file…');

  const { error } = await supabase.storage.from(DOCUMENT_BUCKET).upload(path, file, {
    cacheControl: '31536000',
    contentType: TYPES[extension],
    upsert: false,
  });

  if (error) {
    console.error('Document upload failed:', error);
    const message = /bucket not found/i.test(error.message)
      ? 'File storage isn\'t set up yet. Run supabase/update-2026-10-reports.sql in the Supabase SQL Editor.'
      : /row-level security|not authorized|unauthorized|403/i.test(error.message)
        ? 'Your account is not allowed to upload files. Sign out and sign in again.'
        : /mime|type/i.test(error.message)
          ? 'This file type isn\'t allowed. Upload a PDF or Word file.'
          : `Upload failed: ${error.message}`;
    toast.error(message, { id: toastId, duration: 10000 });
    return null;
  }

  const { data } = supabase.storage.from(DOCUMENT_BUCKET).getPublicUrl(path);
  toast.success('File uploaded. Remember to save.', { id: toastId });
  return { url: data.publicUrl, name: file.name, type: extension, size: file.size };
}

export function formatFileSize(bytes: number) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function fileTypeLabel(type: string) {
  return type === 'pdf' ? 'PDF' : type === 'doc' || type === 'docx' ? 'Word' : (type || 'File').toUpperCase();
}

/** Link that makes the browser download the file with its original name. */
export function downloadUrl(file: ReportFile) {
  const sep = file.url.includes('?') ? '&' : '?';
  return `${file.url}${sep}download=${encodeURIComponent(file.name)}`;
}
