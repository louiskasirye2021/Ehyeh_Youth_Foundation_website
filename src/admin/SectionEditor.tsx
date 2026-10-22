import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, ExternalLink, Loader2, RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { fetchSectionsFresh, saveSection, type SectionKey } from '../content/store';
import { FieldsEditor, ItemList } from './fields';
import type { EditorPart, EditorTab, Field } from './schema';

type Values = Partial<Record<SectionKey, any>>;

const same = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

/** First empty required field, described in plain words, or null. */
function findMissing(fields: Field[], value: any, where: string): string | null {
  for (const field of fields) {
    const v = value?.[field.key];
    if (field.required && (field.kind === 'text' || field.kind === 'textarea' || field.kind === 'image')) {
      if (typeof v !== 'string' || !v.trim()) return `${where}"${field.label}" can't be empty.`;
    }
    if (field.kind === 'list' && Array.isArray(v)) {
      for (let i = 0; i < v.length; i++) {
        const name = v[i]?.[field.titleKey] ? `"${v[i][field.titleKey]}"` : `${field.itemLabel} ${i + 1}`;
        const problem = findMissing(field.fields, v[i], `${where}${name}: `);
        if (problem) return problem;
      }
    }
  }
  return null;
}

function checkPart(part: EditorPart, value: any): string | null {
  if (part.fields) return findMissing(part.fields, value, '');
  if (part.list && Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const name = item?.[part.list.titleKey] ? `"${item[part.list.titleKey]}"` : `${part.list.itemLabel} ${i + 1}`;
      const problem = findMissing(part.list.fields, item, `${name}: `);
      if (problem) return problem;
    }
  }
  return null;
}

interface SectionEditorProps {
  tab: EditorTab;
  onDirtyChange: (dirty: boolean) => void;
}

export function SectionEditor({ tab, onDirtyChange }: SectionEditorProps) {
  const keys = useMemo(() => tab.parts.map((p) => p.key), [tab]);
  const [saved, setSaved] = useState<Values | null>(null);
  const [draft, setDraft] = useState<Values | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoadError(null);
    setSaved(null);
    setDraft(null);
    try {
      const fresh: Values = await fetchSectionsFresh(keys);
      for (const part of tab.parts) {
        if (part.prepare) fresh[part.key] = part.prepare(fresh[part.key]);
      }
      setSaved(fresh);
      setDraft(structuredClone(fresh));
    } catch (err: any) {
      setLoadError(err?.message || 'Could not load this section.');
    }
  }, [keys, tab]);

  useEffect(() => {
    load();
  }, [load]);

  const changedKeys = useMemo(
    () => (saved && draft ? keys.filter((k) => !same(saved[k], draft[k])) : []),
    [saved, draft, keys]
  );
  const dirty = changedKeys.length > 0;

  useEffect(() => {
    onDirtyChange(dirty);
  }, [dirty, onDirtyChange]);

  // Warn before closing the tab with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const save = async () => {
    if (!draft || !dirty) return;
    for (const part of tab.parts) {
      if (!changedKeys.includes(part.key)) continue;
      const problem = checkPart(part, draft[part.key]);
      if (problem) {
        toast.error(`${part.title}: ${problem}`);
        return;
      }
    }

    setSaving(true);
    const toastId = toast.loading('Saving…');
    try {
      for (const key of changedKeys) {
        await saveSection(key, draft[key]);
        setSaved((prev) => ({ ...prev, [key]: structuredClone(draft[key]) }));
      }
      toast.success('Saved. Your changes are live on the website.', { id: toastId });
    } catch (err: any) {
      toast.error(err?.message || 'Saving failed. Try again.', { id: toastId, duration: 10000 });
    } finally {
      setSaving(false);
    }
  };

  const discard = () => {
    if (!saved) return;
    if (!window.confirm('Discard your unsaved changes in this section?')) return;
    setDraft(structuredClone(saved));
  };

  const setPart = (key: SectionKey, value: any) => setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="max-w-4xl pb-28">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl text-black">{tab.label}</h1>
          <p className="text-gray-600 mt-1">{tab.description}</p>
        </div>
        <a
          href={tab.sitePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gray-700 border border-gray-300 bg-white rounded-full px-4 py-2 hover:border-[#C39223]"
        >
          <ExternalLink size={16} />
          View on website
        </a>
      </div>

      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <div>
            <p>{loadError}</p>
            <button onClick={load} className="mt-2 text-sm underline">
              Try again
            </button>
          </div>
        </div>
      )}

      {!draft && !loadError && (
        <div className="flex items-center gap-3 text-gray-600 py-12">
          <Loader2 size={20} className="animate-spin" />
          Loading the latest saved version…
        </div>
      )}

      {draft && (
        <div className="space-y-8">
          {tab.parts.map((part) => (
            <section key={part.key} className="bg-white rounded-2xl border border-gray-200 p-5 md:p-7">
              <h2 className="text-xl text-black">{part.title}</h2>
              {part.description && <p className="text-sm text-gray-600 mt-1">{part.description}</p>}
              <div className="mt-5">
                {part.list ? (
                  <ItemList config={part.list} value={draft[part.key]} onChange={(v) => setPart(part.key, v)} />
                ) : (
                  <FieldsEditor fields={part.fields || []} value={draft[part.key]} onChange={(v) => setPart(part.key, v)} />
                )}
              </div>
            </section>
          ))}
          <p className="text-sm text-gray-500">Leave a field empty to hide it on the website.</p>
        </div>
      )}

      {/* Save bar */}
      {draft && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-30 border-t border-gray-200 bg-white/95 backdrop-blur">
          <div className="max-w-4xl px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className={`text-sm ${dirty ? 'text-[#8a6614]' : 'text-gray-500'}`} role="status">
              {dirty ? 'You have unsaved changes.' : 'All changes saved.'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={discard}
                disabled={!dirty || saving}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:pointer-events-none"
              >
                <RotateCcw size={16} />
                Discard
              </button>
              <button
                onClick={save}
                disabled={!dirty || saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm bg-[#C39223] text-white hover:bg-[#b08520] disabled:opacity-40 disabled:pointer-events-none"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
