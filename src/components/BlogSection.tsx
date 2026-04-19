import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Clock, Tag, Calendar } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { BlogModal } from './BlogModal';
import { getBlogPosts } from '../utils/adminStorage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import drSabrinaSession from 'figma:asset/80512cb32b4e1d31a3dad0b8abe9ebd2e6ccb629.png';
import mrIsingomaSession from 'figma:asset/816918400983c21870e79b27d0f0267b3295d2ba.png';
import easterOutreachNaguru from 'figma:asset/d05f5a01781c3735d39a148d8279d05d1ac869a2.png';

export function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  useEffect(() => {
    const storedPosts = getBlogPosts();
    // Map the content field to fullContent for compatibility with BlogModal
    const mappedPosts = storedPosts.map((post: any) => ({
      ...post,
      fullContent: post.content || post.fullContent || post.excerpt,
      author: post.author || 'EYF Team'
    }));
    setBlogPosts(mappedPosts);
  }, []);

  return (
    <section id="blog" className="py-24 bg-white relative overflow-hidden">
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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Latest Updates</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">News & Stories</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Stay updated with our latest activities, success stories, and community impact.
              </p>
            </motion.div>
          </div>

          {/* Blog Grid */}
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No news articles available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Check back soon for updates and stories!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZXdzIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#C39223] text-white px-4 py-1 rounded-full text-sm flex items-center gap-2">
                          <Tag size={14} />
                          {post.category}
                        </span>
                      </div>

                      {/* Read Time */}
                      <div className="absolute bottom-4 right-4">
                        <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={16} className="text-[#C39223]" />
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-2xl text-black mb-3 group-hover:text-[#C39223] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-6 flex-1">
                        {post.excerpt}
                      </p>

                      <button className="flex items-center gap-2 text-black group-hover:text-[#C39223] transition-colors" onClick={() => setSelectedPost(index)}>
                        <span>Read More</span>
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#C39223] transition-all">
              View All Articles
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Blog Modal */}
      {selectedPost !== null && blogPosts[selectedPost] && (
        <BlogModal
          isOpen={selectedPost !== null}
          post={blogPosts[selectedPost]}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
}