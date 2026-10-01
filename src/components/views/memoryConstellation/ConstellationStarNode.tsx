import React, { useState } from 'react';
import { Play, Volume2, Sparkles, FileText, ArrowRight, Heart } from 'lucide-react';
import { ConstellationStar } from './types';

interface ConstellationStarNodeProps {
  star: ConstellationStar;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (star: ConstellationStar) => void;
}

export const ConstellationStarNode: React.FC<ConstellationStarNodeProps> = ({
  star,
  index,
  isHovered,
  onHover,
  onSelect,
}) => {
  // Determine dimensions based on size & special status
  let sizeClasses = 'w-11 h-11 sm:w-12 sm:h-12';
  if (star.size === 'small') sizeClasses = 'w-9 h-9 sm:w-10 sm:h-10';
  if (star.size === 'large' || star.isSpecial) sizeClasses = 'w-14 h-14 sm:w-16 sm:h-16';

  // Glow color and aura
  const glowHex = star.glowColor || '#FF6B6B';

  // Tooltip position heuristic (if y < 35, render tooltip below, else above)
  const tooltipBelow = star.y < 35;

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 select-none group"
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
      }}
      onMouseEnter={() => onHover(star.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer ambient radiant halo */}
      <div
        className={`absolute -inset-4 sm:-inset-6 rounded-full blur-xl transition-all duration-500 pointer-events-none ${
          isHovered
            ? 'opacity-85 scale-125'
            : star.isSpecial
            ? 'opacity-60 animate-pulse'
            : 'opacity-35'
        }`}
        style={{
          background: `radial-gradient(circle, ${glowHex} 0%, rgba(255, 107, 107, 0.2) 60%, transparent 80%)`,
        }}
      />

      {/* Special memory celestial orbit ring */}
      {star.isSpecial && (
        <div
          className="absolute -inset-2.5 sm:-inset-3 rounded-full border border-dashed border-amber-300/40 animate-[spin_25s_linear_infinite] pointer-events-none"
        />
      )}

      {/* Interactive Star Button */}
      <button
        type="button"
        onClick={() => onSelect(star)}
        className={`relative ${sizeClasses} rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-400 ${
          isHovered ? 'scale-115 shadow-[0_0_25px_rgba(255,255,255,0.8)]' : 'hover:scale-105'
        }`}
        style={{
          boxShadow: isHovered
            ? `0 0 24px ${glowHex}, 0 0 40px ${glowHex}40`
            : star.isSpecial
            ? `0 0 16px ${glowHex}80`
            : `0 0 10px ${glowHex}50`,
        }}
        aria-label={`View memory: ${star.title} by ${star.contributorName}`}
      >
        {/* Memory Type Specific Visual Rendering */}
        {star.type === 'photo' && star.mediaUrl ? (
          <div className="relative w-full h-full rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-white/60 via-amber-200/50 to-rose-400/80 border border-white/40">
            <img
              src={star.mediaUrl}
              alt={star.title}
              className="w-full h-full object-cover rounded-full filter brightness-105 group-hover:brightness-115 transition-all"
              loading="lazy"
            />
            {/* Soft starlight glint */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/40 via-transparent to-white/20 pointer-events-none" />
            {star.isSpecial && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-400 rounded-full border border-white flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-stone-900" />
              </span>
            )}
          </div>
        ) : star.type === 'video' ? (
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#1E293B] to-[#334155] border-2 border-rose-400/80 flex items-center justify-center shadow-inner overflow-hidden">
            {star.mediaUrl && (
              <img
                src={star.mediaUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-50 filter blur-[0.5px]"
              />
            )}
            <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-lg border border-white/40">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
            {star.duration && (
              <span className="absolute -bottom-1 text-[8px] font-bold text-white bg-black/70 px-1 rounded-sm">
                {star.duration}
              </span>
            )}
          </div>
        ) : star.type === 'audio' ? (
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#1E1B4B] to-[#4338CA] border-2 border-indigo-400/80 flex items-center justify-center shadow-inner">
            {/* Animated soundwaves ring */}
            <div className="relative flex items-center gap-0.5 text-indigo-200">
              <Volume2 className="w-4 h-4 text-indigo-100" />
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-indigo-300 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-2" />
                <span className="w-0.5 bg-indigo-200 rounded-full animate-[pulse_1.4s_ease-in-out_infinite] h-3" />
                <span className="w-0.5 bg-indigo-300 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-1.5" />
              </div>
            </div>
          </div>
        ) : (
          /* Written Memory Wish */
          <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#451A03] to-[#B45309] border-2 border-amber-300/80 flex items-center justify-center shadow-inner">
            <FileText className="w-4 h-4 text-amber-200" />
            <Sparkles className="w-2.5 h-2.5 text-amber-300 absolute top-1 right-1 animate-pulse" />
          </div>
        )}

        {/* Small celestial badge / star coordinate index */}
        <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-[#0B0F19]/90 border border-white/20 text-[8px] font-bold text-gray-200 shadow-xs pointer-events-none">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
      </button>

      {/* Floating Hover Preview Card */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-40 w-56 sm:w-64 p-3 rounded-2xl bg-[#0C1222]/95 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'opacity-100 scale-100 translate-y-0 visible'
            : 'opacity-0 scale-95 invisible'
        } ${
          tooltipBelow
            ? 'top-full mt-3'
            : 'bottom-full mb-3'
        }`}
      >
        {/* Subtle top indicator arrow */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0C1222] border-white/20 rotate-45 ${
            tooltipBelow
              ? '-top-1.5 border-t border-l'
              : '-bottom-1.5 border-b border-r'
          }`}
        />

        <div className="space-y-1.5">
          {/* Celestial designation & Type */}
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              ✦ {star.starName}
            </span>
            <span className="uppercase text-[9px] font-semibold text-rose-300 bg-rose-500/15 px-1.5 py-0.5 rounded-full border border-rose-500/20">
              {star.type === 'wish' ? 'Written Wish' : star.type}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
            {star.title}
          </h4>

          {/* Author info */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
            {star.contributorAvatar && (
              <img
                src={star.contributorAvatar}
                alt=""
                className="w-4 h-4 rounded-full object-cover shrink-0"
              />
            )}
            <span className="truncate">{star.contributorName}</span>
            {star.contributorRole && (
              <span className="text-[10px] text-gray-400 shrink-0">
                • {star.contributorRole}
              </span>
            )}
          </div>

          {/* Quote snippet if available */}
          {star.quote && (
            <p className="text-[10px] italic text-stone-300/80 line-clamp-2 pt-0.5 border-t border-white/10">
              {star.quote}
            </p>
          )}

          {/* Action Callout */}
          <div className="flex items-center justify-between pt-1 text-[10px] font-bold text-[#FF6B6B]">
            <span className="flex items-center gap-1 text-gray-400">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400/50" />
              {star.likesCount}
            </span>
            <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Tap to explore <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
