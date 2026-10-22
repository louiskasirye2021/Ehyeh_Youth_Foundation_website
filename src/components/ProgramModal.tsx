import { X, CheckCircle, Users, Clock, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProgramIcon } from './ProgramIcon';
import { RichText } from './RichText';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: any | null;
  index: number;
}

const PROMISE_STYLES = [
  'bg-gradient-to-br from-blue-50 to-white border border-blue-100',
  'bg-gradient-to-br from-[#C39223]/10 to-white border border-[#C39223]/20',
  'bg-gradient-to-br from-green-50 to-white border border-green-100',
];

export function ProgramModal({ isOpen, onClose, program, index }: ProgramModalProps) {
  if (!program) return null;

  const subPrograms: any[] = program.subPrograms || [];
  const acronym: any[] = program.acronym || [];
  const promises: any[] = program.promises || [];
  const modules: string[] = program.modules || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 left-full z-10 w-10 h-10 bg-black/80 hover:bg-[#C39223] rounded-full flex items-center justify-center transition-colors ml-auto mr-4"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Header Image */}
              <div className="relative h-64 md:h-80 rounded-t-3xl overflow-hidden -mt-14">
                <ImageWithFallback
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Icon and Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#C39223] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ProgramIcon icon={program.icon} index={index} size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl text-white mb-2">{program.title}</h2>
                      {program.subtitle && (
                        <p className="text-[#C39223] text-lg">{program.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-2xl text-black mb-4">Overview</h3>
                  <RichText
                    text={program.description}
                    className="text-gray-700 leading-relaxed text-lg mb-4 space-y-4"
                  />
                  <RichText
                    text={program.fullDescription}
                    className="text-gray-700 leading-relaxed space-y-4"
                  />
                </div>

                {/* Goal (for E1T1) */}
                {program.goal && (
                  <div className="bg-gradient-to-r from-[#C39223] to-[#b08520] text-white rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Target size={24} />
                      <h3 className="text-2xl">Our Goal</h3>
                    </div>
                    <RichText text={program.goal} className="text-lg space-y-3" />
                  </div>
                )}

                {/* Acronym (e.g. F.R.E.E.D) */}
                {acronym.length > 0 && (
                  <div>
                    {program.acronymTitle && (
                      <h3 className="text-2xl text-black mb-4">{program.acronymTitle}</h3>
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                      {acronym.map((entry, idx) => (
                        <div
                          key={entry.id || idx}
                          className={`bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223] ${
                            idx === acronym.length - 1 && acronym.length % 2 === 1 ? 'md:col-span-2' : ''
                          }`}
                        >
                          <span className="text-2xl text-[#C39223]">{entry.letter}</span>
                          <span className="text-lg text-black ml-2">- {entry.word}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modules */}
                {modules.length > 0 && (
                <div>
                  <h3 className="text-2xl text-black mb-4">Key Modules & Focus Areas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {modules.map((module, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-[#C39223]/10 transition-colors"
                      >
                        <CheckCircle size={20} className="text-[#C39223] mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700">{module}</p>
                      </div>
                    ))}
                  </div>
                </div>

                )}

                {/* Sub-programs with detailed information */}
                {subPrograms.length > 0 && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">Sub-Programs</h3>
                    <div className="space-y-6">
                      {subPrograms.map((sub, idx) => (
                        <div
                          key={sub.id || idx}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#C39223]/30 transition-colors"
                        >
                          <h4 className="text-xl text-black mb-3">{sub.name}</h4>
                          <RichText text={sub.desc} className="text-gray-600 mb-4 space-y-3" />
                          
                          {/* Program Details Grid */}
                          {(sub.duration || sub.format || sub.groupSize || sub.ageRange) && (
                            <div className="grid md:grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
                              {sub.duration && (
                                <div className="flex items-start gap-2">
                                  <Clock size={18} className="text-[#C39223] mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">Duration</p>
                                    <p className="text-sm text-gray-700">{sub.duration}</p>
                                  </div>
                                </div>
                              )}
                              {sub.format && (
                                <div className="flex items-start gap-2">
                                  <Target size={18} className="text-[#C39223] mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">Format</p>
                                    <p className="text-sm text-gray-700">{sub.format}</p>
                                  </div>
                                </div>
                              )}
                              {sub.groupSize && (
                                <div className="flex items-start gap-2">
                                  <Users size={18} className="text-[#C39223] mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">Group Size</p>
                                    <p className="text-sm text-gray-700">{sub.groupSize}</p>
                                  </div>
                                </div>
                              )}
                              {sub.ageRange && (
                                <div className="flex items-start gap-2">
                                  <Users size={18} className="text-[#C39223] mt-0.5" />
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase">Age Range</p>
                                    <p className="text-sm text-gray-700">{sub.ageRange}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Objectives */}
                          {sub.objectives?.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm text-black mb-2">Program Objectives:</h5>
                              <ul className="space-y-2">
                                {sub.objectives.map((obj, objIdx) => (
                                  <li key={objIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-[#C39223] mt-1">•</span>
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Core Pillars */}
                          {sub.corePillars?.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm text-black mb-2">Core Pillars:</h5>
                              <div className="grid md:grid-cols-2 gap-2">
                                {sub.corePillars.map((pillar, pillarIdx) => (
                                  <div
                                    key={pillarIdx}
                                    className="bg-[#C39223]/10 rounded-lg p-3 border border-gray-200"
                                  >
                                    <h6 className="text-sm text-black font-bold mb-1">{pillar.title}</h6>
                                    <ul className="space-y-1">
                                      {(pillar.elements || []).map((element, elementIdx) => (
                                        <li key={elementIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                          <span className="text-[#C39223] mt-1">•</span>
                                          <span>{element}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Weekly Modules */}
                          {sub.weeklyModules?.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm text-black mb-2">Weekly Mentorship Modules:</h5>
                              <div className="grid md:grid-cols-2 gap-2">
                                {sub.weeklyModules.map((week, weekIdx) => (
                                  <div 
                                    key={weekIdx} 
                                    className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-200"
                                  >
                                    {week}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Outcomes */}
                          {sub.outcomes?.length > 0 && (
                            <div>
                              <h5 className="text-sm text-black mb-2">Expected Outcomes:</h5>
                              <ul className="space-y-2">
                                {sub.outcomes.map((outcome, outIdx) => (
                                  <li key={outIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                    <CheckCircle size={16} className="text-green-600 mt-0.5" />
                                    <span>{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Promises */}
                {promises.length > 0 && (
                  <div>
                    {program.promisesTitle && (
                      <h3 className="text-2xl text-black mb-4">{program.promisesTitle}</h3>
                    )}
                    <div className="grid md:grid-cols-3 gap-4">
                      {promises.map((promise, idx) => (
                        <div
                          key={promise.id || idx}
                          className={`${PROMISE_STYLES[idx % PROMISE_STYLES.length]} rounded-2xl p-6`}
                        >
                          <h4 className="text-lg text-black mb-2">{promise.title}</h4>
                          <p className="text-sm text-gray-600">{promise.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Target Audience */}
                {program.target && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">Target Audience</h3>
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-6">
                      <RichText text={program.target} className="text-lg space-y-3" />
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-[#C39223]/10 rounded-2xl p-6 text-center">
                    <h4 className="text-xl text-black mb-3">Interested in this program?</h4>
                    <p className="text-gray-600 mb-4">
                      Join us in making a difference. Get involved today!
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        const registrationSection = document.getElementById('registration');
                        if (registrationSection) {
                          registrationSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="bg-[#C39223] text-white px-8 py-3 rounded-full hover:bg-[#b08520] transition-all hover:scale-105 shadow-lg"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
