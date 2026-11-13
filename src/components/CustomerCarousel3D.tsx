import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Pause,
  Play,
  ExternalLink,
  Heart,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
} from 'lucide-react';
import restoData from '../data/restoData.json';
import { CustomerMoment } from '../types/resto';

export const CustomerCarousel3D: React.FC = () => {
  const [moments, setMoments] = useState<CustomerMoment[]>(restoData.customerMoments);
  const [rotation, setRotation] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<CustomerMoment | null>(null);
  const [shuffleCount, setShuffleCount] = useState<number>(0);

  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startRotationRef = useRef<number>(0);

  // Show 10 cards in the 3D cylinder at a time (all 16 rotate through when shuffled or via grid below)
  const cylinderCards = moments.slice(0, 10);
  const cardCount = cylinderCards.length;
  const angleStep = 360 / cardCount;
  // Radius of 3D cylinder
  const radius = 460;

  // Continuous smooth 3D rotation loop
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (!isPaused && !isDraggingRef.current && !selectedMoment) {
        setRotation((prev) => (prev - 0.16) % 360);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, selectedMoment]);

  const handleShuffleMoments = useCallback(() => {
    const copy = [...moments];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setMoments(copy);
    setShuffleCount((c) => c + 1);
    setRotation((prev) => prev - 72);
  }, [moments]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startRotationRef.current = rotation;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    setRotation(startRotationRef.current + deltaX * 0.35);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="guests"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-espresso-950 via-espresso-900 to-espresso-950 overflow-hidden border-t border-gold-500/15"
    >
      {/* Ambient Gold Spotlight */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[420px] rounded-full bg-gold-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>04 / Community &amp; Celebrations · 16 Candid Moments</span>
            </div>
            <p className="font-script text-3xl sm:text-4xl text-gold-400 -mb-1">
              Good Food. Great Company. Meaningful Moments.
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-50">
              Happy Faces at <span className="italic font-normal text-gold-300">El Farm</span>
            </h2>
          </div>

          {/* Interactive Controls: Shuffle / Randomize + Pause/Play + Facebook Page Link */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShuffleMoments}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 font-bold text-xs sm:text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all"
            >
              <Shuffle className="w-4 h-4" />
              <span>Shuffle / Randomize Moments</span>
            </motion.button>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-espresso-900/85 border border-gold-500/30 text-parchment-100 hover:border-gold-400 text-xs font-mono uppercase tracking-wider transition-all"
            >
              {isPaused ? <Play className="w-4 h-4 text-gold-400" /> : <Pause className="w-4 h-4 text-gold-400" />}
              <span>{isPaused ? 'Resume 3D Spin' : 'Pause Spin'}</span>
            </button>

            <a
              href={restoData.restaurant.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-espresso-900/85 border border-gold-500/30 text-gold-300 hover:bg-gold-500/15 text-xs font-mono uppercase tracking-wider transition-all"
            >
              <span>Facebook Community</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3D Cylindrical Curved Carousel Stage */}
        <div
          id="guests-stage"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredCard(null);
          }}
          className="relative h-[430px] sm:h-[480px] w-full flex items-center justify-center perspective-2000 cursor-grab active:cursor-grabbing select-none my-4"
        >
          <div
            key={shuffleCount}
            style={{
              transform: `translateZ(-260px) rotateY(${rotation}deg)`,
              transition: isDraggingRef.current ? 'none' : 'transform 0.12s linear',
            }}
            className="relative w-[260px] sm:w-[300px] h-[340px] sm:h-[380px] preserve-3d"
          >
            {cylinderCards.map((moment, idx) => {
              const cardAngle = idx * angleStep;
              const isHovered = hoveredCard === moment.id;
              return (
                <div
                  key={moment.id}
                  onMouseEnter={() => setHoveredCard(moment.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedMoment(moment)}
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) ${
                      isHovered ? 'scale3d(1.09, 1.09, 1.09)' : 'scale3d(1, 1, 1)'
                    }`,
                    transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  className="absolute inset-0 rounded-3xl overflow-hidden bg-espresso-900 border-2 border-gold-500/40 hover:border-gold-300 shadow-parchment cursor-pointer group"
                >
                  <img
                    src={moment.image}
                    alt={moment.title}
                    draggable={false}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/25 to-transparent opacity-90" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-espresso-950/85 backdrop-blur-md border border-gold-500/40 text-[10px] font-mono uppercase tracking-wider text-gold-300">
                      {moment.tag}
                    </span>
                    <span className="p-1.5 rounded-full bg-gold-500/90 text-espresso-950">
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-parchment-50 leading-snug">
                      {moment.title}
                    </h3>
                    <p className="mt-1 text-xs text-parchment-200/85 line-clamp-2">
                      {moment.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Manual Step Buttons */}
          <button
            onClick={() => setRotation((r) => r + angleStep)}
            aria-label="Rotate Left"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-espresso-950/85 hover:bg-gold-500 text-parchment-50 hover:text-espresso-950 border border-gold-500/40 shadow-lg transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setRotation((r) => r - angleStep)}
            aria-label="Rotate Right"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-espresso-950/85 hover:bg-gold-500 text-parchment-50 hover:text-espresso-950 border border-gold-500/40 shadow-lg transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-xs font-mono uppercase tracking-widest text-gold-400/80 mt-2">
          Drag horizontally to spin the 3D cylinder · Hover any card to pause &amp; zoom · Click to inspect moment
        </p>

        {/* Quick Thumbnail Strip of All 16 Moments */}
        <div className="mt-10 grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {moments.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMoment(m)}
              className="group relative rounded-2xl overflow-hidden aspect-square border border-gold-500/25 hover:border-gold-400 transition-all hover:-translate-y-1"
            >
              <img
                src={m.image}
                alt={m.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-espresso-950/30 group-hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Customer Moment Lightbox Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 z-50 bg-espresso-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-espresso-900 border border-gold-500/40 shadow-2xl"
            >
              <div className="relative max-h-[68vh] bg-espresso-950 flex items-center justify-center">
                <img
                  src={selectedMoment.image}
                  alt={selectedMoment.title}
                  className="max-h-[68vh] w-auto object-contain"
                />
                <button
                  onClick={() => setSelectedMoment(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-espresso-950/85 text-parchment-50 hover:bg-gold-500 hover:text-espresso-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/35 text-xs font-mono uppercase tracking-wider text-gold-300 mb-2">
                    {selectedMoment.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-50">
                    {selectedMoment.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-parchment-200/85">{selectedMoment.caption}</p>
                </div>
                <a
                  href={selectedMoment.fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-espresso-950 font-bold text-xs uppercase tracking-wider"
                >
                  <span>View on Facebook</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
