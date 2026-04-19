import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AbstractShapes } from './AbstractShapes';
import { getGalleryImages } from '../utils/adminStorage';
import outreachImage from 'figma:asset/4e976b786b3c9210027aa1f4ae29bade1c41bf84.png';
import easterImage from 'figma:asset/8699283214e5eb50bfc25cdcc553639e00d46e71.png';
import menteesImage from 'figma:asset/0c51c6d1634fdbf9c1e8ba2151c2dc75ca70aab9.png';
import easterOutreach2 from 'figma:asset/42be2c9f2d3fbc59a4c12d000474a2feeacde27e.png';
import stBalikudembeStudents from 'figma:asset/82cd7a56e33baae87fcbeea52ca9768829fe6f9c.png';
import stBalikudembeSession from 'figma:asset/063bf2501bf926301a229a559a409b1d81accced.png';

export function GallerySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const storedImages = getGalleryImages();
    console.log('📸 Gallery: Loading images from storage...', storedImages.length, 'images found');
    setImages(storedImages);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Calculate which images to show (current + 2 more for desktop, current + 1 for tablet)
  const getVisibleImages = () => {
    if (images.length === 0) return [];
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(images[(currentIndex + i) % images.length]);
    }
    return visible;
  };

  const visibleImages = getVisibleImages();

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
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
              <span className="text-[#C39223] uppercase tracking-widest text-sm">Our Journey</span>
              <div className="h-1 w-20 bg-[#C39223] mt-2 mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-black">Gallery</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Capturing moments of transformation, growth, and community impact.
              </p>
            </motion.div>
          </div>

          {/* Carousel Content */}
          {images.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No gallery images available yet.</p>
              <p className="text-gray-400 text-sm mt-2">Images will appear here once uploaded by the administrator.</p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
              >
                {visibleImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={image.caption || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        console.error('Failed to load image:', image.url);
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      {image.caption && <p className="text-white">{image.caption}</p>}
                      <span className="text-[#C39223] text-sm">{image.category}</span>
                    </div>

                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border-4 border-[#C39223] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation Arrows */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  className="bg-[#C39223] text-white hover:bg-[#b08520] p-3 rounded-full transition-all hover:scale-110"
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="bg-[#C39223] text-white hover:bg-[#b08520] p-3 rounded-full transition-all hover:scale-110"
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-[#C39223] w-8' : 'bg-gray-400'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && visibleImages[selectedImage] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#C39223] transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} />
          </button>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="max-w-5xl w-full"
          >
            <img
              src={visibleImages[selectedImage].url}
              alt="Gallery Image"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            {visibleImages[selectedImage].caption && (
              <p className="text-white text-center mt-4 text-lg">{visibleImages[selectedImage].caption}</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
