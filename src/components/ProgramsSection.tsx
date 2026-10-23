import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState, type KeyboardEvent } from 'react';
import { AbstractShapes } from './AbstractShapes';
import { ProgramDetails } from './ProgramPanel';
import { TabSplitPanel } from './TabSplitPanel';
import { useSiteContent } from '../content/store';

const OVERVIEW = 'overview';
const NAV_HEIGHT = 80; // the fixed menu bar at the top of the page

export function ProgramsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const { programs, programsSection } = useSiteContent().content;

  const tabs = [
    { id: OVERVIEW, label: programsSection.overviewTabLabel || 'Overview' },
    ...programs.map((p) => ({ id: p.id, label: p.tabLabel || p.title })),
  ];
  const [selected, setSelected] = useState(OVERVIEW);
  const active = tabs.some((t) => t.id === selected) ? selected : OVERVIEW;
  const activeIndex = tabs.findIndex((t) => t.id === active);
  const program = programs.find((p) => p.id === active);

  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: string) => {
    setSelected(id);
    // If the reader had scrolled down a long tab, bring the new tab's start into view.
    const panel = panelRef.current;
    const bar = barRef.current;
    if (panel && bar) {
      const offset = NAV_HEIGHT + bar.offsetHeight;
      const top = panel.getBoundingClientRect().top;
      if (top < offset - 40) {
        window.scrollTo({ top: window.scrollY + top - offset, behavior: 'smooth' });
      }
    }
    const index = tabs.findIndex((t) => t.id === id);
    tabRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = tabs.length - 1;
    const next =
      e.key === 'ArrowRight' ? (activeIndex === last ? 0 : activeIndex + 1)
      : e.key === 'ArrowLeft' ? (activeIndex === 0 ? last : activeIndex - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="programs" className="py-24 bg-[#FAF8F4] relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AbstractShapes />
      </div>

      <div className="mx-auto px-4 lg:px-10 relative z-10 max-w-[1520px]" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-[#C39223] uppercase tracking-widest text-sm">{programsSection.label}</span>
          <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">{programsSection.title}</h2>
        </motion.div>

        {/* Tabs: a pill bar that sits over the top edge of the panel */}
        <div ref={barRef} className="sticky top-[88px] z-30 flex justify-center px-1 -mb-7">
          <div
            role="tablist"
            aria-label={programsSection.title}
            className="flex w-full max-w-[1100px] overflow-x-auto rounded-full bg-[#F1EDE6]/95 backdrop-blur border border-black/5 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.25)] p-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {tabs.map((tab, index) => {
              const isActive = tab.id === active;
              const showDivider = index > 0 && !isActive && index - 1 !== activeIndex;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`program-tab-${tab.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="program-tabpanel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(tab.id)}
                  onKeyDown={onTabKey}
                  className={`relative flex-1 min-w-0 px-2.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full text-sm sm:text-lg whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223] focus-visible:ring-offset-2 ${
                    isActive ? 'text-white' : 'text-gray-800 hover:text-black'
                  }`}
                >
                  {showDivider && (
                    <span className="absolute left-0 top-1/4 h-1/2 w-px bg-black/10" aria-hidden="true" />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="program-tab-pill"
                      className="absolute inset-0 rounded-full bg-[#C39223] shadow-[0_6px_16px_-6px_rgba(195,146,35,0.8)]"
                      transition={{ type: 'spring', stiffness: 450, damping: 38 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          ref={panelRef}
          id="program-tabpanel"
          role="tabpanel"
          aria-labelledby={`program-tab-${active}`}
          className="scroll-mt-48"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {program ? (
                <>
                  <TabSplitPanel
                    eyebrow={program.tabLabel}
                    title={program.title}
                    text={program.description}
                    stats={program.stats}
                    points={program.points}
                    image={program.image}
                    quote={program.subtitle}
                  />
                  <ProgramDetails program={program} />
                </>
              ) : (
                <TabSplitPanel
                  eyebrow={programsSection.overviewTabLabel}
                  title={programsSection.overviewTitle}
                  text={programsSection.overviewIntro}
                  stats={programsSection.overviewStats}
                  points={programsSection.overviewPoints}
                  image={programsSection.overviewImage}
                  quote={programsSection.overviewQuote}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
