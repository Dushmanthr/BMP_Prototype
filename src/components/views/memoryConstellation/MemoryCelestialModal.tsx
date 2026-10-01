import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Share2,
  Calendar,
  User,
  Check,
} from 'lucide-react';
import { ConstellationStar } from './types';
import { constellationSoundManager } from './constellationSoundManager';

interface MemoryCelestialModalProps {
  star: ConstellationStar | null;
  allStars: ConstellationStar[];
  onClose: () => void;
  onNavigate: (star: ConstellationStar) => void;
  onSendCheer?: (starId: string) => void;
}

export const MemoryCelestialModal: React.FC<MemoryCelestialModalProps> = ({
  star,
  allStars,
  onClose,
  onNavigate,
  onSendCheer,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [likes, setLikes] = useState<number>(star ? star.likesCount : 0);
  const [hasCheered, setHasCheered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Sync state when star changes
  useEffect(() => {
    if (star) {
      setLikes(star.likesCount);
      setHasCheered(false);
      setIsPlayingAudio(false);
      setIsPlayingVideo(false);
      setAudioProgress(0);
    }
  }, [star?.id]);

  // Audio simulated playback timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const currentIndex = star ? allStars.findIndex((s) => s.id === star.id) : -1;
  const prevStar =
    currentIndex >= 0
      ? allStars[(currentIndex - 1 + allStars.length) % allStars.length]
      : allStars[0];
  const nextStar =
    currentIndex >= 0
      ? allStars[(currentIndex + 1) % allStars.length]
      : allStars[0];

  const handlePrev = () => {
    if (currentIndex < 0 || allStars.length === 0) return;
    const p = allStars[(currentIndex - 1 + allStars.length) % allStars.length];
    constellationSoundManager.playStarSelect();
    onNavigate(p);
  };

  const handleNext = () => {
    if (currentIndex < 0 || allStars.length === 0) return;
    const n = allStars[(currentIndex + 1) % allStars.length];
    constellationSoundManager.playStarSelect();
    onNavigate(n);
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
  }, [onClose, currentIndex, allStars, onNavigate]);

  if (!star || currentIndex < 0) return null;

  const handleCheer = () => {
    if (!hasCheered) {
      setLikes((prev) => prev + 1);
      setHasCheered(true);
      constellationSoundManager.playStardustCheer();
      if (onSendCheer) onSendCheer(star.id);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleAudio = () => {
    const nextState = !isPlayingAudio;
    setIsPlayingAudio(nextState);
    if (nextState) {
      constellationSoundManager.playConstellationSwell();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#04060C]/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Background starlight particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_rgba(255,107,107,0.15)_0%,_transparent_70%)]" />

      {/* Main Celestial Modal Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B1020]/90 border border-white/20 shadow-[0_0_60px_rgba(0,0,0,0.8),_0_0_30px_rgba(255,107,107,0.2)] backdrop-blur-2xl text-stone-100 flex flex-col transition-all duration-300 animate-in zoom-in-95"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 shrink-0 bg-white/5">
          {/* Star designation & index */}
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-ping" />
            <span className="font-bold text-amber-300 tracking-wider">
              ✦ {star.starName}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300 font-medium">
              Star {currentIndex + 1} of {allStars.length}
            </span>
          </div>

          {/* Close & Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Copy link to this memory"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px] font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Share</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-gray-300 transition-colors cursor-pointer"
              aria-label="Close celestial viewer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Title & Contributor Metadata */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30">
                {star.type === 'photo' && 'Photo Memory'}
                {star.type === 'video' && 'Video Memory'}
                {star.type === 'audio' && 'Voice Recording'}
                {star.type === 'wish' && 'Heartfelt Wish'}
              </span>

              {star.isSpecial && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Special Milestone
                </span>
              )}

              <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                <Calendar className="w-3 h-3 text-gray-400" />
                {star.date}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {star.title}
            </h3>

            {/* Contributor Row */}
            <div className="flex items-center gap-2.5 text-xs text-gray-300 pt-1">
              {star.contributorAvatar ? (
                <img
                  src={star.contributorAvatar}
                  alt={star.contributorName}
                  className="w-7 h-7 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400/40 flex items-center justify-center font-bold text-xs">
                  {star.contributorName[0]}
                </div>
              )}
              <div>
                <span className="font-bold text-white">{star.contributorName}</span>
                {star.contributorRole && (
                  <span className="text-gray-400 text-[11px] block sm:inline sm:ml-1">
                    ({star.contributorRole})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Media Section */}
          {star.type === 'photo' && star.mediaUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-white/15 max-h-[420px] flex items-center justify-center group">
              <img
                src={star.mediaUrl}
                alt={star.title}
                className="w-full h-full object-contain max-h-[420px] transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {star.type === 'video' && (
            <div className="relative w-full rounded-2xl overflow-hidden bg-black/80 border border-white/20 aspect-video flex items-center justify-center group">
              {star.mediaUrl && (
                <img
                  src={star.mediaUrl}
                  alt={star.title}
                  className="w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all"
                />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="w-16 h-16 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,107,107,0.6)] transform transition-transform hover:scale-110 cursor-pointer"
                >
                  {isPlayingVideo ? (
                    <Pause className="w-7 h-7 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 fill-white ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Video Progress bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs text-white">
                <span className="font-semibold">{isPlayingVideo ? '0:24' : '0:00'}</span>
                <div className="flex-1 mx-3 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF6B6B] transition-all"
                    style={{ width: isPlayingVideo ? '45%' : '0%' }}
                  />
                </div>
                <span className="font-semibold">{star.duration || '1:12'}</span>
              </div>
            </div>
          )}

          {star.type === 'audio' && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E1B4B]/80 to-[#0F172A]/90 border border-indigo-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleAudio}
                    className="w-12 h-12 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>
                  <div>
                    <h5 className="font-bold text-sm text-white">
                      Voice Note Audio Recording
                    </h5>
                    <p className="text-xs text-indigo-200/80">
                      Spoken wish by {star.contributorName}
                    </p>
                  </div>
                </div>

                <div className="text-right text-xs font-mono text-indigo-300">
                  <span>{isPlayingAudio ? `${Math.floor(audioProgress * 0.48)}s` : '0:00'}</span> / {star.duration || '0:48'}
                </div>
              </div>

              {/* Animated Audio Waveform */}
              <div className="h-10 flex items-center gap-1 px-2 bg-black/30 rounded-xl overflow-hidden">
                {Array.from({ length: 36 }).map((_, i) => {
                  const height = isPlayingAudio
                    ? Math.sin(i * 0.4 + audioProgress * 0.2) * 14 + 18
                    : (i % 5 + 1) * 5;
                  const isActive = (i / 36) * 100 <= audioProgress;
                  return (
                    <span
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-150 ${
                        isActive ? 'bg-[#FF6B6B]' : 'bg-white/20'
                      }`}
                      style={{ height: `${height}px` }}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {star.type === 'wish' && (
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1C1427]/80 to-[#291720]/80 border border-amber-500/30 text-center relative overflow-hidden">
              <span className="text-5xl text-amber-400/30 font-serif absolute top-2 left-4 select-none">
                “
              </span>
              <p className="text-base sm:text-lg font-serif italic text-amber-100/90 leading-relaxed px-4">
                {star.content}
              </p>
              <span className="text-5xl text-amber-400/30 font-serif absolute bottom-0 right-4 select-none">
                ”
              </span>
              <div className="mt-4 text-xs font-bold text-rose-300 tracking-wider uppercase">
                — {star.contributorName}
              </div>
            </div>
          )}

          {/* Memory Text Content (for Photo, Video, Audio) */}
          {star.type !== 'wish' && (
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                “{star.content}”
              </p>
              <div className="mt-2 text-xs font-bold text-[#FF6B6B] text-right">
                — {star.contributorName}
              </div>
            </div>
          )}

          {/* Social Reaction / Stardust Cheer */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleCheer}
              className={`px-4 py-2.5 rounded-2xl border font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                hasCheered
                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                  : 'bg-white/10 hover:bg-white/20 text-gray-200 border-white/20 hover:text-white'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  hasCheered ? 'scale-125 fill-white text-white' : 'text-rose-400'
                }`}
              />
              <span>{hasCheered ? 'Cheered with Stardust!' : 'Send Stardust Cheer'}</span>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-xs ml-1">
                {likes}
              </span>
            </button>

            <span className="text-xs text-gray-400 hidden sm:inline">
              Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-[10px]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-[10px]">→</kbd> to navigate
            </span>
          </div>
        </div>

        {/* Bottom Navigation Dock */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-t border-white/10 bg-white/5 shrink-0">
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-gray-400 block leading-tight">Previous</span>
              <span className="truncate max-w-[120px] block text-xs">{prevStar.title}</span>
            </div>
            <span className="sm:hidden">Previous</span>
          </button>

          <span className="text-xs font-semibold text-gray-400">
            {currentIndex + 1} / {allStars.length}
          </span>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-rose-100 block leading-tight">Next Star</span>
              <span className="truncate max-w-[120px] block text-xs">{nextStar.title}</span>
            </div>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
