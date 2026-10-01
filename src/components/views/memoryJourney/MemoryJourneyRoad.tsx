import React, { useMemo } from 'react';
import { JourneyMemory, JourneyChapter, OccasionThemeConfig } from './types';
import { MemoryStopNode } from './MemoryStopNode';
import { Sparkles, Compass } from 'lucide-react';

interface MemoryJourneyRoadProps {
  memories: JourneyMemory[];
  chapters: JourneyChapter[];
  theme: OccasionThemeConfig;
  discoveredIds: string[];
  onSelectMemory: (memory: JourneyMemory) => void;
  accentColor: string;
}

// Key road control points (Progress 0 to 100 -> Center X coordinate out of 1000)
const ROAD_CONTROL_POINTS = [
  { p: 0, x: 500 },
  { p: 7, x: 500 },
  { p: 15, x: 640 },
  { p: 25, x: 380 },
  { p: 36, x: 630 },
  { p: 48, x: 370 },
  { p: 60, x: 640 },
  { p: 72, x: 360 },
  { p: 84, x: 630 },
  { p: 93, x: 420 },
  { p: 100, x: 500 },
];

const TOTAL_HEIGHT = 3800; // Total canvas height in px
const START_Y = 140;
const END_Y = 3620;

// Catmull-Rom / Hermite smooth curve evaluation for (x, y) at progress 0-100
function getRoadPoint(progress: number): { x: number; y: number } {
  const clamped = Math.max(0, Math.min(100, progress));
  const y = START_Y + (clamped / 100) * (END_Y - START_Y);

  // Find surrounding control points
  let idx = 0;
  for (let i = 0; i < ROAD_CONTROL_POINTS.length - 1; i++) {
    if (clamped >= ROAD_CONTROL_POINTS[i].p && clamped <= ROAD_CONTROL_POINTS[i + 1].p) {
      idx = i;
      break;
    }
  }

  const p0 = ROAD_CONTROL_POINTS[Math.max(0, idx - 1)];
  const p1 = ROAD_CONTROL_POINTS[idx];
  const p2 = ROAD_CONTROL_POINTS[Math.min(ROAD_CONTROL_POINTS.length - 1, idx + 1)];
  const p3 = ROAD_CONTROL_POINTS[Math.min(ROAD_CONTROL_POINTS.length - 1, idx + 2)];

  // Normalized t between p1 and p2
  const span = p2.p - p1.p || 1;
  const t = (clamped - p1.p) / span;

  // Catmull-rom spline formula for smooth natural curve
  const t2 = t * t;
  const t3 = t2 * t;

  const v0 = (p2.x - p0.x) * 0.5;
  const v1 = (p3.x - p1.x) * 0.5;

  const x =
    (2 * t3 - 3 * t2 + 1) * p1.x +
    (t3 - 2 * t2 + t) * v0 +
    (-2 * t3 + 3 * t2) * p2.x +
    (t3 - t2) * v1;

  return { x, y };
}

