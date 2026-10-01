import React, { useEffect, useState } from 'react';
import { BloomPetalData } from './types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Play,
  Pause,
  Volume2,
  Calendar,
  User,
  Flower2,
  Image,
  Video,
  Mic,
  FileText,
} from 'lucide-react';

interface MemoryViewerProps {
  memory: BloomPetalData;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const MemoryViewer: React.FC<MemoryViewerProps> = ({
  memory,
  totalCount,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  // Audio playback simulator (strictly user-triggered, NEVER autoplay)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Video playback simulator (strictly user-triggered, NEVER autoplay)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Reset media states when memory changes
  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setIsPlayingVideo(false);
  }, [memory.id]);

  // Audio progress simulation ticker (visual only, NO audio sound played to respect prompt)
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
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Get type icon and label
  const getTypeBadge = () => {
    switch (memory.type) {
      case 'audio':
        return {
          icon: <Mic className="w-3.5 h-3.5 text-purple-600" />,
          label: 'Voice Message',
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
        };
      case 'video':
        return {
          icon: <Video className="w-3.5 h-3.5 text-amber-600" />,
          label: 'Video Keepsake',
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'wish':
        return {
          icon: <FileText className="w-3.5 h-3.5 text-rose-600" />,
          label: 'Written Tribute',
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'photo':
      default:
        return {
          icon: <Image className="w-3.5 h-3.5 text-[#FF6B6B]" />,
          label: 'Photograph',
          bg: 'bg-rose-50 text-[#FF6B6B] border-rose-200',
        };
    }
  };

  const badge = getTypeBadge();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/40 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Memory ${memory.memoryNumber}: ${memory.title}`}
    >
      {/* Central Translucent Memory Card Panel */}
      <div
        className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-rose-100/80 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top petal accent highlight */}
        <div className="h-1.5 w-full bg-gradient-to-r from-rose-200 via-[#FF6B6B] to-amber-200" />

        {/* Top Header Bar */}
        <div className="px-5 sm:px-8 pt-5 pb-3 flex items-center justify-between border-b border-rose-50/80">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Petal index pill */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-sans text-xs font-bold tracking-wide">
              <Flower2 className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span>
                Petal {memory.memoryNumber} of {totalCount}
              </span>
            </span>

            {/* Memory type badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.bg}`}
            >
              {badge.icon}
              <span>{badge.label}</span>
            </span>

            {/* Special memory star badge */}
            {memory.isSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Special Milestone</span>
              </span>
            )}
          </div>

