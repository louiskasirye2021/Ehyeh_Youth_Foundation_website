import { useState } from 'react';
import { CheckCircle, ChevronDown, Clock, Target, Users, LayoutList } from 'lucide-react';
import { RichText } from './RichText';

const PROMISE_STYLES = [
  'bg-gradient-to-br from-blue-50 to-white border border-blue-100',
  'bg-gradient-to-br from-[#C39223]/10 to-white border border-[#C39223]/20',
  'bg-gradient-to-br from-green-50 to-white border border-green-100',
];

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

function Bullets({ items, icon = 'dot' }: { items: string[]; icon?: 'dot' | 'check' }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
          {icon === 'check' ? (
            <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
          ) : (
            <span className="text-[#C39223] mt-0.5" aria-hidden="true">•</span>
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubProgram({ sub, open, onToggle }: { sub: any; open: boolean; onToggle: () => void }) {
  const facts = [
    { label: 'Duration', value: sub.duration, Icon: Clock },
    { label: 'Format', value: sub.format, Icon: LayoutList },
    { label: 'Group size', value: sub.groupSize, Icon: Users },
    { label: 'Age range', value: sub.ageRange, Icon: Target },
  ].filter((f) => f.value);
  const summary = [sub.ageRange, sub.duration].filter(Boolean).join(', ');

  return (
    <li className={`rounded-2xl border bg-white transition-colors ${open ? 'border-[#C39223]/50 shadow-sm' : 'border-gray-200'}`}>
      <h4>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223]"
        >
          <span className="min-w-0">
            <span className="block text-lg text-black">{sub.name}</span>
            {summary && <span className="block text-sm text-gray-500 mt-0.5">{summary}</span>}
          </span>
          <ChevronDown
            size={22}
            className={`flex-shrink-0 text-[#C39223] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h4>

      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-6 md:px-6 space-y-6">
            <RichText text={sub.desc} className="text-gray-700 leading-relaxed space-y-3" />

            {facts.length > 0 && (
              <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                {facts.map(({ label, value, Icon }) => (
                  <div key={label} className="flex items-start gap-2">
                    <Icon size={18} className="text-[#C39223] mt-0.5 flex-shrink-0" />
                    <div>
                      <dt className="text-xs text-gray-500">{label}</dt>
                      <dd className="text-sm text-gray-800">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {sub.objectives?.length > 0 && (
                <div>
                  <h5 className="text-black mb-3">Program objectives</h5>
                  <Bullets items={sub.objectives} />
                </div>
              )}
              {sub.outcomes?.length > 0 && (
                <div>
                  <h5 className="text-black mb-3">Expected outcomes</h5>
                  <Bullets items={sub.outcomes} icon="check" />
                </div>
              )}
            </div>

            {sub.corePillars?.length > 0 && (
              <div>
                <h5 className="text-black mb-3">Core pillars</h5>
                <div className="grid md:grid-cols-2 gap-3">
                  {sub.corePillars.map((pillar: any, i: number) => (
                    <div key={pillar.id || i} className="bg-[#C39223]/10 rounded-xl p-4">
                      <h6 className="text-black font-medium mb-2">{pillar.title}</h6>
                      <Bullets items={pillar.elements || []} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sub.weeklyModules?.length > 0 && (
              <div>
                <h5 className="text-black mb-3">Weekly mentorship modules</h5>
                <ol className="grid md:grid-cols-2 gap-2">
                  {sub.weeklyModules.map((week: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                      {week}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** The details shown under a program's top panel. */
export function ProgramDetails({ program }: { program: any }) {
  const subPrograms: any[] = program.subPrograms || [];
  const acronym: any[] = program.acronym || [];
  const promises: any[] = program.promises || [];
  const modules: string[] = program.modules || [];
  const [openSubs, setOpenSubs] = useState<Set<string>>(() => new Set(subPrograms[0] ? [subPrograms[0].id] : []));

  const toggleSub = (id: string) =>
    setOpenSubs((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="space-y-14 mt-16 max-w-7xl mx-auto">
      {/* About */}
      {program.fullDescription && (
        <div className="max-w-3xl">
          <h4 className="text-2xl text-black mb-4">About the program</h4>
          <RichText text={program.fullDescription} className="text-gray-700 text-lg leading-relaxed space-y-4" />
        </div>
      )}

      {/* Goal */}
      {program.goal && (
        <div className="bg-gradient-to-r from-[#C39223] to-[#b08520] text-white rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-2">
            <Target size={24} />
            <h4 className="text-2xl">Our Goal</h4>
          </div>
          <RichText text={program.goal} className="text-lg space-y-3" />
        </div>
      )}

      {/* Acronym */}
      {acronym.length > 0 && (
        <div>
          {program.acronymTitle && <h4 className="text-2xl text-black mb-5">{program.acronymTitle}</h4>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {acronym.map((entry, i) => (
              <div key={entry.id || i} className="bg-[#C39223]/10 rounded-2xl p-5 border-l-4 border-[#C39223]">
                <span className="block text-4xl text-[#C39223] leading-none mb-2">{entry.letter}</span>
                <span className="text-lg text-black">{entry.word}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modules */}
      {modules.length > 0 && (
        <div>
          <h4 className="text-2xl text-black mb-5">Key Modules & Focus Areas</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {modules.map((module, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
                <CheckCircle size={20} className="text-[#C39223] mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{module}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-programs */}
      {subPrograms.length > 0 && (
        <div>
          <h4 className="text-2xl text-black mb-2">Sub-Programs</h4>
          <p className="text-gray-600 mb-5">Select a sub-program to see its details.</p>
          <ul className="space-y-3">
            {subPrograms.map((sub, i) => (
              <SubProgram
                key={sub.id || i}
                sub={sub}
                open={openSubs.has(sub.id)}
                onToggle={() => toggleSub(sub.id)}
              />
            ))}
          </ul>
        </div>
      )}

      {/* Promises */}
      {promises.length > 0 && (
        <div>
          {program.promisesTitle && <h4 className="text-2xl text-black mb-5">{program.promisesTitle}</h4>}
          <div className="grid md:grid-cols-3 gap-4">
            {promises.map((promise, i) => (
              <div key={promise.id || i} className={`${PROMISE_STYLES[i % PROMISE_STYLES.length]} rounded-2xl p-6`}>
                <h5 className="text-lg text-black mb-2">{promise.title}</h5>
                <p className="text-sm text-gray-600 leading-relaxed">{promise.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target audience */}
      {program.target && (
        <div className="bg-black text-white rounded-3xl p-8 md:p-10">
          <h4 className="text-2xl mb-3">Target Audience</h4>
          <RichText text={program.target} className="text-lg text-gray-200 leading-relaxed space-y-3" />
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
        <h4 className="text-xl text-black mb-2">Interested in {program.title}?</h4>
        <p className="text-gray-600 mb-5">Send us a message and we'll tell you how to join.</p>
        <button
          type="button"
          onClick={scrollToContact}
          className="bg-[#C39223] text-white px-8 py-3 rounded-full hover:bg-[#b08520] transition-colors shadow-lg"
        >
          Get in touch
        </button>
      </div>
    </div>
  );
}
