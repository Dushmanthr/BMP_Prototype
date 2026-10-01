import React from 'react';
import { BloomStage } from './types';
import { Sparkles, Heart } from 'lucide-react';

interface BloomCenterProps {
  personName: string;
  centerSubtitle: string;
  stage: BloomStage;
  totalMemories: number;
  exploredCount: number;
  onCenterClick: () => void;
  centerPos: { x: number; y: number };
}

export const BloomCenter: React.FC<BloomCenterProps> = ({
  personName,
  centerSubtitle,
  stage,
  totalMemories,
  exploredCount,
  onCenterClick,
  centerPos,
}) => {
  const isFullyBloomed = stage === 'fully-bloomed';
  const isClosed = stage === 'closed';

  // Extract first name for elegant center display
  const firstName = personName.split(' ')[0].toUpperCase();

  return (
    <g
      className="cursor-pointer select-none group"
      transform={`translate(${centerPos.x}, ${centerPos.y})`}
      onClick={onCenterClick}
      role="button"
      tabIndex={0}
      aria-label={`Flower Center: ${isFullyBloomed ? 'Our Story' : personName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCenterClick();
        }
      }}
    >
      {/* Outer ambient glow */}
      <circle
        cx="0"
        cy="0"
        r={isClosed ? 46 : isFullyBloomed ? 66 : 56}
        fill="url(#center-ambient-glow)"
        className="transition-all duration-700 ease-out"
      />

      {/* Decorative Golden Stamen Dots (botanical pollen accents) */}
      {!isClosed && (
        <g className="transition-opacity duration-700">
          {[...Array(14)].map((_, i) => {
            const angle = (i * (360 / 14) * Math.PI) / 180;
            const r = isFullyBloomed ? 56 : 48;
            const sx = r * Math.cos(angle);
            const sy = r * Math.sin(angle);
            return (
              <g key={i}>
                <line
                  x1="0"
                  y1="0"
                  x2={sx}
                  y2={sy}
                  stroke="#FDE68A"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
                <circle
                  cx={sx}
                  cy={sy}
                  r="2.5"
                  fill="#F59E0B"
                  stroke="#FFFBEB"
                  strokeWidth="0.6"
                />
              </g>
            );
          })}
        </g>
      )}

      {/* Main Velvet Core Circle */}
      <circle
        cx="0"
        cy="0"
        r={isClosed ? 42 : isFullyBloomed ? 52 : 44}
        fill="url(#center-velvet-grad)"
        stroke={isFullyBloomed ? '#F59E0B' : '#FFE4E6'}
        strokeWidth={isFullyBloomed ? '2' : '1.5'}
        filter="url(#center-drop-shadow)"
        className="transition-all duration-700 ease-out group-hover:scale-105"
        style={{ transformOrigin: '0 0' }}
      />

      {/* Inner subtle concentric ring */}
      <circle
        cx="0"
        cy="0"
        r={isClosed ? 34 : isFullyBloomed ? 44 : 36}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        strokeDasharray="2 3"
        opacity="0.5"
        className="transition-all duration-700 ease-out"
      />

      {/* Center Typography & Content */}
      <foreignObject
        x={isFullyBloomed ? -55 : -48}
        y={isFullyBloomed ? -55 : -48}
        width={isFullyBloomed ? 110 : 96}
        height={isFullyBloomed ? 110 : 96}
        className="pointer-events-none"
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-1 leading-tight select-none">
          {isClosed ? (
            <>
              <div className="w-5 h-5 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] flex items-center justify-center mb-1">
                <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
              </div>
              <span className="text-[11px] font-extrabold tracking-widest text-[#243B53] font-serif">
                {firstName}
              </span>
              <span className="text-[8px] font-medium text-[#FF6B6B] tracking-wide mt-0.5 animate-pulse">
                Tap to Bloom
              </span>
            </>
          ) : isFullyBloomed ? (
            <>
              <div className="flex items-center justify-center gap-1 mb-0.5 text-amber-500">
                <Heart className="w-2.5 h-2.5 fill-amber-500" />
              </div>
              <span className="text-[11px] font-extrabold tracking-widest text-[#243B53] font-serif uppercase">
                Our Story
              </span>
              <span className="text-[7.5px] italic text-[#64748B] max-w-[85px] line-clamp-2 mt-0.5">
                Every memory helped it bloom
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-extrabold tracking-widest text-[#243B53] font-serif">
                {firstName}
              </span>
              <span className="text-[7.5px] font-semibold text-[#FF6B6B] uppercase tracking-wider mt-0.5">
                {centerSubtitle}
              </span>
              <span className="text-[7px] text-[#64748B] mt-0.5 font-medium">
                {exploredCount > 0 ? `${exploredCount}/${totalMemories} unfolded` : '12 memories'}
              </span>
            </>
          )}
        </div>
      </foreignObject>
    </g>
  );
};
