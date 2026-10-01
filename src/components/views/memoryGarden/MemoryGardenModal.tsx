import React, { useState, useEffect } from 'react';
import { GardenMemory } from './types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  User,
  Play,
  Pause,
  Volume2,
  Share2,
  Check,
} from 'lucide-react';
import { GardenFlowerSVG } from './GardenFlowerSVG';

interface MemoryGardenModalProps {
  memory: GardenMemory | null;
  allMemories: GardenMemory[];
  onClose: () => void;
  onNavigate: (memory: GardenMemory) => void;
  accentColor: string;
}

export const MemoryGardenModal: React.FC<MemoryGardenModalProps> = ({
  memory,
  allMemories,
  onClose,
  onNavigate,
  accentColor,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [likes, setLikes] = useState<number>(memory ? memory.likesCount : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state when memory changes
  useEffect(() => {
    if (memory) {
      setLikes(memory.likesCount);
      setHasLiked(false);
      setIsPlayingAudio(false);
      setAudioProgress(0);
    }
  }, [memory]);

  // Audio simulation timer (user-controlled ONLY, NO AUTOPLAY)
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const currentIndex = memory ? allMemories.findIndex((m) => m.id === memory.id) : -1;
  const prevMemory =
    currentIndex >= 0
      ? allMemories[(currentIndex - 1 + allMemories.length) % allMemories.length]
      : allMemories[0];
  const nextMemory =
    currentIndex >= 0
      ? allMemories[(currentIndex + 1) % allMemories.length]
      : allMemories[0];

  const handlePrev = () => {
    if (currentIndex < 0 || allMemories.length === 0) return;
    onNavigate(prevMemory);
  };

  const handleNext = () => {
    if (currentIndex < 0 || allMemories.length === 0) return;
    onNavigate(nextMemory);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, currentIndex, allMemories, onNavigate]);

  if (!memory || currentIndex < 0) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      {/* ----------------------------------------------------
          BOTANICAL KEEPSAKE MODAL CONTAINER
      ---------------------------------------------------- */}
      <div
        className="relative w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Botanical Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-3">
            {/* Flower Blossom Glyph */}
            <div className="w-8 h-8 flex items-center justify-center">
              <GardenFlowerSVG
                flowerType={memory.flowerType}
                bloomState={memory.bloomState}
                size="small"
                petalColor={memory.petalColor}
                centerColor={memory.centerColor}
                memoryType={memory.type}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-serif font-bold text-stone-800">
                  {memory.flowerVarietyName}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                  {memory.type} memory
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Memory {currentIndex + 1} of {allMemories.length} in bloom
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-memory-modal-btn"
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close memory viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Large Photo / Video Area */}
          {memory.mediaUrl && (
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
              <img
                src={memory.mediaUrl}
                alt={memory.title}
                className="w-full max-h-80 sm:max-h-96 object-cover object-center"
              />

              {/* Video Play Overlay if video */}
              {memory.type === 'video' && (
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-white/90 shadow-lg text-stone-900 flex items-center gap-2">
                    <Play className="w-6 h-6 fill-stone-900" />
                    <span className="text-xs font-bold pr-1">{memory.duration || 'Video'}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User-Controlled Audio Player (ONLY when memory has audio, NO AUTOPLAY) */}
          {memory.type === 'audio' && (
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-700" />
                  Voice Memory Recording ({memory.duration || '0:45'})
                </span>
                <span className="text-amber-700 font-mono text-[11px]">
                  {isPlayingAudio ? 'Playing...' : 'Click to listen'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  id="toggle-audio-player-btn"
                  className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-95"
                  aria-label={isPlayingAudio ? 'Pause voice recording' : 'Play voice recording'}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>

                {/* Progress bar */}
                <div className="flex-1 bg-amber-200/60 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Memory Title & Contributor Metadata */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {memory.title}
            </h2>

            {/* Contributor Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                {memory.contributorAvatar ? (
                  <img
                    src={memory.contributorAvatar}
                    alt={memory.contributorName}
                    className="w-7 h-7 rounded-full object-cover border border-stone-300"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div>
                  <span className="font-bold text-stone-800">{memory.contributorName}</span>
                  {memory.contributorRole && (
                    <span className="text-stone-500 block text-[10px]">
                      {memory.contributorRole}
                    </span>
                  )}
                </div>
              </div>

              {memory.date && (
                <div className="flex items-center gap-1.5 text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{memory.date}</span>
                </div>
              )}
            </div>

            {/* Short Emotional Message / Story */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/70">
              <p className="text-stone-700 font-serif italic text-base sm:text-lg leading-relaxed">
                “{memory.content}”
              </p>
              <p className="text-right text-xs font-semibold text-stone-500 mt-2">
                — {memory.contributorName}
              </p>
            </div>
          </div>

          {/* Interaction Bar: Heart appreciation & Share */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`}
              />
              <span>{likes} Loved this memory</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------
            FOOTER: PREVIOUS & NEXT MEMORY NAVIGATION
        ---------------------------------------------------- */}
        <div className="px-6 py-4 bg-stone-50/90 border-t border-stone-200 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            id="prev-memory-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs sm:text-sm font-serif font-bold border border-stone-200 shadow-2xs transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>&larr; Previous Memory</span>
          </button>

          <span className="text-xs text-stone-400 font-mono hidden sm:inline">
            Use &larr; / &rarr; keys
          </span>

          <button
            onClick={handleNext}
            id="next-memory-btn"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-serif font-bold shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <span>Next Memory &rarr;</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
