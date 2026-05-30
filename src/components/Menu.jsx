import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut,
  Maximize2, 
  Download, 
  Sparkles, 
  BookOpen, 
  Utensils, 
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';

const Menu = () => {
  const { restaurantMenuImage, banquetVegMenuImage, banquetNonVegMenuImage, contactInfo } = useData();
  const [selectedMenuType, setSelectedMenuType] = useState('restaurant'); // 'restaurant' or 'banquet'
  
  // Immersive Lightbox State
  const [lightboxImage, setLightboxImage] = useState(null); // original PDF or Image URL
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [zoomScale, setZoomScale] = useState(1);

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.75));
  };

  const resetZoom = () => {
    setZoomScale(1);
  };

  // Cleans and sanitizes Cloudinary URLs to strip any breaking attachment tags in state
  const cleanUrl = (url) => {
    if (!url) return '';
    return url.replace('/fl_attachment/', '/');
  };

  const activeResImage = cleanUrl(restaurantMenuImage);
  const activeVegImage = cleanUrl(banquetVegMenuImage);
  const activeNonVegImage = cleanUrl(banquetNonVegMenuImage);

  // Convert Cloudinary PDFs to high-quality JPG previews dynamically with pg_1 (page 1) rasterization
  const getDisplayImageUrl = (url) => {
    if (!url) return '';
    const cleaned = cleanUrl(url);
    const cleanUrlPart = cleaned.split('?')[0];
    if (cleanUrlPart.toLowerCase().endsWith('.pdf')) {
      if (cleaned.includes('res.cloudinary.com')) {
        // Cloudinary automatic PDF-to-JPG conversion preview targeting page 1 (pg_1)
        return cleaned.replace('/upload/', '/upload/pg_1/').replace(/\.pdf($|\?)/, '.jpg$1');
      }
      // Falling back to a high-end menu graphic representing both Veg & Non-Veg feast
      return 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop';
    }
    return cleaned;
  };

  // Bulletproof Direct-Download handler (bypasses new tabs/redirects entirely)
  const handleDownload = async (targetUrl, fileName = 'menu-card.pdf') => {
    if (!targetUrl) return;
    
    // Automatically clean any accidental fl_attachment in the URL
    const cleanedUrl = cleanUrl(targetUrl);
    const isPdf = cleanedUrl.toLowerCase().split('?')[0].endsWith('.pdf');
    
    if (isPdf) {
      // For PDFs, we open the clean, error-free PDF document in a new tab.
      // This lets the browser load it natively in Chrome PDF viewer where they can view/print/download it.
      window.open(cleanedUrl, '_blank');
      return;
    }
    
    // For standard images, force download via fl_attachment parameter
    if (cleanedUrl.includes('res.cloudinary.com') && cleanedUrl.includes('/upload/')) {
      const downloadUrl = cleanedUrl.replace('/upload/', '/upload/fl_attachment/');
      window.open(downloadUrl, '_self');
      return;
    }
    
    // Fallback for non-Cloudinary images: Blob fetch downloader
    try {
      const response = await fetch(cleanedUrl);
      if (!response.ok) throw new Error('Failed to fetch image.');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(cleanedUrl, '_blank');
    }
  };

  // Helper to check if a URL is a PDF
  const checkIsPdf = (url) => {
    if (!url) return false;
    return cleanUrl(url).toLowerCase().split('?')[0].endsWith('.pdf');
  };

  const isLightboxPdf = checkIsPdf(lightboxImage);

  return (
    <section 
      id="menu" 
      className="py-24 px-6 md:px-8 bg-background relative overflow-hidden"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-label text-xs text-secondary font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Traditional Deccan Gastronomy
          </span>
          <h2 className="font-headline text-4xl md:text-5xl text-white font-semibold">
            Our Culinary Documents
          </h2>
          <p className="font-body text-base text-on-surface-variant font-light leading-relaxed">
            Browse our meticulously designed menu cards detailing our slow-cooked handi signature dishes, crafted brews, and opulent banquet packages.
          </p>
        </div>

        {/* Menu Service Switcher (Restaurant vs Banquet) */}
        <div className="flex justify-center max-w-lg mx-auto p-1.5 bg-surface-low border border-outline-variant/30 rounded-2xl shadow-xl shadow-black/40">
          <button
            onClick={() => setSelectedMenuType('restaurant')}
            className={`flex-1 py-3.5 px-6 rounded-xl text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 ${
              selectedMenuType === 'restaurant'
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02] font-bold border border-secondary/30'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <Utensils size={14} className={selectedMenuType === 'restaurant' ? 'text-secondary' : 'opacity-70'} />
            Restaurant Menu
          </button>
          <button
            onClick={() => setSelectedMenuType('banquet')}
            className={`flex-1 py-3.5 px-6 rounded-xl text-xs md:text-sm font-semibold tracking-wide uppercase transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 ${
              selectedMenuType === 'banquet'
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02] font-bold border border-secondary/30'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            <BookOpen size={14} className={selectedMenuType === 'banquet' ? 'text-secondary' : 'opacity-70'} />
            Banquet Packages
          </button>
        </div>

        {/* Dynamic Menu Viewers */}
        <div className="w-full">
          {selectedMenuType === 'restaurant' ? (
            
            // VIEW 1: RESTAURANT MENU (Single Full-Width Card)
            <div className="max-w-3xl mx-auto space-y-8">
              
              <div className="bg-surface border-2 border-secondary/20 hover:border-secondary/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 relative group">
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-secondary/40 pointer-events-none" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-secondary/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-secondary/40 pointer-events-none" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-secondary/40 pointer-events-none" />

                {/* Document Display */}
                <div className="relative w-full bg-transparent flex items-center justify-center overflow-hidden">
                  <img 
                    src={getDisplayImageUrl(activeResImage || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop')} 
                    alt="Restaurant Menu Card" 
                    className="w-full h-auto select-none filter brightness-[0.97] transition-all duration-700 block animate-fadeIn"
                    loading="eager"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                  
                  {checkIsPdf(activeResImage) && (
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none select-none">
                      <span className="bg-primary/95 backdrop-blur border border-secondary text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 max-w-max">
                        <BookOpen size={12} className="text-secondary" />
                        Multi-Page PDF Menu
                      </span>
                    </div>
                  )}

                  {/* Expand Overlay */}
                  <div 
                    onClick={() => { 
                      setLightboxImage(activeResImage || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop'); 
                      setLightboxTitle("Restaurant Menu Card");
                      resetZoom(); 
                    }}
                    className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
                  >
                    <div className="p-4 bg-primary/95 border border-secondary text-white rounded-full shadow-xl transition-all duration-300 scale-90 group-hover:scale-100 hover:bg-[#b08d4b]">
                      <Maximize2 size={24} className="text-secondary" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-background/80 border border-outline-variant/20 px-3 py-1 rounded-full">
                      Click to Expand & Zoom
                    </span>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="bg-surface-low border-t border-outline-variant/30 p-4 md:p-6 flex flex-wrap gap-4 items-center justify-between">
                  <div className="text-xs text-on-surface-variant flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    <span>Official Restaurant A la Carte Menu</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { 
                        setLightboxImage(activeResImage || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop'); 
                        setLightboxTitle("Restaurant Menu Card");
                        resetZoom(); 
                      }}
                      className="bg-surface hover:bg-surface-high border border-outline-variant/40 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer duration-300"
                    >
                      <Maximize2 size={13} className="text-secondary" /> Expand View
                    </button>

                    <button
                      onClick={() => handleDownload(activeResImage || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop', 'restaurant-menu.pdf')}
                      className="bg-primary hover:bg-[#b08d4b] border border-secondary/30 text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:scale-105 transition-all shadow-md shadow-primary/10 cursor-pointer duration-300"
                    >
                      <Download size={13} /> {checkIsPdf(activeResImage) ? 'Download PDF' : 'Download Menu'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center pt-4 space-y-4">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">
                  Craving our Nizami delicacies? Order online now:
                </p>
                <div className="flex justify-center gap-5 items-center flex-wrap">
                  <a 
                    href={contactInfo.swiggy || 'https://swiggy.com'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#FF5200] hover:bg-[#E04800] text-white px-7 py-3 rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs font-bold shadow-md shadow-[#FF5200]/15"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="5" fill="#FF5200"/>
                      <path d="M12.43 5.48c.36 0 .7.1.98.28.28.18.49.44.62.74.13.3.17.64.12.98a1.98 1.98 0 0 1-.58 1.25l-.83.83-.02.02a.88.88 0 0 0-.25.62v2.24c0 .35-.14.68-.38.93a1.3 1.3 0 0 1-.92.38c-.35 0-.68-.14-.93-.38a1.3 1.3 0 0 1-.38-.92v-2.24c0-.35.14-.68.38-.93l.83-.83c.25-.25.38-.58.38-.93 0-.35-.14-.68-.38-.93a1.3 1.3 0 0 1-.38-.92c0-.35.14-.68.38-.93l.01-.01c.25-.25.58-.38.92-.38zm-.9 2.51c.31.06.63.1.95.1 1.48 0 2.8-.7 3.65-1.78l.02-.02.02-.02c.48-.61.76-1.38.76-2.21 0-.9-.33-1.75-.9-2.42l.23-.23.01-.01c.21-.21.21-.55 0-.76a.54.54 0 0 0-.76 0l-.23.23a4.67 4.67 0 0 0-2.93-1.04c-1.29 0-2.45.52-3.3 1.36h-.01c-.9.9-1.4 2.14-1.4 3.42 0 .83.22 1.6.61 2.27l.02.02-.01.01-.21.21a.54.54 0 0 0 0 .76c.21.21.55.21.76 0l.21-.21c.64.44.72 2.22.77l.01.02.08.01zm.9 3.51c.64 0 1.25.17 1.8.46l.03.02.04.03c.89.54 1.43 1.5 1.43 2.53 0 .92-.37 1.76-.98 2.37l-.02.02a3.34 3.34 0 0 1-2.37.98c-1.95 0-3.52-1.57-3.52-3.52 0-.26.03-.52.09-.76l-.01-.04a3.52 3.52 0 0 1 3.52-3.12z" fill="white"/>
                    </svg>
                    Order via Swiggy
                  </a>
                  <a 
                    href={contactInfo.zomato || 'https://zomato.com'} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-[#CB202D] hover:bg-[#B01C27] text-white px-7 py-3 rounded-xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-xs font-bold shadow-md shadow-[#CB202D]/15"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    Order via Zomato
                  </a>
                </div>
              </div>

            </div>
          ) : (
            
            // VIEW 2: BANQUET MENUS (Split Veg and Non-Veg Side-by-Side Cards)
            <div className="max-w-5xl mx-auto space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 2A: VEGETARIAN BANQUET CARD */}
                <div className="bg-surface border-2 border-emerald-500/10 hover:border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between group relative">
                  {/* Corner Accent details - Emerald green motif */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-emerald-500/30 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-emerald-500/30 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-emerald-500/30 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-emerald-500/30 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="p-5 md:p-6 bg-surface-low/50 border-b border-outline-variant/15 flex justify-between items-center">
                      <div>
                        <h3 className="font-headline text-lg text-white font-bold flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
                          Vegetarian Banquet
                        </h3>
                        <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Pure Vegetarian Gastronomy</p>
                      </div>
                      {checkIsPdf(activeVegImage) && (
                        <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">PDF</span>
                      )}
                    </div>

                    {/* Image Document viewer */}
                    <div className="relative w-full bg-transparent flex items-center justify-center overflow-hidden">
                      <img 
                        src={getDisplayImageUrl(activeVegImage || 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop')} 
                        alt="Vegetarian Banquet Menu" 
                        className="w-full h-auto select-none filter brightness-[0.97] transition-all duration-700 block animate-fadeIn"
                        loading="eager"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop';
                        }}
                      />
                      
                      {/* Expand Overlay */}
                      <div 
                        onClick={() => { 
                          setLightboxImage(activeVegImage || 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop'); 
                          setLightboxTitle("Vegetarian Banquet Menu");
                          resetZoom(); 
                        }}
                        className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
                      >
                        <div className="p-4 bg-emerald-600/90 border border-emerald-400 text-white rounded-full shadow-xl transition-all duration-300 scale-90 group-hover:scale-100 hover:bg-emerald-500">
                          <Maximize2 size={20} className="text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-emerald-950/90 border border-emerald-500/30 px-3 py-1 rounded-full">
                          Expand Veg Menu
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Controls */}
                  <div className="bg-surface-low border-t border-outline-variant/15 p-4 flex items-center justify-between mt-4">
                    <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Veg Menu
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => { 
                          setLightboxImage(activeVegImage || 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop'); 
                          setLightboxTitle("Vegetarian Banquet Menu");
                          resetZoom(); 
                        }}
                        className="p-2 bg-surface hover:bg-surface-high border border-outline-variant/35 rounded-lg text-on-surface-variant hover:text-white transition-all cursor-pointer"
                        title="Expand View"
                      >
                        <Maximize2 size={12} />
                      </button>

                      <button
                        onClick={() => handleDownload(activeVegImage || 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop', 'veg-banquet-menu.pdf')}
                        className="bg-emerald-950 border border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Download size={11} /> {checkIsPdf(activeVegImage) ? 'Download PDF' : 'Download'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2B: NON-VEGETARIAN BANQUET CARD */}
                <div className="bg-surface border-2 border-rose-500/10 hover:border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between group relative">
                  {/* Corner Accent details - Rose red motif */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-rose-500/30 pointer-events-none" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-rose-500/30 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-rose-500/30 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-rose-500/30 pointer-events-none" />

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="p-5 md:p-6 bg-surface-low/50 border-b border-outline-variant/15 flex justify-between items-center">
                      <div>
                        <h3 className="font-headline text-lg text-white font-bold flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm" />
                          Non-Vegetarian Banquet
                        </h3>
                        <p className="text-[10px] text-on-surface-variant font-light mt-0.5">Royal Nizami Feasts</p>
                      </div>
                      {checkIsPdf(activeNonVegImage) && (
                        <span className="bg-rose-950/80 border border-rose-500/40 text-rose-400 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">PDF</span>
                      )}
                    </div>

                    {/* Image Document viewer */}
                    <div className="relative w-full bg-transparent flex items-center justify-center overflow-hidden">
                      <img 
                        src={getDisplayImageUrl(activeNonVegImage || 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop')} 
                        alt="Non-Vegetarian Banquet Menu" 
                        className="w-full h-auto select-none filter brightness-[0.97] transition-all duration-700 block animate-fadeIn"
                        loading="eager"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop';
                        }}
                      />
                      
                      {/* Expand Overlay */}
                      <div 
                        onClick={() => { 
                          setLightboxImage(activeNonVegImage || 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop'); 
                          setLightboxTitle("Non-Vegetarian Banquet Menu");
                          resetZoom(); 
                        }}
                        className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer"
                      >
                        <div className="p-4 bg-rose-600/90 border border-rose-400 text-white rounded-full shadow-xl transition-all duration-300 scale-90 group-hover:scale-100 hover:bg-rose-500">
                          <Maximize2 size={20} className="text-white" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest bg-rose-950/90 border border-rose-500/30 px-3 py-1 rounded-full">
                          Expand Non-Veg Menu
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Controls */}
                  <div className="bg-surface-low border-t border-outline-variant/15 p-4 flex items-center justify-between mt-4">
                    <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" /> Non-Veg Menu
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => { 
                          setLightboxImage(activeNonVegImage || 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop'); 
                          setLightboxTitle("Non-Vegetarian Banquet Menu");
                          resetZoom(); 
                        }}
                        className="p-2 bg-surface hover:bg-surface-high border border-outline-variant/35 rounded-lg text-on-surface-variant hover:text-white transition-all cursor-pointer"
                        title="Expand View"
                      >
                        <Maximize2 size={12} />
                      </button>

                      <button
                        onClick={() => handleDownload(activeNonVegImage || 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop', 'non-veg-banquet-menu.pdf')}
                        className="bg-rose-950 border border-rose-600 text-rose-400 hover:bg-rose-600 hover:text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Download size={11} /> {checkIsPdf(activeNonVegImage) ? 'Download PDF' : 'Download'}
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* General Banquet CTA */}
              <div className="text-center pt-6 space-y-4">
                <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">
                  Organizing a grand celebration or corporate feast?
                </p>
                <a 
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector('#contact');
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-[#b08d4b] border border-secondary/30 text-white font-bold py-3.5 px-8 rounded-xl text-xs hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/15 cursor-pointer duration-300"
                >
                  Inquire Banquet Booking <ArrowRight size={13} className="text-secondary" />
                </a>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* FULLSCREEN IMMERSIVE LIGHTBOX EXPLORER (With Interactive Zoom Controls) */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4"
          >
            {/* Top Bar Controls */}
            <div className="w-full flex items-center justify-between p-2 md:p-4 text-white z-10">
              <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-on-surface-variant flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                {lightboxTitle}
                {isLightboxPdf && <span className="text-secondary ml-1 font-bold">(PDF File)</span>}
              </span>

              {/* Action Toolbar */}
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 0.75}
                  className="p-2.5 bg-surface border border-outline-variant/35 rounded-full hover:bg-surface-high hover:border-secondary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} className="text-white" />
                </button>
                
                <span className="text-xs font-mono select-none w-10 text-center text-on-surface-variant font-bold">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 2.5}
                  className="p-2.5 bg-surface border border-outline-variant/35 rounded-full hover:bg-surface-high hover:border-secondary transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} className="text-white" />
                </button>

                <button
                  onClick={resetZoom}
                  disabled={zoomScale === 1}
                  className="px-3.5 py-2 bg-surface border border-outline-variant/35 rounded-xl hover:bg-surface-high hover:border-secondary transition-all text-xs font-bold disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Reset Zoom"
                >
                  Reset
                </button>

                <button
                  onClick={() => handleDownload(lightboxImage, `${lightboxTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`)}
                  className="p-2.5 bg-primary/20 hover:bg-primary border border-secondary/40 text-secondary hover:text-white rounded-full transition-all cursor-pointer"
                  title={isLightboxPdf ? "Open Full PDF Document" : "Download Image"}
                >
                  <Download size={16} />
                </button>

                <div className="w-px h-6 bg-outline-variant/40 mx-1 md:mx-2" />

                <button
                  onClick={() => setLightboxImage(null)}
                  className="p-2.5 bg-red-950/20 hover:bg-red-950 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white rounded-full transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Immersive Scrollable Image Frame */}
            <div className="flex-grow w-full flex flex-col items-center justify-center overflow-auto p-4 relative">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-full max-w-full flex items-center justify-center relative"
                style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center', transition: 'transform 0.15s ease-out' }}
              >
                <img 
                  src={getDisplayImageUrl(lightboxImage)} 
                  alt="Expanded Menu card document" 
                  className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl select-none"
                  onError={(e) => {
                    // Fail-safe fallback in lightbox
                    if (lightboxTitle.includes('Veg')) {
                      e.target.src = 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop';
                    } else if (lightboxTitle.includes('Non')) {
                      e.target.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop';
                    } else {
                      e.target.src = 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop';
                    }
                  }}
                />
              </motion.div>
              
              {/* Direct Full-Screen PDF link inside Lightbox */}
              {isLightboxPdf && (
                <div className="mt-6 z-10">
                  <button
                    onClick={() => handleDownload(lightboxImage, `${lightboxTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`)}
                    className="bg-primary hover:bg-[#b08d4b] border border-secondary text-white text-xs font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <ExternalLink size={14} /> Open Full Multi-Page PDF Document ({lightboxTitle})
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Footer Notice */}
            <div className="w-full text-center p-2 text-[10px] text-on-surface-variant font-light uppercase tracking-widest z-10 select-none">
              Pinch / Scroll to explore details. Click 'Close' or press Escape to return.
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Menu;
