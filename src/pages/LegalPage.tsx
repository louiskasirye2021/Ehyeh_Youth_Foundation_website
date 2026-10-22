import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { AbstractShapes } from '../components/AbstractShapes';
import { Navigation } from '../components/Navigation';
import { RichText } from '../components/RichText';

interface LegalPageProps {
  icon: LucideIcon;
  page: {
    title: string;
    lastUpdated: string;
    sections: { id?: string; heading: string; body: string }[];
  };
}

/** Shared layout for the Privacy Policy and Terms & Conditions pages. */
export function LegalPage({ icon: Icon, page }: LegalPageProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <section className="py-32 relative overflow-hidden">
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
                  <Icon size={40} className="text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">{page.title}</h1>
              {page.lastUpdated && <p className="text-gray-400">Last updated: {page.lastUpdated}</p>}
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {page.sections.map((section, index) => (
                <div
                  key={section.id || index}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-[#C39223]/20"
                >
                  {section.heading && <h2 className="text-2xl text-[#C39223] mb-4">{section.heading}</h2>}
                  <RichText
                    text={section.body}
                    className="text-gray-300 leading-relaxed space-y-3"
                    listClassName="list-disc list-inside space-y-1 ml-4"
                    strongClassName="text-white"
                  />
                </div>
              ))}

              <div className="text-center pt-8">
                <a
                  href="#/"
                  className="inline-flex items-center gap-2 bg-[#C39223] text-white px-8 py-4 rounded-full hover:bg-[#b08520] transition-all"
                >
                  <ArrowLeft size={20} />
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
