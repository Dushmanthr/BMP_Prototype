import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { OccasionType } from '../../../types';
import { BloomPetalData, BloomStage } from './types';
import { getBloomConfig } from './memoryBloomData';
import { BloomScene } from './BloomScene';
import { MemoryViewer } from './MemoryViewer';
import { BloomIndexModal } from './BloomIndexModal';
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Map,
  Grid,
  Flower2,
  ChevronDown,
  RotateCcw,
  Eye,
} from 'lucide-react';

interface MemoryBloomViewProps {
  onSwitchToFlipBook?: () => void;
  onSwitchToJourney?: () => void;
  onSwitchToConstellation?: () => void;
  onSwitchToGarden?: () => void;
}

export const MemoryBloomView: React.FC<MemoryBloomViewProps> = ({
  onSwitchToFlipBook,
  onSwitchToJourney,
  onSwitchToConstellation,
  onSwitchToGarden,
}) => {
  const { activeOccasion, setCurrentView, showToast } = useApp();

  // Selected occasion type for flexible celebration preview
  const [selectedOccasionType, setSelectedOccasionType] = useState<OccasionType>(
    (activeOccasion?.occasionType as OccasionType) || 'Birthday'
  );

  // Bloom stage state: 'closed' | 'unfolding' | 'partially-open' | 'fully-bloomed'
  const [stage, setStage] = useState<BloomStage>('closed');

  // Currently active memory for detailed viewer modal
  const [activeMemory, setActiveMemory] = useState<BloomPetalData | null>(null);

  // Set of memory IDs that have been explored / blossomed
  const [exploredIds, setExploredIds] = useState<string[]>([]);

  // Index modal drawer
  const [showIndexModal, setShowIndexModal] = useState<boolean>(false);

  // Occasion configuration
  const currentConfig = getBloomConfig(
    selectedOccasionType,
    activeOccasion?.celebrationPersonName || 'Sarah Jenkins'
  );

  const memories = currentConfig.memories;

  // Auto-transition from 'unfolding' to 'partially-open'
  useEffect(() => {
    if (stage === 'unfolding') {
      const timer = setTimeout(() => {
        setStage('partially-open');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Check if all memories have been explored -> enter final bloom
  useEffect(() => {
    if (
      exploredIds.length === memories.length &&
      memories.length > 0 &&
      stage !== 'closed' &&
      stage !== 'fully-bloomed'
    ) {
      setStage('fully-bloomed');
      showToast('Our Story has fully blossomed ✨');
    }
  }, [exploredIds.length, memories.length, stage, showToast]);

  // Handle unfolding interaction
  const handleBeginUnfolding = () => {
    if (stage === 'closed') {
      setStage('unfolding');
      showToast('The petals are gently unfolding...');
    }
  };

  // Handle petal selection
  const handleSelectPetal = (petal: BloomPetalData) => {
    if (stage === 'closed') {
      // If user clicks the closed bud, unfold first
      setStage('unfolding');
      return;
    }

    setActiveMemory(petal);
    if (!exploredIds.includes(petal.id)) {
      setExploredIds((prev) => [...prev, petal.id]);
    }
  };

  // Close memory viewer and return to bloom
  const handleCloseMemoryViewer = () => {
    setActiveMemory(null);
  };

  // Memory viewer navigation (Next / Prev)
  const currentActiveIndex = activeMemory
    ? memories.findIndex((m) => m.id === activeMemory.id)
    : -1;

  const handlePrevMemory = () => {
    if (currentActiveIndex > 0) {
      const prev = memories[currentActiveIndex - 1];
      setActiveMemory(prev);
      if (!exploredIds.includes(prev.id)) {
        setExploredIds((curr) => [...curr, prev.id]);
      }
    }
  };

  const handleNextMemory = () => {
    if (currentActiveIndex < memories.length - 1) {
      const next = memories[currentActiveIndex + 1];
      setActiveMemory(next);
      if (!exploredIds.includes(next.id)) {
        setExploredIds((curr) => [...curr, next.id]);
      }
    }
  };

  // Reset exploration
  const handleResetBloom = () => {
    setStage('closed');
    setExploredIds([]);
    setActiveMemory(null);
    showToast('Returned to the closed bud');
  };

  // Force fully blossomed preview state
  const handleForceFullyBloomed = () => {
    setStage('fully-bloomed');
    setExploredIds(memories.map((m) => m.id));
    showToast('Revealed full blossoming state');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#243B53] flex flex-col relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* =========================================================
          TOP NAVIGATION BAR
      ========================================================= */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-rose-100/70 px-4 sm:px-6 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Back & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('celebration-page')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#243B53] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Celebration</span>
            </button>

            <span className="text-stone-300 hidden sm:inline">|</span>

            {/* Template Title Badge */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
              <span className="text-xs font-bold text-stone-900 tracking-wide">
                Memory Bloom
              </span>
              <span className="text-[10px] font-semibold bg-rose-100 text-[#FF6B6B] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Keepsake
              </span>
            </div>
          </div>

          {/* Right: Controls & Template Switchers */}
          <div className="flex items-center gap-2">
            {/* Occasion Preview Switcher Dropdown */}
            <div className="relative">
              <select
                value={selectedOccasionType}
                onChange={(e) => {
                  setSelectedOccasionType(e.target.value as OccasionType);
                  setExploredIds([]);
                  setStage('closed');
                }}
                className="appearance-none bg-white border border-rose-200/90 text-stone-700 text-xs font-medium pl-3 pr-7 py-1.5 rounded-xl shadow-2xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FF6B6B]"
                title="Preview different celebration occasions"
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Wedding">Wedding</option>
                <option value="Bride to Be">Bride to Be</option>
                <option value="Graduation">Graduation</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View All Memories Index Modal */}
            <button
              onClick={() => setShowIndexModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-rose-200/80 text-stone-700 hover:bg-rose-50/50 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              title="View all memory petals index"
            >
              <Grid className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span className="hidden md:inline">Petals Index</span>
            </button>

            {/* Template Switcher: Flip Book */}
            <button
              onClick={() => {
                if (onSwitchToFlipBook) onSwitchToFlipBook();
                else setCurrentView('digital-keepsake');
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
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
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
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
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
              title="Switch to Memory Constellation Keepsake Template"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden xl:inline">Sky</span>
            </button>

            {/* Template Switcher: Memory Garden */}
            <button
              onClick={() => {
                if (onSwitchToGarden) onSwitchToGarden();
                else setCurrentView('memory-garden');
              }}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-200 transition-all cursor-pointer"
              title="Switch to Memory Garden Keepsake Template"
            >
              <Flower2 className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Garden</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          HERO BANNER & EMOTIONAL INTRO
      ========================================================= */}
      <section className="pt-6 sm:pt-8 pb-2 px-4 text-center max-w-2xl mx-auto space-y-2.5 select-none">
        {/* Occasion Label Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-[#FF6B6B] border border-rose-200/70 text-[11px] font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-[#FF6B6B]" />
          <span>Interactive Keepsake Composition</span>
        </div>

        {/* Person's Celebration Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#243B53] tracking-tight leading-tight">
          {currentConfig.occasionTitle}
        </h1>

        {/* Short Emotional Message */}
        <p className="text-sm sm:text-base text-stone-600 font-serif italic max-w-md mx-auto">
          {currentConfig.subtitle}
        </p>

        {/* Interactive State Prompt */}
        <div className="pt-1 flex items-center justify-center gap-3">
          {stage === 'closed' ? (
            <button
              onClick={handleBeginUnfolding}
              id="begin-unfolding-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              <Flower2 className="w-4 h-4 animate-spin-slow" />
              <span>Begin Unfolding Our Story</span>
            </button>
          ) : stage === 'fully-bloomed' ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Our Story is in Full Radiance • 12 Petals Blossomed</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-stone-700 border border-rose-200/80 shadow-2xs text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
              <span>
                {exploredIds.length} of {memories.length} Petals Unfolded • Touch any petal
              </span>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          MAIN INTERACTIVE BLOOM CANVAS
      ========================================================= */}
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-4 sm:py-6 relative">
        <BloomScene
          memories={memories}
          stage={stage}
          personName={currentConfig.personName}
          centerSubtitle={currentConfig.centerSubtitle}
          exploredIds={exploredIds}
          activeMemoryId={activeMemory?.id || null}
          onSelectPetal={handleSelectPetal}
          onCenterClick={() => {
            if (stage === 'closed') {
              handleBeginUnfolding();
            } else if (stage === 'fully-bloomed') {
              setShowIndexModal(true);
            }
          }}
        />

        {/* Bottom Contextual Exploration Controls */}
        <div className="w-full max-w-md mx-auto pt-4 px-4 flex items-center justify-between text-xs text-stone-500 border-t border-rose-100/60 mt-2 select-none">
          {stage === 'closed' ? (
            <p className="text-center w-full text-stone-400 italic font-serif">
              Touch the closed bloom or click the button above to begin.
            </p>
          ) : stage === 'fully-bloomed' ? (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleResetBloom}
                className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Explore Again</span>
              </button>

              <button
                onClick={() => setShowIndexModal(true)}
                className="flex items-center gap-1.5 text-[#FF6B6B] hover:text-[#fa5a5a] font-bold cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View All Memories</span>
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleResetBloom}
                className="flex items-center gap-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                title="Return to the closed bud"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[11px]">Fold Flower</span>
              </button>

              <button
                onClick={handleForceFullyBloomed}
                className="text-[11px] text-stone-500 hover:text-[#FF6B6B] font-medium cursor-pointer"
              >
                Bloom Completely →
              </button>
            </div>
          )}
        </div>
      </main>

      {/* =========================================================
          MODALS & MEMORY VIEWER
      ========================================================= */}
      {/* Individual Petal Memory Viewer */}
      {activeMemory && (
        <MemoryViewer
          memory={activeMemory}
          totalCount={memories.length}
          onClose={handleCloseMemoryViewer}
          onPrev={handlePrevMemory}
          onNext={handleNextMemory}
          hasPrev={currentActiveIndex > 0}
          hasNext={currentActiveIndex < memories.length - 1}
        />
      )}

      {/* View All Memories Index Drawer */}
      {showIndexModal && (
        <BloomIndexModal
          memories={memories}
          exploredIds={exploredIds}
          onSelectMemory={(petal) => {
            setActiveMemory(petal);
            if (!exploredIds.includes(petal.id)) {
              setExploredIds((prev) => [...prev, petal.id]);
            }
          }}
          onClose={() => setShowIndexModal(false)}
        />
      )}

      {/* Inline Scoped Animations */}
      <style>{`
        @keyframes bloomBreathe {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-5px) scale(1.015);
          }
        }
        .animate-bloom-breathe {
          animation: bloomBreathe 7s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bloom-breathe {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
