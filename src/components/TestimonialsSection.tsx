import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { AbstractShapes } from './AbstractShapes';
import { useSiteContent } from '../content/store';

const AUTOPLAY_MS = 6000;

type Testimonial = { id?: string; name: string; role?: string; image?: string; quote: string };

/**
 * The quote, cut to a few lines so every card stays a similar size. A
 * "Read more" button appears only when the quote doesn't fit.
 */
function ClampedQuote({ text, active, onReadMore }: { text: string; active: boolean; onReadMore: () => void }) {
  const ref = useRef<HTMLQuoteElement>(null);
  const [cut, setCut] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setCut(el.scrollHeight > el.clientHeight + 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <blockquote
        ref={ref}
        className={`mt-4 text-base lg:text-[1.05rem] leading-relaxed line-clamp-6 whitespace-pre-line ${
          active ? 'text-black/90' : 'text-gray-200'
        }`}
      >
        {text}
      </blockquote>
      {cut && (
        <button
          type="button"
          tabIndex={active ? 0 : -1}
          onClick={(e) => {
            e.stopPropagation();
            onReadMore();
          }}
          className={`mt-2 self-center sm:self-start text-sm font-semibold underline underline-offset-4 decoration-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded ${
            active ? 'text-black focus-visible:ring-black focus-visible:ring-offset-[#C9972A]' : 'text-[#C39223] focus-visible:ring-[#C39223]'
          }`}
        >
          Read more
        </button>
      )}
    </>
  );
}

/** Full testimonial in a pop-up. The text scrolls when it's long. */
function TestimonialModal({ t, onClose }: { t: Testimonial | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!t) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [t, onClose]);

  if (!t) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-name"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[88dvh] flex flex-col bg-[#161616] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-[#C39223] flex-shrink-0" aria-hidden="true" />
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-[#C39223] hover:text-black flex items-center justify-center transition-colors"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-4 sm:gap-5 px-6 sm:px-8 pt-7 pb-5 pr-16 flex-shrink-0 border-b border-white/10">
          <div className="relative w-20 h-24 sm:w-24 sm:h-28 flex-shrink-0">
            <span aria-hidden="true" className="absolute -left-1.5 -bottom-1.5 w-[80%] h-[75%] rounded-2xl bg-[#C39223]" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-800">
              {t.image && <img src={t.image} alt={t.name} className="w-full h-full object-cover" />}
            </div>
          </div>
          <div className="min-w-0">
            <p id="testimonial-modal-name" className="text-xl text-[#C39223] font-semibold">
              {t.name}
            </p>
            {t.role && <p className="text-sm text-gray-400 mt-0.5">{t.role}</p>}
          </div>
        </div>

        {/* Scrolls when the testimonial is long */}
        <div
          tabIndex={0}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 [scrollbar-color:#C39223_transparent] [scrollbar-width:thin] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C39223]"
        >
          <QuoteMark className="w-10 h-8 text-[#C39223]" />
          <blockquote className="mt-4 text-lg leading-relaxed text-gray-100 whitespace-pre-line">{t.quote}</blockquote>
        </div>
      </div>
    </div>
  );
}

/** A chunky filled quotation mark. */
function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M0 32V19.6C0 8.9 5.2 2.4 15.6 0l2 4.4C11.8 6.3 9 9.6 8.6 14.4H16V32H0Zm22 0V19.6C22 8.9 27.2 2.4 37.6 0l2 4.4c-5.8 1.9-8.6 5.2-9 10H38V32H22Z" />
    </svg>
  );
}

/** Position of card i relative to the active one, wrapping around (…, -1, 0, 1, …). */
function offsetOf(i: number, active: number, count: number) {
  let d = i - active;
  if (d > count / 2) d -= count;
  if (d < -count / 2) d += count;
  return d;
}

