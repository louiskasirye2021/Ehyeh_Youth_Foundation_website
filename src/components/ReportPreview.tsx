import { useEffect, useRef } from 'react';
import { Download, ExternalLink, X } from 'lucide-react';
import type { Report } from '../content/defaults';
import { downloadUrl, fileTypeLabel, formatFileSize } from '../utils/documentUpload';
import { formatStoryDate } from './RichText';

/** Where to show a file inside the page. Word files open in Microsoft's free online viewer. */
export function previewSrc(url: string, type: string) {
  if (type === 'pdf') return `${url}#view=FitH`;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
}

export function ReportPreview({ report, onClose }: { report: Report | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!report) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [report, onClose]);

  if (!report || !report.file) return null;
  const file = report.file;
  const meta = [report.category, formatStoryDate(report.date), `${fileTypeLabel(file.type)}${file.size ? `, ${formatFileSize(file.size)}` : ''}`]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-stretch sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={report.title}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-6xl h-full sm:h-[92vh] sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 py-3 border-b border-gray-200">
          <div className="flex-1 min-w-[12rem]">
            <h2 className="text-lg text-black leading-snug">{report.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{meta}</p>
          </div>
          <a
            href={downloadUrl(file)}
            className="inline-flex items-center gap-2 bg-[#C39223] text-white px-4 py-2 rounded-full text-sm hover:bg-[#b08520]"
          >
            <Download size={16} />
            Download
          </a>
          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-700 border border-gray-300 hover:border-[#C39223]"
          >
            <ExternalLink size={16} />
            <span className="hidden sm:inline">Open in new tab</span>
            <span className="sm:hidden">Open</span>
          </a>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close preview"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 bg-gray-100 relative">
          <iframe
            key={file.url}
            src={previewSrc(file.url, file.type)}
            title={`Preview of ${report.title}`}
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
        <p className="text-xs text-gray-500 px-4 sm:px-6 py-2 border-t border-gray-200">
          Preview not showing? Use <strong className="font-medium">Open in new tab</strong> or <strong className="font-medium">Download</strong>.
        </p>
      </div>
    </div>
  );
}
