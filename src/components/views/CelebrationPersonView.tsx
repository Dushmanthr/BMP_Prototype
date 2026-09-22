import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Share2,
  Sparkles,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  Copy,
  Check,
  X,
  MessageCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  PartyPopper,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Send,
  Star,
  Cake,
  Wine,
  Gift,
} from 'lucide-react';
import { Memory } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

export const CelebrationPersonView: React.FC = () => {
  const { activeOccasion, memories, triggerConfetti, showToast, setCurrentView } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'photo' | 'video' | 'audio' | 'wish'>('all');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});

  // Celebration state
  const [cheerCount, setCheerCount] = useState<number>(54);
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; x: number; y: number; text?: string }>>([]);
  const [activeCheer, setActiveCheer] = useState<string | null>(null);

  // Story Mode (Instagram/Cinematic Reel style)
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isStoryPlaying, setIsStoryPlaying] = useState(true);

  // Thank You Note Section state
  const [thankYouMessage, setThankYouMessage] = useState(
    `Thank you all so much! Reading your wishes and listening to your voice notes brought me to tears of joy. This is the best gift I could have ever asked for! ❤️`
  );
  const [thankYouSent, setThankYouSent] = useState(false);

  // Approved memories for this occasion
  const approvedMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status === 'Approved'
  );

  const displayedMemories =
    activeCategory === 'all'
      ? approvedMemories
      : approvedMemories.filter((m) => m.type === activeCategory);

  const celebrationUrl = `https://celebrate.momentsmemories.app/celebration/${activeOccasion.id}`;

  // Initial burst of confetti on first entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerConfetti();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Story mode auto-advancing
  useEffect(() => {
    if (!isStoryOpen || !isStoryPlaying) return;
    if (approvedMemories.length === 0) return;

    const interval = setInterval(() => {
      setStoryIndex((prev) => {
        if (prev >= approvedMemories.length - 1) {
          setIsStoryPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isStoryOpen, isStoryPlaying, storyIndex, approvedMemories.length]);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(celebrationUrl);
    setCopiedLink(true);
    showToast('Celebration link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const isNowLiked = !likedMemories[id];

    setLikedMemories((prev) => ({
      ...prev,
      [id]: isNowLiked,
    }));

    if (isNowLiked) {
      triggerConfetti();
      spawnFloatingHeart(rect.left + rect.width / 2, rect.top - 10, '+1 ❤️');
    }
  };

  const spawnFloatingHeart = (x: number, y: number, text = '❤️') => {
    const newId = Date.now() + Math.random();
    setFloatingHearts((prev) => [...prev, { id: newId, x, y, text }]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newId));
    }, 1800);
  };

  // Celebration interactive cheers
  const handleCheerReaction = (type: 'confetti' | 'toast' | 'love' | 'wish', e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCheerCount((prev) => prev + 1);
    setActiveCheer(type);

    if (type === 'confetti') {
      triggerConfetti();
      showToast('🎉 Confetti tossed for ' + activeOccasion.celebrationPersonName + '!');
      spawnFloatingHeart(rect.left + rect.width / 2, rect.top - 10, '🎉');
    } else if (type === 'toast') {
      triggerConfetti();
      showToast('🥂 Cheers to ' + activeOccasion.celebrationPersonName + '! A toast to love & joy!');
      spawnFloatingHeart(rect.left + rect.width / 2, rect.top - 10, '🥂');
    } else if (type === 'love') {
      // Spawn multiple rising hearts
      for (let i = 0; i < 6; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 80;
          spawnFloatingHeart(rect.left + rect.width / 2 + offsetX, rect.top - 10, '💖');
        }, i * 120);
      }
      showToast('💖 Big love sent to ' + activeOccasion.celebrationPersonName + '!');
    } else if (type === 'wish') {
      triggerConfetti();
      showToast('🎂 Birthday wish sent with love & blessings!');
      spawnFloatingHeart(rect.left + rect.width / 2, rect.top - 10, '✨');
    }

    setTimeout(() => setActiveCheer(null), 1200);
  };

  const handleOpenStory = (index = 0) => {
    setStoryIndex(index);
    setIsStoryOpen(true);
    setIsStoryPlaying(true);
    triggerConfetti();
  };

  const handleSendThankYou = () => {
    setThankYouSent(true);
    triggerConfetti();
    showToast('💌 Thank-you note sent to all 12 loved ones!');
  };

  return (
    <div className="bg-[#FAFAFB] min-h-screen pb-28 text-[#243B53] relative overflow-hidden">
      {/* Scoped celebration animations styles */}
      <style>{`
        @keyframes float-balloon-slow {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-balloon-mid {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50% { transform: translateY(-26px) rotate(-2deg); }
        }
        @keyframes float-balloon-fast {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-16px) rotate(4deg); }
        }
        @keyframes celebration-pulse-aura {
          0% { transform: scale(0.92); opacity: 0.8; }
          50% { transform: scale(1.14); opacity: 0.25; }
          100% { transform: scale(0.92); opacity: 0.8; }
        }
        @keyframes celebration-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.25) rotate(45deg); }
        }
        @keyframes rise-float-heart {
          0% { transform: translate(-50%, 0) scale(0.7); opacity: 1; }
          50% { transform: translate(-50%, -40px) scale(1.2); opacity: 0.9; }
          100% { transform: translate(-50%, -90px) scale(1); opacity: 0; }
        }
        @keyframes shimmer-sweep-glow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .anim-balloon-1 { animation: float-balloon-slow 6s ease-in-out infinite; }
        .anim-balloon-2 { animation: float-balloon-mid 7.5s ease-in-out infinite 0.8s; }
        .anim-balloon-3 { animation: float-balloon-fast 5.2s ease-in-out infinite 1.5s; }
        .anim-balloon-4 { animation: float-balloon-slow 6.8s ease-in-out infinite 2.2s; }
        .anim-pulse-aura { animation: celebration-pulse-aura 3.2s ease-in-out infinite; }
        .anim-twinkle-1 { animation: celebration-twinkle 2.5s ease-in-out infinite; }
        .anim-twinkle-2 { animation: celebration-twinkle 3.2s ease-in-out infinite 1.2s; }
        .anim-twinkle-3 { animation: celebration-twinkle 2.8s ease-in-out infinite 0.6s; }
        .shimmer-text-glow {
          background: linear-gradient(90deg, #FFFFFF 0%, #F7D794 30%, #FF6B6B 50%, #F7D794 70%, #FFFFFF 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer-sweep-glow 6s linear infinite;
        }
      `}</style>

      {/* Screen-wide Floating Heart Reaction particles */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-xl font-bold select-none"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'rise-float-heart 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          {heart.text}
        </div>
      ))}

      {/* =========================================================
          HERO SECTION: MAGICAL CELEBRATION ATMOSPHERE
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#243B53] text-white py-20 sm:py-32 select-none">
        {/* Background Visual Layering with Warm Lighting */}
        <div className="absolute inset-0 opacity-25">
          <img
            src={activeOccasion.coverImage}
            alt="Celebration background"
            className="w-full h-full object-cover scale-105 filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B2D40]/95 via-[#243B53]/90 to-[#243B53]" />

        {/* Ambient Warm Golden & Coral Radial Spotlights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B6B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#F7D794]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Celebration Balloons */}
        {/* Balloon 1: Top-Left Coral */}
        <div className="absolute top-8 left-6 sm:left-16 pointer-events-none anim-balloon-1 opacity-90 hidden sm:block">
          <svg width="68" height="95" viewBox="0 0 68 95" fill="none">
            <ellipse cx="34" cy="40" rx="30" ry="38" fill="#FF6B6B" />
            <ellipse cx="26" cy="28" rx="8" ry="12" fill="#FFA07A" opacity="0.6" />
            <polygon points="34,78 30,86 38,86" fill="#fa5a5a" />
            <path d="M34 86 Q30 92 35 96" stroke="#FFA07A" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
        </div>

        {/* Balloon 2: Top-Right Champagne Gold */}
        <div className="absolute top-10 right-8 sm:right-20 pointer-events-none anim-balloon-2 opacity-95 hidden sm:block">
          <svg width="74" height="100" viewBox="0 0 74 100" fill="none">
            <ellipse cx="37" cy="42" rx="33" ry="40" fill="#F7D794" />
            <ellipse cx="28" cy="30" rx="9" ry="13" fill="#FFFFFF" opacity="0.7" />
            <polygon points="37,82 32,90 42,90" fill="#e5c57e" />
            <path d="M37 90 Q42 95 36 100" stroke="#F7D794" strokeWidth="1.5" fill="none" opacity="0.8" />
          </svg>
        </div>

        {/* Balloon 3: Mid-Left Deep Navy with Gold Rim */}
        <div className="absolute bottom-16 left-4 sm:left-24 pointer-events-none anim-balloon-3 opacity-80 hidden md:block">
          <svg width="58" height="82" viewBox="0 0 58 82" fill="none">
            <ellipse cx="29" cy="34" rx="26" ry="32" fill="#1B2D40" stroke="#F7D794" strokeWidth="1.5" />
            <ellipse cx="22" cy="24" rx="6" ry="10" fill="#FFFFFF" opacity="0.3" />
            <polygon points="29,66 25,74 33,74" fill="#1B2D40" />
            <path d="M29 74 Q24 78 30 82" stroke="#F7D794" strokeWidth="1.2" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Balloon 4: Mid-Right Coral Rose */}
        <div className="absolute bottom-12 right-6 sm:right-24 pointer-events-none anim-balloon-4 opacity-85 hidden md:block">
          <svg width="64" height="90" viewBox="0 0 64 90" fill="none">
            <ellipse cx="32" cy="38" rx="28" ry="36" fill="#FFA07A" />
            <ellipse cx="24" cy="26" rx="7" ry="11" fill="#FFFFFF" opacity="0.5" />
            <polygon points="32,74 28,82 36,82" fill="#FF6B6B" />
            <path d="M32 82 Q37 86 31 90" stroke="#FFA07A" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
        </div>

        {/* Twinkling Star Sparkles */}
        <div className="absolute top-16 left-1/3 pointer-events-none anim-twinkle-1 text-[#F7D794]">
          <Sparkles className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute top-28 right-1/3 pointer-events-none anim-twinkle-2 text-[#FF6B6B]">
          <Sparkles className="w-6 h-6 fill-current" />
        </div>
        <div className="absolute bottom-24 left-1/4 pointer-events-none anim-twinkle-3 text-white">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute top-44 right-16 pointer-events-none anim-twinkle-1 text-[#F7D794]">
          <Star className="w-4 h-4 fill-current" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-7">
          {/* Special Gift Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-white/10 via-[#FF6B6B]/20 to-white/10 text-white border border-white/25 text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-lg">
            <PartyPopper className="w-4 h-4 text-[#FF6B6B] animate-bounce" />
            <span>A Special Digital Celebration For You</span>
            <Sparkles className="w-4 h-4 text-[#F7D794]" />
          </div>

          {/* Celebrant Photo with Pulsing Aura Ring & Crown Badge */}
          <div className="relative inline-block mx-auto pt-2">
            {/* Outer Glowing Pulsing Rings */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FF6B6B] via-[#F7D794] to-[#FFA07A] blur-md anim-pulse-aura opacity-75" />
            <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-[#F7D794]/60 animate-spin" style={{ animationDuration: '24s' }} />

            {/* Photo Avatar */}
            {activeOccasion.celebrationPersonPhoto ? (
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden mx-auto shadow-2xl bg-[#1B2D40]">
                <img
                  src={activeOccasion.celebrationPersonPhoto}
                  alt={activeOccasion.celebrationPersonName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-gradient-to-br from-[#FF6B6B] to-[#243B53] flex items-center justify-center text-4xl font-extrabold text-white shadow-2xl">
                {activeOccasion.celebrationPersonName.charAt(0)}
              </div>
            )}

            {/* Floating Star / VIP Crown Tag */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#fa5a5a] text-white border-2 border-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg whitespace-nowrap">
              <Star className="w-3 h-3 fill-current text-[#F7D794]" />
              Birthday Star
            </div>
          </div>

          {/* Headline & Welcoming Message */}
          <div className="space-y-3 pt-2">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Happy {activeOccasion.occasionType},{' '}
              <span className="shimmer-text-glow font-extrabold drop-shadow-md">
                {activeOccasion.celebrationPersonName}
              </span>
              ! 🎉
            </h1>
            <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Your loved ones gathered to surprise you with their favorite moments, acoustic songs,
              voice notes, and heartfelt wishes. Sit back and take in all the love!
            </p>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-300 font-medium">
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-current" />
              <strong>{approvedMemories.length}</strong> Memories Curated
            </span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F7D794]" />
              <strong>{activeOccasion.contributorsCount}</strong> Loved Ones
            </span>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-sm flex items-center gap-1.5">
              <Cake className="w-3.5 h-3.5 text-[#FFA07A]" />
              {activeOccasion.formattedDate}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            {/* Story Reel Mode Trigger */}
            <button
              onClick={() => handleOpenStory(0)}
              id="watch-celebration-story-btn"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF6B6B] via-[#fa5a5a] to-[#FF6B6B] hover:opacity-95 text-white font-extrabold text-sm shadow-[0_8px_25px_rgba(255,107,107,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer border border-white/30"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Celebration Story
              <Sparkles className="w-4 h-4 text-[#F7D794]" />
            </button>

            {/* Scroll to Memories */}
            <button
              onClick={() => {
                const el = document.getElementById('messages-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="start-exploring-memories-btn"
              className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer border border-white/20"
            >
              Explore Memory Wall
              <Heart className="w-4 h-4 fill-current text-[#FF6B6B]" />
            </button>

            {/* Share Celebration */}
            <button
              onClick={() => {
                const el = document.getElementById('share-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* =========================================================
              LIVE CELEBRATION CHEER & REACTION BAR
          ========================================================= */}
          <div className="pt-6 max-w-xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between px-2 text-xs">
                <span className="text-gray-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F7D794]" />
                  Tap to cheer {activeOccasion.celebrationPersonName}:
                </span>
                <span className="bg-[#FF6B6B]/20 text-[#FFA07A] border border-[#FF6B6B]/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  🎉 {cheerCount} Cheers Sent
                </span>
              </div>

              {/* 4 Interactive Celebration Cheer Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={(e) => handleCheerReaction('confetti', e)}
                  id="cheer-pop-confetti-btn"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF6B6B] hover:text-white text-white font-bold text-xs flex flex-col items-center gap-1 transition-all transform active:scale-90 cursor-pointer border border-white/10 group"
                  title="Toss Confetti"
                >
                  <PartyPopper className="w-5 h-5 text-[#FF6B6B] group-hover:text-white transition-colors" />
                  <span className="text-[11px]">Confetti!</span>
                </button>

                <button
                  onClick={(e) => handleCheerReaction('toast', e)}
                  id="cheer-raise-toast-btn"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#F7D794] hover:text-[#243B53] text-white font-bold text-xs flex flex-col items-center gap-1 transition-all transform active:scale-90 cursor-pointer border border-white/10 group"
                  title="Raise a Toast"
                >
                  <Wine className="w-5 h-5 text-[#F7D794] group-hover:text-[#243B53] transition-colors" />
                  <span className="text-[11px]">Cheers 🥂</span>
                </button>

                <button
                  onClick={(e) => handleCheerReaction('love', e)}
                  id="cheer-send-love-btn"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FF6B6B] hover:text-white text-white font-bold text-xs flex flex-col items-center gap-1 transition-all transform active:scale-90 cursor-pointer border border-white/10 group"
                  title="Send Big Love"
                >
                  <Heart className="w-5 h-5 text-[#FF6B6B] group-hover:text-white fill-current transition-colors" />
                  <span className="text-[11px]">Big Love 💖</span>
                </button>

                <button
                  onClick={(e) => handleCheerReaction('wish', e)}
                  id="cheer-make-wish-btn"
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#FFA07A] hover:text-[#243B53] text-white font-bold text-xs flex flex-col items-center gap-1 transition-all transform active:scale-90 cursor-pointer border border-white/10 group"
                  title="Make a Birthday Wish"
                >
                  <Cake className="w-5 h-5 text-[#FFA07A] group-hover:text-[#243B53] transition-colors" />
                  <span className="text-[11px]">Make Wish 🎂</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN SECTION: MESSAGES FROM YOUR PEOPLE (MEMORY WALL)
      ========================================================= */}
      <div id="messages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-extrabold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Curated With Pure Love
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] tracking-tight">
            Messages & Memories From Your Loved Ones
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Tap any memory to view photos, listen to personal voice recordings, and read wishes.
          </p>
        </div>

        {/* Filter Pills with Festive Count Badges */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 select-none">
          <button
            onClick={() => setActiveCategory('all')}
            id="cat-all-btn"
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm ${
              activeCategory === 'all'
                ? 'bg-[#243B53] text-white shadow-md'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            All Memories ({approvedMemories.length})
          </button>
          <button
            onClick={() => setActiveCategory('photo')}
            id="cat-photos-btn"
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              activeCategory === 'photo'
                ? 'bg-[#243B53] text-white shadow-md'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Photos
          </button>
          <button
            onClick={() => setActiveCategory('audio')}
            id="cat-audio-btn"
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              activeCategory === 'audio'
                ? 'bg-[#243B53] text-white shadow-md'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Voice Notes
          </button>
          <button
            onClick={() => setActiveCategory('video')}
            id="cat-videos-btn"
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              activeCategory === 'video'
                ? 'bg-[#243B53] text-white shadow-md'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Videos
          </button>
          <button
            onClick={() => setActiveCategory('wish')}
            id="cat-wishes-btn"
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              activeCategory === 'wish'
                ? 'bg-[#243B53] text-white shadow-md'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Written Wishes
          </button>
        </div>

        {/* Masonry / Grid of Festive Memory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {displayedMemories.map((mem, index) => {
            const isLiked = likedMemories[mem.id];

            return (
              <div
                key={mem.id}
                onClick={() => setSelectedMemory(mem)}
                className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1.5 hover:border-[#FF6B6B]/40 relative"
              >
                {/* Decorative Festive Corner Tape / Stamp */}
                <div className="absolute top-3 right-3 z-20 pointer-events-none">
                  {mem.type === 'photo' && (
                    <span className="px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-[#FFA07A]" /> Photo
                    </span>
                  )}
                  {mem.type === 'audio' && (
                    <span className="px-2.5 py-1 rounded-full bg-[#FF6B6B] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <Volume2 className="w-3 h-3" /> Audio
                    </span>
                  )}
                  {mem.type === 'video' && (
                    <span className="px-2.5 py-1 rounded-full bg-[#243B53] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Video className="w-3 h-3 text-[#FF6B6B]" /> Video
                    </span>
                  )}
                  {mem.type === 'wish' && (
                    <span className="px-2.5 py-1 rounded-full bg-[#F7D794] text-[#243B53] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-current text-[#FF6B6B]" /> Wish
                    </span>
                  )}
                </div>

                <div>
                  {/* Photo type */}
                  {mem.type === 'photo' && mem.mediaUrl && (
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={mem.mediaUrl}
                        alt={mem.title || 'Memory photo'}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 text-white text-xs font-semibold">
                        <span>Tap to view full photo</span>
                        <Sparkles className="w-4 h-4 text-[#F7D794]" />
                      </div>
                    </div>
                  )}

                  {/* Video type */}
                  {mem.type === 'video' && (
                    <div className="relative h-64 bg-[#243B53] overflow-hidden">
                      {mem.mediaUrl ? (
                        <img
                          src={mem.mediaUrl}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Video className="w-6 h-6 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-mono">
                        {mem.duration || '1:12'}
                      </span>
                    </div>
                  )}

                  {/* Audio type */}
                  {mem.type === 'audio' && (
                    <div className="p-6 bg-gradient-to-br from-[#FAFAFB] to-white border-b border-gray-100">
                      <AudioPlayer
                        duration={mem.duration}
                        contributorName={mem.contributorName}
                        title={mem.title}
                        variant="compact"
                      />
                    </div>
                  )}

                  {/* Written Wish type */}
                  {mem.type === 'wish' && (
                    <div className="p-7 bg-gradient-to-br from-white via-[#FAFAFB] to-amber-50/20 border-b border-gray-100 relative">
                      <span className="text-4xl text-[#FF6B6B]/30 font-serif leading-none block mb-1">
                        “
                      </span>
                      <p className="text-base text-gray-800 leading-relaxed font-serif italic">
                        {mem.content}
                      </p>
                    </div>
                  )}

                  {/* Card Content & Contributor Name */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#FF6B6B] uppercase tracking-wider flex items-center gap-1">
                        <Heart className="w-3 h-3 fill-current" />
                        From {mem.contributorName}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">{mem.date}</span>
                    </div>

                    {mem.title && (
                      <h3 className="text-lg font-bold text-[#243B53] mb-2 leading-snug group-hover:text-[#FF6B6B] transition-colors">
                        {mem.title}
                      </h3>
                    )}

                    {mem.type !== 'wish' && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {mem.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer with Heart Reaction */}
                <div className="p-4 px-6 border-t border-gray-100 bg-[#FAFAFB] flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenStory(index);
                    }}
                    className="text-xs text-[#243B53] hover:text-[#FF6B6B] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-current text-[#FF6B6B]" />
                    Play in Story
                  </button>

                  <button
                    onClick={(e) => toggleLike(mem.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer transform active:scale-90 ${
                      isLiked
                        ? 'bg-[#FF6B6B] text-white shadow-md'
                        : 'bg-white text-gray-600 hover:text-[#FF6B6B] hover:border-[#FF6B6B]/40 border border-gray-200'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{(mem.likesCount || 0) + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          CELEBRANT "SAY THANK YOU" INTERACTIVE SECTION
      ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 pt-20">
        <div className="bg-gradient-to-br from-[#243B53] to-[#1B2D40] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-white/10">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B6B]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F7D794]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B6B]/20 text-[#FFA07A] text-xs font-bold uppercase tracking-wider">
                  <Gift className="w-3.5 h-3.5" />
                  Say Thank You
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Send Love Back to Your 12 Contributors
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Send a collective thank-you note directly to Emma, Daniel, Michael, Grandma Rose, and everyone who contributed!
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-300 font-medium">All 12 contributors notified</span>
              </div>
            </div>

            {thankYouSent ? (
              <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-6 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-lg font-bold text-white">Thank-You Note Sent with Love! 💌</h4>
                <p className="text-xs text-emerald-100 max-w-md mx-auto">
                  "{thankYouMessage}"
                </p>
                <button
                  onClick={() => setThankYouSent(false)}
                  className="text-xs text-white/80 hover:text-white underline cursor-pointer pt-1"
                >
                  Edit message or send another
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Pre-made quick chips */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      setThankYouMessage(
                        "Thank you all so much! Reading your wishes and listening to your voice notes brought me to tears of joy. This is the best gift ever! ❤️"
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-200 border border-white/10 transition-colors cursor-pointer"
                  >
                    ❤️ "Brought me to tears of joy"
                  </button>
                  <button
                    onClick={() =>
                      setThankYouMessage(
                        "You all made my 25th birthday the most unforgettable day of my life! I cherish each of you so deeply. 🥂✨"
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-200 border border-white/10 transition-colors cursor-pointer"
                  >
                    🥂 "Most unforgettable day"
                  </button>
                  <button
                    onClick={() =>
                      setThankYouMessage(
                        "I listened to every single voice recording and rewatched the videos three times! Feeling so incredibly blessed. 🙏"
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-gray-200 border border-white/10 transition-colors cursor-pointer"
                  >
                    🙏 "Feeling so blessed"
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    value={thankYouMessage}
                    onChange={(e) => setThankYouMessage(e.target.value)}
                    className="w-full rounded-2xl bg-white/10 border border-white/20 p-4 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#FF6B6B] resize-none"
                    placeholder="Write a heartfelt thank you to everyone..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSendThankYou}
                    id="send-thank-you-blast-btn"
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#fa5a5a] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 cursor-pointer transition-all transform active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    Send Thank You to All Contributors
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          SCREEN 13: CELEBRATION SHARING SECTION
      ========================================================= */}
      <section id="share-section" className="max-w-4xl mx-auto px-4 pt-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl text-center space-y-8">
          <div className="space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#243B53]">
              Share Your Celebration
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Send this celebration to friends and family, or preserve it forever as an heirloom.
            </p>
          </div>

          {/* Direct Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyLink}
              id="celebration-copy-link-btn"
              className="px-5 py-3 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Link Copied!' : 'Copy Celebration Link'}
            </button>

            <button
              onClick={() => {
                const text = `Take a look at the celebration page created for ${activeOccasion.celebrationPersonName}! ${celebrationUrl}`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp
            </button>

            <button
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(celebrationUrl)}`,
                  '_blank'
                );
              }}
              className="px-5 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              Facebook
            </button>

            <button
              onClick={() => {
                showToast('Instagram story asset prepared! Ready to share to your story.');
                triggerConfetti();
              }}
              className="px-5 py-3 rounded-2xl bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              Instagram Story
            </button>
          </div>

          {/* Keepsake Upsell Card */}
          <div className="p-6 rounded-2xl bg-[#FAFAFB] border border-gray-200 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#243B53] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF6B6B]" />
                Keep These Memories in a Physical Heirloom Book
              </h4>
              <p className="text-xs text-gray-500">
                Turn this entire collection into an embossed linen memory photobook or digital keepsake.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('physical-keepsake')}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              View Keepsakes
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Private celebration link. Only accessible to people you share this URL with.</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          CINEMATIC CELEBRATION STORY REEL (FULL SCREEN)
      ========================================================= */}
      {isStoryOpen && approvedMemories.length > 0 && (
        <div className="fixed inset-0 z-50 bg-[#1B2D40]/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 animate-in fade-in">
          {/* Top Story Progress Bar Segments */}
          <div className="w-full max-w-xl mx-auto flex items-center gap-1.5 mb-4 z-20">
            {approvedMemories.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer"
                onClick={() => {
                  setStoryIndex(i);
                  setIsStoryPlaying(true);
                }}
              >
                <div
                  className={`h-full bg-gradient-to-r from-[#FF6B6B] to-[#F7D794] transition-all duration-300 ${
                    i < storyIndex
                      ? 'w-full'
                      : i === storyIndex
                      ? 'w-full animate-pulse'
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Story Container Card */}
          <div className="relative w-full max-w-xl h-[78vh] sm:h-[82vh] bg-[#243B53] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-white/15">
            {/* Ambient Lighting in Story */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF6B6B]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#F7D794]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Story Header */}
            <div className="relative z-10 p-5 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B6B] to-[#F7D794] p-0.5">
                  <div className="w-full h-full rounded-full bg-[#1B2D40] flex items-center justify-center text-white font-bold text-sm">
                    {approvedMemories[storyIndex].contributorName.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {approvedMemories[storyIndex].contributorName}
                  </h4>
                  <p className="text-[11px] text-gray-300">
                    {approvedMemories[storyIndex].date} • Memory {storyIndex + 1} of {approvedMemories.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsStoryPlaying(!isStoryPlaying)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  title={isStoryPlaying ? 'Pause' : 'Play'}
                >
                  {isStoryPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setIsStoryOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  title="Close Story"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Story Body Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
              {/* Photo Memory Slide */}
              {approvedMemories[storyIndex].type === 'photo' && approvedMemories[storyIndex].mediaUrl && (
                <div className="w-full h-full max-h-[50vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative group">
                  <img
                    src={approvedMemories[storyIndex].mediaUrl}
                    alt={approvedMemories[storyIndex].title || 'Celebration moment'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-5 text-left text-white">
                    <p className="text-sm font-medium leading-relaxed drop-shadow-md">
                      {approvedMemories[storyIndex].content}
                    </p>
                  </div>
                </div>
              )}

              {/* Audio Memory Slide */}
              {approvedMemories[storyIndex].type === 'audio' && (
                <div className="w-full max-w-md space-y-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#fa5a5a] text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <Volume2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F7D794]">
                      Personal Voice Note
                    </span>
                    <h3 className="text-2xl font-extrabold text-white">
                      {approvedMemories[storyIndex].title || 'Voice Blessing'}
                    </h3>
                  </div>
                  <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/15">
                    <AudioPlayer
                      duration={approvedMemories[storyIndex].duration}
                      contributorName={approvedMemories[storyIndex].contributorName}
                      title={approvedMemories[storyIndex].title}
                      variant="full"
                    />
                  </div>
                  <p className="text-sm text-gray-200 italic">
                    "{approvedMemories[storyIndex].content}"
                  </p>
                </div>
              )}

              {/* Written Wish Slide */}
              {approvedMemories[storyIndex].type === 'wish' && (
                <div className="max-w-md space-y-6 py-8">
                  <div className="text-[#FF6B6B] text-6xl font-serif leading-none">“</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#F7D794] tracking-tight">
                    {approvedMemories[storyIndex].title}
                  </h3>
                  <p className="text-base sm:text-xl text-white font-serif italic leading-relaxed">
                    {approvedMemories[storyIndex].content}
                  </p>
                  <div className="pt-2 text-xs font-bold uppercase tracking-widest text-gray-300">
                    — Written with love by {approvedMemories[storyIndex].contributorName}
                  </div>
                </div>
              )}

              {/* Video Slide */}
              {approvedMemories[storyIndex].type === 'video' && (
                <div className="w-full h-full max-h-[50vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative bg-black flex items-center justify-center">
                  {approvedMemories[storyIndex].mediaUrl && (
                    <img
                      src={approvedMemories[storyIndex].mediaUrl}
                      alt="Video"
                      className="w-full h-full object-cover opacity-70"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center shadow-2xl">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-left text-white bg-black/60 p-3 rounded-xl backdrop-blur-sm text-xs">
                    <p className="font-bold">{approvedMemories[storyIndex].title}</p>
                    <p className="text-gray-300 line-clamp-2">{approvedMemories[storyIndex].content}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Story Navigation Controls */}
            <div className="relative z-10 p-5 flex items-center justify-between border-t border-white/10 bg-gradient-to-t from-black/50 to-transparent">
              <button
                onClick={() => setStoryIndex((prev) => Math.max(0, prev - 1))}
                disabled={storyIndex === 0}
                className={`p-3 rounded-full bg-white/10 text-white transition-all cursor-pointer ${
                  storyIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleLike(approvedMemories[storyIndex].id, e)}
                  className="px-5 py-2.5 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transform active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Send Love</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (storyIndex < approvedMemories.length - 1) {
                    setStoryIndex((prev) => prev + 1);
                  } else {
                    setIsStoryOpen(false);
                    triggerConfetti();
                    showToast('🎉 You have watched all memories! Happy Birthday!');
                  }
                }}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          LIGHTBOX / MEMORY DETAIL MODAL
      ========================================================= */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 relative shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B] flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  From {selectedMemory.contributorName}
                </span>
                <h3 className="text-2xl font-extrabold text-[#243B53] mt-0.5">
                  {selectedMemory.title || `${selectedMemory.type.toUpperCase()} Memory`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemory(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedMemory.type === 'photo' && selectedMemory.mediaUrl && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={selectedMemory.mediaUrl}
                  alt="Full memory preview"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}

            {selectedMemory.type === 'audio' && (
              <div className="p-4 rounded-2xl bg-gray-50">
                <AudioPlayer
                  duration={selectedMemory.duration}
                  contributorName={selectedMemory.contributorName}
                  title={selectedMemory.title}
                  variant="full"
                />
              </div>
            )}

            <div className="p-6 rounded-2xl bg-[#FAFAFB] text-base text-gray-800 leading-relaxed font-serif italic border border-gray-100">
              "{selectedMemory.content}"
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-gray-500 border-t border-gray-100">
              <span>Added with love by {selectedMemory.contributorName} • {selectedMemory.date}</span>
              <button
                onClick={(e) => toggleLike(selectedMemory.id, e)}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transform active:scale-95"
              >
                <Heart className="w-4 h-4 fill-current" />
                Send Love Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
