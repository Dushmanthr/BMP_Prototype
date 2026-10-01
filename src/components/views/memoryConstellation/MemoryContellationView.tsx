import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Map,
  Compass,
  Download,
  Grid,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { OccasionType } from '../../../types';
import { ConstellationStar } from './types';
import {
  CONSTELLATION_CONFIGS,
  getConstellationConfig,
} from './constellationMockData';
import { ConstellationSky } from './ConstellationSky';
import { MemoryCelestialModal } from './MemoryCelestialModal';
import { ConstellationGridModal } from './ConstellationGridModal';
import { ConstellationControls } from './ConstellationControls';
import { constellationSoundManager } from './constellationSoundManager';

interface MemoryConstellationViewProps {
  onSwitchToFlipBook?: () => void;
  onSwitchToJourney?: () => void;
}

export const MemoryConstellationView: React.FC<MemoryConstellationViewProps> = ({
  onSwitchToFlipBook,
  onSwitchToJourney,
}) => {
  const { activeOccasion, setCurrentView, showToast, triggerConfetti } = useApp();

  // Selected occasion type for preview flexibility
  const [selectedOccasionType, setSelectedOccasionType] = useState<OccasionType>(
    (activeOccasion?.occasionType as OccasionType) || 'Birthday'
  );

  // Sound toggle
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Active memory for lightbox modal
  const [activeMemory, setActiveMemory] = useState<ConstellationStar | null>(null);

  // Grid modal for sky atlas
  const [showGridModal, setShowGridModal] = useState<boolean>(false);

  // Zoom level state
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  // Tour mode state
  const [isTourRunning, setIsTourRunning] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);

  // Current config based on occasion
  const currentConfig = getConstellationConfig(selectedOccasionType);
  const stars = currentConfig.stars;

  // Starlight tour auto-cycling
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTourRunning && !activeMemory) {
      timer = setInterval(() => {
        setTourIndex((prev) => {
          const next = (prev + 1) % stars.length;
          constellationSoundManager.playStarHover();
          return next;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isTourRunning, activeMemory, stars.length]);

  const handleToggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    constellationSoundManager.setSoundEnabled(nextState);
    if (nextState) {
      constellationSoundManager.playStarHover();
    }
  };

  const handleSelectStar = (star: ConstellationStar) => {
    setIsTourRunning(false);
    setActiveMemory(star);
    constellationSoundManager.playStarSelect();
  };

  const handleToggleTour = () => {
    const nextState = !isTourRunning;
    setIsTourRunning(nextState);
    if (nextState) {
      constellationSoundManager.playConstellationSwell();
      showToast('Starlight Tour started: cruising through your constellation...');
    }
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(1.5, prev + 0.15));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.75, prev - 0.15));
  };

  const handleResetView = () => {
    setZoomLevel(1.0);
    showToast('Constellation view centered');
  };

  const handleDownloadKeepsake = () => {
    triggerConfetti();
    constellationSoundManager.playStardustCheer();
    showToast(`Preparing ${currentConfig.personName}’s Memory Constellation Keepsake package...`);
  };

  const handleOccasionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as OccasionType;
    setSelectedOccasionType(newType);
    setTourIndex(0);
    constellationSoundManager.playConstellationSwell();
  };

  return (
    <div className="relative min-h-screen bg-[#070B16] text-white overflow-hidden flex flex-col font-sans select-none">
      {/* =========================================================
          STICKY TOP TRANSLUCENT CELESTIAL HEADER
      ========================================================= */}
      <header className="sticky top-0 z-40 bg-[#090E1D]/85 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* Left: Back button & Template Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setCurrentView('celebration-page')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              <ArrowLeft className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Back to Celebration</span>
            </button>

            <span className="h-4 w-px bg-white/15 hidden md:block" />

            {/* Template indicator badge */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#FF6B6B]/15 text-[#FF6B6B] px-3 py-1 rounded-full text-xs font-bold border border-[#FF6B6B]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Template: Memory Constellation (Starry Sky)</span>
            </div>
          </div>

          {/* Center: Occasion & Memory Title */}
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                {currentConfig.headerTitle}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-rose-300">
                {stars.length} Memories
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-rose-200/70 italic hidden xs:block truncate max-w-xs sm:max-w-sm">
              {currentConfig.tagline}
            </p>
          </div>

          {/* Right: Controls & Template Switchers */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Occasion Switcher Dropdown */}
            <select
              value={selectedOccasionType}
              onChange={handleOccasionChange}
              className="text-xs font-semibold bg-[#11192E] border border-white/20 rounded-xl px-2 sm:px-2.5 py-1.5 text-gray-200 shadow-xs focus:ring-2 focus:ring-rose-400 focus:outline-none cursor-pointer"
              title="Switch occasion celebration theme"
            >
              <option value="Birthday">🎂 Sarah's Birthday</option>
              <option value="Anniversary">🥂 Elena & Marcus (Anniversary)</option>
              <option value="Wedding">💍 Clara & James (Wedding)</option>
              <option value="Bride to Be">👰 Clara's Bridal Constellation</option>
              <option value="Graduation">🎓 Alex's Graduation</option>
            </select>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isSoundOn
                  ? 'bg-rose-500/20 border-rose-400/40 text-rose-300'
                  : 'bg-white/5 border-white/10 text-gray-500'
              }`}
              title={isSoundOn ? 'Celestial sounds enabled' : 'Sounds muted'}
              aria-label="Toggle sound"
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Switch to Flip Book Template */}
            <button
              onClick={() => {
                if (onSwitchToFlipBook) onSwitchToFlipBook();
                else setCurrentView('digital-keepsake');
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-xs font-bold border border-white/15 transition-all cursor-pointer"
              title="Switch to Flip Book Digital Keepsake Template"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Flip Book</span>
            </button>

            {/* Switch to Memory Journey Road Template */}
            <button
              onClick={() => {
                if (onSwitchToJourney) onSwitchToJourney();
                else setCurrentView('memory-journey');
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-xs font-bold border border-white/15 transition-all cursor-pointer"
              title="Switch to Memory Journey Road Keepsake Template"
            >
              <Map className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Memory Journey</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          MAIN INTERACTIVE CONSTELLATION CANVAS
      ========================================================= */}
      <main className="flex-1 relative flex flex-col">
        <ConstellationSky
          stars={stars}
          personName={currentConfig.personName}
          centerpieceSubtitle={currentConfig.centerpieceSubtitle}
          centerpieceQuote={currentConfig.centerpieceQuote}
          accentColor={currentConfig.accentColor}
          ambientNebulae={currentConfig.ambientNebulae}
          onSelectStar={handleSelectStar}
          zoomLevel={zoomLevel}
          isTourActive={isTourRunning}
          activeTourStarId={isTourRunning && stars[tourIndex] ? stars[tourIndex].id : null}
        />

        {/* Floating Bottom Dock & Controls */}
        <ConstellationControls
          memoryCount={stars.length}
          onOpenGrid={() => setShowGridModal(true)}
          onToggleTour={handleToggleTour}
          isTourRunning={isTourRunning}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetView={handleResetView}
          onDownloadKeepsake={handleDownloadKeepsake}
        />
      </main>

      {/* =========================================================
          CELESTIAL MEMORY VIEWER MODAL
      ========================================================= */}
      {activeMemory && (
        <MemoryCelestialModal
          star={activeMemory}
          allStars={stars}
          onClose={() => setActiveMemory(null)}
          onNavigate={(s) => setActiveMemory(s)}
          onSendCheer={(starId) => {
            triggerConfetti();
            showToast('Stardust cheer sent with love! ✨');
          }}
        />
      )}

      {/* =========================================================
          SKY ATLAS / ALL MEMORIES GRID MODAL
      ========================================================= */}
      {showGridModal && (
        <ConstellationGridModal
          stars={stars}
          personName={currentConfig.personName}
          onClose={() => setShowGridModal(false)}
          onSelectStar={(star) => {
            setActiveMemory(star);
            setShowGridModal(false);
          }}
          onDownloadKeepsake={handleDownloadKeepsake}
        />
      )}
    </div>
  );
};
