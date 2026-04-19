import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, GraduationCap, Sparkles, ArrowRight, Target, Award, Calendar } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { ProgramModal } from './ProgramModal';
import { getPrograms } from '../utils/adminStorage';
import lmpImage from 'figma:asset/8af8190d680badaabb7f54acbd51ca364eaaeb27.png';
import e1t1Image from 'figma:asset/8699283214e5eb50bfc25cdcc553639e00d46e71.png';
import skillsHubImage from 'figma:asset/5a7810e8c401f85c9a1195afa79c11c7bd456836.png';

// Fallback hardcoded data
const FALLBACK_PROGRAMS = [
  {
    id: '1',
    title: 'Legacy Mentorship Program (LMP)',
    subtitle: 'Changing their tomorrow today!!',
    description: 'A comprehensive mentorship ecosystem designed to nurture and empower young people at every stage of their journey. Through structured programs tailored to different age groups and contexts, LMP provides the guidance, skills, and support needed to unlock potential and build lasting legacies.',
    icon: '👥',
    image: lmpImage
  },
  {
    id: '2',
    title: 'E1T1 Education Fund',
    subtitle: 'Each One Teach One',
    description: 'Through fundraising and collaboration with fellow Ugandans, together with like-minded entities, we aim to see over 1 million brilliant yet underprivileged youth through school—giving them a chance to better their lives and transform their communities.',
    icon: '🎓',
    image: e1t1Image
  },
  {
    id: '3',
    title: 'F.R.E.E.D Skills Hub',
    subtitle: 'See Me Fly!',
    description: 'Fearless. Resilient. Empowered. Exceptional. Determined. Together, these words represent the spirit and strength of young people, especially girls, inspiring them to embrace their uniqueness, overcome their current challenges, and reach for their dreams with confidence and courage.',
    icon: '✨',
    image: skillsHubImage
  }
];

export function ProgramsSectionDynamic() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const programs = getPrograms();
    if (programs.length > 0) {
      setPrograms(programs);
    } else {
      // Use fallback data if no programs in storage
      setPrograms(FALLBACK_PROGRAMS);
    }
    setLoading(false);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case '👥':
        return Users;
      case '🎓':
        return GraduationCap;
      case '✨':
        return Sparkles;
      default:
        return Users;
    }
  };

  if (loading) {
    return (
      <section id="programs" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-gray-600">Loading programs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => {
              const IconComponent = getIconComponent(program.icon);
              
              return (
                <motion.div
                  key={program.id}
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
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="mb-4">
                        <div className="w-14 h-14 bg-[#C39223] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="text-white" size={28} />
                        </div>
                        <h3 className="text-2xl text-black mb-2">{program.title}</h3>
                        <p className="text-[#C39223] text-sm mb-3">{program.subtitle}</p>
                      </div>
                      <p className="text-gray-600 mb-6 flex-1">{program.description}</p>
                      
                      <button
                        onClick={() => setSelectedProgram(index)}
                        className="w-full bg-black text-white px-6 py-3 rounded-full hover:bg-[#C39223] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Program Modal */}
      {selectedProgram !== null && (
        <ProgramModal
          program={programs[selectedProgram]}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </section>
  );
}
