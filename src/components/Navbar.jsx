import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

const Navbar = ({ onBookClick, onLoginClick, onDashboardClick }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      setIsOpen(false); // Dismiss mobile navigation on scroll events
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Banquet Hall', href: '#banquet' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Adjust for sticky nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-outline-variant/30 py-3 shadow-lg shadow-black/30' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 font-headline text-xl md:text-2xl font-bold text-primary tracking-wide transition-all duration-300 hover:brightness-110 active:scale-95"
          >
            <Logo className="w-8 h-8 md:w-9 md:h-9 flex-shrink-0" />
            <span className="text-primary font-bold font-headline text-sm min-[360px]:text-[15px] min-[400px]:text-base sm:text-xl md:text-2xl tracking-wide leading-tight flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5">
              <span>The Bagara Kitchen</span>
              <span className="text-[10px] min-[360px]:text-[11px] sm:text-lg text-primary/85 font-sans font-semibold tracking-normal uppercase sm:normal-case mt-[-3px] sm:mt-0">and Bar</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-on-surface-variant hover:text-primary font-medium text-sm tracking-wide transition-colors duration-300 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            
            {/* Dashboard Redirect or Login trigger */}
            {user ? (
              <a
                href="#dashboard"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); onDashboardClick(); }}
                className="text-primary hover:brightness-115 font-semibold text-sm tracking-wide transition-all relative group py-1 uppercase"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
              </a>
            ) : (
              <a
                href="#login"
                onClick={(e) => { e.preventDefault(); setIsOpen(false); onLoginClick(); }}
                className="text-on-surface-variant hover:text-primary font-medium text-sm tracking-wide transition-colors duration-300 relative group py-1"
              >
                Staff Portal
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )}
            
            <button 
              onClick={onBookClick}
              className="bg-primary hover:bg-primary-container text-white hover:text-on-primary-container font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 duration-300"
            >
              <Calendar size={16} />
              Book Now
            </button>
          </div>

          {/* Mobile Hamburguer Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary focus:outline-none p-1 transition-transform duration-200 active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Glassmorphic Backdrop for Click-Outside Dismissals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[60px] z-40 md:hidden bg-[#001c16]/98 backdrop-blur-lg border-b border-outline-variant/30 py-6 px-6 flex flex-col gap-5 shadow-2xl shadow-black/80"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg text-on-surface-variant hover:text-primary font-medium tracking-wide py-2 border-b border-outline-variant/10 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                {user ? (
                  <a
                    href="#dashboard"
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); onDashboardClick(); }}
                    className="text-lg text-primary font-bold tracking-wide py-2 border-b border-outline-variant/10"
                  >
                    DASHBOARD CONTROL
                  </a>
                ) : (
                  <a
                    href="#login"
                    onClick={(e) => { e.preventDefault(); setIsOpen(false); onLoginClick(); }}
                    className="text-lg text-on-surface-variant hover:text-primary font-medium tracking-wide py-2 border-b border-outline-variant/10 transition-colors"
                  >
                    STAFF PORTAL
                  </a>
                )}
              </div>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="w-full bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <Calendar size={18} />
                Book Now
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
