import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles as DreiSparkles, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Coffee, Compass, UtensilsCrossed, MapPin, Phone, Trophy, Sparkles, BookOpen } from 'lucide-react';
import restoData from '../data/restoData.json';

/* -----------------------------------------------------------
   3D Artisanal Coffee & Matcha Cup + Botanical & Pickleball Scene
------------------------------------------------------------ */
function FloatingCafeCup({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const steam1Ref = useRef<THREE.Mesh>(null);
  const steam2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.35 + t * 0.18;
      groupRef.current.rotation.z = Math.cos(t * 0.4) * 0.08;
    }
    if (steam1Ref.current) {
      steam1Ref.current.position.y = 0.85 + ((t * 0.35) % 0.7);
      const s = 1 + ((t * 0.35) % 0.7) * 0.4;
      steam1Ref.current.scale.set(s, s, s);
    }
    if (steam2Ref.current) {
      steam2Ref.current.position.y = 0.85 + (((t + 1.0) * 0.35) % 0.7);
      const s = 1 + (((t + 1.0) * 0.35) % 0.7) * 0.4;
      steam2Ref.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.9} position={position}>
      <group ref={groupRef} scale={1.15}>
        {/* Saucer */}
        <mesh position={[0, -0.58, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[0.95, 0.75, 0.1, 48]} />
          <meshStandardMaterial color="#F5EFE6" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Gold Rim on Saucer */}
        <mesh position={[0, -0.53, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.93, 0.02, 16, 64]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.18} />
        </mesh>

        {/* Ceramic Cup Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.62, 0.46, 1.05, 48]} />
          <meshStandardMaterial color="#1B120C" roughness={0.25} metalness={0.15} />
        </mesh>

        {/* Gold Emblem Ring on Cup */}
        <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.61, 0.025, 16, 64]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.018, 16, 64]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Espresso / Latte Art Surface */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.04, 48]} />
          <meshStandardMaterial color="#B07D46" roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Cream Swirl */}
        <mesh position={[0, 0.505, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.045, 16, 48]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.4} />
        </mesh>

        {/* Cup Handle */}
        <mesh position={[0.64, 0.02, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <torusGeometry args={[0.28, 0.065, 24, 48, Math.PI]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Warm Rising Steam Rings */}
        <mesh ref={steam1Ref} position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.015, 12, 32]} />
          <meshStandardMaterial color="#FAF6F0" transparent opacity={0.32} />
        </mesh>
        <mesh ref={steam2Ref} position={[0, 1.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.012, 12, 32]} />
          <meshStandardMaterial color="#D4AF37" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function CoconutMatchaOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = -t * 0.25;
      ref.current.rotation.x = Math.sin(t * 0.6) * 0.15;
    }
  });

  return (
    <Float speed={2.1} rotationIntensity={0.45} floatIntensity={1.1} position={position}>
      <group ref={ref} scale={0.95}>
        {/* Young Buko Coconut Shell */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.68, 40, 40, 0, Math.PI * 2, 0.65, Math.PI - 0.65]} />
          <meshStandardMaterial color="#4E5E30" roughness={0.45} metalness={0.08} side={THREE.DoubleSide} />
        </mesh>
        {/* White Coconut Flesh Rim */}
        <mesh position={[0, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.53, 0.07, 20, 48]} />
          <meshStandardMaterial color="#FAF6F0" roughness={0.25} />
        </mesh>
        {/* Matcha Cloud Foam Top */}
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.5, 0.48, 0.12, 36]} />
          <meshStandardMaterial color="#849B54" roughness={0.35} />
        </mesh>
        {/* Bamboo Straw */}
        <mesh position={[0.2, 0.68, 0]} rotation={[0, 0, -0.35]}>
          <cylinderGeometry args={[0.035, 0.035, 0.85, 20]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function PickleballAccent({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.y = t * 0.55;
    }
  });

  return (
    <Float speed={2.4} rotationIntensity={0.6} floatIntensity={1.2} position={position}>
      <group ref={ref}>
        {/* Golden-Lime Pickleball Sphere */}
        <mesh castShadow>
          <icosahedronGeometry args={[0.42, 2]} />
          <meshStandardMaterial color="#D4AF37" wireframe={false} roughness={0.25} metalness={0.5} />
        </mesh>
        <mesh scale={1.03}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#140E0A" wireframe />
        </mesh>
      </group>
    </Float>
  );
}

function SceneCameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.65;
    const targetY = state.pointer.y * 0.35 + 0.2;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function LanternOrbs() {
  const orbs = useMemo(
    () => [
      { pos: [-3.4, 1.8, -1.8] as [number, number, number], scale: 0.14 },
      { pos: [-2.1, 2.3, -2.2] as [number, number, number], scale: 0.11 },
      { pos: [2.4, 2.1, -1.9] as [number, number, number], scale: 0.15 },
      { pos: [3.6, 1.5, -1.5] as [number, number, number], scale: 0.12 },
      { pos: [0.4, 2.5, -2.5] as [number, number, number], scale: 0.1 },
    ],
    []
  );

  return (
    <group>
      {orbs.map((orb, idx) => (
        <Float key={idx} speed={1.5 + idx * 0.2} floatIntensity={0.6} position={orb.pos}>
          <mesh>
            <sphereGeometry args={[orb.scale, 24, 24]} />
            <meshStandardMaterial
              color="#F3D87D"
              emissive="#E5A93C"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

interface Hero3DProps {
  onOpenReserve: () => void;
  onOpenMenuBoards: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenReserve, onOpenMenuBoards }) => {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background Real Cover Photo with Atmospheric Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/resto-views/resto-1.jpg"
          alt="Welcome to El Farm Cafe and Restaurant at Twilight"
          className="w-full h-full object-cover object-center scale-105 opacity-40 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso-950/90 via-espresso-950/70 to-espresso-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14)_0%,transparent_70%)]" />
      </div>

      {/* Full-Viewport Interactive Three.js WebGL Scene */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.2, 5.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.75} color="#FAF6F0" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#F3D87D"
            castShadow
          />
          <pointLight position={[-3, 2, 2]} intensity={1.6} color="#849B54" />
          <pointLight position={[3, -1, 2]} intensity={1.8} color="#E5A93C" />

          <FloatingCafeCup position={[2.35, -0.15, 0.2]} />
          <CoconutMatchaOrb position={[-2.45, 0.25, -0.2]} />
          <PickleballAccent position={[-1.85, -1.25, 0.5]} />
          <LanternOrbs />

          <DreiSparkles
            count={85}
            scale={[10, 6, 6]}
            size={2.4}
            speed={0.35}
            opacity={0.65}
            color="#F3D87D"
          />

          <ContactShadows
            position={[0, -2.1, 0]}
            opacity={0.35}
            scale={12}
            blur={2.5}
            far={4.5}
          />
          <Environment preset="sunset" />
          <SceneCameraRig />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pointer-events-none">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Top Location & Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-auto inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-espresso-900/80 backdrop-blur-md border border-gold-500/35 shadow-gold-glow mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-300">
              Sitio Nipa · Brgy. Maloong Canal · Lamitan City
            </span>
          </motion.div>

          {/* Script Tagline from Official Signage */}
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-400 drop-shadow-[0_4px_20px_rgba(212,175,55,0.35)] -mb-2 sm:-mb-3"
          >
            {restoData.restaurant.tagline}
          </motion.p>

          {/* Main Display Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-parchment-50 leading-[1.03] drop-shadow-2xl"
          >
            El Farm{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-parchment-100 to-gold-400">
              Café &amp; Resto
            </span>
          </motion.h1>

          {/* Extracted Facebook Bio & Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mt-5 text-base sm:text-lg md:text-xl text-parchment-200/90 max-w-2xl leading-relaxed font-normal"
          >
            Your little escape in Lamitan City — where artisanal{' '}
            <span className="text-gold-300 font-medium">Dirty Coffee</span> &amp;{' '}
            <span className="text-sage-400 font-medium">Coconut Matcha Cloud</span> meet heirloom Basilan{' '}
            <span className="text-gold-300 font-medium">Tiyula Itum</span>, bountiful{' '}
            <span className="text-gold-300 font-medium">Salu-Salo Bilaos</span>, and twilight rallies on our{' '}
            <span className="text-gold-300 font-medium">Outdoor Pickleball Court</span>.
          </motion.p>

          {/* Dual Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.44 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#menu"
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-espresso-950 font-bold text-sm sm:text-base shadow-gold-glow hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5"
            >
              <UtensilsCrossed className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Explore Full Menu</span>
            </a>

            <a
              href="#resto-view"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-espresso-900/80 hover:bg-espresso-800/90 backdrop-blur-md text-parchment-50 font-semibold text-sm sm:text-base border border-gold-500/35 hover:border-gold-400 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 text-gold-400 transition-transform group-hover:rotate-45" />
              <span>Tour the Resto</span>
            </a>

            <button
              onClick={onOpenMenuBoards}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-sage-700/60 hover:bg-sage-600/70 backdrop-blur-md text-parchment-100 font-medium text-sm border border-sage-400/35 transition-all duration-300 hover:-translate-y-0.5"
            >
              <BookOpen className="w-4 h-4 text-gold-300" />
              <span>Original Menu Boards</span>
            </button>
          </motion.div>

          {/* Feature Highlights Strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.56 }}
            className="mt-12 w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pointer-events-auto"
          >
            <div className="p-3.5 rounded-2xl bg-espresso-900/75 backdrop-blur-md border border-gold-500/20 flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gold-400">From ₱50</div>
                <div className="text-sm font-semibold text-parchment-50">Coffee &amp; Matcha</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-espresso-900/75 backdrop-blur-md border border-gold-500/20 flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-sage-500/20 text-sage-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-sage-400">Day &amp; Night</div>
                <div className="text-sm font-semibold text-parchment-50">Pickleball Court</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-espresso-900/75 backdrop-blur-md border border-gold-500/20 flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-xl bg-gold-500/15 text-gold-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gold-400">45+ Dishes</div>
                <div className="text-sm font-semibold text-parchment-50">Pinoy &amp; Local Feasts</div>
              </div>
            </div>

            <button
              onClick={onOpenReserve}
              className="p-3.5 rounded-2xl bg-espresso-900/75 hover:bg-gold-500/15 backdrop-blur-md border border-gold-500/30 flex items-center gap-3 text-left transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-gold-500/20 text-gold-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-gold-300">Advance Order</div>
                <div className="text-sm font-semibold text-parchment-50">0917 182 9876</div>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
