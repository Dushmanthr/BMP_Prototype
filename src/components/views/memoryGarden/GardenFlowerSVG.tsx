import React from 'react';
import { FlowerType, FlowerBloomState, FlowerSize } from './types';
import { Play, Volume2, MessageSquareText, Image as ImageIcon } from 'lucide-react';
import { MemoryType } from '../../../types';

interface GardenFlowerSVGProps {
  flowerType: FlowerType;
  bloomState: FlowerBloomState;
  size: FlowerSize;
  petalColor: string;
  centerColor: string;
  memoryType: MemoryType;
  mediaUrl?: string;
  isHighlight?: boolean;
}

export const GardenFlowerSVG: React.FC<GardenFlowerSVGProps> = ({
  flowerType,
  bloomState,
  size,
  petalColor,
  centerColor,
  memoryType,
  mediaUrl,
  isHighlight = false,
}) => {
  // Determine pixel diameter based on size and highlight
  const baseDimension =
    size === 'large' ? (isHighlight ? 104 : 92) : size === 'medium' ? 76 : 62;

  // Center radius for media / icon
  const centerRadius = size === 'large' ? 24 : size === 'medium' ? 18 : 14;

  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `flower-grad-${uniqueId}`;
  const centerGradId = `center-grad-${uniqueId}`;
  const clipId = `media-clip-${uniqueId}`;
  const glowId = `glow-${uniqueId}`;

  // Render botanical petals based on flower type
  const renderPetals = () => {
    switch (flowerType) {
      case 'rose':
        return (
          <g>
            {/* Outer Petals */}
            <circle cx="50" cy="50" r="46" fill={`url(#${gradId})`} opacity="0.4" />
            <path
              d="M 50 6 C 65 6, 88 20, 88 45 C 88 72, 65 92, 50 94 C 35 92, 12 72, 12 45 C 12 20, 35 6, 50 6 Z"
              fill={`url(#${gradId})`}
              opacity="0.8"
            />
            {/* Inner Spiral Overlays */}
            <path
              d="M 32 30 C 45 18, 68 22, 75 38 C 82 52, 72 74, 55 78 C 38 78, 25 64, 28 48 C 30 36, 42 32, 50 34"
              fill="none"
              stroke={petalColor}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 40 40 C 46 34, 56 34, 60 42 C 64 50, 58 60, 50 62 C 44 62, 38 56, 40 48"
              fill="none"
              stroke="#FFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        );

      case 'peony':
        return (
          <g>
            {/* Ruffled peony petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <path
                key={i}
                d="M 50 50 C 40 15, 60 15, 50 50"
                fill={`url(#${gradId})`}
                opacity={0.75 + (i % 2) * 0.15}
                transform={`rotate(${angle} 50 50)`}
                stroke={petalColor}
                strokeWidth="1.5"
              />
            ))}
            {/* Inner ruffle layer */}
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
              <circle
                key={`ruffle-${i}`}
                cx="50"
                cy="28"
                r="14"
                fill={`url(#${gradId})`}
                opacity="0.85"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>
        );

      case 'sunflower':
      case 'daisy':
        const petalCount = flowerType === 'sunflower' ? 16 : 12;
        return (
          <g>
            {Array.from({ length: petalCount }).map((_, i) => {
              const angle = (360 / petalCount) * i;
              return (
                <ellipse
                  key={i}
                  cx="50"
                  cy="16"
                  rx={flowerType === 'sunflower' ? 6 : 7}
                  ry={flowerType === 'sunflower' ? 18 : 20}
                  fill={`url(#${gradId})`}
                  stroke={petalColor}
                  strokeWidth="1"
                  transform={`rotate(${angle} 50 50)`}
                  opacity="0.95"
                />
              );
            })}
          </g>
        );

      case 'hydrangea':
        return (
          <g>
            {/* Cluster of 4-petal florets */}
            {[
              { x: 30, y: 30, r: 0 },
              { x: 70, y: 30, r: 15 },
              { x: 25, y: 65, r: 45 },
              { x: 75, y: 65, r: 30 },
              { x: 50, y: 22, r: 60 },
              { x: 50, y: 78, r: 75 },
            ].map((floret, idx) => (
              <g key={idx} transform={`translate(${floret.x}, ${floret.y}) rotate(${floret.r})`}>
                <circle cx="-7" cy="0" r="8" fill={`url(#${gradId})`} opacity="0.85" />
                <circle cx="7" cy="0" r="8" fill={`url(#${gradId})`} opacity="0.85" />
                <circle cx="0" cy="-7" r="8" fill={`url(#${gradId})`} opacity="0.85" />
                <circle cx="0" cy="7" r="8" fill={`url(#${gradId})`} opacity="0.85" />
                <circle cx="0" cy="0" r="2.5" fill={centerColor} />
              </g>
            ))}
          </g>
        );

      case 'lavender':
        return (
          <g>
            {/* Spire of layered florets */}
            <path d="M 50 10 L 50 90" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
            {[20, 32, 44, 56, 68].map((y, idx) => (
              <g key={idx}>
                <ellipse cx="40" cy={y} rx="9" ry="5" fill={`url(#${gradId})`} transform={`rotate(-25 40 ${y})`} />
                <ellipse cx="60" cy={y} rx="9" ry="5" fill={`url(#${gradId})`} transform={`rotate(25 60 ${y})`} />
                <ellipse cx="50" cy={y - 4} rx="7" ry="4" fill={`url(#${gradId})`} />
              </g>
            ))}
          </g>
        );

      case 'tulip':
        return (
          <g>
            {/* Elegant 3-cup petal structure */}
            <path
              d="M 50 18 C 22 24, 20 70, 50 86 C 80 70, 78 24, 50 18 Z"
              fill={`url(#${gradId})`}
              opacity="0.9"
            />
            {/* Center folded petal */}
            <path
              d="M 50 14 C 40 28, 38 60, 50 86 C 62 60, 60 28, 50 14 Z"
              fill={petalColor}
              opacity="0.95"
            />
            {/* Side overlap highlights */}
            <path
              d="M 28 32 C 34 50, 42 70, 50 86"
              fill="none"
              stroke="#FFF"
              strokeWidth="2"
              opacity="0.4"
            />
          </g>
        );

      case 'cherry-blossom':
        return (
          <g>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <path
                key={i}
                d="M 50 50 C 35 20, 42 10, 50 16 C 58 10, 65 20, 50 50 Z"
                fill={`url(#${gradId})`}
                stroke={petalColor}
                strokeWidth="1.5"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>
        );

      case 'camellia':
      case 'calla-lily':
      default:
        return (
          <g>
            {/* Overlapping rounded petals */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle
                key={i}
                cx="50"
                cy="30"
                r="22"
                fill={`url(#${gradId})`}
                opacity="0.8"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <circle
                key={`inner-${i}`}
                cx="50"
                cy="36"
                r="16"
                fill={`url(#${gradId})`}
                opacity="0.9"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>
        );
    }
  };

  return (
    <div
      className="relative flex items-center justify-center transition-transform duration-300 select-none"
      style={{
        width: `${baseDimension}px`,
        height: `${baseDimension}px`,
      }}
    >
      {/* Subtle Highlight Glow for prominent memories */}
      {isHighlight && (
        <div
          className="absolute inset-0 rounded-full animate-pulse pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${petalColor}40 0%, rgba(255,255,255,0) 70%)`,
            transform: 'scale(1.4)',
          }}
        />
      )}

      {/* SVG Flower Vector */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          {/* Subtle Outer Drop Glow */}
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Botanical Gradient */}
          <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor={petalColor} />
            <stop offset="100%" stopColor={centerColor} />
          </radialGradient>

          {/* Center Seed Disk Gradient */}
          <radialGradient id={centerGradId} cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="70%" stopColor={centerColor} />
            <stop offset="100%" stopColor="#1C1917" />
          </radialGradient>

          {/* Circular Clip for Photo center */}
          <clipPath id={clipId}>
            <circle cx="50" cy="50" r={centerRadius} />
          </clipPath>
        </defs>

        {/* Botanical Petals */}
        {renderPetals()}

        {/* Budding Overlay if bud state */}
        {bloomState === 'bud' && (
          <path
            d="M 50 20 C 35 35, 35 65, 50 82 C 65 65, 65 35, 50 20 Z"
            fill="#15803D"
            opacity="0.45"
          />
        )}

        {/* Flower Center Seed Core / Media Embed */}
        <circle
          cx="50"
          cy="50"
          r={centerRadius}
          fill={`url(#${centerGradId})`}
          stroke="#FFFFFF"
          strokeWidth={size === 'large' ? '2.5' : '2'}
          className="shadow-inner"
        />

        {/* Center Preview for Photo vs Icon for Video/Audio/Wish */}
        {memoryType === 'photo' && mediaUrl ? (
          <image
            href={mediaUrl}
            x={50 - centerRadius}
            y={50 - centerRadius}
            width={centerRadius * 2}
            height={centerRadius * 2}
            clipPath={`url(#${clipId})`}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : null}
      </svg>

      {/* Floating Center Overlay Badge for Video, Audio, Wish, or Non-Photo */}
      <div
        className="absolute flex items-center justify-center rounded-full pointer-events-none text-white shadow-xs"
        style={{
          width: `${centerRadius * 1.5}px`,
          height: `${centerRadius * 1.5}px`,
          background: memoryType === 'photo' ? 'rgba(0, 0, 0, 0.25)' : centerColor,
        }}
      >
        {memoryType === 'video' && (
          <Play
            className="w-3 h-3 fill-white text-white translate-x-0.5"
            style={{ width: `${centerRadius * 0.75}px`, height: `${centerRadius * 0.75}px` }}
          />
        )}
        {memoryType === 'audio' && (
          <Volume2
            className="w-3 h-3 text-white"
            style={{ width: `${centerRadius * 0.75}px`, height: `${centerRadius * 0.75}px` }}
          />
        )}
        {memoryType === 'wish' && (
          <MessageSquareText
            className="w-3 h-3 text-white"
            style={{ width: `${centerRadius * 0.75}px`, height: `${centerRadius * 0.75}px` }}
          />
        )}
        {memoryType === 'photo' && !mediaUrl && (
          <ImageIcon
            className="w-3 h-3 text-white"
            style={{ width: `${centerRadius * 0.75}px`, height: `${centerRadius * 0.75}px` }}
          />
        )}
      </div>

      {/* Small Highlight Ring Badge */}
      {isHighlight && (
        <span
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center"
          title="Featured Memory"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </span>
      )}
    </div>
  );
};
