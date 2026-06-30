import React, { useState } from 'react';
// @ts-ignore
import fifaLogo from '../assets/images/fifa_2026_logo_1782759509816.jpg';

interface DataColumnProps {
  mode: 'logo' | 'black' | 'custom';
  customUrl?: string;
}

export const DataColumnA: React.FC<DataColumnProps> = ({ mode, customUrl }) => {
  const [imgError, setImgError] = useState(false);

  if (mode === 'black') {
    return (
      <div className="w-[144px] h-[430px] bg-black border-l border-r border-zinc-950 transition-all duration-300" />
    );
  }

  const displaySrc = mode === 'custom' && customUrl ? customUrl : fifaLogo;

  return (
    <div className="w-[144px] h-[430px] bg-black font-mono text-[10px] flex flex-col justify-between select-none relative overflow-hidden border-l border-r border-zinc-900 transition-all duration-300">
      
      {/* 1. Top Decorative Subtle Text */}
      <div className="h-[45px] bg-black border-b border-zinc-900 flex flex-col items-center justify-center relative flex-shrink-0">
        <span className="text-[9px] font-black text-zinc-400 tracking-[0.25em] uppercase">WORLD CUP</span>
        <span className="text-[7px] text-zinc-600 tracking-widest mt-0.5">BRANDING_Z01</span>
      </div>

      {/* 2. Centered Logo Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative bg-black">
        {/* Subtle decorative background ring */}
        <div className="absolute w-[100px] h-[100px] rounded-full border border-dashed border-zinc-800/40 animate-spin" style={{ animationDuration: '60s' }} />
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          {!imgError ? (
            <img
              src={displaySrc}
              alt="FIFA World Cup 2026"
              className="w-[120px] h-[120px] object-cover rounded-lg transition-all duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-zinc-200 tracking-tighter leading-none">
                20
              </span>
              <span className="text-4xl font-black text-zinc-400 tracking-tighter leading-none -mt-1">
                26
              </span>
              <span className="text-[8px] font-black tracking-widest text-zinc-600 mt-2">
                FIFA
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Bottom Decorative Subtle Text */}
      <div className="h-[30px] bg-black border-t border-zinc-900 px-2 flex items-center justify-between text-[7px] text-zinc-600 flex-shrink-0 uppercase tracking-wider">
        <span>HOST_2026</span>
        <span>USA/CAN/MEX</span>
      </div>

    </div>
  );
};
