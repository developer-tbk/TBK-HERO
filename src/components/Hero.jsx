import React from 'react';
import { motion } from 'framer-motion';
import BubbleParticles from './BubbleParticles';
import { useData } from '../context/DataContext';

const Hero = ({ onOrderClick }) => {
  const { contactInfo } = useData();
  return (
    <header 
      id="home" 
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background pt-20"
    >
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Authentic Hyderabadi Chicken Biryani and Premium Craft Beer" 
          className="w-full h-full object-cover brightness-[0.35] contrast-[1.05] scale-[1.02]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9zGOQ6baLK1zUAk7S0ggm8PZyqzPYgUzXibKW9g8Mvbhf-NCLDmyx8GKaqaZN6TToPx6L0mRZpK5T5zVLwyEFKL422YmAVL7DeTscNdzlmLLHI6y00p33Dio8AJFU3vAkFNcS0w_rxRT1P_ewT_ca8q8h3VuZdT7EHsCAA0PjZgdKytQwL77b5ZlqWs1tvOnYrWEZUf_Uxh6kvI4sYXG9eC7XlgpPQBPwlMUH-SyXIROKXzDqLLbUwrJzDEOgEUy7Y-e_TDEdGuU"
        />
        
        {/* HTML5 Canvas Effervescent Particles Positioned exactly over the craft beer glass on the right */}
        <div className="hidden sm:block absolute sm:right-[10%] md:right-[15%] lg:right-[20%] top-[35%] w-32 h-[350px] z-10 pointer-events-none">
          <BubbleParticles />
        </div>

        {/* Ambient Warm Candle-like Glow behind beer region */}
        <div className="hidden sm:block absolute right-[12%] top-[45%] w-48 h-48 rounded-full bg-secondary/10 blur-[80px] z-0 pointer-events-none" />
      </div>

      {/* Hero Content Overlays */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/45 bg-primary/5 text-xs text-primary font-semibold uppercase tracking-[0.25em] mb-2">
            The Royalty of Deccan Taste
          </span>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] font-bold">
            The Bagara Kitchen <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
              and Bar
            </span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-body text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto opacity-95 leading-relaxed font-light drop-shadow-md"
        >
          An extraordinary fusion of ancestral royal recipes passed down through generations, paired with refreshing premium craft brews.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:flex-wrap items-center justify-center sm:gap-5 pt-4 w-full max-w-[480px] sm:max-w-none mx-auto"
        >
          {/* Direct Swiggy Order Button */}
          <a 
            href={contactInfo.swiggy || 'https://swiggy.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#FF5200] hover:bg-[#E04800] text-white px-2 py-3.5 sm:px-10 sm:py-4.5 text-xs sm:text-base rounded-xl flex items-center justify-center gap-1.5 sm:gap-3 transition-all hover:scale-105 active:scale-95 font-bold shadow-xl shadow-[#FF5200]/20 duration-300"
          >
            <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.034 24c-.376-.411-2.075-2.584-3.95-5.513-.547-.916-.901-1.63-.833-1.814.178-.48 3.355-.743 4.333-.308.298.132.29.307.29.409 0 .44-.022 1.619-.022 1.619a.441.441 0 1 0 .883-.002l-.005-2.939c0-.255-.278-.319-.331-.329-.511-.002-1.548-.006-2.661-.006-2.457 0-3.006.101-3.423-.172-.904-.591-2.383-4.577-2.417-6.819C3.849 4.964 5.723 2.225 8.362.868A8.13 8.13 0 0 1 12.026 0c4.177 0 7.617 3.153 8.075 7.209l.001.011c.084.981-5.321 1.189-6.39.904-.164-.044-.206-.212-.206-.284L13.5 4.996a.442.442 0 0 0-.884.002l.009 3.866a.33.33 0 0 0 .268.32l3.354-.001c1.79 0 2.542.207 3.042.588.333.254.461.739.349 1.37C18.633 16.755 12.273 23.71 12.034 24z"/>
            </svg>
            Order on Swiggy
          </a>

          {/* Direct Zomato Order Button */}
          <a 
            href={contactInfo.zomato || 'https://zomato.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#CB202D] hover:bg-[#B01C27] text-white px-2 py-3.5 sm:px-10 sm:py-4.5 text-xs sm:text-base rounded-xl flex items-center justify-center gap-1.5 sm:gap-3 transition-all hover:scale-105 active:scale-95 font-bold shadow-xl shadow-[#CB202D]/20 duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Order on Zomato
          </a>

          {/* Interactive Menu Navigation */}
          <button 
            onClick={onOrderClick}
            className="w-full sm:w-auto border border-primary text-primary hover:bg-primary/10 px-2 py-3.5 sm:px-10 sm:py-4.5 text-xs sm:text-base rounded-xl flex items-center justify-center gap-1.5 sm:gap-3 transition-all hover:scale-105 active:scale-95 font-bold shadow-xl shadow-primary/5 duration-300"
          >
            Explore Menu & Bar
          </button>

          {/* Banquet Booking Navigation */}
          <a 
            href="#banquet"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#banquet')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto border border-secondary text-secondary hover:bg-secondary/10 px-2 py-3.5 sm:px-10 sm:py-4.5 text-xs sm:text-base rounded-xl flex items-center justify-center gap-1.5 sm:gap-3 transition-all hover:scale-105 active:scale-95 font-bold duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Banquet Hall
          </a>
        </motion.div>
      </div>

      {/* Atmospheric Bottom Vignette Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
    </header>
  );
};

export default Hero;