export const MemoryJourneyRoad: React.FC<MemoryJourneyRoadProps> = ({
  memories,
  chapters,
  theme,
  discoveredIds,
  onSelectMemory,
  accentColor,
}) => {
  // Generate high-resolution SVG path for the winding road
  const roadSvgPath = useMemo(() => {
    let d = '';
    const SAMPLES = 120;
    for (let i = 0; i <= SAMPLES; i++) {
      const p = (i / SAMPLES) * 100;
      const pt = getRoadPoint(p);
      if (i === 0) {
        d += `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      } else {
        d += ` L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      }
    }
    return d;
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: `${TOTAL_HEIGHT}px` }}
    >
      {/* BACKGROUND SVG: Rolling Hills, Road Surface, Dashes, Tethers, Environmental Foliage */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 1000 ${TOTAL_HEIGHT}`}
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Road Surface Gradients */}
          <linearGradient id="roadBaseWarm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFD5C6" />
            <stop offset="50%" stopColor="#F5EDE0" />
            <stop offset="100%" stopColor="#DFD5C6" />
          </linearGradient>

          <linearGradient id="roadBaseGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9C5B2" />
            <stop offset="50%" stopColor="#F3E5AB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D9C5B2" />
          </linearGradient>

          <linearGradient id="roadShadow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>

          {/* Filter for glowing beacons */}
          <filter id="beaconGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. SOFT ROLLING HILLS (Background Layer) */}
        {/* Hill 1 Top */}
        <path
          d="M -100 350 Q 250 180, 600 320 T 1100 240 L 1100 1200 L -100 1200 Z"
          fill={theme.hillsPalette.back}
          opacity="0.35"
        />
        {/* Hill 2 Mid-Upper */}
        <path
          d="M 1100 900 Q 750 780, 400 950 T -100 850 L -100 1800 L 1100 1800 Z"
          fill={theme.hillsPalette.mid}
          opacity="0.25"
        />
        {/* Hill 3 Mid-Lower */}
        <path
          d="M -100 1700 Q 300 1550, 700 1720 T 1100 1620 L 1100 2600 L -100 2600 Z"
          fill={theme.hillsPalette.front}
          opacity="0.2"
        />
        {/* Hill 4 Deep */}
        <path
          d="M 1100 2500 Q 650 2380, 300 2550 T -100 2450 L -100 3600 L 1100 3600 Z"
          fill={theme.hillsPalette.mid}
          opacity="0.3"
        />

        {/* 2. THE MEMORY ROAD PATH */}
        {/* Soft Drop Shadow Layer */}
        <path
          d={roadSvgPath}
          fill="none"
          stroke="rgba(0, 0, 0, 0.08)"
          strokeWidth="78"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(4, 8)"
        />

        {/* Outer Road Kerb / Border */}
        <path
          d={roadSvgPath}
          fill="none"
          stroke={theme.roadPalette.border}
          strokeWidth="68"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />

        {/* Road Surface Ribbon */}
        <path
          d={roadSvgPath}
          fill="none"
          stroke="url(#roadBaseWarm)"
          strokeWidth="56"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Glowing Center Dashes */}
        <path
          d={roadSvgPath}
          fill="none"
          stroke={theme.roadPalette.centerDash}
          strokeWidth="3.5"
          strokeDasharray="10 14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* 3. TETHERS & ROAD BEACONS FOR EACH MEMORY STOP */}
        {memories.map((mem) => {
          const roadPt = getRoadPoint(mem.roadProgress);
          // Target position for card anchor
          const cardX =
            mem.side === 'left'
              ? roadPt.x - 220 + mem.xOffsetPercent * 8
              : roadPt.x + 220 + mem.xOffsetPercent * 8;
          const cardY = roadPt.y;

          return (
            <g key={`tether-${mem.id}`}>
              {/* Dotted Tether Line connecting card to road */}
              <line
                x1={roadPt.x}
                y1={roadPt.y}
                x2={cardX}
                y2={cardY}
                stroke={accentColor}
                strokeWidth="2"
                strokeDasharray="4 6"
                opacity="0.5"
              />

              {/* Road Beacon: Outer Pulsing Ring */}
              <circle
                cx={roadPt.x}
                cy={roadPt.y}
                r="14"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* Road Beacon: Inner Solid Core */}
              <circle
                cx={roadPt.x}
                cy={roadPt.y}
                r="7"
                fill={discoveredIds.includes(mem.id) ? '#10B981' : '#FFFFFF'}
                stroke={accentColor}
                strokeWidth="2.5"
                filter="url(#beaconGlow)"
              />

              {/* Golden Center Dot */}
              <circle
                cx={roadPt.x}
                cy={roadPt.y}
                r="3"
                fill={discoveredIds.includes(mem.id) ? '#FFFFFF' : accentColor}
              />
            </g>
          );
        })}

        {/* 4. TASTEFUL DECORATIVE BOTANICAL TREES & LANTERNS */}
        {/* Tree clusters placed tastefully in empty scenic pockets */}
        {[
          { x: 180, y: 380, r: 24, c: '#A3B18A' },
          { x: 820, y: 520, r: 28, c: '#588157' },
          { x: 150, y: 1100, r: 26, c: '#8FBC8F' },
          { x: 860, y: 1420, r: 30, c: '#A3B18A' },
          { x: 170, y: 2050, r: 25, c: '#588157' },
          { x: 840, y: 2280, r: 28, c: '#8FBC8F' },
          { x: 190, y: 2950, r: 26, c: '#A3B18A' },
          { x: 830, y: 3200, r: 32, c: '#588157' },
        ].map((tree, i) => (
          <g key={`tree-${i}`} opacity="0.65">
            {/* Trunk */}
            <rect
              x={tree.x - 3}
              y={tree.y + tree.r - 4}
              width="6"
              height="20"
              fill="#8C7051"
              rx="2"
            />
            {/* Layered Foliage */}
            <circle cx={tree.x} cy={tree.y} r={tree.r} fill={tree.c} />
            <circle
              cx={tree.x - tree.r * 0.3}
              cy={tree.y - tree.r * 0.2}
              r={tree.r * 0.65}
              fill="#FFFFFF"
              opacity="0.18"
            />
          </g>
        ))}

        {/* Soft floating clouds */}
        {[
          { x: 120, y: 220, scale: 0.8 },
          { x: 780, y: 780, scale: 1 },
          { x: 100, y: 1520, scale: 0.9 },
          { x: 820, y: 2650, scale: 0.75 },
        ].map((cloud, i) => (
          <g
            key={`cloud-${i}`}
            transform={`translate(${cloud.x}, ${cloud.y}) scale(${cloud.scale})`}
            opacity="0.4"
          >
            <path
              d="M 0 0 C 15 -15, 45 -15, 60 0 C 75 -10, 105 -5, 115 15 C 130 15, 140 30, 135 45 C 130 60, 110 65, 95 65 L 10 65 C -10 65, -20 50, -15 35 C -20 20, -10 5, 0 0 Z"
              fill="#FFFFFF"
            />
          </g>
        ))}

        {/* Warm celebration lanterns hanging along the curves */}
        {[
          { x: 670, y: 340 },
          { x: 350, y: 820 },
          { x: 690, y: 1310 },
          { x: 330, y: 1810 },
          { x: 680, y: 2310 },
          { x: 340, y: 2810 },
        ].map((lantern, i) => (
          <g key={`lantern-${i}`}>
            {/* Post pole */}
            <line
              x1={lantern.x}
              y1={lantern.y - 30}
              x2={lantern.x}
              y2={lantern.y + 10}
              stroke="#A89F91"
              strokeWidth="2"
            />
            {/* Lantern head with warm glowing light */}
            <circle
              cx={lantern.x}
              cy={lantern.y - 25}
              r="7"
              fill="#FFD166"
              filter="url(#beaconGlow)"
            />
            <circle cx={lantern.x} cy={lantern.y - 25} r="3" fill="#FFFBEB" />
          </g>
        ))}
      </svg>

      {/* START OF JOURNEY: ARCHWAY / ENTRANCE MILESTONE */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
        style={{ top: '60px' }}
      >
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 text-stone-800 shadow-xl border border-stone-200 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>{theme.startArchLabel}</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
        </div>
        <div className="w-0.5 h-12 bg-gradient-to-b from-stone-300 to-transparent mt-2" />
      </div>

      {/* CHAPTER MILESTONE ARCHES ACROSS THE ROAD */}
      {chapters.map((ch) => {
        const pt = getRoadPoint(ch.roadProgress);
        return (
          <div
            key={`ch-${ch.id}`}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10"
            style={{ top: `${pt.y - 30}px` }}
          >
            <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-amber-200/80 flex items-center gap-2 text-stone-800">
              <span className="text-base">{ch.icon}</span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block text-amber-800">
                  {ch.title}
                </span>
                <span className="text-[10px] text-stone-500 hidden sm:inline">
                  {ch.subtitle}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* INTERACTIVE MEMORY STOP CARDS (Positioned organically along left/right of road) */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-8">
        {memories.map((memory, index) => {
          const roadPt = getRoadPoint(memory.roadProgress);
          const isDiscovered = discoveredIds.includes(memory.id);

          // Calculate desktop position based on left vs right side
          const isLeft = memory.side === 'left';

          return (
            <div
              key={memory.id}
              className={`absolute flex transition-transform duration-300 ${
                isLeft
                  ? 'justify-end pr-8 sm:pr-14 left-0 w-1/2'
                  : 'justify-start pl-8 sm:pl-14 right-0 w-1/2'
              }`}
              style={{
                top: `${roadPt.y - 80}px`,
                // Add subtle organic offset
                transform: `translateX(${memory.xOffsetPercent * 6}px)`,
              }}
            >
              <MemoryStopNode
                memory={memory}
                index={index}
                isDiscovered={isDiscovered}
                onSelect={onSelectMemory}
                accentColor={accentColor}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
