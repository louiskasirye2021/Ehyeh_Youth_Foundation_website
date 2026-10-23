import type { CSSProperties, ReactNode } from 'react';

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  category?: string;
}

// Small hand-drawn style doodles in the brand gold. Decorative only.
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const Doodles: Record<string, (props: { className?: string }) => ReactNode> = {
  heart: ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path {...stroke} d="M16 27c-6-4.5-11-8.6-11-14a5.6 5.6 0 0 1 11-1.8A5.6 5.6 0 0 1 27 13c0 5.4-5 9.5-11 14z" />
    </svg>
  ),
  crown: ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path {...stroke} d="M5 24 4 9l7 7 5-10 5 10 7-7-1 15z" />
      <path {...stroke} d="M6 28h20" />
    </svg>
  ),
  sparkle: ({ className }) => (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path {...stroke} d="M8 6l3 7M17 3v9M25 7l-4 7" />
    </svg>
  ),
  arrow: ({ className }) => (
    <svg viewBox="0 0 48 32" className={className} aria-hidden="true">
      <path {...stroke} d="M3 27c12 2 26-3 38-18M33 8l8 1-1 8" />
    </svg>
  ),
  squiggle: ({ className }) => (
    <svg viewBox="0 0 64 12" className={className} aria-hidden="true">
      <path {...stroke} d="M2 7c8-6 14 4 22-1s14-5 22 0 10 2 16-1" />
    </svg>
  ),
};

// A fixed, hand-picked "random" look so the collage is the same on every visit.
const TILTS = [-6, 4, -3, 5, -4, 3, -5, 2, -2, 6];
const LIFTS = [0, 30, 6, 26, 2, 8, 28, 0, 32, 10];
const TAPES = [-4, 3, -2, 5, -6, 2, -3, 4, -5, 1];
const CAPTION_DOODLES = ['heart', 'sparkle', 'crown', 'squiggle', 'heart', null, 'sparkle', 'crown', null, 'heart'];

interface PolaroidProps {
  photo: Photo;
  index: number;
  onOpen: () => void;
  /** Collage mode overlaps and lifts photos; grid mode keeps them in tidy rows. */
  variant?: 'collage' | 'grid';
  className?: string;
}

export function Polaroid({ photo, index, onOpen, variant = 'collage', className = '' }: PolaroidProps) {
  const tilt = TILTS[index % TILTS.length] * (variant === 'grid' ? 0.45 : 1);
  const lift = variant === 'collage' ? LIFTS[index % LIFTS.length] : 0;
  const doodle = CAPTION_DOODLES[index % CAPTION_DOODLES.length];
  const Doodle = doodle ? Doodles[doodle] : null;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={photo.caption ? `View photo: ${photo.caption}` : 'View photo'}
      style={{ '--tilt': `${tilt}deg`, '--lift': `${lift}px` } as CSSProperties}
      className={`group relative block w-full text-left bg-white p-[5%] pb-0 rounded-[3px] shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] [transform:rotate(calc(var(--tilt)*0.7))] lg:[transform:rotate(var(--tilt))_translateY(var(--lift))] motion-safe:transition-[transform,box-shadow] motion-safe:duration-300 hover:z-20 focus-visible:z-20 hover:shadow-[0_24px_40px_-14px_rgba(0,0,0,0.45)] hover:[transform:rotate(0deg)_scale(1.05)] lg:hover:[transform:rotate(0deg)_translateY(var(--lift))_scale(1.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223] focus-visible:ring-offset-4 ${className}`}
    >
      {/* Tape */}
      <span
        aria-hidden="true"
        style={{ transform: `translateX(-50%) rotate(${TAPES[index % TAPES.length]}deg)` }}
        className="absolute -top-3 left-1/2 w-[34%] h-7 bg-[#EBDDB8]/80 shadow-[0_1px_2px_rgba(0,0,0,0.08)] z-10"
      />

      <span className="block aspect-[1/0.9] overflow-hidden bg-gray-100">
        {photo.url && (
          <img
            src={photo.url}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => ((e.target as HTMLImageElement).style.visibility = 'hidden')}
          />
        )}
      </span>

      <span className="flex items-center justify-center gap-2 min-h-[3.2rem] sm:min-h-[3.6rem] px-1 py-2">
        {photo.caption && (
          <span className="font-['Caveat',cursive] text-[1.15rem] sm:text-[1.35rem] leading-tight text-gray-800 text-center line-clamp-2">
            {photo.caption}
          </span>
        )}
        {Doodle && <Doodle className="w-6 h-6 text-[#C39223] flex-shrink-0 hidden sm:block" />}
      </span>
    </button>
  );
}
