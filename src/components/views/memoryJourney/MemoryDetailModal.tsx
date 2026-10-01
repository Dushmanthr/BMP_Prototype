import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  User,
  Share2,
  Sparkles,
  Camera,
  Video,
  Mic,
  Mail,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { JourneyMemory } from './types';
import { journeySoundManager } from './journeySoundManager';

interface MemoryDetailModalProps {
  memory: JourneyMemory;
  allMemories: JourneyMemory[];
  onClose: () => void;
  onNavigate: (newMemory: JourneyMemory) => void;
  accentColor: string;
}

export const MemoryDetailModal: React.FC<MemoryDetailModalProps> = ({
  memory,
  allMemories,
  onClose,
  onNavigate,
  accentColor,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true);
  const [audioProgress, setAudioProgress] = useState<number>(25);
  const [likesCount, setLikesCount] = useState<number>(memory.likesCount);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number }>>([]);

  const currentIndex = allMemories.findIndex((m) => m.id === memory.id);
  const totalCount = allMemories.length;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalCount - 1;

  // Reset audio playback when memory changes
  useEffect(() => {
    setIsPlayingAudio(false);
    setIsPlayingVideo(true);
    setAudioProgress(15);
    setLikesCount(memory.likesCount);
    setHasLiked(false);
  }, [memory.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate(allMemories[currentIndex - 1]);
        journeySoundManager.playChime();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate(allMemories[currentIndex + 1]);
        journeySoundManager.playChime();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext, allMemories, onNavigate, onClose]);

  // Simulated audio progress timer
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount((prev) => prev + 1);
      journeySoundManager.playHeart();

      // Trigger visual floating heart
      const id = Date.now();
      const left = Math.random() * 60 + 20;
      setFloatingHearts((prev) => [...prev, { id, left }]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1000);
    }
  };

  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
    journeySoundManager.playChime();
  };

  // Render type label
  const renderTypeBadge = () => {
    switch (memory.type) {
      case 'photo':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 text-xs font-bold border border-amber-300/40">
            <Camera className="w-3.5 h-3.5" />
            Photo Memory
          </span>
        );
      case 'video':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-700 text-xs font-bold border border-rose-300/40">
            <Video className="w-3.5 h-3.5" />
            Video Memory
          </span>
        );
      case 'audio':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-700 text-xs font-bold border border-indigo-300/40">
            <Mic className="w-3.5 h-3.5" />
            Voice Recording {memory.duration && `(${memory.duration})`}
          </span>
        );
      case 'wish':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 text-xs font-bold border border-emerald-300/40">
            <Mail className="w-3.5 h-3.5" />
            Written Wish & Blessing
          </span>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar for Mobile */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform hover:scale-105 cursor-pointer"
            aria-label="Close memory modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Navigation Button */}
        {hasPrev && (
          <button
            onClick={() => {
              onNavigate(allMemories[currentIndex - 1]);
              journeySoundManager.playChime();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-xl border border-stone-200 transition-all hover:scale-110 cursor-pointer hidden sm:flex"
            aria-label="Previous memory"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Navigation Button */}
        {hasNext && (
          <button
            onClick={() => {
              onNavigate(allMemories[currentIndex + 1]);
              journeySoundManager.playChime();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 flex items-center justify-center shadow-xl border border-stone-200 transition-all hover:scale-110 cursor-pointer hidden sm:flex"
            aria-label="Next memory"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* LEFT / MEDIA COLUMN */}
        <div className="w-full md:w-3/5 bg-stone-900 flex items-center justify-center relative min-h-[300px] md:min-h-[520px] overflow-hidden">
          {memory.mediaUrl ? (
            <div className="w-full h-full relative flex items-center justify-center">
              <img
                src={memory.mediaUrl}
                alt={memory.title}
                className="max-h-[70vh] w-full object-cover md:object-contain select-none"
              />

              {/* Video Player Simulation Overlay */}
              {memory.type === 'video' && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      HD 1080p
                    </span>
                    <span className="text-xs text-white/80 font-mono">
                      {memory.duration || '1:12'}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                      className="w-16 h-16 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                    >
                      {isPlayingVideo ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 fill-current ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Video Timeline bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                        style={{ width: isPlayingVideo ? '65%' : '20%' }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-white/70 font-mono">
                      <span>0:42</span>
                      <span>{memory.duration || '1:12'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Player Simulation Overlay */}
              {memory.type === 'audio' && (
                <div className="absolute inset-0 bg-stone-950/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-white text-center space-y-6">
                  {/* Vinyl / Audio Wave Visualizer */}
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-rose-400 p-1 animate-spin duration-700 shadow-2xl">
                      <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center">
                        <Mic className="w-10 h-10 text-indigo-400" />
                      </div>
                    </div>
                  </div>

                  {/* Waveform Bouncing Bars */}
                  <div className="flex items-center gap-1.5 h-12">
                    {[16, 28, 42, 30, 48, 22, 38, 45, 20, 34, 40, 26, 18, 32].map(
                      (h, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-indigo-400 to-rose-300 transition-all duration-150"
                          style={{
                            height: isPlayingAudio ? `${h}px` : '8px',
                            animation: isPlayingAudio
                              ? `bounce 0.8s ease-in-out infinite alternate ${i * 0.08}s`
                              : 'none',
                          }}
                        />
                      )
                    )}
                  </div>

                  {/* Play / Pause Toggle Button */}
                  <button
                    onClick={handleAudioToggle}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-stone-900 font-bold text-sm shadow-xl hover:bg-stone-100 transition-all hover:scale-105 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-4 h-4" /> Pause Recording
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> Play Voice Memory
                      </>
                    )}
                  </button>

                  <span className="text-xs text-stone-400 font-mono">
                    Duration: {memory.duration || '0:48'}
                  </span>
                </div>
              )}
            </div>
          ) : (
            // Dedicated Parchment View for Written Wishes
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#FDFBF7] to-[#F5EFE6] text-stone-800">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 shadow-sm border border-emerald-200">
                <Mail className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2">
                Handwritten Wish & Keepsake Blessing
              </span>
              <p className="font-serif italic text-lg sm:text-xl text-center max-w-md leading-relaxed text-stone-800">
                "{memory.content}"
              </p>
              <div className="mt-6 flex items-center gap-2 text-stone-500 text-xs font-serif">
                <span>— Contributed with love by</span>
                <strong className="text-stone-800 font-sans">
                  {memory.contributorName}
                </strong>
              </div>
            </div>
          )}

          {/* Floating Heart Particles */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute bottom-10 pointer-events-none text-rose-500 animate-out fade-out slide-out-to-top-20 duration-1000 z-40"
              style={{ left: `${heart.left}%` }}
            >
              <Heart className="w-8 h-8 fill-current drop-shadow-lg" />
            </div>
          ))}
        </div>

        {/* RIGHT / STORY & METADATA COLUMN */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Top Tag & Progress */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>{renderTypeBadge()}</div>
              <span className="text-xs font-mono text-stone-400 font-medium">
                Memory {currentIndex + 1} of {totalCount}
              </span>
            </div>

            {/* Memory Title */}
            <div>
              <h3 className="font-serif font-bold text-2xl text-stone-900 leading-snug">
                {memory.title}
              </h3>
              {memory.locationTag && (
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{memory.locationTag}</span>
                </div>
              )}
            </div>

            {/* Contributor Profile */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
              {memory.contributorAvatar ? (
                <img
                  src={memory.contributorAvatar}
                  alt={memory.contributorName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-stone-200 flex items-center justify-center text-stone-600">
                  <User className="w-6 h-6" />
                </div>
              )}
              <div>
                <h5 className="font-bold text-sm text-stone-900">
                  {memory.contributorName}
                </h5>
                <p className="text-xs text-stone-500">
                  {memory.contributorRole || 'Cherished Contributor'}
                </p>
              </div>
            </div>

            {/* Full Story Content */}
            <div className="space-y-2">
              <h6 className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                The Memory & Message
              </h6>
              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line font-sans">
                {memory.content}
              </p>
              {memory.accentQuote && (
                <blockquote className="mt-3 p-3 bg-amber-50/70 border-l-3 border-amber-400 rounded-r-xl font-serif italic text-xs text-amber-900">
                  {memory.accentQuote}
                </blockquote>
              )}
            </div>

            {/* Date Metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Captured in {memory.date}</span>
            </div>
          </div>

          {/* Bottom Actions: Like reaction & Navigation */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  hasLiked ? 'fill-current scale-110' : ''
                }`}
              />
              <span>{likesCount} Hearts</span>
            </button>

            {/* Prev / Next navigation for mobile */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                disabled={!hasPrev}
                onClick={() => onNavigate(allMemories[currentIndex - 1])}
                className="p-2 rounded-xl bg-stone-100 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!hasNext}
                onClick={() => onNavigate(allMemories[currentIndex + 1])}
                className="p-2 rounded-xl bg-stone-100 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Close Memory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
