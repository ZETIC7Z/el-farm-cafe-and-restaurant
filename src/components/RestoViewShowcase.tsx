import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import restoData from '../data/restoData.json';
import { RestoView } from '../types/resto';

gsap.registerPlugin(ScrollTrigger);

export const RestoViewShowcase: React.FC = () => {
  const views: RestoView[] = restoData.restoViews;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxView, setLightboxView] = useState<RestoView | null>(null);
  const [tilt, setTilt] = useState<{ id: string; rx: number; ry: number }>({ id: '', rx: 0, ry: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.resto-parallax-card');
      cards.forEach((card, i) => {
        const img = card.querySelector('.resto-parallax-img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.18, yPercent: -8 },
            {
              scale: 1.0,
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }

        ScrollTrigger.create({
          trigger: card,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ id, rx: -y * 10, ry: x * 12 });
  };

  const handleCardMouseLeave = () => {
    setTilt({ id: '', rx: 0, ry: 0 });
  };

  const activeView = views[activeIndex] || views[0];

  return (
    <section
      id="resto-view"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-espresso-950 via-espresso-900 to-espresso-950 border-t border-gold-500/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>02 / Architectural &amp; Farm Tour</span>
            </div>
            <p className="font-script text-3xl sm:text-4xl text-gold-400 -mb-1">
              Indoor Warmth &amp; Al-Fresco Magic
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-50">
              Immersive <span className="italic font-normal text-gold-300">Resto View</span> Showcase
            </h2>
          </div>
          <p className="text-parchment-200/80 max-w-md text-sm sm:text-base">
            Scroll through our grounds in Sitio Nipa — from the iconic lighted welcome arch and timber café bar to our championship outdoor pickleball court and starlight garden tents.
          </p>
        </div>

        {/* Sticky Split-Layout Scroll Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Inspector Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 bg-espresso-950/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-parchment">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-gold-400 mb-3">
              <span>{activeView.category}</span>
              <span>
                VIEW {String(activeIndex + 1).padStart(2, '0')} / {String(views.length).padStart(2, '0')}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-espresso-800 overflow-hidden mb-6">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-sage-400"
                animate={{ width: `${((activeIndex + 1) / views.length) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeView.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-sage-400 mb-1">
                  {activeView.subtitle}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-parchment-50">
                  {activeView.title}
                </h3>
                <p className="mt-3 text-parchment-200/85 text-sm sm:text-base leading-relaxed">
                  {activeView.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick Thumbnail Chapter Selector */}
            <div className="mt-7 grid grid-cols-4 gap-2.5">
              {views.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setActiveIndex(idx);
                    const el = document.getElementById(`resto-card-${v.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all ${
                    idx === activeIndex
                      ? 'border-gold-400 scale-105 shadow-gold-glow'
                      : 'border-transparent opacity-60 hover:opacity-95'
                  }`}
                >
                  <img src={v.image} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-espresso-950/80 text-[10px] font-mono text-gold-300">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setLightboxView(activeView)}
              className="mt-6 w-full py-3 px-4 rounded-2xl bg-gold-500/15 hover:bg-gold-500/25 border border-gold-500/35 text-gold-300 text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Inspect High-Res View (0{activeIndex + 1})</span>
            </button>
          </div>

          {/* Right Scroll-Scrubbed 3D Parallax Cards */}
          <div ref={cardsContainerRef} className="lg:col-span-7 space-y-10 perspective-1200">
            {views.map((view, idx) => {
              const isTilted = tilt.id === view.id;
              return (
                <div
                  key={view.id}
                  id={`resto-card-${view.id}`}
                  onMouseMove={(e) => handleCardMouseMove(e, view.id)}
                  onMouseLeave={handleCardMouseLeave}
                  onClick={() => setLightboxView(view)}
                  style={{
                    transform: isTilted
                      ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.01, 1.01, 1.01)`
                      : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                    transition: isTilted ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                  }}
                  className="resto-parallax-card group relative rounded-3xl overflow-hidden border border-gold-500/30 bg-espresso-900 shadow-parchment cursor-pointer"
                >
                  <div className="relative h-[340px] sm:h-[460px] w-full overflow-hidden">
                    <img
                      src={view.image}
                      alt={view.title}
                      className="resto-parallax-img w-full h-full object-cover will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/20 to-transparent opacity-85" />

                    {/* Top Index & Category Pill */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                      <span className="px-3.5 py-1.5 rounded-full bg-espresso-950/80 backdrop-blur-md border border-gold-500/35 text-xs font-mono uppercase tracking-widest text-gold-300">
                        0{idx + 1} · {view.category}
                      </span>
                      <span className="p-2.5 rounded-full bg-espresso-950/80 backdrop-blur-md border border-gold-500/30 text-parchment-100 group-hover:bg-gold-500 group-hover:text-espresso-950 transition-colors">
                        <Eye className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Bottom Caption Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-xs font-mono uppercase tracking-[0.2em] text-gold-400 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {view.subtitle}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-4xl font-bold text-parchment-50">
                        {view.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-parchment-200/90 max-w-xl">
                        {view.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Resto View */}
      <AnimatePresence>
        {lightboxView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxView(null)}
            className="fixed inset-0 z-50 bg-espresso-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-espresso-900 rounded-3xl overflow-hidden border border-gold-500/40 shadow-2xl"
            >
              <div className="relative max-h-[75vh] overflow-hidden bg-espresso-950 flex items-center justify-center">
                <img
                  src={lightboxView.image}
                  alt={lightboxView.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  onClick={() => setLightboxView(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-espresso-950/85 text-parchment-50 hover:bg-gold-500 hover:text-espresso-950 border border-gold-500/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-espresso-900">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gold-400">
                    {lightboxView.subtitle}
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-parchment-50">
                    {lightboxView.title}
                  </h4>
                  <p className="text-sm text-parchment-200/80 mt-1">{lightboxView.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      const idx = views.findIndex((v) => v.id === lightboxView.id);
                      const prev = views[(idx - 1 + views.length) % views.length];
                      setLightboxView(prev);
                    }}
                    className="p-3 rounded-full bg-espresso-800 hover:bg-gold-500 hover:text-espresso-950 border border-gold-500/30 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const idx = views.findIndex((v) => v.id === lightboxView.id);
                      const next = views[(idx + 1) % views.length];
                      setLightboxView(next);
                    }}
                    className="p-3 rounded-full bg-espresso-800 hover:bg-gold-500 hover:text-espresso-950 border border-gold-500/30 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