          {/* Close / Return to Bloom Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-all cursor-pointer"
            aria-label="Return to Bloom"
          >
            <span className="hidden sm:inline">Return to Bloom</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {/* Memory Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#243B53] tracking-tight leading-snug">
              {memory.title}
            </h2>
            {memory.specialNote && (
              <p className="text-xs font-medium text-amber-700 mt-1 italic font-serif">
                ✨ {memory.specialNote}
              </p>
            )}
          </div>

          {/* Visual Media Showcase */}
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-rose-100/60 max-h-[380px] flex items-center justify-center">
            {memory.type === 'photo' && memory.mediaUrl && (
              <div className="relative w-full group overflow-hidden">
                <img
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {memory.type === 'video' && (
              <div className="relative w-full h-[280px] sm:h-[340px] bg-stone-900 overflow-hidden flex items-center justify-center">
                {memory.mediaUrl && (
                  <img
                    src={memory.mediaUrl}
                    alt={memory.title}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isPlayingVideo ? 'opacity-80' : 'opacity-70'
                    }`}
                  />
                )}
                {/* Custom Play Control (no audio autoplay) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/30">
                  <button
                    onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                    className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-[#FF6B6B] flex items-center justify-center shadow-xl transition-transform hover:scale-108 cursor-pointer"
                    aria-label={isPlayingVideo ? 'Pause video' : 'Play video'}
                  >
                    {isPlayingVideo ? (
                      <Pause className="w-7 h-7 fill-current ml-0.5" />
                    ) : (
                      <Play className="w-7 h-7 fill-current ml-1" />
                    )}
                  </button>
                  <span className="text-white text-xs font-medium mt-3 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                    {isPlayingVideo ? 'Playing Video Keepsake' : 'Click to Play Video (Silent Preview)'}
                  </span>
                </div>
              </div>
            )}

            {memory.type === 'audio' && (
              <div className="w-full p-6 sm:p-8 bg-gradient-to-br from-rose-50 via-white to-amber-50 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 text-[#FF6B6B] flex items-center justify-center shadow-inner">
                  <Mic className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-stone-800">
                    Voice Note from {memory.contributorName}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Audio Duration: {memory.audioDuration || '0:48'} • Recorded with love
                  </p>
                </div>

                {/* Simulated Audio Waveform Bar */}
                <div className="w-full max-w-md bg-white rounded-2xl p-4 shadow-sm border border-stone-200/80 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                      className="w-10 h-10 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center justify-center shrink-0 shadow-md cursor-pointer transition-transform active:scale-95"
                      aria-label={isPlayingAudio ? 'Pause voice message' : 'Play voice message'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                    {/* Animated waveform bars */}
                    <div className="flex-1 flex items-center justify-between gap-1 h-8 px-2">
                      {[14, 24, 18, 30, 26, 12, 28, 32, 20, 16, 28, 22, 18, 26, 14, 30, 20, 12].map(
                        (h, idx) => (
                          <span
                            key={idx}
                            className={`w-1 rounded-full transition-all duration-200 ${
                              isPlayingAudio ? 'bg-[#FF6B6B]' : 'bg-stone-300'
                            }`}
                            style={{
                              height: isPlayingAudio
                                ? `${Math.max(6, (h * (idx % 2 === 0 ? 1.2 : 0.8)))}px`
                                : `${h * 0.6}px`,
                            }}
                          />
                        )
                      )}
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-500 shrink-0">
                      {isPlayingAudio ? `${Math.floor(audioProgress * 0.48)}s` : memory.audioDuration || '0:48'}
                    </span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#FF6B6B] h-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {memory.type === 'wish' && (
              <div className="w-full p-8 sm:p-10 bg-gradient-to-br from-amber-50/60 via-rose-50/40 to-stone-50 flex flex-col items-center text-center">
                <span className="text-4xl text-rose-300 font-serif leading-none select-none">“</span>
                <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed max-w-lg -mt-3">
                  {memory.content}
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200/60 flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-700">
                    — {memory.contributorName}
                  </span>
                  {memory.contributorRole && (
                    <span className="text-xs text-stone-500">
                      ({memory.contributorRole})
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Heartfelt Text Content (for non-wish types) */}
          {memory.type !== 'wish' && (
            <div className="bg-rose-50/40 rounded-2xl p-5 border border-rose-100/70">
              <p className="text-sm sm:text-base font-serif text-stone-700 leading-relaxed italic">
                “{memory.content}”
              </p>
            </div>
          )}

          {/* Contributor Profile & Date Information */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-stone-500 border-t border-stone-100">
            <div className="flex items-center gap-2.5">
              {memory.contributorAvatar ? (
                <img
                  src={memory.contributorAvatar}
                  alt={memory.contributorName}
                  className="w-8 h-8 rounded-full object-cover border border-rose-200 shadow-2xs"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-rose-100 text-[#FF6B6B] flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="font-bold text-stone-800 block text-xs">
                  {memory.contributorName}
                </span>
                {memory.contributorRole && (
                  <span className="text-[11px] text-stone-500 block">
                    {memory.contributorRole}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-stone-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{memory.date}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 sm:px-8 py-4 bg-stone-50/80 border-t border-rose-100/70 flex items-center justify-between">
          {/* Previous Memory */}
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hasPrev
                ? 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs'
                : 'opacity-40 cursor-not-allowed text-stone-400'
            }`}
            aria-label="Previous Memory"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Memory</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Quick Return Shortcut */}
          <button
            onClick={onClose}
            className="text-xs text-stone-500 hover:text-[#FF6B6B] font-semibold transition-colors cursor-pointer"
          >
            Close & Return
          </button>

          {/* Next Memory */}
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hasNext
                ? 'bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white shadow-xs'
                : 'opacity-40 cursor-not-allowed bg-stone-200 text-stone-400'
            }`}
            aria-label="Next Memory"
          >
            <span className="hidden sm:inline">Next Memory</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
