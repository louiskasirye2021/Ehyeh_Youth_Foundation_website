import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { getBlogPosts } from '../utils/adminStorage';

export function BlogSectionDynamic() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = () => {
    const posts = getBlogPosts();
    setPosts(posts);
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="blog" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

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
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{
                        imageRendering: 'crisp-edges',
                        filter: 'contrast(1.05) brightness(1.05) saturate(1.1)'
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

                    <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <button
                      onClick={() => setSelectedPost(post)}
                      className="inline-flex items-center gap-2 text-[#C39223] hover:gap-3 transition-all duration-300 group/btn"
                    >
                      <span>Read More</span>
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <div className="max-w-4xl">
            {/* Header Image */}
            <div className="relative h-96 -mx-6 -mt-6 mb-6 overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#C39223] text-white px-4 py-1 rounded-full text-sm inline-flex items-center gap-2 mb-4">
                  <Tag size={14} />
                  {selectedPost.category}
                </span>
                <h2 className="text-3xl md:text-4xl text-white mb-2">{selectedPost.title}</h2>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-line"
                style={{ lineHeight: '1.8' }}
              >
                {selectedPost.content}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
