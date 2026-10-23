import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from './Polaroid';

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-screen view of one photo, with previous/next and keyboard support. */
export function PhotoLightbox({ photos, index, onChange }: PhotoLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null && photos[index] !== undefined;
  const count = photos.length;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') onChange(((index as number) + 1) % count);
      if (e.key === 'ArrowLeft') onChange(((index as number) - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, index, count, onChange]);

  if (!open) return null;
  const photo = photos[index as number];

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 overflow-y-auto overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption || 'Photo'}
      onClick={() => onChange(null)}
    >
      <button
        ref={closeRef}
        onClick={() => onChange(null)}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-[#C39223] text-white flex items-center justify-center"
      >
        <X size={26} />
      </button>

      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(((index as number) - 1 + count) % count);
            }}
            aria-label="Previous photo"
            className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-[#C39223] text-white flex items-center justify-center"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange(((index as number) + 1) % count);
            }}
            aria-label="Next photo"
            className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/15 hover:bg-[#C39223] text-white flex items-center justify-center"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      {/* min-h-full centres short content; taller content scrolls inside this overlay */}
      <div className="min-h-full flex items-center justify-center px-14 sm:px-20 py-16">
        <figure className="bg-white p-3 sm:p-4 rounded-[3px] shadow-2xl max-w-5xl" onClick={(e) => e.stopPropagation()}>
          <img
            src={photo.url}
            alt={photo.caption || ''}
            className="block mx-auto w-auto h-auto max-w-full max-h-[calc(100dvh-14rem)] object-contain"
          />
          <figcaption className="pt-3 px-1 flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
            <span className="font-['Caveat',cursive] text-2xl sm:text-3xl leading-tight text-gray-800">{photo.caption}</span>
            <span className="flex items-center gap-3 text-xs text-gray-500 whitespace-nowrap">
              {photo.category && (
                <span className="px-2.5 py-1 rounded-full bg-[#C39223]/15 text-[#8a6614]">{photo.category}</span>
              )}
              {(index as number) + 1} / {count}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
