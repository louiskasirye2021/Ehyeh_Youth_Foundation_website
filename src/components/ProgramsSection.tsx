import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, ArrowRight, Target, Award } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState } from 'react';
import { ProgramModal } from './ProgramModal';
import { ProgramIcon } from './ProgramIcon';
import { useSiteContent } from '../content/store';

const HIGHLIGHT_STYLES = [
  { card: 'bg-black text-white', badge: 'bg-[#C39223]', icon: Target, iconClass: '', title: '', list: 'text-gray-300' },
  { card: 'bg-[#C39223] text-white', badge: 'bg-black', icon: Users, iconClass: 'text-[#C39223]', title: '', list: 'text-white/95' },
  { card: 'bg-white border-2 border-[#C39223]', badge: 'bg-[#C39223]', icon: Award, iconClass: 'text-white', title: 'text-black', list: 'text-gray-700' },
];

export function ProgramsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const { programs, programsSection } = useSiteContent().content;

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <AbstractShapes />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C39223] uppercase tracking-widest text-sm">{programsSection.label}</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">{programsSection.title}</h2>
            </motion.div>
          </div>

          {/* Program Cards */}
          {programs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No programs available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Programs will appear here once added by the administrator.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {programs.map((program, index) => (
                <motion.div
                  key={program.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9ncmFtIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-14 h-14 bg-[#C39223] rounded-2xl flex items-center justify-center">
                          <ProgramIcon icon={program.icon} index={index} size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl text-black mb-2">{program.title}</h3>
                      {program.subtitle && (
                        <p className="text-[#C39223] text-sm mb-3">{program.subtitle}</p>
                      )}
                      <p className="text-gray-600 mb-6">{program.description}</p>

                      {/* Modules */}
                      <div className="mb-6 flex-1">
                        {program.modules.length > 0 && (
                        <>
                        <h4 className="text-sm text-black mb-3">Key Modules:</h4>
                        <ul className="space-y-2">
                          {program.modules.slice(0, 3).map((module, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-[#C39223] mr-2">•</span>
                              {module}
                            </li>
                          ))}
                        </ul>
                        </>
                        )}
                      </div>

                      {/* Sub-programs or Target */}
                      {program.subPrograms.length > 0 && (
                        <div className="mb-6 bg-gray-50 rounded-2xl p-4">
                          <h4 className="text-sm text-black mb-2">Sub-Programs:</h4>
                          {program.subPrograms.map((sub, idx) => (
                            <div key={(sub as { id?: string }).id || idx} className="text-sm mb-2">
                              <span className="text-[#C39223]">{sub.name}</span>
                              <p className="text-gray-600 text-xs">{sub.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {program.target && (
                        <div className="mb-6 bg-[#C39223]/10 rounded-2xl p-4">
                          <h4 className="text-sm text-black mb-1">Target Audience:</h4>
                          <p className="text-sm text-gray-700">{program.target}</p>
                        </div>
                      )}

                      {/* Read More Button */}
                      <button
                        className="w-full bg-black text-white py-3 rounded-full hover:bg-[#C39223] transition-all group/btn flex items-center justify-center gap-2"
                        onClick={() => setSelectedProgram(index)}
                      >
                        <span>Read More</span>
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Expected Outcomes, Beneficiaries & Sustainability */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {programsSection.highlights.map((highlight, index) => {
              const style = HIGHLIGHT_STYLES[index % HIGHLIGHT_STYLES.length];
              const Icon = style.icon;
              return (
                <div key={highlight.id || index} className={`${style.card} rounded-3xl p-8 shadow-xl`}>
                  <div className={`w-12 h-12 ${style.badge} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon size={24} className={style.iconClass} />
                  </div>
                  <h3 className={`text-xl mb-4 ${style.title}`}>{highlight.title}</h3>
                  <ul className={`space-y-2 text-sm ${style.list}`}>
                    {highlight.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Program Modal */}
      {selectedProgram !== null && programs[selectedProgram] && (
        <ProgramModal
          isOpen={selectedProgram !== null}
          program={programs[selectedProgram]}
          index={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
}
