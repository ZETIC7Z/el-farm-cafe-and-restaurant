import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BookOpen, Calendar, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import restoData from '../data/restoData.json';

interface NavbarProps {
  onOpenReserve: (prefillItem?: string) => void;
  onOpenMenuBoards: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve, onOpenMenuBoards }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnetic({ x: x * 0.25, y: y * 0.25 });
  };

  const resetMagnetic = () => setMagnetic({ x: 0, y: 0 });

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Resto View', href: '#resto-view' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Guests', href: '#guests' },
    { label: 'Visit Us', href: '#visit' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-espresso-950/85 backdrop-blur-xl border-b border-gold-500/20 shadow-glass'
          : 'py-5 bg-gradient-to-b from-espresso-950/90 via-espresso-950/45 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-3.5 group focus:outline-none"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-gold-600 via-gold-300 to-gold-500 shadow-gold-glow overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src={restoData.restaurant.branding.logo}
              alt={restoData.restaurant.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-parchment-50 group-hover:text-gold-300 transition-colors">
                EL FARM
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-sage-600/40 text-parchment-100 border border-sage-400/30">
                Lamitan City
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400/90">
              Café &amp; Resto · Pickleball
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-espresso-900/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-500/20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-parchment-100/85 hover:text-gold-300 hover:bg-gold-500/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenMenuBoards}
            className="px-3.5 py-1.5 ml-1 rounded-full text-xs font-mono uppercase tracking-wider text-gold-300 bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Menu Boards
          </button>
        </nav>

        {/* Magnetic CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <motion.button
            ref={btnRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetMagnetic}
            onClick={() => onOpenReserve()}
            animate={{ x: magnetic.x, y: magnetic.y }}
            transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
            className="relative group overflow-hidden rounded-full px-5 py-2.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-espresso-950 font-semibold text-sm shadow-gold-glow flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            <MapPin className="w-4 h-4 text-espresso-950 transition-transform group-hover:scale-110" />
            <span>Find Us / Reserve</span>
            <Sparkles className="w-3.5 h-3.5 text-espresso-900/80" />
          </motion.button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
          className="lg:hidden p-2.5 rounded-full bg-espresso-900/80 border border-gold-500/30 text-parchment-100 hover:text-gold-300"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-espresso-950/95 backdrop-blur-2xl border-b border-gold-500/20 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2.5 px-4 rounded-xl text-base font-medium text-parchment-100 hover:bg-gold-500/10 hover:text-gold-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenMenuBoards();
                }}
                className="py-2.5 px-4 rounded-xl text-left text-sm font-mono uppercase tracking-wider text-gold-300 bg-gold-500/10 border border-gold-500/25 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                View 7 Official Menu Boards
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenReserve();
                }}
                className="mt-2 py-3 px-5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 font-bold text-center flex items-center justify-center gap-2 shadow-gold-glow"
              >
                <Calendar className="w-4 h-4" />
                Find Us / Pre-Order &amp; Reserve
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
