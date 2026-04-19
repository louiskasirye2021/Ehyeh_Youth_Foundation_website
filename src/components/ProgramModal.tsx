import { X, CheckCircle, Users, Clock, Target, Brain, Heart, Lightbulb, HandHeart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CorePillar {
  title: string;
  elements: string[];
}

interface SubProgram {
  name: string;
  desc: string;
  duration?: string;
  format?: string;
  groupSize?: string;
  ageRange?: string;
  objectives?: string[];
  weeklyModules?: string[];
  corePillars?: CorePillar[];
  outcomes?: string[];
}

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: {
    icon: React.ComponentType<{ size: number; className?: string }>;
    title: string;
    subtitle?: string;
    description: string;
    fullDescription?: string;
    image: string;
    modules: string[];
    subPrograms?: SubProgram[];
    target?: string;
    goal?: string;
    acronym?: {
      F: string;
      R: string;
      E: string;
      E2: string;
      D: string;
    };
    promises?: {
      toParents: string;
      toMentees: string;
      toCommunity: string;
    };
  } | null;
}

export function ProgramModal({ isOpen, onClose, program }: ProgramModalProps) {
  if (!program) return null;

  const Icon = program.icon;

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
                      <Icon size={32} className="text-white" />
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
                  <p className="text-gray-700 leading-relaxed text-lg mb-4">
                    {program.description}
                  </p>
                  {program.fullDescription && (
                    <p className="text-gray-700 leading-relaxed">
                      {program.fullDescription}
                    </p>
                  )}
                </div>

                {/* Goal (for E1T1) */}
                {program.goal && (
                  <div className="bg-gradient-to-r from-[#C39223] to-[#b08520] text-white rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Target size={24} />
                      <h3 className="text-2xl">Our Goal</h3>
                    </div>
                    <p className="text-lg">{program.goal}</p>
                  </div>
                )}

                {/* F.R.E.E.D Acronym */}
                {program.acronym && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">What F.R.E.E.D Stands For</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223]">
                        <span className="text-2xl text-[#C39223]">F</span>
                        <span className="text-lg text-black ml-2">- {program.acronym.F}</span>
                      </div>
                      <div className="bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223]">
                        <span className="text-2xl text-[#C39223]">R</span>
                        <span className="text-lg text-black ml-2">- {program.acronym.R}</span>
                      </div>
                      <div className="bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223]">
                        <span className="text-2xl text-[#C39223]">E</span>
                        <span className="text-lg text-black ml-2">- {program.acronym.E}</span>
                      </div>
                      <div className="bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223]">
                        <span className="text-2xl text-[#C39223]">E</span>
                        <span className="text-lg text-black ml-2">- {program.acronym.E2}</span>
                      </div>
                      <div className="bg-[#C39223]/10 rounded-xl p-4 border-l-4 border-[#C39223] md:col-span-2">
                        <span className="text-2xl text-[#C39223]">D</span>
                        <span className="text-lg text-black ml-2">- {program.acronym.D}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modules */}
                <div>
                  <h3 className="text-2xl text-black mb-4">Key Modules & Focus Areas</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {program.modules.map((module, idx) => (
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

                {/* Sub-programs with detailed information */}
                {program.subPrograms && program.subPrograms.length > 0 && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">Sub-Programs</h3>
                    <div className="space-y-6">
                      {program.subPrograms.map((sub, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#C39223]/30 transition-colors"
                        >
                          <h4 className="text-xl text-black mb-3">{sub.name}</h4>
                          <p className="text-gray-600 mb-4">{sub.desc}</p>
                          
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
                          {sub.objectives && sub.objectives.length > 0 && (
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
                          {sub.corePillars && sub.corePillars.length > 0 && (
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
                                      {pillar.elements.map((element, elementIdx) => (
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
                          {sub.weeklyModules && sub.weeklyModules.length > 0 && (
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
                          {sub.outcomes && sub.outcomes.length > 0 && (
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

                {/* Our Promises (for LMP) */}
                {program.promises && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">Our Promises</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                        <h4 className="text-lg text-black mb-2">To Parents</h4>
                        <p className="text-sm text-gray-600">{program.promises.toParents}</p>
                      </div>
                      <div className="bg-gradient-to-br from-[#C39223]/10 to-white rounded-2xl p-6 border border-[#C39223]/20">
                        <h4 className="text-lg text-black mb-2">To Mentees</h4>
                        <p className="text-sm text-gray-600">{program.promises.toMentees}</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 border border-green-100">
                        <h4 className="text-lg text-black mb-2">To Community</h4>
                        <p className="text-sm text-gray-600">{program.promises.toCommunity}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Target Audience */}
                {program.target && (
                  <div>
                    <h3 className="text-2xl text-black mb-4">Target Audience</h3>
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-6">
                      <p className="text-lg">{program.target}</p>
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