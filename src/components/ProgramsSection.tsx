import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Users, GraduationCap, Sparkles, ArrowRight, Target, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { ProgramModal } from './ProgramModal';
import { getPrograms } from '../utils/adminStorage';
import lmpImage from 'figma:asset/8af8190d680badaabb7f54acbd51ca364eaaeb27.png';
import e1t1Image from 'figma:asset/8699283214e5eb50bfc25cdcc553639e00d46e71.png';
import skillsHubImage from 'figma:asset/5a7810e8c401f85c9a1195afa79c11c7bd456836.png';

export function ProgramsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);

  // Fallback hardcoded programs with icon components
  const defaultPrograms = [
    {
      icon: Users,
      title: 'Legacy Mentorship Program (LMP)',
      subtitle: 'Changing their tomorrow today!!',
      description: 'A comprehensive mentorship ecosystem designed to nurture and empower young people at every stage of their journey.',
      image: lmpImage,
      modules: [
        'Self Awareness and building resilience',
        'Mental Health and well-being',
        'Life skills',
        'Financial literacy',
        'Civic engagement and social responsibility',
        'Understanding diversity and global awareness'
      ],
      subPrograms: []
    },
    {
      icon: GraduationCap,
      title: 'E1T1 Education Fund',
      subtitle: 'Each One Teach One',
      description: 'Providing educational support and resources to talented students from underprivileged backgrounds.',
      image: e1t1Image,
      modules: [
        'Scholarship programs',
        'Academic mentorship',
        'School supplies provision',
        'Career guidance',
        'University preparation'
      ],
      target: 'Talented students from underprivileged backgrounds'
    },
    {
      icon: Sparkles,
      title: 'F.R.E.D Skills Hub',
      subtitle: 'Functional & Relevant Education',
      description: 'Equipping young people with practical, market-relevant skills for immediate employment.',
      image: skillsHubImage,
      modules: [
        'Digital literacy & tech skills',
        'Entrepreneurship training',
        'Vocational skills development',
        'Business planning & management',
        'Industry certifications'
      ],
      target: 'Youth seeking practical skills for employment'
    }
  ];

  useEffect(() => {
    const storedPrograms = getPrograms();
    
    // Merge stored programs with default icons
    const mergedPrograms = storedPrograms.map((prog: any, index: number) => {
      const defaultIcon = index === 0 ? Users : index === 1 ? GraduationCap : Sparkles;
      
      return {
        ...prog,
        icon: typeof prog.icon === 'string' ? prog.icon : defaultIcon
      };
    });
    
    setPrograms(mergedPrograms.length > 0 ? mergedPrograms : defaultPrograms);
  }, []);

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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">What We Do</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">Programs & Initiatives</h2>
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
                  key={index}
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
                          {typeof program.icon === 'string' ? (
                            <span className="text-3xl">{program.icon}</span>
                          ) : (
                            <program.icon size={28} className="text-white" />
                          )}
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
                        <h4 className="text-sm text-black mb-3">Key Modules:</h4>
                        <ul className="space-y-2">
                          {program.modules.slice(0, 3).map((module, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-start">
                              <span className="text-[#C39223] mr-2">•</span>
                              {module}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Sub-programs or Target */}
                      {program.subPrograms && (
                        <div className="mb-6 bg-gray-50 rounded-2xl p-4">
                          <h4 className="text-sm text-black mb-2">Sub-Programs:</h4>
                          {program.subPrograms.map((sub, idx) => (
                            <div key={idx} className="text-sm mb-2">
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
            {/* Expected Outcomes */}
            <div className="bg-black text-white rounded-3xl p-8 shadow-xl">
              <div className="w-12 h-12 bg-[#C39223] rounded-2xl flex items-center justify-center mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-xl mb-4">Expected Outcomes</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Improved personal and professional development</li>
                <li>• Increased access to quality education</li>
                <li>• More young people kept in school</li>
                <li>• Sustainable businesses by young entrepreneurs</li>
                <li>• Vocational school & mentorship center</li>
              </ul>
            </div>

            {/* Target Beneficiaries */}
            <div className="bg-[#C39223] text-white rounded-3xl p-8 shadow-xl">
              <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-4">
                <Users size={24} className="text-[#C39223]" />
              </div>
              <h3 className="text-xl mb-4">Target Beneficiaries</h3>
              <ul className="space-y-2 text-sm text-white/95">
                <li>• Children and youth in underprivileged communities</li>
                <li>• Teenage mothers</li>
                <li>• Aspiring youth-entrepreneurs</li>
                <li>• Entry level employees & vacists</li>
                <li>• Individuals seeking mentorship & coaching</li>
              </ul>
            </div>

            {/* Sustainability Plan */}
            <div className="bg-white border-2 border-[#C39223] rounded-3xl p-8 shadow-xl">
              <div className="w-12 h-12 bg-[#C39223] rounded-2xl flex items-center justify-center mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h3 className="text-xl text-black mb-4">Sustainability</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Mentorship & coaching for entities</li>
                <li>• Partnerships with local communities</li>
                <li>• Annual fundraising events</li>
                <li>• Vocational school & training center</li>
                <li>• Income-generating projects</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Program Modal */}
      {selectedProgram !== null && programs[selectedProgram] && (
        <ProgramModal
          isOpen={selectedProgram !== null}
          program={programs[selectedProgram]}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
}