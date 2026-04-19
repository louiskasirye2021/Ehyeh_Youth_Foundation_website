import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { getTestimonials } from '../utils/adminStorage';
import victorImage from 'figma:asset/4c53b366fa6e4b21dd5d92f5fe707914fb515271.png';
import elizabethImage from 'figma:asset/e3cc66de3cd3d478c6713fe36314e09ba0c3834d.png';
import rashidImage from 'figma:asset/af2f36aedd8ef9ca63bcdf6cb22755f306c65bc4.png';

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const storedTestimonials = getTestimonials();
    setTestimonials(storedTestimonials);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  // If no testimonials, don't render the section
  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-black text-white relative overflow-hidden">
      {/* Abstract Shapes */}
      <AbstractShapes />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-[#C39223] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 border-2 border-[#C39223] rounded-full"></div>
      </div>

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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Success Stories</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white">Testimonials</h2>
            </motion.div>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="px-4"
              >
                <div className="bg-[#C39223] rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-white">
                  {/* Author Image */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-24 h-24 rounded-full object-cover ring-4 ring-[#C39223] shadow-xl"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMzYiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj57Y3VycmVudFRlc3RpbW9uaWFsLm5hbWVbMF19PC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>

                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Quote size={32} className="text-[#C39223]" />
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xl md:text-2xl text-white text-center leading-relaxed mb-6">
                    "{currentTestimonial.quote}"
                  </p>

                  {/* Message */}
                  {currentTestimonial.message && (
                    <div className="bg-white/20 rounded-2xl p-4 mb-6">
                      <p className="text-base text-white text-center italic">
                        "{currentTestimonial.message}"
                      </p>
                    </div>
                  )}

                  {/* Highlight */}
                  <div className="text-center mb-6">
                    <span className="inline-block bg-black text-white px-6 py-2 rounded-full text-sm">
                      {currentTestimonial.highlight}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="text-center">
                    <h4 className="text-xl text-white">{currentTestimonial.name}</h4>
                    <p className="text-white/80">{currentTestimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-[#C39223] rounded-full flex items-center justify-center hover:bg-[#b08520] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-[#C39223] rounded-full flex items-center justify-center hover:bg-[#b08520] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-[#C39223] w-8' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}