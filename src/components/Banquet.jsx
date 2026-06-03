import React from 'react';
import { motion } from 'framer-motion';
import { Users, Utensils, Music, CalendarDays } from 'lucide-react';
import { useData } from '../context/DataContext';

const Banquet = ({ onOpenBooking }) => {
  const { galleryImages } = useData();
  const banquetImage = galleryImages?.find(img => img.type === 'banquet hall');
  const displayImageSrc = banquetImage?.image || '/banquet.png';
  const displayImageTitle = banquetImage?.title || 'Luxury Imperial Seating';

  const features = [
    {
      icon: <Users className="text-secondary w-8 h-8" />,
      title: "200+ Guests",
      description: "Flexible, spacious seating arrangements tailored perfectly to accommodate both intimate gatherings and grand celebrations."
    },
    {
      icon: <Utensils className="text-secondary w-8 h-8" />,
      title: "Customized Catering",
      description: "Bespoke menus ranging from our legendary authentic clay-pot biryanis to sophisticated global fusion hors d'oeuvres."
    },
    {
      icon: <Music className="text-secondary w-8 h-8" />,
      title: "Full Tech Suite",
      description: "State-of-the-art integrated sound, professional ambient lighting systems, and projection systems included in every booking."
    }
  ];

  return (
    <section 
      id="banquet" 
      className="py-24 px-6 md:px-8 bg-surface border-b border-outline-variant/20 relative overflow-hidden"
    >
      {/* Visual Dot Grid Canvas Backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Text and Features List */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 text-xs text-secondary font-bold uppercase tracking-[0.25em]">
              Premium Gatherings
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-white font-semibold leading-tight">
              Exquisite Banquet Hall
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-2xl">
              Host your most memorable celebrations in an atmosphere of unparalleled elegance. Our grand heritage banquet hall merges classical Deccan royalty with state-of-the-art modern amenities.
            </p>
          </div>

          {/* Cards list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-surface-low border border-outline-variant/20 rounded-xl hover:border-secondary/30 transition-colors duration-300"
              >
                <div className="mb-4">{feat.icon}</div>
                <h3 className="font-headline text-lg text-white font-medium mb-2">{feat.title}</h3>
                <p className="text-on-surface-variant font-body text-xs leading-relaxed font-light">{feat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-2">
            <button 
              onClick={onOpenBooking}
              className="bg-primary hover:bg-[#059669] text-white px-10 py-4.5 rounded-xl font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25 flex items-center gap-3 duration-300"
            >
              <CalendarDays size={20} />
              Book Your Event Now
            </button>
          </div>
        </div>

        {/* Right Side: Showcase Luxury Seating Photo */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative group"
        >
          {/* Decorative outer gold frame */}
          <div className="absolute -inset-2.5 rounded-2xl border border-secondary/20 group-hover:border-secondary/40 transition-colors duration-500 pointer-events-none" />
          
          {/* Luxury Seating Photo from screens */}
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl shadow-black/80 border border-outline-variant/30">
            <img 
              src={displayImageSrc} 
              alt="Luxury Banquet Seating Setup" 
              className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            />
            
            {/* Dark gradient fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 pointer-events-none" />
            
            {/* Details floating tag */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.25em]">Exclusive Preview</span>
              <h4 className="text-white font-headline text-xl font-medium mt-1">{displayImageTitle}</h4>
              <p className="text-on-surface-variant text-xs font-light mt-1">Authentic velvet ochre upholstery and gold cutlery accents.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Banquet;
