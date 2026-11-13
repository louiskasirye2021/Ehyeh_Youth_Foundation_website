import logoDark from '../assets/ehyeh-logo-dark.png';
import logoLight from '../assets/ehyeh-logo-light.png';
import markDark from '../assets/ehyeh-mark-dark.png';
import markLight from '../assets/ehyeh-mark-light.png';
import wordDark from '../assets/ehyeh-wordmark-dark.png';
import wordLight from '../assets/ehyeh-wordmark-light.png';

/**
 * The Ehyeh logo comes in two tones:
 *  - "dark": the original colours, for white or light backgrounds
 *  - "light": the black parts turned white, for black or photo backgrounds
 */
type Tone = 'dark' | 'light';

/** Full stacked logo (emblem above the name). Used in the footer, loader and admin. */
export function BrandLogo({ tone = 'dark', className = '' }: { tone?: Tone; className?: string }) {
  return <img src={tone === 'light' ? logoLight : logoDark} alt="Ehyeh Youth Foundation" className={`w-auto ${className}`} />;
}

/**
 * Side-by-side logo for the navigation bar. Both tones sit on top of each other
 * and cross-fade, so the logo stays readable as the bar changes from
 * transparent (over dark headers) to white (after scrolling).
 */
export function NavLogo({ onLight }: { onLight: boolean }) {
  const layer = (mark: string, word: string, visible: boolean) => (
    <span
      aria-hidden={!visible}
      className={`[grid-area:1/1] flex items-center gap-2.5 sm:gap-3 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img src={mark} alt="" className="h-12 sm:h-14 w-auto shrink-0" draggable={false} />
      <img src={word} alt="" className="h-[13px] sm:h-[15px] xl:h-[17px] w-auto hidden min-[360px]:block lg:hidden xl:block" draggable={false} />
    </span>
  );

  return (
    <span
      className={`grid transition-[filter] duration-300 ${
        onLight ? '' : '[filter:drop-shadow(0_1px_6px_rgba(0,0,0,0.45))]'
      }`}
    >
      <span className="sr-only">Ehyeh Youth Foundation</span>
      {layer(markDark, wordDark, onLight)}
      {layer(markLight, wordLight, !onLight)}
    </span>
  );
}
