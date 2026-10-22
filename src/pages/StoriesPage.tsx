import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AbstractShapes } from '../components/AbstractShapes';
import { StoryCard } from '../components/StoryCard';
import { BlogModal } from '../components/BlogModal';
import { sortStoriesNewestFirst, useSiteContent } from '../content/store';

const PAGE_SIZE = 12;
const ALL = 'All';

/** Story id from a link like #/stories/<id>, if there is one. */
function storyIdFromHash() {
  const match = window.location.hash.match(/^#\/stories\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Every story, newest first. Each story has its own shareable link. */
export function StoriesPage() {
  const { blog, blogSection } = useSiteContent().content;
  const stories = useMemo(() => sortStoriesNewestFirst(blog), [blog]);

  const categories = useMemo(() => {
    const names = stories.map((s) => s.category.trim()).filter(Boolean);
    return [ALL, ...Array.from(new Set(names))];
  }, [stories]);

  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [openId, setOpenId] = useState<string | null>(storyIdFromHash);

  useEffect(() => {
    const onHash = () => setOpenId(storyIdFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const filtered = category === ALL ? stories : stories.filter((s) => s.category.trim() === category);
  const shown = filtered.slice(0, visible);
  const openStory = stories.find((s) => s.id === openId) ?? null;

  const open = (id: string) => {
    window.location.hash = `/stories/${encodeURIComponent(id)}`;
  };
  const close = () => {
    window.location.hash = '/stories';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <header className="bg-black text-white pt-36 pb-16 relative overflow-hidden">
        <AbstractShapes />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
          <a href="#/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C39223] mb-6">
            <ArrowLeft size={16} />
            Back to home
          </a>
          <h1 className="text-4xl md:text-6xl">{blogSection.title}</h1>
          {blogSection.intro && <p className="text-gray-300 mt-4 max-w-2xl text-lg">{blogSection.intro}</p>}
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter stories by category">
            {categories.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setCategory(name);
                  setVisible(PAGE_SIZE);
                }}
                aria-pressed={category === name}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  category === name
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#C39223] hover:text-[#8a6614]'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {shown.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No stories yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shown.map((post) => (
              <StoryCard key={post.id} post={post} onOpen={() => open(post.id)} />
            ))}
          </div>
        )}

        {filtered.length > shown.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#C39223] transition-colors"
            >
              Show more stories
            </button>
          </div>
        )}
      </main>

      <Footer />
      <BlogModal isOpen={openStory !== null} post={openStory} onClose={close} />
    </div>
  );
}
