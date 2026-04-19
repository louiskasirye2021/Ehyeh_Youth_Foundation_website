import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Tag } from 'lucide-react';

interface BlogModalProps {
  isOpen: boolean;
  post: {
    title: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    excerpt: string;
    image: string;
    fullContent: string;
  } | null;
  onClose: () => void;
}

export function BlogModal({ isOpen, post, onClose }: BlogModalProps) {
  if (!isOpen || !post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-all hover:scale-110"
          >
            <X size={24} className="text-black" />
          </button>

          {/* Featured Image */}
          <div className="relative h-80 overflow-hidden rounded-t-3xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcnRpY2xlIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C39223]/10 text-[#C39223] rounded-full text-sm">
                <Tag size={16} />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl text-black mb-4">
              {post.title}
            </h2>

            {/* Author */}
            <p className="text-gray-600 mb-8">
              By <span className="text-[#C39223] font-medium">{post.author}</span>
            </p>

            {/* Full Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.fullContent || post.excerpt}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={onClose}
                className="bg-[#C39223] text-white px-8 py-3 rounded-full hover:bg-[#b08520] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
