import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AbstractShapes } from './AbstractShapes';
import { BlogModal } from './BlogModal';
import { StoryCard } from './StoryCard';
import { sortStoriesNewestFirst, useSiteContent } from '../content/store';

/** How many stories the home page shows. The rest are on the Stories page. */
export const HOME_STORY_COUNT = 4;

export function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { blog, blogSection } = useSiteContent().content;
  const stories = useMemo(() => sortStoriesNewestFirst(blog), [blog]);
  const latest = stories.slice(0, HOME_STORY_COUNT);
  const moreCount = stories.length - latest.length;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = latest.find((post) => post.id === selectedId) ?? null;

  return (
    <section id="blog" className="py-24 bg-white relative overflow-hidden">
      <AbstractShapes />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#C39223] uppercase tracking-widest text-sm">{blogSection.label}</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">{blogSection.title}</h2>
              {blogSection.intro && (
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{blogSection.intro}</p>
              )}
            </motion.div>
          </div>

          {latest.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No stories yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {latest.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StoryCard post={post} onOpen={() => setSelectedId(post.id)} />
                </motion.div>
              ))}
            </div>
          )}

          {moreCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <a
                href="#/stories"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-[#C39223] transition-colors"
              >
                View more stories
                <ArrowRight size={18} />
              </a>
              <p className="text-sm text-gray-500 mt-3">
                {moreCount} more {moreCount === 1 ? 'story' : 'stories'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <BlogModal isOpen={selected !== null} post={selected} onClose={() => setSelectedId(null)} />
    </section>
  );
}
