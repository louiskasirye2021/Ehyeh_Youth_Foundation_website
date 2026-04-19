import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import heroImage from 'figma:asset/20819b45a1e4911bf8c3e2175f46ea1338b52a61.png';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 bg-black">
        <img
          src={heroImage}
          alt="EYF Youth Empowerment - Together Building Legacy"
          className="w-full h-full object-cover object-center"
          style={{ 
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.05) brightness(1.1) saturate(1.1)'
          }}
        />
        {/* Refined gradient overlay for better text readability while keeping image clear */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75"></div>
        {/* Additional gradient from bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      </div>

      {/* Abstract Shapes */}
      <AbstractShapes />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Empowered Youth,
            <br />
            <span className="text-[#C39223]">Eternal Legacies.</span>
          </motion.h1>

          {/* Vision Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
          >
            Together, we are shaping a generation that dares to dream beyond limitations, 
            leads with empathy and integrity, and rises with the courage to transform their 
            communities—building a future that outlives them and echoes through generations to come.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="pt-8"
          >
            <motion.button
              onClick={scrollToContact}
              className="bg-[#C39223] text-white px-12 py-4 rounded-full text-lg hover:bg-[#b08520] transition-all transform hover:scale-105 shadow-2xl hover:shadow-[#C39223]/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/70 cursor-pointer hover:text-[#C39223] transition-colors"
          aria-label="Scroll to About section"
        >
          <ChevronDown size={40} />
        </motion.button>
      </motion.div>
    </section>
  );
}
