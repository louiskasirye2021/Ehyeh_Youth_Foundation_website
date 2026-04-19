import { motion } from 'motion/react';

export function AbstractShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Circle 1 */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-[#C39223]/10 blur-3xl"
        style={{ top: '10%', left: '5%' }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Circle 2 */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[#C39223]/5 blur-3xl"
        style={{ top: '40%', right: '10%' }}
        animate={{
          y: [0, -60, 0],
          x: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Triangle Shape */}
      <motion.div
        className="absolute"
        style={{ top: '60%', left: '15%' }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-10">
          <polygon points="60,10 110,100 10,100" fill="#C39223" />
        </svg>
      </motion.div>

      {/* Square Shape */}
      <motion.div
        className="absolute w-32 h-32 border-4 border-[#C39223]/20 rounded-2xl"
        style={{ bottom: '20%', right: '20%' }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hexagon Shape */}
      <motion.div
        className="absolute"
        style={{ top: '70%', right: '30%' }}
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-15">
          <polygon points="50,5 90,30 90,70 50,95 10,70 10,30" fill="none" stroke="#C39223" strokeWidth="3" />
        </svg>
      </motion.div>

      {/* Dots Pattern */}
      <motion.div
        className="absolute grid grid-cols-4 gap-4"
        style={{ top: '30%', left: '80%' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#C39223]" />
        ))}
      </motion.div>

      {/* Curved Lines */}
      <motion.svg
        className="absolute opacity-10"
        style={{ top: '15%', right: '5%' }}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <path
          d="M10,100 Q100,10 190,100 T370,100"
          fill="none"
          stroke="#C39223"
          strokeWidth="4"
        />
      </motion.svg>
    </div>
  );
}
