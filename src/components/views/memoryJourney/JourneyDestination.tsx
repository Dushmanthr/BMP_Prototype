import React from 'react';
import {
  Sparkles,
  RotateCcw,
  Grid,
  Heart,
  Download,
  Share2,
  PartyPopper,
  Compass,
} from 'lucide-react';
import { OccasionThemeConfig } from './types';
import { journeySoundManager } from './journeySoundManager';

interface JourneyDestinationProps {
  theme: OccasionThemeConfig;
  totalMemories: number;
  discoveredCount: number;
  onReplay: () => void;
  onViewAll: () => void;
  onDownloadKeepsake: () => void;
}

export const JourneyDestination: React.FC<JourneyDestinationProps> = ({
  theme,
  totalMemories,
  discoveredCount,
  onReplay,
  onViewAll,
  onDownloadKeepsake,
}) => {
  const handleReplayClick = () => {
    journeySoundManager.playCelebrationFanfare();
    onReplay();
  };

  return (
    <div className="relative pt-12 pb-24 px-4 flex flex-col items-center text-center max-w-4xl mx-auto">
      {/* Visual Road Arrival Anchor */}
      <div className="w-1.5 h-16 bg-gradient-to-b from-amber-400/80 to-amber-200/20 mb-4 rounded-full" />

      {/* Illuminated Celebration Pavilion Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-white/95 to-amber-50/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-amber-200/70 overflow-hidden">
        {/* Decorative Golden Roof / Arch Motif */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-400 via-rose-300 to-amber-400" />

        {/* Ambient Celebration Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

        {/* Pavilion Icon & Badge */}
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-rose-400 to-amber-200 p-0.5 shadow-xl rotate-3 hover:rotate-0 transition-transform">
              <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center text-amber-600">
                <PartyPopper className="w-10 h-10 animate-bounce" />
              </div>
            </div>
            {/* Sparkle Badges */}
            <span className="absolute -top-2 -right-2 text-xl animate-pulse">✨</span>
            <span className="absolute -bottom-1 -left-2 text-lg animate-pulse delay-200">
              🌟
            </span>
          </div>

          {/* Progress Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/60 shadow-xs text-xs sm:text-sm font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              {discoveredCount >= totalMemories
                ? `All ${totalMemories} Memories Discovered!`
                : `${discoveredCount} of ${totalMemories} Memories Discovered`}
            </span>
          </div>

          {/* Destination Title & Emotional Closing Message */}
          <div className="space-y-3 max-w-lg mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900 leading-tight">
              {theme.destinationTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
              {theme.destinationQuote}
            </p>
            <div className="pt-2">
              <span className="inline-block text-base sm:text-lg font-serif italic text-amber-800 font-semibold">
                “Thank you for being part of this journey.”
              </span>
            </div>
          </div>

          {/* Emotional "Your journey continues ❤️" Tag */}
          <div className="pt-2 pb-2">
            <span className="inline-flex items-center gap-2 text-rose-500 font-bold text-sm bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
              <Heart className="w-4 h-4 fill-current" />
              <span>Your journey continues ❤️</span>
            </span>
          </div>

          {/* Actions: Replay Journey & View All Memories */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <button
              onClick={handleReplayClick}
              id="replay-journey-btn"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-sm shadow-xl transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Journey</span>
            </button>

            <button
              onClick={onViewAll}
              id="view-all-memories-btn"
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm shadow-lg border border-stone-200 transition-all hover:scale-102 active:scale-98 cursor-pointer"
            >
              <Grid className="w-4 h-4 text-amber-600" />
              <span>View All Memories</span>
            </button>
          </div>

          {/* Download & Save Keepsake Action */}
          <div className="pt-4 border-t border-amber-200/50 w-full flex items-center justify-center">
            <button
              onClick={onDownloadKeepsake}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Digital Archive Package (.ZIP)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
