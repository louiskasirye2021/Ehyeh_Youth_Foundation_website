import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { formatStoryDate } from './RichText';

const PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI0YzRjRGNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZXdzIEltYWdlPC90ZXh0Pjwvc3ZnPg==';

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

/** A compact story card, used on the home page and the Stories page. */
export function StoryCard({ post, onOpen }: { post: Story; onOpen: () => void }) {
  const date = formatStoryDate(post.date);

  return (
    <article className="group h-full">
      <button
        type="button"
        onClick={onOpen}
        className="w-full h-full text-left bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C39223] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {post.image ? (
            <img
              src={post.image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#C39223]/20 to-black/10" />
          )}
          {post.category && (
            <span className="absolute top-3 left-3 bg-[#C39223] text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
              <Tag size={12} />
              {post.category}
            </span>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          {(date || post.readTime) && (
            <p className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              {date && (
                <>
                  <Calendar size={14} className="text-[#C39223]" />
                  <span>{date}</span>
                </>
              )}
              {date && post.readTime && <span aria-hidden="true">·</span>}
              {post.readTime && <span>{post.readTime}</span>}
            </p>
          )}

          <h3 className="text-lg leading-snug text-black mb-2 line-clamp-2 group-hover:text-[#C39223] transition-colors">
            {post.title}
          </h3>

          {post.excerpt && <p className="text-sm text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>}

          <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-black group-hover:text-[#C39223] transition-colors">
            Read story
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </button>
    </article>
  );
}
