import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Memory, Occasion } from '../../../types';
import { BookPageData, BookSpread, LightboxMedia } from './types';
import { BookCover } from './BookCover';
import { MemoryPageRenderer } from './MemoryPageRenderer';
import { LightboxModal } from './LightboxModal';
import { soundManager } from './soundEffects';

interface MagicFlipBookProps {
  occasion: Occasion;
  memories: Memory[];
}

export const MagicFlipBook: React.FC<MagicFlipBookProps> = ({ occasion, memories }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState<number>(0);
  const [mobilePageIndex, setMobilePageIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward' | null>(null);
  const [activeMedia, setActiveMedia] = useState<LightboxMedia | null>(null);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  const bookViewerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Watch window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate dynamic pages based on approved memories
  const pages: BookPageData[] = useMemo(() => {
    const list: BookPageData[] = [];

    // Page 1: Dedication (Left page of first spread)
    list.push({
      id: 'page-dedication',
      pageNumber: 1,
      layout: 'dedication',
      title: 'Dedication',
      celebrationPersonName: occasion.celebrationPersonName,
      occasionName: occasion.name,
      formattedDate: occasion.formattedDate,
      description: occasion.description,
      coverImage: occasion.coverImage,
    });

    if (memories.length === 0) {
      // Empty state page
      list.push({
        id: 'page-empty',
        pageNumber: 2,
        layout: 'memory-letter',
        title: 'Your Memory Book is Waiting',
        contributor: 'Moments & Memories',
        date: occasion.formattedDate,
        content:
          'Once memories, photographs, and voice messages are submitted and approved, they will be bound into this everlasting digital keepsake book.',
      });
    } else {
      // Cycle through varied layout compositions
      const layoutCycle: Array<'full-photo' | 'photo-letter' | 'collage' | 'polaroid' | 'cinematic-moment'> = [
        'full-photo',
        'photo-letter',
        'collage',
        'polaroid',
        'cinematic-moment',
      ];
      let photoLayoutIdx = 0;

      memories.forEach((m, idx) => {
        let layout: BookPageData['layout'];

        if (m.type === 'audio') {
          layout = 'audio-memory';
        } else if (m.type === 'video') {
          layout = 'video-memory';
        } else if (m.type === 'wish') {
          layout = 'memory-letter';
        } else {
          layout = layoutCycle[photoLayoutIdx % layoutCycle.length];
          photoLayoutIdx++;
        }

        const nextMemory = memories[idx + 1];
        const secondaryMediaUrl =
          layout === 'collage' && nextMemory?.mediaUrl ? nextMemory.mediaUrl : undefined;

        list.push({
          id: `page-${m.id}`,
          pageNumber: list.length + 1,
          layout,
          title: m.title || `Memory from ${m.contributorName}`,
          contributor: m.contributorName,
          contributorEmail: m.contributorEmail,
          date: m.date,
          content: m.content,
          mediaUrl: m.mediaUrl,
          secondaryMediaUrl,
          mediaType: m.type,
          duration: m.duration,
          likesCount: m.likesCount,
        });
      });
    }

    // Epilogue page
    list.push({
      id: 'page-epilogue',
      pageNumber: list.length + 1,
      layout: 'epilogue',
      title: 'Forever Kept',
      celebrationPersonName: occasion.celebrationPersonName,
      occasionName: occasion.name,
      formattedDate: occasion.formattedDate,
      totalMemoriesCount: memories.length,
    });

    return list;
  }, [occasion, memories]);

  // Group pages into Two-Page Spreads for desktop
  const spreads: BookSpread[] = useMemo(() => {
    const s: BookSpread[] = [];
    for (let i = 0; i < pages.length; i += 2) {
      s.push({
        spreadIndex: s.length,
        leftPage: pages[i] || null,
        rightPage: pages[i + 1] || null,
      });
    }
    return s;
  }, [pages]);

  const totalSpreads = spreads.length;
  const currentSpread = spreads[currentSpreadIndex] || spreads[0];

  // Sound toggle
  const toggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    soundManager.setSoundEnabled(nextState);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!bookViewerRef.current) return;
    if (!document.fullscreenElement) {
      bookViewerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeMedia) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSpreadIndex, mobilePageIndex, isFlipping, totalSpreads, activeMedia, isMobile, pages.length]);

  // Open Book Action
  const handleOpenBook = () => {
    soundManager.playBookOpen();
    setIsOpen(true);
    setCurrentSpreadIndex(0);
    setMobilePageIndex(0);
  };

  // Close Book Action (Return to cover)
  const handleCloseBook = () => {
    soundManager.playBookClose();
    setIsOpen(false);
    setCurrentSpreadIndex(0);
    setMobilePageIndex(0);
  };

  // Flip Forward (Next)
  const handleNext = () => {
    if (isFlipping) return;

    if (!isOpen) {
      handleOpenBook();
      return;
    }

    if (isMobile) {
      if (mobilePageIndex >= pages.length - 1) return;
      setIsFlipping(true);
      soundManager.playPageTurn();
      setTimeout(() => {
        setMobilePageIndex((prev) => {
          const next = Math.min(pages.length - 1, prev + 1);
          setCurrentSpreadIndex(Math.floor(next / 2));
          return next;
        });
        setIsFlipping(false);
      }, 350);
      return;
    }

    // Desktop Two-Page Spread navigation
    if (currentSpreadIndex >= totalSpreads - 1) return;

    setIsFlipping(true);
    setFlipDirection('forward');
    soundManager.playPageTurn();

    setTimeout(() => {
      setCurrentSpreadIndex((prev) => {
        const next = Math.min(totalSpreads - 1, prev + 1);
        setMobilePageIndex(next * 2);
        return next;
      });
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  // Flip Backward (Previous)
  const handlePrev = () => {
    if (isFlipping) return;

    if (!isOpen) return;

    if (isMobile) {
      if (mobilePageIndex === 0) {
        handleCloseBook();
        return;
      }
      setIsFlipping(true);
      soundManager.playPageTurn();
      setTimeout(() => {
        setMobilePageIndex((prev) => {
          const next = Math.max(0, prev - 1);
          setCurrentSpreadIndex(Math.floor(next / 2));
          return next;
        });
        setIsFlipping(false);
      }, 350);
      return;
    }

    // Desktop
    if (currentSpreadIndex === 0) {
      handleCloseBook();
      return;
    }

    setIsFlipping(true);
    setFlipDirection('backward');
    soundManager.playPageTurn();

    setTimeout(() => {
      setCurrentSpreadIndex((prev) => {
        const next = Math.max(0, prev - 1);
        setMobilePageIndex(next * 2);
        return next;
      });
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  // Mobile Single Page Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const nextSpread = spreads[currentSpreadIndex + 1] || null;
  const prevSpread = spreads[currentSpreadIndex - 1] || null;

  return (
    <div
      ref={bookViewerRef}
      className={`relative w-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 flex flex-col items-center justify-between p-4 sm:p-8 lg:p-10 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-[#111C28]' : 'bg-[#1A2938]'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 30%, rgba(45, 75, 105, 0.45) 0%, rgba(20, 32, 46, 0.95) 75%),
          linear-gradient(to bottom, #1E3145 0%, #152230 100%)
        `,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Keepsake Header inside viewer */}
      <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#FF6B6B]" />
          <span className="font-bold uppercase tracking-wider text-white">
            {isOpen ? 'Interactive Memory Album' : 'Closed Keepsake Album'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isOpen && (
            <span className="font-mono text-gray-300 bg-white/10 px-2.5 py-1 rounded-md text-[11px]">
              {isMobile
                ? `Page ${String(mobilePageIndex + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`
                : `Spread ${String(currentSpreadIndex + 1).padStart(2, '0')} / ${String(totalSpreads).padStart(2, '0')}`}
            </span>
          )}

          <button
            onClick={toggleSound}
            aria-label={isSoundOn ? 'Mute page turning sound' : 'Unmute page turning sound'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title={isSoundOn ? 'Sound On' : 'Sound Muted'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4 text-[#FF6B6B]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Book Stage Area */}
      <div className="w-full flex-1 flex items-center justify-center my-6 sm:my-8 perspective-[2200px]">
        {!isOpen ? (
          /* ========================================================================= */
          /* 1. CLOSED BOOK PRESENTATION */
          /* ========================================================================= */
          <div className="w-full py-4 animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
            <BookCover
              occasionName={occasion.name}
              celebrationPersonName={occasion.celebrationPersonName}
              coverImage={occasion.coverImage}
              onOpen={handleOpenBook}
              isOpening={false}
            />
          </div>
        ) : isMobile ? (
          /* ========================================================================= */
          /* 2. MOBILE SINGLE-PAGE BOOK PRESENTATION (<768px) */
          /* ========================================================================= */
          <div className="w-full max-w-sm mx-auto relative rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300">
            <MemoryPageRenderer
              page={pages[mobilePageIndex] || pages[0]}
              isLeftPage={false}
              onOpenMedia={setActiveMedia}
              onReturnToStart={handleCloseBook}
            />
          </div>
        ) : (
          /* ========================================================================= */
          /* 3. DESKTOP TWO-PAGE PHYSICAL BOOK SPREAD (>=768px) */
          /* ========================================================================= */
          <div
            className="relative w-full max-w-4xl mx-auto flex items-center justify-center transition-all duration-300"
            style={{ perspective: '2400px' }}
          >
            <div
              className="relative w-full grid grid-cols-2 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.65)] overflow-hidden transition-all duration-300"
              style={{
                boxShadow: `
                  -8px 12px 30px rgba(0,0,0,0.5),
                  8px 12px 30px rgba(0,0,0,0.5),
                  0 20px 50px rgba(0,0,0,0.6)
                `,
              }}
            >
              {/* Stacked Paper Page Edges (Physical Thickness Effect) */}
              <div
                aria-hidden="true"
                className="absolute -left-3 top-2 bottom-2 w-3 rounded-l-md pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(to right, #DDD7CB 0px, #EFECE6 1.5px, #DDD7CB 2px)',
                  boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.25)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-3 top-2 bottom-2 w-3 rounded-r-md pointer-events-none"
                style={{
                  background: 'repeating-linear-gradient(to right, #DDD7CB 0px, #EFECE6 1.5px, #DDD7CB 2px)',
                  boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.25)',
                }}
              />

              {/* Center Spine Stitch & Bookmark Ribbon */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 z-30 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.25) 100%)',
                  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                }}
              >
                {/* Center spine seam line */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-black/40 border-r border-white/20" />
                {/* Top ribbon bookmark header */}
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-9 bg-[#FF6B6B] shadow-md z-40"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
                  }}
                />
              </div>

              {/* LEFT PAGE */}
              <div
                onClick={() => {
                  if (currentSpreadIndex > 0) handlePrev();
                }}
                className={`relative w-full min-h-[500px] sm:min-h-[560px] cursor-pointer group transition-opacity ${
                  isFlipping && flipDirection === 'backward' ? 'opacity-90' : 'opacity-100'
                }`}
              >
                {currentSpread.leftPage ? (
                  <MemoryPageRenderer
                    page={currentSpread.leftPage}
                    isLeftPage={true}
                    onOpenMedia={setActiveMedia}
                    onReturnToStart={handleCloseBook}
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAF8F5] flex items-center justify-center text-gray-300">
                    <BookOpen className="w-8 h-8 opacity-20" />
                  </div>
                )}
                {/* Click edge hint */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/10 group-hover:bg-black/20 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div
                onClick={() => {
                  if (currentSpreadIndex < totalSpreads - 1) handleNext();
                }}
                className={`relative w-full min-h-[500px] sm:min-h-[560px] cursor-pointer group transition-opacity ${
                  isFlipping && flipDirection === 'forward' ? 'opacity-90' : 'opacity-100'
                }`}
              >
                {currentSpread.rightPage ? (
                  <MemoryPageRenderer
                    page={currentSpread.rightPage}
                    isLeftPage={false}
                    onOpenMedia={setActiveMedia}
                    onReturnToStart={handleCloseBook}
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAF8F5] flex items-center justify-center text-gray-300">
                    <BookOpen className="w-8 h-8 opacity-20" />
                  </div>
                )}
                {/* Click edge hint */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/10 group-hover:bg-black/20 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* 3D TURNING LEAF SIMULATION (FORWARD TURN) */}
              {isFlipping && flipDirection === 'forward' && (
                <div
                  className="absolute top-0 bottom-0 right-0 w-1/2 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'left center',
                    animation: 'pageFlipForward 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of turning leaf (Current Right Page) */}
                  <div
                    className="absolute inset-0 backface-hidden shadow-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {currentSpread.rightPage && (
                      <MemoryPageRenderer
                        page={currentSpread.rightPage}
                        isLeftPage={false}
                        onOpenMedia={() => {}}
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none"
                      style={{
                        animation: 'shadowFadeOut 0.6s ease-in-out forwards',
                      }}
                    />
                  </div>

                  {/* Back of turning leaf (Next Left Page) */}
                  <div
                    className="absolute inset-0 backface-hidden shadow-2xl overflow-hidden"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {nextSpread?.leftPage && (
                      <MemoryPageRenderer
                        page={nextSpread.leftPage}
                        isLeftPage={true}
                        onOpenMedia={() => {}}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* 3D TURNING LEAF SIMULATION (BACKWARD TURN) */}
              {isFlipping && flipDirection === 'backward' && (
                <div
                  className="absolute top-0 bottom-0 left-0 w-1/2 z-40 pointer-events-none"
                  style={{
                    transformOrigin: 'right center',
                    animation: 'pageFlipBackward 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Front of backward leaf (Current Left Page) */}
                  <div
                    className="absolute inset-0 backface-hidden shadow-2xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {currentSpread.leftPage && (
                      <MemoryPageRenderer
                        page={currentSpread.leftPage}
                        isLeftPage={true}
                        onOpenMedia={() => {}}
                      />
                    )}
                  </div>

                  {/* Back of backward leaf (Previous Right Page) */}
                  <div
                    className="absolute inset-0 backface-hidden shadow-2xl overflow-hidden"
                    style={{
                      transform: 'rotateY(-180deg)',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    {prevSpread?.rightPage && (
                      <MemoryPageRenderer
                        page={prevSpread.rightPage}
                        isLeftPage={false}
                        onOpenMedia={() => {}}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MINIMAL BOTTOM BOOK CONTROLS */}
      {/* ========================================================================= */}
      <div className="w-full flex items-center justify-between pt-4 border-t border-white/10 text-xs sm:text-sm">
        <button
          onClick={handlePrev}
          disabled={!isOpen || isFlipping}
          className={`flex items-center gap-1.5 font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            !isOpen || isFlipping
              ? 'text-gray-500 cursor-not-allowed opacity-40'
              : 'text-white bg-white/10 hover:bg-white/20 active:scale-95'
          }`}
          aria-label="Previous spread"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{(!isMobile && currentSpreadIndex === 0) || (isMobile && mobilePageIndex === 0) ? 'Cover' : 'Previous'}</span>
        </button>

        {/* Center Page indicator / Cover shortcut */}
        <div className="flex items-center gap-3">
          {isOpen && (
            <button
              onClick={handleCloseBook}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-md hover:bg-white/5 cursor-pointer"
              title="Return to Cover"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cover</span>
            </button>
          )}

          <div className="text-center font-mono font-medium text-gray-300 text-xs sm:text-sm">
            {isOpen ? (
              isMobile ? (
                <span>
                  Page <strong className="text-[#FF6B6B]">{String(mobilePageIndex + 1).padStart(2, '0')}</strong> of {String(pages.length).padStart(2, '0')}
                </span>
              ) : (
                <span>
                  Spread <strong className="text-[#FF6B6B]">{String(currentSpreadIndex + 1).padStart(2, '0')}</strong> of {String(totalSpreads).padStart(2, '0')}
                  <span className="text-[11px] text-gray-400 font-sans ml-2 hidden lg:inline">
                    (Pages {String(currentSpreadIndex * 2 + 1).padStart(2, '0')}–{String(Math.min(pages.length, currentSpreadIndex * 2 + 2)).padStart(2, '0')})
                  </span>
                </span>
              )
            ) : (
              <span className="text-gray-400 font-sans">Hardcover Ready</span>
            )}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={
            isFlipping ||
            (isOpen &&
              (isMobile
                ? mobilePageIndex >= pages.length - 1
                : currentSpreadIndex >= totalSpreads - 1))
          }
          className={`flex items-center gap-1.5 font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
            isFlipping ||
            (isOpen &&
              (isMobile
                ? mobilePageIndex >= pages.length - 1
                : currentSpreadIndex >= totalSpreads - 1))
              ? 'text-gray-500 cursor-not-allowed opacity-40'
              : 'text-white bg-[#FF6B6B] hover:bg-[#fa5a5a] shadow-md active:scale-95'
          }`}
          aria-label="Next spread"
        >
          <span>{!isOpen ? 'Open Book' : 'Next'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Embedded CSS for 3D page turn keyframes */}
      <style>{`
        @keyframes pageFlipForward {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-180deg);
          }
        }

        @keyframes pageFlipBackward {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(180deg);
          }
        }

        @keyframes shadowFadeOut {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.1;
          }
        }
      `}</style>

      {/* Lightbox / Media Modal */}
      <LightboxModal media={activeMedia} onClose={() => setActiveMedia(null)} />
    </div>
  );
};
