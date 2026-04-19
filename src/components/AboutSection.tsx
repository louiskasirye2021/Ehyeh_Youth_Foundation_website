import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart, Users } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { getAboutInfo } from '../utils/adminStorage';

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [aboutInfo, setAboutInfo] = useState<any>({
    mission: '',
    vision: ''
  });

  useEffect(() => {
    const storedAbout = getAboutInfo();
    if (storedAbout && (storedAbout.mission || storedAbout.vision)) {
      setAboutInfo(storedAbout);
    } else {
      // Fallback to default values if not set
      setAboutInfo({
        mission: 'To inspire and empower young minds, fostering personal growth, leadership skills, and a sense of community, while providing opportunities for education, mentorship, and positive impact thereby shaping a resilient and forward-thinking generation.',
        vision: 'We envision a world where every young person is equipped with the knowledge, skills, and confidence to lead transformative change—creating a future defined by innovation, compassion, and shared prosperity across communities globally.'
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-[#C39223]/5 blur-3xl"
          style={{ top: '10%', right: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.svg
          className="absolute opacity-5"
          style={{ bottom: '10%', left: '5%' }}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="150" cy="150" r="100" fill="none" stroke="#C39223" strokeWidth="2" />
          <circle cx="150" cy="150" r="70" fill="none" stroke="#C39223" strokeWidth="2" />
          <circle cx="150" cy="150" r="40" fill="none" stroke="#C39223" strokeWidth="2" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-block mb-4">
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Who We Are</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto"></div>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">About Us</h2>
          </motion.div>

          {/* Background */}
          <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl md:text-3xl text-black mb-6 flex items-center gap-3">
                <Heart className="text-[#C39223]" size={32} />
                Background
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                The Ehyeh Youth Foundation (E.Y.F) is a non-profit organization committed to uplifting and 
                empowering young people by providing them with the tools, guidance, and opportunities needed 
                to thrive in an ever-changing world. Founded on the belief that every young person possesses 
                untapped potential, E.Y.F aims to bridge gaps in education, mentorship, and skills development, 
                ensuring that no youth is left behind due to lack of access or resources.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                With programs designed to nurture holistic growth—spanning emotional, intellectual, social, and 
                vocational development—E.Y.F is dedicated to creating sustainable pathways for youth to realize 
                their dreams and contribute meaningfully to their communities.
              </p>
            </div>
          </motion.div>

          {/* Mission & Vision Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className="bg-black text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C39223]/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-[#C39223] rounded-2xl flex items-center justify-center">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl">Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {aboutInfo.mission}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="bg-[#C39223] text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center">
                    <Eye size={28} className="text-[#C39223]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl">Vision</h3>
                </div>
                <p className="text-white/95 leading-relaxed text-lg">
                  {aboutInfo.vision}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
