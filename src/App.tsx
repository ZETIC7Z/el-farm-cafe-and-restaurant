import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { AboutSection } from './components/AboutSection';
import { RestoViewShowcase } from './components/RestoViewShowcase';
import { MenuSection } from './components/MenuSection';
import { CustomerCarousel3D } from './components/CustomerCarousel3D';
import { VisitFooter } from './components/VisitFooter';
import { ReservationModal } from './components/ReservationModal';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [prefillDish, setPrefillDish] = useState<string>('');
  const [menuBoardsModalOpen, setMenuBoardsModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const handleOpenReserve = (dish?: string) => {
    if (dish) {
      setPrefillDish(dish);
    }
    setReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-espresso-950 text-parchment-100 selection:bg-gold-500 selection:text-espresso-950">
      <Navbar
        onOpenReserve={() => handleOpenReserve()}
        onOpenMenuBoards={() => setMenuBoardsModalOpen(true)}
      />

      <main>
        <Hero3D
          onOpenReserve={() => handleOpenReserve()}
          onOpenMenuBoards={() => setMenuBoardsModalOpen(true)}
        />

        <AboutSection onOpenReserve={() => handleOpenReserve()} />

        <RestoViewShowcase />

        <MenuSection
          onSelectDishForOrder={(dish) => handleOpenReserve(dish)}
          menuBoardsModalOpen={menuBoardsModalOpen}
          setMenuBoardsModalOpen={setMenuBoardsModalOpen}
        />

        <CustomerCarousel3D />
      </main>

      <VisitFooter
        onOpenReserve={() => handleOpenReserve()}
        onOpenMenuBoards={() => setMenuBoardsModalOpen(true)}
      />

      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        prefillOrder={prefillDish}
      />
    </div>
  );
}

export default App;
