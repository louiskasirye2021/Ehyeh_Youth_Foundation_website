import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { getTestimonials } from '../utils/adminStorage';

export function TestimonialsSectionDynamic() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = () => {
    const testimonials = getTestimonials();
    setTestimonials(testimonials);
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Success Stories</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">What They Say</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Hear from the young people whose lives have been transformed through our programs.
              </p>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  {/* Quote Icon Background */}
                  <div className="absolute top-4 right-4 text-[#C39223] opacity-10">
                    <Quote size={80} />
                  </div>

                  {/* Profile Image */}
                  <div className="mb-6 relative z-10">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C39223] mx-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6 relative z-10">
                    <h3 className="text-xl text-black mb-1">{testimonial.name}</h3>
                    <p className="text-[#C39223] text-sm">{testimonial.role}</p>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 relative z-10">
                    <p className="text-gray-700 italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    {testimonial.message && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 italic">
                          {testimonial.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Highlight Badge */}
                  {testimonial.highlight && (
                    <div className="mt-4 relative z-10">
                      <span className="inline-block bg-[#C39223]/10 text-[#C39223] px-4 py-2 rounded-full text-xs">
                        {testimonial.highlight}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
