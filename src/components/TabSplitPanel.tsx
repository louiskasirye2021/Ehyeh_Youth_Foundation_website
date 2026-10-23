import { iconFor } from '../content/icons';
import { RichText } from './RichText';

export interface Stat {
  id?: string;
  icon: string;
  value: string;
  label: string;
  text: string;
}

export interface Point {
  id?: string;
  icon: string;
  title: string;
  text: string;
}

interface TabSplitPanelProps {
  eyebrow: string;
  title: string;
  text: string;
  stats: Stat[];
  points: Point[];
  image: string;
  quote?: string;
}

/**
 * The large white panel at the top of every Programs tab: text, optional
 * numbers and key points on the left; a photo with a curved edge and a gold
 * quote on the right.
 */
export function TabSplitPanel({ eyebrow, title, text, stats, points, image, quote }: TabSplitPanelProps) {
  const visibleStats = stats.filter((s) => s.value.trim());
  const visiblePoints = points.filter((p) => p.title.trim() || p.text.trim());

  return (
    <div className="bg-white rounded-[28px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.22)] overflow-hidden grid lg:grid-cols-[1.08fr_1fr]">
      {/* Text */}
      <div className="p-7 sm:p-10 lg:p-12 lg:pt-16 flex flex-col">
        {eyebrow && (
          <p className="text-[#b08520] uppercase tracking-[0.14em] text-sm font-medium">{eyebrow}</p>
        )}
        {title && (
          <h3 className="text-3xl md:text-[2.4rem] leading-[1.18] font-medium text-black mt-2 max-w-2xl">{title}</h3>
        )}
        <RichText text={text} className="text-gray-600 text-lg leading-relaxed mt-5 max-w-2xl space-y-4" />

        {visibleStats.length > 0 && (
          <dl className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {visibleStats.map((stat, i) => {
              const Icon = iconFor(stat.icon);
              return (
                <div
                  key={stat.id || i}
                  className={`pr-4 ${i % 2 === 1 ? 'pl-4 border-l border-gray-200' : ''} ${
                    i > 0 ? 'md:pl-5 md:border-l md:border-gray-200' : ''
                  }`}
                >
                  <span className="w-12 h-12 rounded-full bg-[#C39223]/15 text-[#b08520] flex items-center justify-center mb-3">
                    <Icon size={22} />
                  </span>
                  <dd className="text-3xl font-semibold text-black leading-none">{stat.value}</dd>
                  {stat.label && <dt className="text-sm font-medium text-gray-900 mt-2">{stat.label}</dt>}
                  {stat.text && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{stat.text}</p>}
                </div>
              );
            })}
          </dl>
        )}

        {visiblePoints.length > 0 && (
          <div className="mt-auto pt-9">
            <ul className="grid sm:grid-cols-3 gap-6 sm:gap-0 border-t border-gray-200 pt-6">
              {visiblePoints.map((point, i) => {
                const Icon = iconFor(point.icon);
                return (
                  <li
                    key={point.id || i}
                    className={`flex items-start gap-3 sm:px-4 ${i === 0 ? 'sm:pl-0' : 'sm:border-l sm:border-gray-200'}`}
                  >
                    <span className="w-10 h-10 rounded-full bg-[#C39223]/15 text-[#b08520] flex items-center justify-center flex-shrink-0">
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-black">{point.title}</p>
                      {point.text && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{point.text}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Photo */}
      <div className="relative order-first lg:order-none min-h-[260px] sm:min-h-[340px] lg:min-h-[520px] bg-gradient-to-br from-[#C39223]/30 to-black/20">
        {image && (
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        )}

        {/* Curved edge where the photo meets the text (large screens) */}
        <svg
          className="hidden lg:block absolute inset-y-0 left-0 h-full w-28 text-white"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,0 L100,0 C55,22 18,55 42,100 L0,100 Z" fill="currentColor" />
        </svg>

        {quote && (
          <>
            <svg
              className="absolute bottom-0 right-0 w-[78%] h-[52%] lg:w-[72%] lg:h-[48%]"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M400,10 C345,95 255,150 150,215 C95,250 45,280 0,300 L400,300 Z" fill="#C39223" fillOpacity="0.55" />
              <path d="M400,55 C350,130 270,180 175,235 C120,265 70,285 30,300 L400,300 Z" fill="#C39223" />
            </svg>
            <blockquote className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-[52%] lg:w-[42%] text-center text-white">
              <span className="block w-10 h-[3px] bg-white/80 mx-auto mb-3" aria-hidden="true" />
              <p className="italic text-lg sm:text-2xl leading-snug">“{quote}”</p>
              <span className="block w-10 h-[3px] bg-white/80 mx-auto mt-3" aria-hidden="true" />
            </blockquote>
          </>
        )}
      </div>
    </div>
  );
}
