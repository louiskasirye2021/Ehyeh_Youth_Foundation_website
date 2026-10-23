import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCallback, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { Doodles, Polaroid } from './Polaroid';
import { PhotoLightbox } from './PhotoLightbox';
import { sortPhotosNewestFirst, useSiteContent } from '../content/store';

/** Photos shown on the home page: 10 on larger screens, 6 on phones. */
const HOME_PHOTOS = 10;
const HOME_PHOTOS_PHONE = 6;

export function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { gallery, gallerySection } = useSiteContent().content;
  const photos = useMemo(() => sortPhotosNewestFirst(gallery.filter((p) => p.url)), [gallery]);
  const shown = photos.slice(0, HOME_PHOTOS);
  const [open, setOpen] = useState<number | null>(null);
  const onChange = useCallback((i: number | null) => setOpen(i), []);

  return (
    <section id="gallery" className="py-24 bg-[#FAF8F4] relative overflow-hidden">
      <AbstractShapes />

      <div className="mx-auto px-3 sm:px-6 lg:px-12 max-w-[1680px] relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#C39223] uppercase tracking-widest text-sm">{gallerySection.label}</span>
          <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">{gallerySection.title}</h2>
          {gallerySection.intro && <p className="text-gray-600 mt-4 max-w-2xl mx-auto">{gallerySection.intro}</p>}
        </motion.div>

        {shown.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Photos will appear here soon.</p>
        ) : (
          <div className="relative">
            {/* Doodles around the collage (larger screens) */}
            <div aria-hidden="true" className="hidden lg:block">
              {Doodles.sparkle({ className: 'absolute -top-12 right-[3%] w-12 h-12 text-[#C39223]' })}
              {Doodles.heart({ className: 'absolute top-4 left-[20.5%] w-9 h-9 text-[#C39223] z-30 rotate-[-12deg]' })}
              {Doodles.sparkle({ className: 'absolute top-[48%] left-[41%] w-10 h-10 text-[#C39223] z-30 rotate-[160deg]' })}
              {Doodles.arrow({ className: 'absolute -bottom-6 right-[16%] w-16 h-12 text-[#C39223] z-30' })}
            </div>

            <motion.ul
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-8 sm:gap-x-5 lg:gap-x-0 lg:gap-y-14 lg:pb-8"
            >
              {shown.map((photo, index) => (
                <li
                  key={photo.id}
                  className={`relative lg:-mx-5 ${index % 5 === 0 ? 'lg:ml-0' : ''} ${index % 5 === 4 ? 'lg:mr-0' : ''} hover:!z-[40] focus-within:!z-[40] ${index >= HOME_PHOTOS_PHONE ? 'hidden sm:block' : ''}`}
                  style={{ zIndex: 20 - index }}
                >
                  <Polaroid photo={photo} index={index} onOpen={() => setOpen(index)} />
                </li>
              ))}
            </motion.ul>
          </div>
        )}

        {photos.length > HOME_PHOTOS_PHONE && (
          <div className="text-center mt-14">
            <a
              href="#/gallery"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-[#C39223] transition-colors"
            >
              View all photos
              <ArrowRight size={18} />
            </a>
            <p className="text-sm text-gray-500 mt-3">{photos.length} photos</p>
          </div>
        )}
      </div>

      <PhotoLightbox photos={shown} index={open} onChange={onChange} />
    </section>
  );
}
