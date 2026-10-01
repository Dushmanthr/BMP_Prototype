import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface ConstellationCenterpieceProps {
  name: string;
  subtitle: string;
  quote?: string;
  accentColor?: string;
  onClick?: () => void;
}

export const ConstellationCenterpiece: React.FC<ConstellationCenterpieceProps> = ({
  name,
  subtitle,
  quote,
  accentColor = '#FF6B6B',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group select-none z-10"
      style={{ left: '50%', top: '50%' }}
      title={quote || `${name}'s Constellation Centerpiece`}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute -inset-14 rounded-full blur-2xl opacity-35 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(255, 107, 107, 0.15) 50%, transparent 75%)`,
        }}
      />

      {/* Outer rotating decorative orbital ring */}
      <div
        className="absolute -inset-9 rounded-full border border-white/15 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none"
      />

      {/* Middle subtle orbital ring with orbital stardust node */}
      <div
        className="absolute -inset-5 rounded-full border border-white/20 border-dotted animate-[spin_40s_linear_infinite_reverse] pointer-events-none"
      >
        <div
          className="absolute -top-1 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 shadow-xs"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
        />
      </div>

      {/* Centerpiece Core Disc */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#0E1528]/85 backdrop-blur-xl border border-white/25 shadow-[0_0_35px_rgba(255,107,107,0.22)] flex flex-col items-center justify-center p-3 text-center transition-all duration-500 group-hover:scale-105 group-hover:border-white/40">
        {/* Stellar icon */}
        <div className="flex items-center gap-1 text-[#FF6B6B] mb-1">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <Heart className="w-3 h-3 fill-[#FF6B6B]/40 text-[#FF6B6B]" />
        </div>

        {/* Person / Story Name */}
        <h2 className="text-base sm:text-xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-sans">
          {name}
        </h2>

        {/* Subtitle / Memory count */}
        <p className="text-[10px] sm:text-xs font-semibold text-rose-200/90 tracking-wide mt-0.5">
          {subtitle}
        </p>

        {/* Little celestial tag */}
        <div className="mt-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-medium text-gray-300 tracking-wider uppercase">
          Heart of Story
        </div>
      </div>
    </div>
  );
};
