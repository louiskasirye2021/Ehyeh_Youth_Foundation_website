import { useId, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ImagePlus,
  Loader2,
  FileUp,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { handleFileUpload } from '../utils/imageUpload';
import { uploadDocument, formatFileSize, fileTypeLabel, MAX_DOCUMENT_MB } from '../utils/documentUpload';
import { FORMAT_HELP, type Field, type ListField } from './schema';
import { ICONS, iconFor } from '../content/icons';

const inputClass =
  'w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[#C39223] focus:ring-2 focus:ring-[#C39223]/20 focus:outline-none transition-colors';

const smallButton =
  'inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-black hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223]';

function FieldLabel({ id, field }: { id?: string; field: Field }) {
  return (
    <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1.5">
      {field.label}
      {field.required && <span className="text-red-600"> *</span>}
    </label>
  );
}

function Help({ text }: { text?: string }) {
  return text ? <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{text}</p> : null;
}

function move<T>(list: T[], from: number, to: number) {
  const next = list.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// ----- Single fields ------------------------------------------------------------

function AutoTextarea({
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  );
}

function ImageInput({ field, value, onChange }: { field: Field; value: string; onChange: (v: string) => void }) {
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  // Uploads take a few seconds; use the latest onChange so edits made to
  // other fields in the meantime aren't overwritten when the upload finishes.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      await handleFileUpload(file, (url) => onChangeRef.current(url));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <FieldLabel field={field} />
      <div className="flex items-start gap-4">
        <div className="w-32 h-24 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={24} className="text-gray-300" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            id={id}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="sr-only"
            onChange={(e) => upload(e.target.files?.[0])}
          />
          <label
            htmlFor={id}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:border-[#C39223] cursor-pointer ${
              uploading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {uploading ? 'Uploading…' : value ? 'Replace photo' : 'Upload photo'}
          </label>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-gray-600 hover:text-red-700 hover:bg-red-50"
            >
              <X size={16} />
              Remove
            </button>
          )}
        </div>
      </div>
      <Help text={field.help} />
    </div>
  );
}

// ----- Document upload (reports) -------------------------------------------------

function DocumentInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const id = useId();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const file = value && typeof value === 'object' && value.url ? value : null;

  const upload = async (picked: File | undefined) => {
    if (!picked) return;
    setUploading(true);
    try {
      const result = await uploadDocument(picked);
      if (result) onChangeRef.current(result);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <FieldLabel field={field} />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files?.[0]);
        }}
        className={`rounded-xl border-2 border-dashed p-4 flex flex-wrap items-center gap-4 ${
          file ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <span
          className={`w-12 h-14 rounded-md flex flex-col items-center justify-center text-[10px] font-semibold text-white flex-shrink-0 ${
            !file ? 'bg-gray-300' : file.type === 'pdf' ? 'bg-red-600' : 'bg-blue-600'
          }`}
          aria-hidden="true"
        >
          <FileText size={18} />
          {file ? fileTypeLabel(file.type) : ''}
        </span>
        <div className="flex-1 min-w-[10rem]">
          {file ? (
            <>
              <p className="text-sm text-gray-900 break-all">{file.name}</p>
              <p className="text-xs text-gray-500">
                {fileTypeLabel(file.type)} file{file.size ? `, ${formatFileSize(file.size)}` : ''}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Drag a file here, or choose one. PDF or Word, up to {MAX_DOCUMENT_MB}MB.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            id={id}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => upload(e.target.files?.[0])}
          />
          <label
            htmlFor={id}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:border-[#C39223] cursor-pointer ${
              uploading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <FileUp size={16} />}
            {uploading ? 'Uploading…' : file ? 'Replace file' : 'Choose file'}
          </label>
          {file && !uploading && (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
            >
              <ExternalLink size={16} />
              Open
            </a>
          )}
        </div>
      </div>
      <Help text={field.help} />
    </div>
  );
}

// ----- List of plain text items (modules, objectives, phone numbers…) ----------------

function StringListInput({
  field,
  value,
  onChange,
}: {
  field: Extract<Field, { kind: 'strings' }>;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const groupId = useId();
  const items = Array.isArray(value) ? value : [];

  const focusRow = (index: number) =>
    setTimeout(() => {
      document.querySelector<HTMLInputElement>(`[data-row="${groupId}-${index}"]`)?.focus();
    }, 0);

  const insertAfter = (index: number) => {
    const next = items.slice();
    next.splice(index + 1, 0, '');
    onChange(next);
    focusRow(index + 1);
  };

  return (
    <fieldset>
      <legend className="block text-sm font-medium text-gray-800 mb-1.5">{field.label}</legend>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <input
              data-row={`${groupId}-${index}`}
              value={item}
              aria-label={`${field.itemLabel} ${index + 1}`}
              onChange={(e) => {
                const next = items.slice();
                next[index] = e.target.value;
                onChange(next);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  insertAfter(index);
                }
              }}
              className={inputClass}
            />
            <button type="button" className={smallButton} disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} aria-label="Move up">
              <ArrowUp size={16} />
            </button>
            <button type="button" className={smallButton} disabled={index === items.length - 1} onClick={() => onChange(move(items, index, index + 1))} aria-label="Move down">
              <ArrowDown size={16} />
            </button>
            <button type="button" className={`${smallButton} hover:!text-red-700 hover:!bg-red-50`} onClick={() => onChange(items.filter((_, i) => i !== index))} aria-label={`Remove ${field.itemLabel}`}>
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => insertAfter(items.length - 1)}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#8a6614] hover:text-black px-1 py-1"
      >
        <Plus size={16} />
        Add {field.itemLabel}
      </button>
      <Help text={field.help} />
    </fieldset>
  );
}

// ----- List of items with their own fields (programs, stories, sub-programs…) -------

export function ItemList({
  config,
  label,
  value,
  onChange,
  depth = 0,
}: {
  config: Omit<ListField, 'kind' | 'key' | 'label'>;
  label?: string;
  value: any[];
  onChange: (v: any[]) => void;
  depth?: number;
}) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const add = () => {
    const item = config.newItem();
    onChange(config.addAtStart ? [item, ...items] : [...items, item]);
    setOpen((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      document.querySelector(`[data-item="${item.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const remove = (index: number) => {
    const item = items[index];
    const name = item?.[config.titleKey] ? `"${item[config.titleKey]}"` : `this ${config.itemLabel}`;
    if (!window.confirm(`Delete ${name}? This takes effect when you save.`)) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const addButton = (
    <button
      type="button"
      onClick={add}
      className={
        depth === 0
          ? 'inline-flex items-center gap-2 bg-[#C39223] text-white px-4 py-2.5 rounded-full hover:bg-[#b08520] transition-colors text-sm'
          : 'inline-flex items-center gap-1.5 text-sm text-[#8a6614] hover:text-black px-1 py-1'
      }
    >
      <Plus size={16} />
      Add {config.itemLabel}
    </button>
  );

  return (
    <div>
      {label && <p className="block text-sm font-medium text-gray-800 mb-1.5">{label}</p>}
      {config.addAtStart && <div className="mb-3">{addButton}</div>}

      {items.length === 0 && (
        <p className="text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg px-4 py-3 mb-2">
          No {config.itemLabel}s yet.
        </p>
      )}

      <ol className="space-y-2">
        {items.map((item, index) => {
          const id = String(item?.id ?? index);
          const isOpen = open.has(id);
          const title = item?.[config.titleKey]?.toString().trim();
          const subtitle = config.subtitle?.(item);
          const image = config.imageKey ? item?.[config.imageKey] : null;

          return (
            <li
              key={id}
              data-item={id}
              className={`rounded-xl border bg-white scroll-mt-24 ${isOpen ? 'border-[#C39223]/60 shadow-sm' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-2 pr-2">
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  aria-expanded={isOpen}
                  className="flex-1 min-w-0 flex items-center gap-3 text-left px-3 py-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223]"
                >
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                  {config.imageKey && (
                    <span className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                      {image && <img src={image} alt="" className="w-full h-full object-cover" />}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className={`block truncate ${title ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                      {title || `New ${config.itemLabel}`}
                    </span>
                    {subtitle && <span className="block truncate text-xs text-gray-500">{subtitle}</span>}
                  </span>
                </button>
                {!config.autoOrdered && (
                  <>
                    <button type="button" className={smallButton} disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} aria-label={`Move ${config.itemLabel} up`}>
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" className={smallButton} disabled={index === items.length - 1} onClick={() => onChange(move(items, index, index + 1))} aria-label={`Move ${config.itemLabel} down`}>
                      <ArrowDown size={16} />
                    </button>
                  </>
                )}
                <button type="button" className={`${smallButton} hover:!text-red-700 hover:!bg-red-50`} onClick={() => remove(index)} aria-label={`Delete ${config.itemLabel}`}>
                  <Trash2 size={16} />
                </button>
              </div>

              {isOpen && (
                <div className={`border-t border-gray-100 px-4 py-5 ${depth % 2 === 0 ? 'bg-gray-50/60' : 'bg-white'} rounded-b-xl`}>
                  <FieldsEditor
                    fields={config.fields}
                    value={item}
                    depth={depth + 1}
                    onChange={(updated) => {
                      const next = items.slice();
                      next[index] = updated;
                      onChange(next);
                    }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {!config.addAtStart && <div className="mt-3">{addButton}</div>}
    </div>
  );
}

// ----- A set of fields on one object -------------------------------------------------

export function FieldsEditor({
  fields,
  value,
  onChange,
  depth = 0,
}: {
  fields: Field[];
  value: any;
  onChange: (v: any) => void;
  depth?: number;
}) {
  const data = value && typeof value === 'object' ? value : {};
  const set = (key: string, v: any) => onChange({ ...data, [key]: v });

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FieldInput key={field.key} field={field} value={data[field.key]} onChange={(v) => set(field.key, v)} depth={depth} />
      ))}
    </div>
  );
}

function FieldInput({ field, value, onChange, depth }: { field: Field; value: any; onChange: (v: any) => void; depth: number }) {
  const id = useId();
  const text = typeof value === 'string' ? value : value == null ? '' : String(value);

  switch (field.kind) {
    case 'text':
      return (
        <div>
          <FieldLabel id={id} field={field} />
          <input
            id={id}
            value={text}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
            list={field.suggestions ? `${id}-list` : undefined}
          />
          {field.suggestions && (
            <datalist id={`${id}-list`}>
              {field.suggestions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          )}
          <Help text={field.help} />
        </div>
      );
    case 'toggle':
      return (
        <div>
          <p className="block text-sm font-medium text-gray-800 mb-1.5">{field.label}</p>
          <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
            <span className="w-11 h-6 rounded-full bg-gray-300 peer-checked:bg-[#C39223] relative transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#C39223] peer-focus-visible:ring-offset-2" />
            <span className="text-sm text-gray-700">{field.onLabel || 'On'}</span>
          </label>
          <Help text={field.help} />
        </div>
      );
    case 'document':
      return <DocumentInput field={field} value={value} onChange={onChange} />;
    case 'link': {
      const invalid = text.trim() !== '' && !/^https?:\/\//i.test(text.trim());
      return (
        <div>
          <FieldLabel id={id} field={field} />
          <input
            id={id}
            type="url"
            inputMode="url"
            value={text}
            placeholder={field.placeholder ?? 'https://'}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} ${invalid ? '!border-red-400' : ''}`}
            aria-invalid={invalid}
          />
          {invalid ? <p className="text-xs text-red-700 mt-1.5">Links must start with https://</p> : <Help text={field.help} />}
        </div>
      );
    }
    case 'date':
      return (
        <div>
          <FieldLabel id={id} field={field} />
          <input id={id} type="date" value={text} onChange={(e) => onChange(e.target.value)} className={`${inputClass} max-w-xs`} />
          <Help text={field.help} />
        </div>
      );
    case 'textarea':
      return (
        <div>
          <FieldLabel id={id} field={field} />
          <AutoTextarea id={id} value={text} rows={field.rows} placeholder={field.placeholder} onChange={onChange} />
          <Help text={[field.help, field.formatted ? FORMAT_HELP : ''].filter(Boolean).join(' ')} />
        </div>
      );
    case 'image':
      return <ImageInput field={field} value={text} onChange={onChange} />;
    case 'icon': {
      const Preview = iconFor(text);
      return (
        <div>
          <FieldLabel id={id} field={field} />
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#C39223]/15 text-[#8a6614] flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <Preview size={20} />
            </span>
            <select id={id} value={text} onChange={(e) => onChange(e.target.value)} className={`${inputClass} max-w-xs`}>
              {!ICONS[text] && <option value="">Choose an icon</option>}
              {Object.entries(ICONS).map(([name, { label }]) => (
                <option key={name} value={name}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Help text={field.help} />
        </div>
      );
    }
    case 'strings':
      return <StringListInput field={field} value={value} onChange={onChange} />;
    case 'list':
      return (
        <div>
          <ItemList config={field} label={field.label} value={value} onChange={onChange} depth={depth} />
          <Help text={field.help} />
        </div>
      );
  }
}
