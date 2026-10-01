import React, { useState } from 'react';
import { GardenMemory } from './types';
import { GardenFlowerSVG } from './GardenFlowerSVG';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface GardenFlowerNodeProps {
  memory: GardenMemory;
  onSelect: (memory: GardenMemory) => void;
  isDiscovered?: boolean;
}

export const GardenFlowerNode: React.FC<GardenFlowerNodeProps> = ({
  memory,
  onSelect,
  isDiscovered = false,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const stemHeight = memory.stemHeight || 70;
  const rotation = memory.rotation || 0;

  return (
    <div
      className="absolute group z-20 focus:outline-none"
      style={{
        left: `${memory.x}%`,
        top: `${memory.y}px`,
        transform: 'translate(-50%, -100%)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View memory: ${memory.title} by ${memory.contributorName}`}
      onClick={() => onSelect(memory)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(memory);
        }
      }}
    >
      {/* ----------------------------------------------------
          INTERACTIVE HOVER PREVIEW TOOLTIP
      ---------------------------------------------------- */}
      <div
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-stone-200/80 transition-all duration-300 pointer-events-none z-30 ${
          isHovered
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-2 scale-95'
        }`}
      >
        {/* Flower Variety Name Tag */}
        <div className="flex items-center justify-between text-[10px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
          <span className="flex items-center gap-1 text-emerald-700">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: memory.petalColor }}
            />
            {memory.flowerVarietyName}
          </span>
          <span className="text-stone-400 capitalize">{memory.type}</span>
        </div>

        {/* Memory Title */}
        <h4 className="text-sm font-serif font-bold text-stone-800 line-clamp-1">
          {memory.title}
        </h4>

        {/* Contributor & Date */}
        <p className="text-xs text-stone-500 mt-0.5 mb-2 line-clamp-1">
          By {memory.contributorName}
          {memory.date ? ` • ${memory.date}` : ''}
        </p>

        {/* Small Excerpt */}
        <p className="text-[11px] text-stone-600 line-clamp-2 italic font-serif leading-relaxed mb-2.5">
          “{memory.content}”
        </p>

        {/* Call to action pill */}
        <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px] font-semibold text-emerald-800">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
            View Memory
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 transition-colors" />
        </div>

        {/* Little Tooltip Caret Pointer */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white" />
      </div>

      {/* ----------------------------------------------------
          FLOWER HEAD & SWAY CONTAINER
      ---------------------------------------------------- */}
      <div
        className="relative flex flex-col items-center cursor-pointer transition-all duration-300"
        style={{
          transform: `${isHovered ? 'scale(1.08)' : 'scale(1)'} rotate(${rotation}deg)`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Memory Flower Blossom */}
        <div className="relative">
          <GardenFlowerSVG
            flowerType={memory.flowerType}
            bloomState={memory.bloomState}
            size={memory.flowerSize}
            petalColor={memory.petalColor}
            centerColor={memory.centerColor}
            memoryType={memory.type}
            mediaUrl={memory.mediaUrl}
            isHighlight={memory.isHighlight}
          />

          {/* Gentle Discovered indicator ring */}
          {isDiscovered && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-900/80 text-[9px] text-emerald-200 font-semibold tracking-wider flex items-center gap-1 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Bloomed
            </div>
          )}
        </div>

        {/* ----------------------------------------------------
            NATURAL BOTANICAL STEM & LEAVES
        ---------------------------------------------------- */}
        <div
          className="relative flex flex-col items-center pointer-events-none"
          style={{ height: `${stemHeight}px`, width: '40px' }}
        >
          {/* Main Stem Line */}
          <div
            className="w-1 rounded-full shadow-xs"
            style={{
              height: `${stemHeight}px`,
              backgroundColor: memory.leafColor || '#15803D',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />

          {/* Left Leaf */}
          <div
            className="absolute left-1/2 -translate-x-full transition-transform duration-500"
            style={{
              top: `${stemHeight * 0.35}px`,
              transform: `translateX(-2px) rotate(-35deg) ${isHovered ? 'rotate(-42deg)' : ''}`,
            }}
          >
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <path
                d="M 22 6 C 14 0, 4 2, 0 6 C 4 10, 14 12, 22 6 Z"
                fill={memory.leafColor || '#15803D'}
                opacity="0.9"
              />
              <path d="M 0 6 L 18 6" stroke="#86EFAC" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>

          {/* Right Leaf */}
          <div
            className="absolute left-1/2 transition-transform duration-500"
            style={{
              top: `${stemHeight * 0.55}px`,
              transform: `translateX(2px) rotate(32deg) ${isHovered ? 'rotate(40deg)' : ''}`,
            }}
          >
            <svg width="20" height="11" viewBox="0 0 20 11" fill="none">
              <path
                d="M 0 5.5 C 7 0, 16 1.5, 20 5.5 C 16 9.5, 7 11, 0 5.5 Z"
                fill={memory.leafColor || '#166534'}
                opacity="0.9"
              />
              <path d="M 0 5.5 L 16 5.5" stroke="#86EFAC" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>

          {/* Stem Base Shadow on Ground */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 rounded-full bg-stone-900/15 blur-xs" />
        </div>
      </div>
    </div>
  );
};
