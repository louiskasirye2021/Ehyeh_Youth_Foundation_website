import { useSyncExternalStore } from 'react';
import { supabase } from '../lib/supabase';
import {
  BUNDLED_IMAGES,
  DEFAULT_CONTENT,
  SECTION_KEYS,
  type SectionKey,
  type SiteContent,
} from './defaults';

export type { SectionKey, SiteContent } from './defaults';

// ---------------------------------------------------------------------------
// Shared content storage (Supabase)
//
// Every section of the site is one row in the `site_content` table, with its
// content stored as JSON. All visitors read the same rows, so an edit saved in
// the admin panel shows for everyone on their next page load.
//
// The whole site loads with a single request. A copy is kept in the visitor's
// browser so repeat visits render instantly while fresh content loads.
// ---------------------------------------------------------------------------

const TABLE = 'site_content';
const CACHE_KEY = 'eyf_site_content_v1';
const FIRST_LOAD_TIMEOUT_MS = 6000;

// ----- Bundled images <-> stable tokens -------------------------------------

const ASSET_PREFIX = 'asset:';
const urlToAssetKey = new Map(Object.entries(BUNDLED_IMAGES).map(([key, url]) => [url, key]));

function mapStrings(value: any, fn: (s: string) => string): any {
  if (typeof value === 'string') return fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, mapStrings(v, fn)]));
  }
  return value;
}

export function encodeAssets(value: any) {
  return mapStrings(value, (s) => {
    const key = urlToAssetKey.get(s);
    return key ? `${ASSET_PREFIX}${key}` : s;
  });
}

export function decodeAssets(value: any) {
  return mapStrings(value, (s) =>
    s.startsWith(ASSET_PREFIX) ? BUNDLED_IMAGES[s.slice(ASSET_PREFIX.length)] ?? '' : s
  );
}

// ----- Normalising saved data -----------------------------------------------
// Content saved by older versions of the admin panel had a different shape in
// places, and anything typed in can be missing fields. These make sure the
// website always gets the shape it expects, so one bad entry can't break a page.

const asArray = (value: any) => (Array.isArray(value) ? value : []);
const asStrings = (value: any) =>
  asArray(value).filter((v) => typeof v === 'string' || typeof v === 'number').map(String);
const asText = (value: any) => (typeof value === 'string' ? value : value == null ? '' : String(value));