export function TestimonialsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { testimonials, testimonialsSection } = useSiteContent().content;
  const count = testimonials.length;

  const [rawIndex, setIndex] = useState(0);
  const active = count ? ((rawIndex % count) + count) % count : 0;
  const [paused, setPaused] = useState(false);
  const [reading, setReading] = useState<Testimonial | null>(null);
  const closeReading = useCallback(() => setReading(null), []);
  const touchX = useRef<number | null>(null);

  const go = (step: number) => setIndex((i) => i + step);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (count < 2 || paused || reading) return;
    const timer = setInterval(() => setIndex((i) => i + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, paused, reading, active]);

  if (count === 0) return null;

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0B0B0B] text-white relative overflow-hidden">
      <AbstractShapes />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(195,146,35,0.14),transparent_60%)]"
      />

      <div className="relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 px-4"
        >
          <span className="text-[#C39223] uppercase tracking-widest text-sm">{testimonialsSection.label}</span>
          <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">{testimonialsSection.title}</h2>
          {testimonialsSection.intro && (
            <p className="text-gray-300 text-lg md:text-xl mt-4">{testimonialsSection.intro}</p>
          )}
        </motion.div>

        {/* Slider */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={testimonialsSection.title}
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setPaused(true);
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setPaused(false);
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
          className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223] focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-3xl"
        >
          {/* All cards share one grid cell: the slider is always as tall as the
              tallest card, so nothing below it moves when the slide changes.
              Long quotes are cut to a few lines, so no card gets very tall. */}
          <div className="grid justify-items-center py-6">
            {testimonials.map((t, i) => {
              const offset = offsetOf(i, active, count);
              const isActive = offset === 0;
              const visible = Math.abs(offset) <= 1;
              return (
                <article
                  key={t.id || i}
                  aria-hidden={!isActive}
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  onClick={() => !isActive && visible && goTo(rawIndex + offset)}
                  style={{ '--offset': offset } as CSSProperties}
                  className={`[grid-area:1/1] self-center w-[86vw] sm:w-[32rem] xl:w-[35rem] rounded-[1.75rem] p-5 sm:p-7 flex flex-col sm:flex-row gap-5 sm:gap-7 items-center sm:items-stretch
                    [transform:translateX(calc(var(--offset)*(95%+0.75rem)))_scale(var(--scale))]
                    motion-safe:transition-[transform,opacity,background-color,border-color,box-shadow] motion-safe:duration-500 motion-safe:ease-out
                    ${
                      isActive
                        ? '[--scale:1] z-20 bg-[#C9972A] border border-[#C39223] shadow-[0_30px_60px_-25px_rgba(195,146,35,0.7)]'
                        : `[--scale:0.85] z-10 bg-[#161616] border border-white/10 ${
                            visible ? 'opacity-70 cursor-pointer hover:opacity-90' : 'opacity-0 pointer-events-none'
                          }`
                    }`}
                >
                  {/* Photo with a gold accent behind it */}
                  <div className="relative flex-shrink-0 w-36 sm:w-[40%] self-center">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-2 -bottom-2 w-[78%] h-[72%] rounded-[1.4rem] ${
                        isActive ? 'bg-black/25' : 'bg-[#C39223]'
                      }`}
                    />
                    <div className="relative aspect-[4/5] rounded-[1.4rem] overflow-hidden bg-gray-800">
                      {t.image ? (
                        <img src={t.image} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <span className="w-full h-full flex items-center justify-center text-4xl text-white/70">
                          {(t.name || '?').charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                    <QuoteMark className={`w-10 h-8 mx-auto sm:mx-0 ${isActive ? 'text-black/85' : 'text-[#C39223]'}`} />
                    <ClampedQuote text={t.quote} active={isActive} onReadMore={() => setReading(t)} />
                    <span
                      aria-hidden="true"
                      className={`block w-8 h-[3px] rounded-full mt-5 mb-3 mx-auto sm:mx-0 ${isActive ? 'bg-black/70' : 'bg-[#C39223]'}`}
                    />
                    <p className={`font-semibold ${isActive ? 'text-black' : 'text-[#C39223]'}`}>{t.name}</p>
                    {t.role && <p className={`text-sm mt-0.5 ${isActive ? 'text-black/75' : 'text-gray-400'}`}>{t.role}</p>}
                  </div>
                </article>
              );
            })}
          </div>

          {count > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="hidden sm:flex absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#C39223] text-black items-center justify-center shadow-lg hover:bg-[#d6a32c] transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="hidden sm:flex absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#C39223] text-black items-center justify-center shadow-lg hover:bg-[#d6a32c] transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {count > 1 && (
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((t, i) => (
              <button
                key={t.id || i}
                onClick={() => goTo(rawIndex + offsetOf(i, active, count))}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === active}
                className={`h-2.5 rounded-full transition-all ${i === active ? 'w-8 bg-[#C39223]' : 'w-2.5 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </div>

      <TestimonialModal t={reading} onClose={closeReading} />
    </section>
  );
}
