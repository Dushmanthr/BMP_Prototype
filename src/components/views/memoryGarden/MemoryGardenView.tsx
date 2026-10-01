import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Map,
  Grid,
  Download,
  Flower2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { OccasionType } from '../../../types';
import { GardenMemory } from './types';
import { getGardenConfig } from './gardenMockData';
import { GardenCanvas } from './GardenCanvas';
import { MemoryGardenModal } from './MemoryGardenModal';
import { GardenIndexModal } from './GardenIndexModal';
import { GardenKeepsakeExportModal } from './GardenKeepsakeExportModal';

interface MemoryGardenViewProps {
  onSwitchToFlipBook?: () => void;
  onSwitchToJourney?: () => void;
  onSwitchToConstellation?: () => void;
}

export const MemoryGardenView: React.FC<MemoryGardenViewProps> = ({
  onSwitchToFlipBook,
  onSwitchToJourney,
  onSwitchToConstellation,
}) => {
  const { activeOccasion, setCurrentView, showToast, triggerConfetti } = useApp();

  // Selected occasion type for preview flexibility
  const [selectedOccasionType, setSelectedOccasionType] = useState<OccasionType>(
    (activeOccasion?.occasionType as OccasionType) || 'Birthday'
  );

  // Active memory for modal viewer
  const [activeMemory, setActiveMemory] = useState<GardenMemory | null>(null);

  // Set of memory IDs discovered / viewed
  const [discoveredMemoryIds, setDiscoveredMemoryIds] = useState<string[]>([]);

  // Modals state
  const [showIndexModal, setShowIndexModal] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Current occasion configuration
  const currentConfig = getGardenConfig(
    selectedOccasionType,
    activeOccasion?.celebrationPersonName || 'Sarah Vance'
  );

  const currentMemories = currentConfig.memories;

  // Handle selecting a flower
  const handleSelectMemory = (memory: GardenMemory) => {
    setActiveMemory(memory);
    if (!discoveredMemoryIds.includes(memory.id)) {
      setDiscoveredMemoryIds((prev) => [...prev, memory.id]);
    }
  };

  // Scroll to top of garden
  const handleExploreAgain = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Returned to the garden entrance 🌿');
  };

  // Handle download keepsake archive
  const handleDownloadKeepsake = () => {
    triggerConfetti();
    showToast('Memory Garden Keepsake package downloaded successfully! 🌸');
  };

  return (
    <div className="min-h-screen bg-[#F3F8F2] text-stone-800 flex flex-col relative selection:bg-emerald-200 selection:text-emerald-950">
      {/* =========================================================
          MINIMAL ELEGANT HEADER (GARDEN STAYS THE HERO)
      ========================================================= */}
      <header className="sticky top-0 z-30 bg-[#F3F8F2]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back button & Template Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('celebration-page')}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-xl hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Template indicator badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300/80 text-emerald-900 text-xs font-serif font-bold tracking-wide shadow-2xs">
              <Flower2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Template: Memory Garden</span>
            </div>
          </div>

          {/* Center: Minimal Header Title & Tagline */}
          <div className="text-center px-2">
            <h1 className="text-base sm:text-lg font-serif font-bold text-stone-900 tracking-tight leading-tight">
              {currentConfig.headerTitle}
            </h1>
            <p className="text-[11px] sm:text-xs text-stone-500 font-serif italic hidden md:block">
              {currentConfig.tagline}
            </p>
          </div>

          {/* Right: Controls & Template Switchers */}
          <div className="flex items-center gap-2">
            {/* Occasion Preview Switcher Dropdown */}
            <div className="relative inline-block">
              <select
                value={selectedOccasionType}
                onChange={(e) => {
                  const newOccasion = e.target.value as OccasionType;
                  setSelectedOccasionType(newOccasion);
                  setDiscoveredMemoryIds([]);
                  showToast(`Garden adapted for ${newOccasion} celebration`);
                }}
                className="appearance-none bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-serif font-bold pl-2.5 pr-7 py-1.5 rounded-xl shadow-2xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                title="Preview garden for different celebration types"
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding">Wedding</option>
                <option value="Graduation">Graduation</option>
                <option value="Bride to Be">Bride-to-Be</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View All Memories Herbarium Drawer Button */}
            <button
              onClick={() => setShowIndexModal(true)}
              id="header-herbarium-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-serif font-bold shadow-2xs transition-colors cursor-pointer"
              title="View all memories in a botanical herbarium index"
            >
              <Grid className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Index</span>
            </button>

            {/* Keepsake Archive Export Button */}
            <button
              onClick={() => setShowExportModal(true)}
              id="header-export-btn"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-serif font-bold shadow-2xs transition-colors cursor-pointer"
              title="Download memory garden archive"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span>Export</span>
            </button>

            {/* Template Switcher: Flip Book */}
            <button
              onClick={() => {
                if (onSwitchToFlipBook) onSwitchToFlipBook();
                else setCurrentView('digital-keepsake');
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-serif font-bold border border-stone-200 transition-all cursor-pointer"
              title="Switch to Flip Book Keepsake Template"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden xl:inline">Flip Book</span>
            </button>

            {/* Template Switcher: Memory Journey */}
            <button
              onClick={() => {
                if (onSwitchToJourney) onSwitchToJourney();
                else setCurrentView('memory-journey');
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-serif font-bold border border-stone-200 transition-all cursor-pointer"
              title="Switch to Memory Journey Keepsake Template"
            >
              <Map className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden xl:inline">Journey</span>
            </button>

            {/* Template Switcher: Memory Constellation */}
            <button
              onClick={() => {
                if (onSwitchToConstellation) onSwitchToConstellation();
                else setCurrentView('memory-constellation');
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-serif font-bold border border-stone-200 transition-all cursor-pointer"
              title="Switch to Memory Constellation Keepsake Template"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden xl:inline">Sky</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO OVERVIEW & EXPLORATION GUIDE
      ========================================================= */}
      <section className="pt-8 pb-4 px-4 text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 text-emerald-800 shadow-2xs border border-emerald-200/80 text-[11px] font-serif font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
          <span>Interactive Keepsake Botanical Garden</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
          {currentConfig.headerTitle}
        </h2>

        <p className="text-sm sm:text-base text-stone-600 font-serif italic max-w-lg mx-auto">
          “{currentConfig.tagline}”
        </p>

        {/* Discovery Counter Pill */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-stone-800 text-xs font-serif font-bold shadow-2xs border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {discoveredMemoryIds.length} of {currentMemories.length} Memories Bloomed
            </span>
          </div>

          <span className="text-xs text-stone-500 font-serif italic hidden sm:inline">
            Hover over any flower to preview, or click to open.
          </span>
        </div>
      </section>

      {/* =========================================================
          MAIN IMMERSIVE BOTANICAL GARDEN CANVAS
      ========================================================= */}
      <main className="flex-1 relative w-full overflow-x-hidden">
        <GardenCanvas
          memories={currentMemories}
          centerpiece={currentConfig.centerpiece}
          finalMessage={currentConfig.finalMessage}
          finalQuote={currentConfig.finalQuote}
          onSelectMemory={handleSelectMemory}
          discoveredMemoryIds={discoveredMemoryIds}
          onExploreAgain={handleExploreAgain}
          onViewAllMemories={() => setShowIndexModal(true)}
          accentColor={currentConfig.accentColor}
        />
      </main>

      {/* =========================================================
          MODAL 1: MEMORY DETAIL BOTANICAL LIGHTBOX
      ========================================================= */}
      {activeMemory && (
        <MemoryGardenModal
          memory={activeMemory}
          allMemories={currentMemories}
          onClose={() => setActiveMemory(null)}
          onNavigate={(nextMem) => handleSelectMemory(nextMem)}
          accentColor={currentConfig.accentColor}
        />
      )}

      {/* =========================================================
          MODAL 2: ALL MEMORIES HERBARIUM & INDEX
      ========================================================= */}
      {showIndexModal && (
        <GardenIndexModal
          memories={currentMemories}
          onClose={() => setShowIndexModal(false)}
          onSelectMemory={(m) => handleSelectMemory(m)}
          personName={currentConfig.personName}
        />
      )}

      {/* =========================================================
          MODAL 3: KEEPSAKE ARCHIVE EXPORT
      ========================================================= */}
      {showExportModal && (
        <GardenKeepsakeExportModal
          config={currentConfig}
          onClose={() => setShowExportModal(false)}
          onDownload={handleDownloadKeepsake}
        />
      )}
    </div>
  );
};
