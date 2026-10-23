import { useCallback, useMemo, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { AbstractShapes } from '../components/AbstractShapes';
import { Polaroid } from '../components/Polaroid';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { sortPhotosNewestFirst, useSiteContent } from '../content/store';

const PAGE_SIZE = 20;
const ALL = 'All';

/** Every gallery photo, newest first. */
export function GalleryPage() {
  const { gallery, gallerySection } = useSiteContent().content;
  const photos = useMemo(() => sortPhotosNewestFirst(gallery.filter((p) => p.url)), [gallery]);

  const categories = useMemo(() => {
    const names = photos.map((p) => (p.category || '').trim()).filter(Boolean);
    return [ALL, ...Array.from(new Set(names))];
  }, [photos]);

  const [category, setCategory] = useState(ALL);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<number | null>(null);
  const onChange = useCallback((i: number | null) => setOpen(i), []);

  const filtered = category === ALL ? photos : photos.filter((p) => (p.category || '').trim() === category);
  const shown = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Navigation />

      <header className="bg-black text-white pt-36 pb-16 relative overflow-hidden">
        <AbstractShapes />
        <div className="mx-auto px-4 lg:px-10 relative z-10 max-w-[1500px]">
          <a href="#/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#C39223] mb-6">
            <ArrowLeft size={16} />
            Back to home
          </a>
          <h1 className="text-4xl md:text-6xl">{gallerySection.title}</h1>
          {gallerySection.intro && <p className="text-gray-300 mt-4 max-w-2xl text-lg">{gallerySection.intro}</p>}
        </div>
      </header>

      <main className="mx-auto px-4 lg:px-10 py-12 max-w-[1500px]">
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter photos by category">
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
          <p className="text-center text-gray-500 py-20">No photos yet.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12">
            {shown.map((photo, index) => (
              <li key={photo.id}>
                <Polaroid photo={photo} index={index} variant="grid" onOpen={() => setOpen(index)} />
              </li>
            ))}
          </ul>
        )}

        {filtered.length > shown.length && (
          <div className="text-center mt-14">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-[#C39223] transition-colors"
            >
              Show more photos
            </button>
          </div>
        )}
      </main>

      <Footer />
      <PhotoLightbox photos={shown} index={open} onChange={onChange} />
    </div>
  );
}
