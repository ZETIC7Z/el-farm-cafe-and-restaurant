import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Truck, Gift, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';
import restoData from '../data/restoData.json';

interface AboutSectionProps {
  onOpenReserve: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenReserve }) => {
  const { restaurant } = restoData;

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-espresso-950 bg-grain overflow-hidden border-t border-gold-500/15"
    >
      {/* Ambient Radial Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-96 h-96 rounded-full bg-sage-600/15 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Layered Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-parchment group">
              <img
                src="/assets/resto-views/resto-2.jpg"
                alt="El Farm Cafe and Restaurant Twilight Pavilion"
                className="w-full h-[400px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-gold-500 text-espresso-950 font-bold mb-2">
                    Sitio Nipa Sanctuary
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-parchment-50">
                    The Twilight Pavilion &amp; Garden
                  </h3>
                </div>
              </div>
            </div>

            {/* Secondary Floating Card: Pickleball Court & Coconut Matcha */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-gold-500/25 h-44 group">
                <img
                  src="/assets/resto-views/resto-3.jpg"
                  alt="Outdoor Illuminated Pickleball Court"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-gold-300">
                    Outdoor Recreation
                  </div>
                  <div className="font-serif text-base font-bold text-parchment-50">
                    Floodlit Pickleball Court
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-gold-500/25 h-44 group">
                <img
                  src="/assets/menu/dish-coconut-matcha.jpg"
                  alt="Coconut Matcha Cloud in Real Buko"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3.5 right-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-sage-400">
                    Signature Creation
                  </div>
                  <div className="font-serif text-base font-bold text-parchment-50">
                    Coconut Matcha Cloud
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Brand Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Story · Brgy. Maloong Canal</span>
            </div>

            <p className="font-script text-3xl sm:text-4xl text-gold-400 mb-1">
              Good Coffee • Good Food • Better Days
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-parchment-50 leading-tight">
              “{restaurant.storyHeadline}”
            </h2>

            <p className="mt-5 text-parchment-200/85 text-base sm:text-lg leading-relaxed">
              {restaurant.storyBody}
            </p>

            {/* 4 Pillars Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {restaurant.highlights.map((item) => (
                <div
                  key={item.badge}
                  className="p-4 rounded-2xl bg-espresso-900/75 border border-gold-500/20 hover:border-gold-400/50 transition-all"
                >
                  <div className="text-[11px] font-mono uppercase tracking-widest text-gold-400 mb-1">
                    {item.badge}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-parchment-50">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-parchment-200/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Freshly Prepared & Delivery Callout Box */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-espresso-900 via-espresso-800/90 to-espresso-900 border border-gold-500/35 shadow-glass">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-gold-300 font-semibold text-sm">
                    <Clock className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>Advance Order is the Key &amp; Citywide Delivery (+₱100)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-parchment-200/80">
                    All dishes are cooked fresh upon order! Message or pre-order ahead of your visit for zero wait time, or have your Salu-Salo Bilao delivered anywhere in Lamitan City.
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-sage-400 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5 text-gold-400" />
                      Tuesday Specials: Lucky Egg Hunt!
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-400" />
                      Halal-Friendly Non-Pork Menu Available
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenReserve}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-espresso-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Truck className="w-4 h-4" />
                  <span>Pre-Order Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