let idCounter = 0;
export function newId(prefix = 'item') {
  idCounter += 1;
  const random =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now().toString(36)}-${random}-${idCounter}`;
}

const withId = (item: any, prefix: string) =>
  item && typeof item === 'object' ? { ...item, id: item.id ? String(item.id) : newId(prefix) } : item;

function normalizeSubProgram(sub: any) {
  return {
    ...withId(sub, 'sub'),
    name: asText(sub?.name),
    desc: asText(sub?.desc),
    objectives: asStrings(sub?.objectives),
    weeklyModules: asStrings(sub?.weeklyModules),
    outcomes: asStrings(sub?.outcomes),
    corePillars: asArray(sub?.corePillars).map((pillar: any) => ({
      ...withId(pillar, 'pillar'),
      title: asText(pillar?.title),
      elements: asStrings(pillar?.elements),
    })),
  };
}

export function normalizeProgram(program: any) {
  const p = { ...withId(program, 'program') };

  // Old shape: { F, R, E, E2, D }  ->  [{ letter, word }]
  if (p.acronym && !Array.isArray(p.acronym) && typeof p.acronym === 'object') {
    const letters: [string, string][] = [['F', 'F'], ['R', 'R'], ['E', 'E'], ['E2', 'E'], ['D', 'D']];
    p.acronym = letters
      .filter(([key]) => p.acronym[key])
      .map(([key, letter]) => ({ id: newId('acr'), letter, word: asText(p.acronym[key]) }));
    p.acronymTitle = p.acronymTitle || 'What F.R.E.E.D Stands For';
  }

  // Old shape: { toParents, toMentees, toCommunity }  ->  [{ title, text }]
  if (p.promises && !Array.isArray(p.promises) && typeof p.promises === 'object') {
    const titles: [string, string][] = [
      ['toParents', 'To Parents'],
      ['toMentees', 'To Mentees'],
      ['toCommunity', 'To Community'],
    ];
    p.promises = titles
      .filter(([key]) => p.promises[key])
      .map(([key, title]) => ({ id: newId('promise'), title, text: asText(p.promises[key]) }));
    p.promisesTitle = p.promisesTitle || 'Our Promises';
  }

  return {
    ...p,
    title: asText(p.title),
    icon: typeof p.icon === 'string' ? p.icon : '',
    modules: asStrings(p.modules),
    subPrograms: asArray(p.subPrograms).map(normalizeSubProgram),
    acronym: asArray(p.acronym).map((a: any) => ({ ...withId(a, 'acr'), letter: asText(a?.letter), word: asText(a?.word) })),
    promises: asArray(p.promises).map((x: any) => ({ ...withId(x, 'promise'), title: asText(x?.title), text: asText(x?.text) })),
  };
}

function normalizePost(post: any) {
  return {
    ...withId(post, 'story'),
    title: asText(post?.title),
    excerpt: asText(post?.excerpt),
    content: asText(post?.content || post?.fullContent),
    date: asText(post?.date),
    category: asText(post?.category),
    readTime: asText(post?.readTime),
    author: asText(post?.author) || 'EYF Team',
    image: asText(post?.image),
  };
}

function timeOf(date: string) {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * When a story was added. New stories record this in `createdAt`; stories
 * added by the old admin panel have it in their id (a millisecond timestamp).
 */
function addedAt(post: { id?: string; createdAt?: number }) {
  if (typeof post.createdAt === 'number') return post.createdAt;
  const id = String(post.id ?? '');
  return /^\d{12,14}$/.test(id) ? Number(id) : 0;
}

/** Newest first: by story date, then by when it was added. */
export function sortStoriesNewestFirst<T extends { id?: string; date?: string; createdAt?: number }>(posts: T[]): T[] {
  return posts
    .map((post, index) => ({ post, index }))
    .sort(
      (a, b) =>
        timeOf(b.post.date || '') - timeOf(a.post.date || '') ||
        addedAt(b.post) - addedAt(a.post) ||
        a.index - b.index
    )
    .map(({ post }) => post);
}

/** Combine a saved section with its defaults and repair its shape. */
export function mergeSection<K extends SectionKey>(key: K, stored: any): SiteContent[K] {
  const fallback = structuredClone(DEFAULT_CONTENT[key]) as any;
  if (stored === null || stored === undefined) return normalizeSection(key, fallback);

  if (Array.isArray(fallback)) {
    return normalizeSection(key, Array.isArray(stored) ? stored : fallback);
  }

  if (typeof stored !== 'object' || Array.isArray(stored)) return normalizeSection(key, fallback);
  const merged = { ...fallback, ...stored };
  for (const [field, value] of Object.entries(fallback)) {
    if (Array.isArray(value) && !Array.isArray(merged[field])) merged[field] = value;
    if (typeof value === 'string' && typeof merged[field] !== 'string') merged[field] = value;
  }
  return normalizeSection(key, merged);
}

function normalizeSection(key: SectionKey, value: any): any {
  switch (key) {
    case 'programs':
      return asArray(value).map(normalizeProgram);
    case 'blog':
      return asArray(value).map(normalizePost);
    case 'testimonials':
    case 'gallery':
    case 'team':
      return asArray(value).map((item: any) => withId(item, key));
    case 'programsSection':
      return {
        ...value,
        highlights: asArray(value.highlights).map((h: any) => ({
          ...withId(h, 'highlight'),
          title: asText(h?.title),
          items: asStrings(h?.items),
        })),
      };
    case 'registration':
      return { ...value, interests: asStrings(value.interests) };
    case 'contact':
      return { ...value, phones: asStrings(value.phones) };
    case 'faq':
      return {
        ...value,
        categories: asArray(value.categories).map((c: any) => ({
          ...withId(c, 'faq-cat'),
          name: asText(c?.name),
          questions: asArray(c?.questions).map((q: any) => ({
            ...withId(q, 'faq'),
            question: asText(q?.question),
            answer: asText(q?.answer),
          })),
        })),
      };
    case 'privacy':
    case 'terms':
      return {
        ...value,
        sections: asArray(value.sections).map((s: any) => ({
          ...withId(s, 'legal'),
          heading: asText(s?.heading),
          body: asText(s?.body),
        })),
      };
    default:
      return value;
  }
}

function buildContent(rows: Partial<Record<SectionKey, any>>): SiteContent {
  const content: any = {};
  for (const key of SECTION_KEYS) {
    content[key] = mergeSection(key, rows[key] === undefined ? undefined : decodeAssets(rows[key]));
  }
  return content as SiteContent;
}

// ----- Browser cache (per visitor, best effort) ------------------------------

function readCache(): Partial<Record<SectionKey, any>> | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(rows: Partial<Record<SectionKey, any>>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rows));
  } catch {
    // Storage full or blocked. The site works without it.
  }
}

// ----- In-memory store that React components subscribe to --------------------

type State = { content: SiteContent; ready: boolean };

const cachedRows = readCache();
let rawRows: Partial<Record<SectionKey, any>> = cachedRows ?? {};
let state: State = { content: buildContent(rawRows), ready: cachedRows !== null };
const listeners = new Set<() => void>();

function setState(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** All site content, kept up to date. `ready` is false only on a first visit while loading. */
export function useSiteContent() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}

async function fetchRows(keys?: SectionKey[]) {
  let query = supabase.from(TABLE).select('section, data');
  if (keys) query = query.in('section', keys);
  const { data, error } = await query;
  if (error) throw error;
  const rows: Partial<Record<SectionKey, any>> = {};
  for (const row of data ?? []) {
    if ((SECTION_KEYS as string[]).includes(row.section) && row.data != null) {
      rows[row.section as SectionKey] = row.data;
    }
  }
  return rows;
}

let loadPromise: Promise<void> | null = null;

/** Load the latest content once per page view. Safe to call many times. */
export function loadSiteContent() {
  if (!loadPromise) {
    loadPromise = (async () => {
      const timeout = setTimeout(() => setState({ ready: true }), FIRST_LOAD_TIMEOUT_MS);
      try {
        rawRows = await fetchRows();
        writeCache(rawRows);
        setState({ content: buildContent(rawRows), ready: true });
      } catch (err) {
        console.error('Could not load website content, showing saved/default content instead:', err);
        setState({ ready: true });
      } finally {
        clearTimeout(timeout);
      }
    })();
  }
  return loadPromise;
}

// ----- Admin: read fresh, save ------------------------------------------------

/** Latest saved version of some sections, straight from the database. */
export async function fetchSectionsFresh<K extends SectionKey>(keys: K[]) {
  const rows = await fetchRows(keys);
  const result = {} as Pick<SiteContent, K>;
  for (const key of keys) {
    (result as any)[key] = mergeSection(key, rows[key] === undefined ? undefined : decodeAssets(rows[key]));
  }
  return result;
}

function describeError(error: { message?: string; code?: string }) {
  const message = error.message || '';
  if (/violates check constraint/i.test(message)) {
    return 'The database needs a one-time update before this section can be saved. Run supabase/update-2026-10.sql in the Supabase SQL Editor.';
  }
  if (error.code === '42501' || /row-level security|permission denied/i.test(message)) {
    return 'Your account is not allowed to edit the website. Sign out, sign in again, and check that your email is listed in the admin_users table.';
  }
  if (/JWT|token/i.test(message)) {
    return 'Your session has expired. Sign out and sign in again.';
  }
  if (/Failed to fetch|NetworkError/i.test(message)) {
    return 'Could not reach the server. Check your internet connection and try again.';
  }
  return message || 'Something went wrong while saving.';
}

/** Replace a whole section. Throws an Error with a readable message on failure. */
export async function saveSection(key: SectionKey, value: any) {
  const encoded = encodeAssets(value);
  const { error } = await supabase.from(TABLE).upsert(
    { section: key, data: encoded, updated_at: new Date().toISOString() },
    { onConflict: 'section' }
  );
  if (error) throw new Error(describeError(error));

  rawRows = { ...rawRows, [key]: encoded };
  writeCache(rawRows);
  setState({ content: { ...state.content, [key]: mergeSection(key, decodeAssets(encoded)) } });
}
