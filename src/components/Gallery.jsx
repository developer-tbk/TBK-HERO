import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const { galleryImages } = useData();

  // If no images have been uploaded/saved yet, we render a silent divider,
  // but since we pre-populate with 3 gorgeous high-quality default images,
  // it will always look premium!
  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section
      id="gallery"
      className="py-24 px-6 md:px-8 bg-surface-lowest border-b border-outline-variant/20 relative overflow-hidden"
    >
      {/* Dynamic Gold Light Flares */}
      <div className="absolute top-1/3 -right-32 w-[350px] h-[350px] rounded-full bg-primary/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[350px] h-[350px] rounded-full bg-secondary/3 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-xs text-secondary font-bold uppercase tracking-[0.25em]">
            <Sparkles size={12} className="animate-pulse" /> Gallery Showcase
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-white font-semibold leading-tight">
            Visual Splendour of TBK
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="font-body text-base text-on-surface-variant font-light leading-relaxed">
            Explore the world of The Bagara Kitchen and Bar-where refined interiors, secluded private dining alcoves, and authentic clay handi cooking come together to create an unforgettable dining experience.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-outline-variant/30 aspect-square sm:aspect-[4/3] md:aspect-square bg-surface shadow-lg hover:shadow-black/70 hover:border-secondary/40 transition-all duration-500"
            >
              {/* Outer frame styling */}
              <div className="absolute inset-0 border border-transparent group-hover:border-secondary/25 rounded-2xl transition-colors duration-500 z-10 pointer-events-none" />

              {/* Main Image */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-108 brightness-[0.85] group-hover:brightness-[0.9]"
                  loading="lazy"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Text Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] text-secondary font-bold uppercase tracking-[0.2em] flex items-center gap-1 mb-1">
                  <ImageIcon size={10} /> Fine Dining Preview
                </span>
                <h3 className="font-headline text-lg md:text-xl text-white font-medium line-clamp-1">
                  {item.title}
                </h3>
                <div className="w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500 mt-2" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
