import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { getTeamMembers } from '../utils/adminStorage';

export function TeamSectionDynamic() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = () => {
    const team = getTeamMembers();
    setTeam(team);
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="team" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-gray-600">Loading team...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black mb-8">Meet the Team</h2>
            </motion.div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                {/* Card Container */}
                <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
                  {/* Photo - Full height, uncropped */}
                  <div className="w-full h-[500px]">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Name and Role Section - Overlays the bottom of the image */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#C39223] text-center p-6 rounded-b-3xl">
                    <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-white/90">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
