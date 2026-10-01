import React from 'react';
import { GardenCenterpiece } from './types';
import { GARDEN_ZONES } from './gardenMockData';
import { Sparkles, Trees, Heart } from 'lucide-react';

interface GardenPathLandscapeProps {
  canvasHeight: number;
  centerpiece: GardenCenterpiece;
  finalMessage: string;
  finalQuote: string;
  onExploreAgain: () => void;
  onViewAllMemories: () => void;
  accentColor: string;
}

export const GardenPathLandscape: React.FC<GardenPathLandscapeProps> = ({
  canvasHeight,
  centerpiece,
  finalMessage,
  finalQuote,
  onExploreAgain,
  onViewAllMemories,
  accentColor,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ height: `${canvasHeight}px` }}
    >
      {/* ----------------------------------------------------
          BACKGROUND ROLLING MEADOW GRADIENTS & SOFT SUNLIGHT
      ---------------------------------------------------- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9F5EB] via-[#F3F8F2] to-[#E5F2E8]" />

      {/* Subtle Dappled Sunlight Rays from top-right */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[1200px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 100% 0%, rgba(254, 243, 199, 0.7) 0%, rgba(253, 230, 138, 0.25) 45%, transparent 75%)',
        }}
      />

      {/* ----------------------------------------------------
          WINDING STONE COBBLESTONE PATHWAY (SVG)
      ---------------------------------------------------- */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox={`0 0 1000 ${canvasHeight}`}
      >
        <defs>
          {/* Path Stone Pattern */}
          <linearGradient id="path-stone-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E2DDD5" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#F5F2EB" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#E8E3DA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#DDD7CE" stopOpacity="0.8" />
          </linearGradient>

          {/* Path Border Dirt Shadow */}
          <filter id="path-shadow" x="-5%" y="-1%" width="110%" height="102%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#292524" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Outer soft path border (moss & gravel) */}
        <path
          d={`
            M 500 0
            C 420 180, 220 300, 280 500
            C 340 700, 720 780, 740 980
            C 760 1180, 260 1260, 240 1460
            C 220 1660, 680 1760, 700 1980
            C 720 2200, 360 2280, 480 2480
            L 520 2600
          `}
          fill="none"
          stroke="#C7D2BE"
          strokeWidth="110"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Main Cobblestone Flagstone Pathway */}
        <path
          d={`
            M 500 0
            C 420 180, 220 300, 280 500
            C 340 700, 720 780, 740 980
            C 760 1180, 260 1260, 240 1460
            C 220 1660, 680 1760, 700 1980
            C 720 2200, 360 2280, 480 2480
            L 520 2600
          `}
          fill="none"
          stroke="url(#path-stone-grad)"
          strokeWidth="78"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#path-shadow)"
        />

        {/* Stepping Stones / Natural Flagstone Cracks */}
        <path
          d={`
            M 500 0
            C 420 180, 220 300, 280 500
            C 340 700, 720 780, 740 980
            C 760 1180, 260 1260, 240 1460
            C 220 1660, 680 1760, 700 1980
            C 720 2200, 360 2280, 480 2480
            L 520 2600
          `}
          fill="none"
          stroke="#D6CEBE"
          strokeWidth="4"
          strokeDasharray="16 28"
          opacity="0.7"
        />
      </svg>

      {/* ----------------------------------------------------
          ENVIRONMENTAL BOTANICAL ACCENTS (TREES & SHRUBS)
      ---------------------------------------------------- */}

      {/* Top Left Dogwood Tree */}
      <div className="absolute top-[80px] left-[5%] opacity-75">
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
          {/* Trunk */}
          <path d="M 90 190 Q 95 120 85 80" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          <path d="M 85 110 Q 60 90 40 75" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M 88 95 Q 120 80 140 60" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          {/* Canopy foliage puffs */}
          <circle cx="85" cy="60" r="50" fill="#86EFAC" opacity="0.7" />
          <circle cx="50" cy="55" r="40" fill="#4ADE80" opacity="0.6" />
          <circle cx="120" cy="50" r="45" fill="#BBF7D0" opacity="0.65" />
          <circle cx="85" cy="40" r="35" fill="#F472B6" opacity="0.35" />
        </svg>
      </div>

      {/* Top Right Japanese Maple */}
      <div className="absolute top-[160px] right-[4%] opacity-70">
        <svg width="170" height="190" viewBox="0 0 170 190" fill="none">
          <path d="M 85 185 Q 80 120 90 80" stroke="#78350F" strokeWidth="10" strokeLinecap="round" />
          <circle cx="90" cy="65" r="48" fill="#FCA5A5" opacity="0.65" />
          <circle cx="125" cy="60" r="38" fill="#F87171" opacity="0.6" />
          <circle cx="60" cy="60" r="40" fill="#FECDD3" opacity="0.7" />
        </svg>
      </div>

      {/* ----------------------------------------------------
          ZONE 1 MARKER: THE BEGINNING
      ---------------------------------------------------- */}
      <div className="absolute top-[160px] left-1/2 -translate-x-1/2 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-emerald-200/80 text-emerald-800 text-xs font-serif font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Zone I • {GARDEN_ZONES[0].name}</span>
        </div>
        <p className="text-[11px] text-stone-500 font-serif italic mt-1 max-w-xs mx-auto">
          {GARDEN_ZONES[0].tagline}
        </p>
      </div>

      {/* Mid-Left Ornamental Garden Bench */}
      <div className="absolute top-[680px] left-[10%] opacity-85">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-white/70 backdrop-blur-xs border border-stone-200 shadow-sm max-w-[130px] text-center">
          <Trees className="w-5 h-5 text-emerald-700 mb-1" />
          <span className="text-[10px] font-serif font-bold text-stone-700">Wisteria Arbor</span>
          <span className="text-[9px] text-stone-500 italic">Rest in memories</span>
        </div>
      </div>

      {/* ----------------------------------------------------
          CENTRAL ELEMENT: THE MEMORY FLOWERING CENTERPIECE
          (Located at y = 880px)
      ---------------------------------------------------- */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-15 text-center pointer-events-auto"
        style={{ top: '880px' }}
      >
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-md border border-stone-200/90 shadow-xl max-w-md mx-auto space-y-3">
          {/* Subtle botanical crown ornament */}
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <div className="h-px w-8 bg-emerald-300" />
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500">
              Heart of the Garden
            </span>
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
            <div className="h-px w-8 bg-emerald-300" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-800">
            {centerpiece.title}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-serif italic leading-relaxed px-2">
            {centerpiece.emotionalQuote}
          </p>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-semibold tracking-wider border border-stone-200">
              {centerpiece.memorialPlaque}
            </span>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
          ZONE 2 MARKER: SPECIAL MOMENTS
      ---------------------------------------------------- */}
      <div className="absolute top-[980px] left-1/2 -translate-x-1/2 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-amber-200/80 text-amber-900 text-xs font-serif font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Zone II • {GARDEN_ZONES[1].name}</span>
        </div>
        <p className="text-[11px] text-stone-500 font-serif italic mt-1 max-w-xs mx-auto">
          {GARDEN_ZONES[1].tagline}
        </p>
      </div>

      {/* Right Weeping Willow Tree */}
      <div className="absolute top-[1340px] right-[6%] opacity-70">
        <svg width="190" height="210" viewBox="0 0 190 210" fill="none">
          <path d="M 95 200 Q 100 130 90 90" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
          {/* Weeping fronds */}
          {[
            'M 90 90 Q 60 130 50 180',
            'M 90 90 Q 75 140 70 190',
            'M 90 90 Q 110 140 115 190',
            'M 90 90 Q 130 130 140 180',
          ].map((d, i) => (
            <path key={i} d={d} stroke="#86EFAC" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          ))}
          <circle cx="95" cy="80" r="50" fill="#4ADE80" opacity="0.5" />
        </svg>
      </div>

      {/* ----------------------------------------------------
          ZONE 3 MARKER: CELEBRATION IN BLOOM
      ---------------------------------------------------- */}
      <div className="absolute top-[1740px] left-1/2 -translate-x-1/2 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-rose-200/80 text-rose-900 text-xs font-serif font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
          <span>Zone III • {GARDEN_ZONES[2].name}</span>
        </div>
        <p className="text-[11px] text-stone-500 font-serif italic mt-1 max-w-xs mx-auto">
          {GARDEN_ZONES[2].tagline}
        </p>
      </div>

      {/* ----------------------------------------------------
          FINAL GARDEN AREA: FLOWER-COVERED ROSE ARBOR
          (Located at y = 2520px)
      ---------------------------------------------------- */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-25 text-center pointer-events-auto w-full max-w-lg px-4"
        style={{ top: '2540px' }}
      >
        <div className="p-8 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-lg border border-stone-200/90 shadow-2xl space-y-5 text-center">
          {/* Rose Garland Ornament */}
          <div className="flex items-center justify-center gap-2 text-rose-500">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
              The Grand Pavilion
            </span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
            “{finalMessage}”
          </h2>

          <p className="text-sm text-stone-600 font-serif italic max-w-sm mx-auto leading-relaxed">
            {finalQuote}
          </p>

          {/* Action Navigation Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onViewAllMemories}
              id="view-all-memories-btn"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View All Memories</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={onExploreAgain}
              id="explore-again-btn"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-300 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              Explore Garden Again &uarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
