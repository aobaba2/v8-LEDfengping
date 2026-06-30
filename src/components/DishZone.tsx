import React, { useState, useEffect } from 'react';
import { DishItem } from '../types';
import { INITIAL_DISHES } from '../data';
import { Flame, Sparkles, Clock, Compass, Heart, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DishZoneProps {
  dishes?: DishItem[];
}

export const DishZone: React.FC<DishZoneProps> = ({
  dishes = INITIAL_DISHES,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds rotation
  const PROGRESS_TICK = 50; 

  useEffect(() => {
    const steps = AUTO_PLAY_INTERVAL / PROGRESS_TICK;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        currentStep = 0;
        setCurrentIndex(prevIndex => (prevIndex + 1) % dishes.length);
      }
    }, PROGRESS_TICK);

    return () => {
      clearInterval(progressTimer);
    };
  }, [currentIndex, dishes.length]);

  const activeDish = dishes[currentIndex];

  // Helper to format currency elegantly to look like signature luxury price (e.g. KRW style conversion or custom premium plaque)
  const formatPremiumPrice = (price: number) => {
    // scale to premium KRW value look or custom label
    const formattedVal = (price * 220).toLocaleString('ko-KR');
    return `₩ ${formattedVal}`;
  };

  return (
    <div id="dish-zone" className="w-[700px] h-[430px] bg-gradient-to-br from-[#020205] to-[#0c0d14] flex flex-col relative overflow-hidden select-none border-l border-white/5">
      
      {/* 1. Luxurious Header */}
      <div className="h-[65px] min-h-[65px] px-8 flex flex-col justify-center relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 animate-pulse text-sm">👑</span>
            <h2 className="text-sm font-sans font-light tracking-[0.18em] text-zinc-100 uppercase flex items-center gap-2">
              主厨极致推荐 · 奢华美味
              <span className="text-[8px] font-mono font-black text-amber-500 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded tracking-widest">
                PREMIUM SELECTION
              </span>
            </h2>
          </div>
          
          {/* Subtle page selector indicators */}
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
            {dishes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'w-4 bg-gradient-to-r from-amber-500 to-[#ff9f1c] shadow-[0_0_8px_rgba(255,159,28,0.6)]' 
                    : 'w-1 bg-zinc-800 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </div>
        {/* Extremely thin orange glowing decorative line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff9f1c]/80 to-transparent mt-2 shadow-[0_0_6px_rgba(255,159,28,0.5)]" />
      </div>

      {/* Decorative Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,159,28,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

      {/* 2. Main Content Zone - Splitted horizontally 50/50 with extreme luxury spacing */}
      <div className="flex-1 px-8 py-3 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            // 3D Matrix luxury project fade: slight rotation skew, blur, scale, and clean fade
            initial={{ opacity: 0, rotateY: 12, scale: 0.96, filter: 'blur(8px)', x: 15 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1, filter: 'blur(0px)', x: 0 }}
            exit={{ opacity: 0, rotateY: -12, scale: 1.04, filter: 'blur(8px)', x: -15 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex gap-7 items-center justify-between"
            style={{ perspective: 1200 }}
          >
            {/* LEFT SIDE: Giant appetizing showcase image occupying exactly 75% height */}
            <div className="w-[310px] h-[300px] relative flex-shrink-0 group">
              {/* Premium Golden Sunset Aura Glow Backing */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/10 via-[#ff9f1c]/20 to-yellow-500/10 rounded-[18px] blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
              
              {/* Image Container with high contrast Obsidian-black deep double shadow */}
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#040408] shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative">
                <img
                  src={activeDish.image}
                  alt={activeDish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 filter contrast-[1.05] saturate-[1.12]"
                />
                
                {/* Micro Ambient Gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Cyberpunk Top-Left badge inside image */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[8px] font-mono text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 font-bold tracking-widest uppercase">
                  {activeDish.tags[0] || '招牌主推'}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Slender, clean editorial layout */}
            <div className="flex-1 flex flex-col justify-between h-[300px] text-left">
              
              {/* Gourmet Details Panel */}
              <div className="space-y-4">
                
                {/* Meta microtags */}
                <div className="flex flex-wrap gap-1.5">
                  {activeDish.tags.slice(1).map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[8px] font-sans font-black px-2 py-0.5 rounded tracking-widest border bg-white/[0.02] border-[#ff9f1c]/20 text-[#ff9f1c]/90"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-[8px] font-mono text-zinc-600 ml-auto flex items-center gap-1">
                    <Compass className="w-2.5 h-2.5 text-zinc-700" />
                    LUX_ESTATE
                  </span>
                </div>

                {/* Title styled with premium Sunset Orange Glowing text shadow */}
                <div>
                  <h3 className="text-base font-sans font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-[#ff9f1c] tracking-wider leading-snug cyber-glow-amber">
                    {activeDish.name}
                  </h3>
                  <p className="text-[8px] font-mono text-[#ff9f1c]/40 uppercase tracking-widest mt-0.5">
                    MASTER_CHEF_GOLD_SIGNATURE
                  </p>
                </div>

                {/* Exquisite delicate recipe description (muted dim gray, plenty of negative spacing) */}
                <p className="text-[10px] font-sans text-zinc-400 leading-[1.65] text-justify tracking-wide line-clamp-4">
                  {activeDish.description}
                </p>
              </div>

              {/* Bottom Row: Golden Glowing Plaque & Scan-To-Order button side-by-side */}
              <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Luxury Gold Plaque Tag */}
                  <div className="px-4 py-1.5 bg-gradient-to-b from-amber-500/20 to-amber-900/10 border border-amber-500/40 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.15)] flex flex-col">
                    <span className="text-[7px] font-mono text-amber-500/60 uppercase tracking-widest leading-none mb-0.5">ESTIMATED VAL</span>
                    <span className="text-sm font-mono font-black text-amber-400 tracking-wider">
                      {formatPremiumPrice(activeDish.price)}
                    </span>
                  </div>

                  {/* Micro stream QR label */}
                  <div className="flex flex-col items-end text-right font-mono text-[8px] text-zinc-500">
                    <span className="text-[7px] uppercase tracking-wider text-zinc-600">TABLE SERVICE</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                      QR_ACTIVE
                    </span>
                  </div>
                </div>

                {/* Fluid glowing button design */}
                <div className="w-full py-1.5 bg-gradient-to-r from-amber-500 via-[#ff9f1c] to-amber-600 hover:from-amber-400 hover:to-yellow-400 rounded-lg text-center text-[9px] font-sans font-black text-zinc-950 shadow-[0_4px_20px_rgba(255,159,28,0.25)] tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer relative overflow-hidden group/btn">
                  {/* Flow glow line overlay */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover/btn:animate-[marquee-up_1.5s_linear_infinite]" style={{ animationName: 'none' }} />
                  <span>立即扫码下单 · 送餐到桌</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Progress Bar */}
      <div className="h-1 bg-black w-full relative z-10 overflow-hidden border-t border-white/5">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-[#ff9f1c] to-amber-400 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(255,159,28,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
