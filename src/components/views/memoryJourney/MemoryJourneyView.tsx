import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Compass,
  Sparkles,
  Grid,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Map,
  Share2,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { OccasionType } from '../../../types';
import { JourneyMemory } from './types';
import {
  JOURNEY_CHAPTERS,
  OCCASION_THEMES,
  OCCASION_MEMORIES,
} from './journeyMockData';
import { MemoryJourneyRoad } from './MemoryJourneyRoad';
import { MemoryDetailModal } from './MemoryDetailModal';
import { JourneyDestination } from './JourneyDestination';
import { MemoryGridModal } from './MemoryGridModal';
import { journeySoundManager } from './journeySoundManager';

interface MemoryJourneyViewProps {
  onSwitchToFlipBook?: () => void;
}

export const MemoryJourneyView: React.FC<MemoryJourneyViewProps> = ({
  onSwitchToFlipBook,
}) => {
  const { activeOccasion, setCurrentView, showToast, triggerConfetti } = useApp();

  // Selected occasion type for preview flexibility
  const [selectedOccasionType, setSelectedOccasionType] = useState<OccasionType>(
    (activeOccasion?.occasionType as OccasionType) || 'Birthday'
  );

  // Sound toggle state
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  // Active memory for lightbox modal
  const [activeMemory, setActiveMemory] = useState<JourneyMemory | null>(null);

  // Discovered memory IDs tracker
  const [discoveredIds, setDiscoveredIds] = useState<string[]>(['jm-b1']);

  // All memories index modal
  const [showGridModal, setShowGridModal] = useState<boolean>(false);

  // Scroll tracking for traveler progress
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Current theme & memories
  const currentTheme = OCCASION_THEMES[selectedOccasionType] || OCCASION_THEMES.Birthday;
  const currentMemories = OCCASION_MEMORIES[selectedOccasionType] || OCCASION_MEMORIES.Birthday;

  // Track window scroll to calculate progress along the road
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const p = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(Math.round(p));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    journeySoundManager.setSoundEnabled(nextState);
    if (nextState) {
      journeySoundManager.playChime();
    }
  };

  const handleSelectMemory = (memory: JourneyMemory) => {
    setActiveMemory(memory);
    if (!discoveredIds.includes(memory.id)) {
      setDiscoveredIds((prev) => [...prev, memory.id]);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToDestination = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleDownloadKeepsake = () => {
    triggerConfetti();
    showToast('Preparing your offline Memory Journey Keepsake package...');
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-b ${currentTheme.ambientGradient} text-stone-900 transition-colors duration-500`}
    >
      {/* STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Back button & Template Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('celebration-page')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Celebration</span>
            </button>

            <span className="h-4 w-px bg-stone-300 hidden sm:block" />

            {/* Template badge */}
            <div className="hidden md:flex items-center gap-2 bg-amber-100/80 text-amber-900 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-300/60">
              <Map className="w-3.5 h-3.5 text-amber-600" />
              <span>Template: Memory Journey (Winding Road)</span>
            </div>
          </div>

          {/* Center: Occasion Flexibility Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-stone-500 hidden lg:inline">
              Occasion Theme:
            </label>
            <select
              value={selectedOccasionType}
              onChange={(e) => {
                const newType = e.target.value as OccasionType;
                setSelectedOccasionType(newType);
                journeySoundManager.playChime();
              }}
              className="text-xs font-semibold bg-white border border-stone-300 rounded-xl px-2.5 py-1.5 text-stone-800 shadow-xs focus:ring-2 focus:ring-amber-400 focus:outline-none cursor-pointer"
            >
              <option value="Birthday">🎂 Sarah's 25th Birthday</option>
              <option value="Anniversary">🥂 Elena & Marcus (Anniversary)</option>
              <option value="Wedding">💍 Clara & James (Wedding)</option>
              <option value="Bride to Be">👰 Clara's Bridal Journey</option>
              <option value="Graduation">🎓 Alex's Graduation</option>
            </select>
          </div>

          {/* Right: Sound, Grid Index, and Switch to Flip Book */}
          <div className="flex items-center gap-2">
            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isSoundOn
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-stone-200 text-stone-400'
              }`}
              title={isSoundOn ? 'Sound effects enabled' : 'Sound effects muted'}
            >
              {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSoundOn ? 'Sound On' : 'Muted'}</span>
            </button>

            {/* View All Memories Drawer / Grid */}
            <button
              onClick={() => {
                setShowGridModal(true);
                journeySoundManager.playChime();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Index</span>
            </button>

            {/* Switch to Flip Book Template option (so reviewers can compare both distinct experiences) */}
            {onSwitchToFlipBook ? (
              <button
                onClick={onSwitchToFlipBook}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                title="Switch to Flip Book Keepsake Template"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Flip Book Template</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('digital-keepsake')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Keepsake Store</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO / OCCASION BANNER HEADER */}
      <section className="pt-10 pb-6 px-4 text-center max-w-3xl mx-auto space-y-4">
        {/* Occasion Label Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 text-stone-600 shadow-xs border border-stone-200 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Keepsake Journey</span>
        </div>

        {/* Big Occasion Title */}
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-stone-900 tracking-tight leading-tight">
          {currentTheme.title}
        </h1>

        {/* Emotional Subtitle */}
        <p className="text-base sm:text-lg text-stone-600 font-serif italic max-w-xl mx-auto">
          {currentTheme.subtitle}
        </p>

        {/* Progress Indicator & Instruction */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm">
          {/* Progress pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-stone-800 font-bold shadow-sm border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {discoveredIds.length} of {currentMemories.length} Memories Discovered
            </span>
          </div>

          {/* Subtle instruction pill */}
          <div className="text-stone-500 font-medium">
            ✨ {currentTheme.instruction}
          </div>
        </div>

        {/* Quick jump shortcuts */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={handleScrollToDestination}
            className="text-xs text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-4 cursor-pointer"
          >
            Jump to Final Destination &darr;
          </button>
        </div>
      </section>

      {/* FLOATING JOURNEY PROGRESS TRACKER (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="bg-stone-900/90 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-mono font-bold">{scrollProgress}%</span>
          </div>
          <span className="text-stone-400">|</span>
          <span className="text-stone-300 font-medium">
            {discoveredIds.length}/{currentMemories.length} Discovered
          </span>
          <button
            onClick={handleScrollToTop}
            className="ml-1 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            title="Scroll to start of journey"
          >
            &uarr;
          </button>
        </div>
      </div>

      {/* MAIN ROAD CANVAS ENVIRONMENT */}
      <main className="relative w-full">
        <MemoryJourneyRoad
          memories={currentMemories}
          chapters={JOURNEY_CHAPTERS}
          theme={currentTheme}
          discoveredIds={discoveredIds}
          onSelectMemory={handleSelectMemory}
          accentColor={currentTheme.accentColor}
        />
      </main>

      {/* FINAL DESTINATION PAVILION (At the end of the road) */}
      <footer className="relative w-full">
        <JourneyDestination
          theme={currentTheme}
          totalMemories={currentMemories.length}
          discoveredCount={discoveredIds.length}
          onReplay={handleScrollToTop}
          onViewAll={() => setShowGridModal(true)}
          onDownloadKeepsake={handleDownloadKeepsake}
        />
      </footer>

      {/* MODAL 1: MEMORY DETAIL LIGHTBOX */}
      {activeMemory && (
        <MemoryDetailModal
          memory={activeMemory}
          allMemories={currentMemories}
          onClose={() => setActiveMemory(null)}
          onNavigate={(nextMem) => handleSelectMemory(nextMem)}
          accentColor={currentTheme.accentColor}
        />
      )}

      {/* MODAL 2: ALL MEMORIES GRID INDEX */}
      {showGridModal && (
        <MemoryGridModal
          memories={currentMemories}
          discoveredIds={discoveredIds}
          theme={currentTheme}
          onClose={() => setShowGridModal(false)}
          onSelectMemory={(m) => handleSelectMemory(m)}
        />
      )}
    </div>
  );
};
