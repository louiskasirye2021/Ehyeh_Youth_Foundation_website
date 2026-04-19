import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Mail } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { getTeamMembers } from '../utils/adminStorage';
import lucyImage from 'figma:asset/25ce06d8368056839a9b2b8982c7dd47409a36cd.png';
import latifahImage from 'figma:asset/2b75ebe65558dd1cd0425b1798eafe07b2dc0f65.png';

export function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const storedTeam = getTeamMembers();
    setTeam(storedTeam);
  }, []);

  return (
    <section id="team" className="py-24 bg-white relative overflow-hidden">
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black mb-8">Meet the Team</h2>
            </motion.div>
          </div>

          {/* Team Grid */}
          {team.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No team members listed yet.</p>
              <p className="text-gray-400 text-sm mt-2">Team members will appear here once added by the administrator.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  {/* Card Container */}
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden relative">
                    {/* Photo - Full height, uncropped */}
                    <div className="w-full h-[500px]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UZWFtIE1lbWJlcjwvdGV4dD48L3N2Zz4=';
                        }}
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
          )}
        </motion.div>
      </div>
    </section>
  );
}