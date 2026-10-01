import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Play,
  Pause,
  Download,
  Sparkles,
  Compass,
} from 'lucide-react';

interface ConstellationControlsProps {
  memoryCount: number;
  onOpenGrid: () => void;
  onToggleTour: () => void;
  isTourRunning: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onDownloadKeepsake: () => void;
}

export const ConstellationControls: React.FC<ConstellationControlsProps> = ({
  memoryCount,
  onOpenGrid,
  onToggleTour,
  isTourRunning,
  onZoomIn,
  onZoomOut,
  onResetView,
  onDownloadKeepsake,
}) => {
  return (
    <div className="fixed bottom-6 inset-x-0 z-30 pointer-events-none flex flex-col items-center gap-3 px-4">
      {/* Emotional completion footer pill */}
      <div className="pointer-events-auto bg-[#0A0F1E]/80 backdrop-blur-xl border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300 shadow-xl flex items-center gap-2 select-none">
        <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
        <span>{memoryCount} Memories • One Beautiful Story</span>
      </div>

      {/* Floating Action Controls Dock */}
      <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl bg-[#0B1020]/90 backdrop-blur-2xl border border-white/20 shadow-2xl text-stone-200">
        {/* Sky Atlas / View All Memories Button */}
        <button
          onClick={onOpenGrid}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer hover:shadow-xs active:scale-95"
          title="Open Sky Atlas (All memories index)"
        >
          <Grid className="w-3.5 h-3.5 text-amber-300" />
          <span>Sky Atlas</span>
        </button>

        {/* Starlight Guided Tour Button */}
        <button
          onClick={onToggleTour}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
            isTourRunning
              ? 'bg-[#FF6B6B] text-white shadow-[0_0_15px_rgba(255,107,107,0.5)]'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title="Automatically tour through each memory star"
        >
          {isTourRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Pause Tour</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span className="hidden sm:inline">Starlight</span>
              <span>Tour</span>
            </>
          )}
        </button>

        <span className="w-px h-5 bg-white/15 mx-0.5" />

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={onZoomIn}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onZoomOut}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onResetView}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Center Constellation"
            aria-label="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="w-px h-5 bg-white/15 mx-0.5 hidden sm:block" />

        {/* Download / Export Keepsake Button */}
        <button
          onClick={onDownloadKeepsake}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#F59E0B] text-white text-xs font-bold shadow-md hover:brightness-110 transition-all cursor-pointer active:scale-95"
          title="Download printable sky map and keepsake bundle"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Keepsake</span>
        </button>
      </div>
    </div>
  );
};
