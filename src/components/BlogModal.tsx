import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Tag } from 'lucide-react';
import { RichText, formatStoryDate } from './RichText';
import type { Story } from './StoryCard';

interface BlogModalProps {
  isOpen: boolean;
  post: Story | null;
  onClose: () => void;
}

export function BlogModal({ isOpen, post, onClose }: BlogModalProps) {
  // Close with the Escape key.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && post && (
        <motion.div
          key={post.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto my-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={post.title}
          >
            <button
              onClick={onClose}
              aria-label="Close story"
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow transition-transform hover:scale-110"
            >
              <X size={22} className="text-black" />
            </button>

            {post.image && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl bg-gray-100">
                <img src={post.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-3 mb-6">
                {post.category && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C39223]/10 text-[#8a6614] rounded-full text-sm">
                    <Tag size={16} />
                    {post.category}
                  </span>
                )}
                {post.date && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Calendar size={16} />
                    {formatStoryDate(post.date)}
                  </span>
                )}
                {post.readTime && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                )}
              </div>

              <h2 className="text-3xl md:text-4xl text-black mb-3">{post.title}</h2>
              {post.author && (
                <p className="text-gray-600 mb-8">
                  By <span className="text-[#8a6614] font-medium">{post.author}</span>
                </p>
              )}

              <RichText
                text={post.content || post.excerpt}
                className="text-gray-700 text-lg leading-relaxed space-y-5"
                strongClassName="text-black"
              />

              <div className="mt-10 pt-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="bg-[#C39223] text-white px-8 py-3 rounded-full hover:bg-[#b08520] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
