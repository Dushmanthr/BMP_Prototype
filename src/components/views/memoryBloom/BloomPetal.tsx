import React, { useState } from 'react';
import { BloomPetalData, BloomStage } from './types';
import { Sparkles, Mic, Video, Image, FileText } from 'lucide-react';

interface BloomPetalProps {
  petal: BloomPetalData;
  stage: BloomStage;
  isExplored: boolean;
  isSelected: boolean;
  isDimmed: boolean;
  onSelect: (petal: BloomPetalData) => void;
  centerPos: { x: number; y: number };
}

export const BloomPetal: React.FC<BloomPetalProps> = ({
  petal,
  stage,
  isExplored,
  isSelected,
  isDimmed,
  onSelect,
  centerPos,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Compute transform based on stage, angle, and hover
  const angleRad = (petal.angleDeg * Math.PI) / 180;

  // Closed bud radius vs open bloom radius
  let currentRadius = petal.distanceRadius;
  let currentScale = petal.scale;
  let currentAngle = petal.angleDeg;

  if (stage === 'closed') {
    currentRadius = petal.layer === 'inner' ? 20 : petal.layer === 'middle' ? 32 : 45;
    currentScale = 0.52;
    // In closed bud, petals curl inward towards top (90 deg / vertical)
    currentAngle = 270 + (petal.angleDeg - 270) * 0.18;
  } else if (stage === 'unfolding') {
    currentRadius = petal.distanceRadius * 0.78;
    currentScale = petal.scale * 0.88;
  } else if (stage === 'fully-bloomed') {
    currentRadius = petal.distanceRadius * 1.08;
    currentScale = petal.scale * 1.05;
  }

  // Hover push outwards along radial vector
  if (isHovered && stage !== 'closed') {
    currentRadius += 14;
    currentScale *= 1.06;
  }

  // Calculate coordinates relative to center
  const posX = centerPos.x + currentRadius * Math.cos(angleRad);
  const posY = centerPos.y + currentRadius * Math.sin(angleRad);

  // Rotation: petal points outward from center, plus natural artistic tilt
  // Math.atan2 gives the angle facing outwards
  const facingAngleDeg = petal.angleDeg + 90 + petal.rotationDeg;

  // Select SVG path shape according to shapeType
  const getPetalPath = (type: BloomPetalData['shapeType']) => {
    switch (type) {
      case 'sculpted-curve':
        return 'M 0,0 C -34,-25 -48,-75 -36,-115 C -25,-155 0,-175 0,-175 C 0,-175 25,-155 36,-115 C 48,-75 34,-25 0,0 Z';
      case 'heirloom-rose':
        return 'M 0,0 C -42,-20 -54,-65 -45,-105 C -36,-142 -18,-170 0,-172 C 18,-170 36,-142 45,-105 C 54,-65 42,-20 0,0 Z';
      case 'radiant-oval':
        return 'M 0,0 C -36,-30 -42,-80 -32,-120 C -22,-155 -5,-168 0,-168 C 5,-168 22,-155 32,-120 C 42,-80 36,-30 0,0 Z';
      case 'soft-taper':
        return 'M 0,0 C -28,-30 -38,-85 -26,-125 C -15,-160 0,-178 0,-178 C 0,-178 15,-160 26,-125 C 38,-85 28,-30 0,0 Z';
      case 'delicate-crest':
      default:
        return 'M 0,0 C -38,-22 -46,-70 -35,-110 C -24,-148 -2,-170 0,-170 C 2,-170 24,-148 35,-110 C 46,-70 38,-22 0,0 Z';
    }
  };

  // Get type icon
  const getTypeIcon = () => {
    switch (petal.type) {
      case 'audio':
        return <Mic className="w-3 h-3 text-purple-500" />;
      case 'video':
        return <Video className="w-3 h-3 text-amber-500" />;
      case 'wish':
        return <FileText className="w-3 h-3 text-rose-500" />;
      case 'photo':
      default:
        return <Image className="w-3 h-3 text-[#FF6B6B]" />;
    }
  };

  // Stagger transition timing by layer
  const layerTransitionDelay = 
    petal.layer === 'outer' ? '0ms' : petal.layer === 'middle' ? '80ms' : '160ms';

  return (
    <g
      className={`group cursor-pointer transition-all duration-700 ease-out select-none ${
        isDimmed ? 'opacity-25 blur-[1px]' : 'opacity-100'
      }`}
      style={{
        transform: `translate(${posX}px, ${posY}px) rotate(${facingAngleDeg}deg) scale(${currentScale})`,
        transformOrigin: '0 0',
        transitionDelay: layerTransitionDelay,
      }}
      onClick={() => onSelect(petal)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={stage === 'closed' ? -1 : 0}
      role="button"
      aria-label={`Petal ${petal.memoryNumber}: ${petal.title} by ${petal.contributorName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(petal);
        }
      }}
    >
      {/* Soft Petal Drop Shadow Glow */}
      <path
        d={getPetalPath(petal.shapeType)}
        fill="black"
        opacity={isHovered ? 0.16 : isExplored ? 0.12 : 0.08}
        transform="translate(0, 4) scale(1.02)"
        filter="url(#petal-soft-shadow)"
      />

      {/* Main Petal Organic Body */}
      <path
        d={getPetalPath(petal.shapeType)}
        fill={`url(#${petal.gradientId})`}
        stroke={
          petal.isSpecial
            ? '#F59E0B'
            : isHovered
            ? '#FF6B6B'
            : isExplored
            ? '#FDA4AF'
            : 'rgba(255, 255, 255, 0.7)'
        }
        strokeWidth={petal.isSpecial ? (isHovered ? 2.2 : 1.6) : isHovered ? 1.8 : 1}
        className="transition-colors duration-300"
      />

      {/* Delicate Inner Vein Texture (botanical realism) */}
      <g opacity={isHovered ? petal.veinOpacity * 1.5 : petal.veinOpacity}>
        {/* Central rib */}
        <path
          d="M 0,-15 C 0,-60 0,-120 0,-160"
          stroke={petal.isSpecial ? '#D97706' : '#FF6B6B'}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Subtle branch veins */}
        <path
          d="M 0,-45 C -10,-60 -18,-75 -24,-90 M 0,-45 C 10,-60 18,-75 24,-90"
          stroke={petal.isSpecial ? '#D97706' : '#FF6B6B'}
          strokeWidth="0.7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 0,-85 C -8,-100 -14,-115 -18,-130 M 0,-85 C 8,-100 14,-115 18,-130"
          stroke={petal.isSpecial ? '#D97706' : '#FF6B6B'}
          strokeWidth="0.6"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Special Memory Golden Sheen / Shimmer */}
      {petal.isSpecial && (
        <g>
          <circle
            cx="0"
            cy="-148"
            r="11"
            fill="#FEF3C7"
            fillOpacity="0.85"
            stroke="#F59E0B"
            strokeWidth="1"
            className="animate-pulse"
          />
          <path
            d="M 0,-154 L 1.5,-150 L 5,-148 L 1.5,-146 L 0,-142 L -1.5,-146 L -5,-148 L -1.5,-150 Z"
            fill="#D97706"
          />
        </g>
      )}

      {/* Explored Petal Dew / Light Droplet */}
      {isExplored && !petal.isSpecial && (
        <circle
          cx="0"
          cy="-142"
          r="4.5"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#FDA4AF"
          strokeWidth="0.8"
        />
      )}

      {/* Memory Index Pill Tag on Petal Tip (Subtle, elegant) */}
      {stage !== 'closed' && (
        <g transform="translate(0, -145) rotate(0)">
          {/* Subtle tip dot */}
          <circle
            cx="0"
            cy="0"
            r={isHovered ? 12 : 9}
            fill="#FFFFFF"
            fillOpacity="0.92"
            stroke={isHovered ? '#FF6B6B' : '#E2E8F0'}
            strokeWidth="1"
            className="transition-all duration-300"
          />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            fontSize={isHovered ? '9' : '8'}
            fontWeight="bold"
            fill={isHovered ? '#FF6B6B' : '#64748B'}
            className="pointer-events-none font-sans"
          >
            {petal.memoryNumber}
          </text>
        </g>
      )}

      {/* Hover Floating Card Tooltip (HTML overlay via foreignObject for rich typography) */}
      {isHovered && stage !== 'closed' && (
        <foreignObject
          x="-110"
          y="-255"
          width="220"
          height="95"
          className="overflow-visible pointer-events-none"
        >
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-rose-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              {getTypeIcon()}
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                Petal {petal.memoryNumber}
              </span>
              {petal.isSpecial && (
                <span className="inline-flex items-center gap-0.5 text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Special
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-gray-800 truncate leading-snug">
              {petal.title}
            </p>
            <p className="text-[10px] text-gray-500 truncate mt-0.5">
              by {petal.contributorName}
            </p>
            <p className="text-[9px] text-[#FF6B6B] font-semibold mt-1 flex items-center justify-center gap-1">
              <span>Touch to unfold</span>
              <span className="text-xs">→</span>
            </p>
          </div>
        </foreignObject>
      )}
    </g>
  );
};
