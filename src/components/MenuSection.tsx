import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Sparkles,
  Utensils,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ZoomIn,
  Flame,
} from 'lucide-react';
import restoData from '../data/restoData.json';
import { MenuBoard, MenuCategory, MenuItem } from '../types/resto';

interface MenuSectionProps {
  onSelectDishForOrder: (dishName: string) => void;
  menuBoardsModalOpen: boolean;
  setMenuBoardsModalOpen: (open: boolean) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDishForOrder,
  menuBoardsModalOpen,
  setMenuBoardsModalOpen,
}) => {
  const categories: MenuCategory[] = restoData.menuCategories;
  const items: MenuItem[] = restoData.menuItems;
  const boards: MenuBoard[] = restoData.menuBoards;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [activeBoardIndex, setActiveBoardIndex] = useState<number>(0);
  const [selectedDishModal, setSelectedDishModal] = useState<MenuItem | null>(null);
  const [hoveredCardTilt, setHoveredCardTilt] = useState<{ id: string; rx: number; ry: number }>({
    id: '',
    rx: 0,
    ry: 0,
  });

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesFeatured = !onlyFeatured || item.featured;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCat && matchesFeatured && matchesQuery;
    });
  }, [items, selectedCategory, onlyFeatured, searchQuery]);

  const activeCategoryObj =
    categories.find((c) => c.id === selectedCategory) || categories[0];

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHoveredCardTilt({ id, rx: -y * 12, ry: x * 14 });
  };

  const handleCardMouseLeave = () => {
    setHoveredCardTilt({ id: '', rx: 0, ry: 0 });
  };

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 bg-espresso-950 bg-grain border-t border-gold-500/15"
    >
      {/* Warm Parchment Light Accents */}
      <div className="pointer-events-none absolute top-32 left-1/2 -translate-x-1/2 w-[750px] h-[350px] rounded-full bg-gold-500/10 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Original Menu Boards CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-widest mb-4">
              <Utensils className="w-3.5 h-3.5" />
              <span>03 / Complete Extracted Menu · 45+ Offerings</span>
            </div>
            <p className="font-script text-3xl sm:text-4xl text-gold-400 -mb-1">
              Coffee • Matcha • Desserts • Good Food
            </p>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-parchment-50">
              Our Curated <span className="italic font-normal text-gold-300">Farm &amp; Café</span> Menu
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveBoardIndex(0);
                setMenuBoardsModalOpen(true);
              }}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-parchment-100 hover:bg-parchment-50 text-espresso-950 font-bold text-sm shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-espresso-800 group-hover:scale-110 transition-transform" />
              <span>View All 7 Official Menu Boards</span>
              <ZoomIn className="w-4 h-4 text-espresso-700" />
            </button>
          </div>
        </div>

        {/* Interactive Official Menu Boards Preview Strip */}
        <div className="mb-10 p-4 rounded-3xl bg-espresso-900/80 border border-gold-500/25">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Scanned Official Facebook Menu Boards (Click any board to zoom)
            </span>
            <span className="text-xs text-parchment-200/70 hidden sm:inline">
              Oat Milk Add-On +₱30 · Extra Rice ₱20 · Add Egg ₱15 · Iced Tea ₱25
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {boards.map((board, idx) => (
              <button
                key={board.id}
                onClick={() => {
                  setActiveBoardIndex(idx);
                  setMenuBoardsModalOpen(true);
                }}
                className="group relative rounded-2xl overflow-hidden border border-gold-500/30 aspect-[3/4] bg-espresso-950 hover:border-gold-400 transition-all hover:-translate-y-1 shadow-md"
              >
                <img
                  src={board.image}
                  alt={board.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/95 via-espresso-950/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <div className="text-[9px] font-mono uppercase tracking-wider text-gold-300">
                    Page 0{idx + 1}
                  </div>
                  <div className="text-xs font-serif font-bold text-parchment-50 leading-tight line-clamp-1">
                    {board.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gold-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Dirty Coffee, Tiyula Itum, Crispy Pata, Matcha..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-espresso-900/90 border border-gold-500/30 text-sm text-parchment-50 placeholder:text-parchment-200/45 focus:outline-none focus:border-gold-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-parchment-200/60 hover:text-parchment-50"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Featured Bestsellers Toggle & Count */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setOnlyFeatured(!onlyFeatured)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider border flex items-center gap-2 transition-all ${
                onlyFeatured
                  ? 'bg-gold-500 text-espresso-950 border-gold-400 font-bold shadow-gold-glow'
                  : 'bg-espresso-900/80 text-parchment-100 border-gold-500/25 hover:border-gold-400/50'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Bestsellers &amp; Signatures Only</span>
            </button>
            <span className="text-xs font-mono text-gold-300/90 px-3 py-2 rounded-full bg-espresso-900/70 border border-gold-500/20">
              {filteredItems.length} Dishes
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 shadow-gold-glow'
                    : 'bg-espresso-900/85 text-parchment-100/80 hover:text-parchment-50 border border-gold-500/20 hover:border-gold-500/45'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Active Category Subheader Banner */}
        <div className="mb-8 flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-espresso-900 via-espresso-800/80 to-espresso-900 border border-gold-500/20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
              {activeCategoryObj.label}
            </span>
            <p className="font-serif text-lg sm:text-xl italic text-parchment-100">
              “{activeCategoryObj.tagline}”
            </p>
          </div>
          {selectedCategory === 'feasts' && (
            <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-wider">
              Pre-Order Recommended
            </span>
          )}
        </div>

        {/* 3D Tilt-on-Hover Menu Grid with Framer Motion AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1200"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const isTilted = hoveredCardTilt.id === item.id;
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ duration: 0.3 }}
                  onMouseMove={(e) => handleCardMouseMove(e, item.id)}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    transform: isTilted
                      ? `rotateX(${hoveredCardTilt.rx}deg) rotateY(${hoveredCardTilt.ry}deg) translateZ(6px)`
                      : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                    transition: isTilted ? 'transform 0.08s ease-out' : 'transform 0.45s ease-out',
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-gradient-to-b from-espresso-900/95 to-espresso-950 border border-gold-500/25 hover:border-gold-400/60 shadow-parchment flex flex-col justify-between"
                >
                  <div>
                    {/* Dish Image Header */}
                    <div
                      onClick={() => setSelectedDishModal(item)}
                      className="relative h-56 w-full overflow-hidden bg-espresso-950 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/15 to-transparent" />

                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-espresso-950/90 backdrop-blur-md border border-gold-400/50 text-[10px] font-mono uppercase tracking-widest text-gold-300 font-semibold">
                          {item.badge}
                        </span>
                      )}

                      {/* Price Pill matched to El Farm Menu Boards */}
                      <div className="absolute bottom-3.5 right-3.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-espresso-950 font-serif font-bold text-xl shadow-gold-glow">
                        {item.priceDisplay}
                      </div>

                      {item.serving && (
                        <span className="absolute bottom-3.5 left-3.5 text-[11px] font-mono text-parchment-100/90 bg-espresso-950/75 backdrop-blur-sm px-2.5 py-1 rounded-full border border-parchment-100/15">
                          {item.serving}
                        </span>
                      )}
                    </div>

                    {/* Dish Details */}
                    <div className="p-6 pb-4">
                      <h3 className="font-serif text-2xl font-bold text-parchment-50 group-hover:text-gold-300 transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-parchment-200/80 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 pb-5 pt-2 flex items-center justify-between gap-2 border-t border-gold-500/10">
                    <button
                      onClick={() => setSelectedDishModal(item)}
                      className="text-xs font-mono uppercase tracking-wider text-parchment-200/70 hover:text-gold-300 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSelectDishForOrder(`${item.name} (${item.priceDisplay})`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-espresso-950 border border-gold-500/35 text-xs font-semibold transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pre-Order Dish</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-espresso-900/50 rounded-3xl border border-gold-500/20">
            <p className="font-serif text-2xl text-parchment-100">
              No menu items matched “{searchQuery}”
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyFeatured(false);
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-gold-500 text-espresso-950 font-semibold text-xs uppercase tracking-wider"
            >
              Reset Menu Filters
            </button>
          </div>
        )}
      </div>

      {/* Dish Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedDishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDishModal(null)}
            className="fixed inset-0 z-50 bg-espresso-950/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-3xl overflow-hidden bg-espresso-900 border border-gold-500/40 shadow-2xl"
            >
              <div className="relative h-72 bg-espresso-950">
                <img
                  src={selectedDishModal.image}
                  alt={selectedDishModal.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedDishModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-espresso-950/80 text-parchment-50 hover:bg-gold-500 hover:text-espresso-950"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 right-4 px-4 py-1.5 rounded-full bg-gold-500 text-espresso-950 font-serif font-bold text-2xl shadow-gold-glow">
                  {selectedDishModal.priceDisplay}
                </div>
              </div>
              <div className="p-6 sm:p-8">
                {selectedDishModal.badge && (
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/35 text-xs font-mono uppercase tracking-widest text-gold-300 mb-2">
                    {selectedDishModal.badge}
                  </span>
                )}
                <h3 className="font-serif text-3xl font-bold text-parchment-50">
                  {selectedDishModal.name}
                </h3>
                {selectedDishModal.serving && (
                  <p className="text-xs font-mono uppercase tracking-wider text-sage-400 mt-1">
                    Serving: {selectedDishModal.serving}
                  </p>
                )}
                <p className="mt-4 text-parchment-200/90 leading-relaxed">
                  {selectedDishModal.description}
                </p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedDishModal(null)}
                    className="px-5 py-2.5 rounded-full border border-gold-500/30 text-sm text-parchment-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const dish = `${selectedDishModal.name} (${selectedDishModal.priceDisplay})`;
                      setSelectedDishModal(null);
                      onSelectDishForOrder(dish);
                    }}
                    className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-espresso-950 font-bold text-sm"
                  >
                    Add to Advance Order / Inquiry
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full High-Res Official Menu Boards Lightbox Modal */}
      <AnimatePresence>
        {menuBoardsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuBoardsModalOpen(false)}
            className="fixed inset-0 z-50 bg-espresso-950/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-espresso-900 rounded-3xl overflow-hidden border border-gold-500/40 shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Top Bar */}
              <div className="px-6 py-4 bg-espresso-950 border-b border-gold-500/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                    Official Menu Board {activeBoardIndex + 1} of {boards.length}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-parchment-50">
                    {boards[activeBoardIndex].title}
                  </h4>
                </div>
                <button
                  onClick={() => setMenuBoardsModalOpen(false)}
                  className="p-2.5 rounded-full bg-espresso-800 text-parchment-100 hover:bg-gold-500 hover:text-espresso-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Board Image Viewer */}
              <div className="relative flex-1 overflow-y-auto bg-espresso-950 flex items-center justify-center p-4">
                <img
                  src={boards[activeBoardIndex].image}
                  alt={boards[activeBoardIndex].title}
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-gold-500/25"
                />

                <button
                  onClick={() =>
                    setActiveBoardIndex((activeBoardIndex - 1 + boards.length) % boards.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-espresso-900/90 hover:bg-gold-500 text-parchment-50 hover:text-espresso-950 border border-gold-500/40 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setActiveBoardIndex((activeBoardIndex + 1) % boards.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-espresso-900/90 hover:bg-gold-500 text-parchment-50 hover:text-espresso-950 border border-gold-500/40 shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Board Selector Strip */}
              <div className="px-6 py-3.5 bg-espresso-950 border-t border-gold-500/20 flex items-center gap-2 overflow-x-auto">
                {boards.map((b, idx) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBoardIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                      idx === activeBoardIndex
                        ? 'bg-gold-500 text-espresso-950 font-bold'
                        : 'bg-espresso-900 text-parchment-200/75 hover:text-parchment-50 border border-gold-500/20'
                    }`}
                  >
                    0{idx + 1}. {b.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
