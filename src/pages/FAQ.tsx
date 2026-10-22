import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HelpCircle, ArrowLeft, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { AbstractShapes } from '../components/AbstractShapes';
import { Navigation } from '../components/Navigation';
import { useSiteContent } from '../content/store';
import { RichText } from '../components/RichText';

export function FAQ() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const { faq } = useSiteContent().content;
  const faqs = faq.categories;

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.name,
      globalIndex: categoryIndex * 100 + questionIndex
    }))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <section className="py-32 relative overflow-hidden">{/* Added top padding for navbar */}
        <AbstractShapes />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-[#C39223] rounded-full flex items-center justify-center">
                  <HelpCircle size={40} className="text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">{faq.title}</h1>
              {faq.intro && <p className="text-gray-400 text-lg">{faq.intro}</p>}
            </div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {allQuestions.map((item, index) => (
                <div
                  key={(item as { id?: string }).id || item.globalIndex}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-[#C39223]/20 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left hover:bg-[#C39223]/5 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="text-xs text-[#C39223] uppercase tracking-wider mb-1 block">
                        {item.category}
                      </span>
                      <h3 className="text-lg text-white">{item.question}</h3>
                    </div>
                    <ChevronDown
                      size={24}
                      className={`text-[#C39223] flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div
                    className={`grid transition-all duration-300 ${
                      openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <RichText
                        text={item.answer}
                        className="px-6 pb-5 text-gray-300 leading-relaxed space-y-3"
                        strongClassName="text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Still Have Questions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-gradient-to-br from-[#C39223] to-[#b08520] rounded-2xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl text-white mb-4">{faq.ctaTitle}</h2>
              {faq.ctaText && <p className="text-white/90 mb-6 leading-relaxed">{faq.ctaText}</p>}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center bg-white text-[#C39223] px-8 py-4 rounded-full hover:bg-gray-100 transition-all"
                >
                  Contact Us
                </a>
                <a
                  href="#/"
                  className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-full hover:bg-gray-900 transition-all"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Home
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
