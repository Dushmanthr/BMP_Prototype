import React from 'react';
import {
  Calendar,
  User,
  Heart,
  Play,
  ZoomIn,
  Sparkles,
  Volume2,
  Bookmark,
  CheckCircle2,
  Film,
  Camera,
  RotateCcw,
} from 'lucide-react';
import { BookPageData, LightboxMedia } from './types';
import { AudioPlayer } from '../../common/AudioPlayer';

interface MemoryPageRendererProps {
  page: BookPageData;
  isLeftPage: boolean;
  onOpenMedia: (media: LightboxMedia) => void;
  onReturnToStart?: () => void;
}

export const MemoryPageRenderer: React.FC<MemoryPageRendererProps> = ({
  page,
  isLeftPage,
  onOpenMedia,
  onReturnToStart,
}) => {
  // Spine gradient shadow depending on left/right side of two-page spread
  const spineShadowClass = isLeftPage
    ? 'after:absolute after:top-0 after:bottom-0 after:right-0 after:w-8 sm:after:w-12 after:bg-gradient-to-l after:from-black/15 after:via-black/5 after:to-transparent after:pointer-events-none'
    : 'after:absolute after:top-0 after:bottom-0 after:left-0 after:w-8 sm:after:w-12 after:bg-gradient-to-r after:from-black/15 after:via-black/5 after:to-transparent after:pointer-events-none';

  return (
    <div
      className={`relative w-full h-full min-h-[500px] sm:min-h-[560px] p-6 sm:p-8 flex flex-col justify-between select-none overflow-hidden ${spineShadowClass}`}
      style={{
        backgroundColor: '#FDFBF7',
        backgroundImage: `
          radial-gradient(#243B53 0.4px, transparent 0.4px),
          linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(245,241,235,0.9))
        `,
        backgroundSize: '16px 16px, 100% 100%',
        color: '#243B53',
      }}
    >
      {/* Subtle page corner crease / shadow */}
      <div
        className={`absolute top-0 w-8 h-8 pointer-events-none ${
          isLeftPage
            ? 'left-0 bg-gradient-to-br from-black/5 to-transparent'
            : 'right-0 bg-gradient-to-bl from-black/5 to-transparent'
        }`}
      />

      {/* RENDER SPECIFIC LAYOUT CONTENT */}
      <div className="flex-1 flex flex-col justify-center w-full my-auto">
        {/* ========================================================================= */}
        {/* 1. DEDICATION / PROLOGUE PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'dedication' && (
          <div className="text-center space-y-5 my-auto px-2 sm:px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#243B53]/5 border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF6B6B]">
                Curated Memory Album
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#243B53]">
                {page.celebrationPersonName || 'Our Honored Guest'}
              </h2>
              <p className="text-xs font-serif italic text-gray-500">
                {page.occasionName} • {page.formattedDate}
              </p>
            </div>

            <div className="w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <p className="text-xs sm:text-sm text-gray-600 font-serif leading-relaxed max-w-sm mx-auto italic">
              {page.description ||
                'This keepsake contains heartfelt memories, voices, and photographs gathered with love from the people who cherish you most.'}
            </p>

            <div className="pt-2 text-[11px] text-gray-400 uppercase tracking-widest font-sans flex items-center justify-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span>Turn the page to explore</span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. LAYOUT A: FULL PHOTO WITH MATTING & CAPTION */}
        {/* ========================================================================= */}
        {page.layout === 'full-photo' && (
          <div className="space-y-4 flex flex-col items-center">
            {page.mediaUrl ? (
              <div
                onClick={() =>
                  onOpenMedia({
                    url: page.mediaUrl!,
                    type: 'image',
                    title: page.title,
                    contributor: page.contributor,
                    date: page.date,
                    caption: page.content,
                  })
                }
                role="button"
                tabIndex={0}
                className="group relative w-full aspect-[4/3] sm:aspect-[16/11] bg-white p-2.5 sm:p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200/80 transform hover:-translate-y-1"
              >
                <div className="w-full h-full rounded overflow-hidden relative">
                  <img
                    src={page.mediaUrl}
                    alt={page.title || 'Memory photo'}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Hover magnifying indicator */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                    <span className="px-3 py-1.5 rounded-full bg-[#243B53]/80 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" /> View Photo
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-44 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                <Camera className="w-8 h-8 opacity-40" />
              </div>
            )}

            {/* Caption & Metadata */}
            <div className="w-full text-center space-y-1.5 px-2">
              <p className="text-xs sm:text-sm text-gray-700 font-serif italic leading-relaxed line-clamp-3">
                "{page.content}"
              </p>
              <div className="flex items-center justify-center gap-3 text-[11px] text-gray-500 font-sans pt-1">
                <span className="font-bold text-[#FF6B6B]">From {page.contributor}</span>
                {page.date && <span>• {page.date}</span>}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. LAYOUT B: PHOTO + HANDWRITTEN LETTER */}
        {/* ========================================================================= */}
        {page.layout === 'photo-letter' && (
          <div className="space-y-4">
            {page.mediaUrl && (
              <div className="relative mx-auto max-w-[260px] sm:max-w-[290px]">
                {/* Washi tape graphic */}
                <div
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#FF6B6B]/40 rounded-xs z-10 transform -rotate-1 shadow-xs pointer-events-none"
                  style={{ backdropFilter: 'blur(2px)' }}
                />
                <div
                  onClick={() =>
                    onOpenMedia({
                      url: page.mediaUrl!,
                      type: 'image',
                      title: page.title,
                      contributor: page.contributor,
                      date: page.date,
                      caption: page.content,
                    })
                  }
                  className="bg-white p-2 rounded shadow-md border border-gray-200 cursor-pointer transform -rotate-1 hover:rotate-0 transition-transform group"
                >
                  <img
                    src={page.mediaUrl}
                    alt={page.title || 'Memory'}
                    className="w-full h-36 sm:h-44 object-cover rounded-xs"
                    loading="lazy"
                  />
                  <div className="text-[10px] text-gray-400 text-center pt-1 font-serif italic flex items-center justify-center gap-1">
                    <ZoomIn className="w-3 h-3 text-gray-400 group-hover:text-[#FF6B6B]" />
                    <span>Click to enlarge</span>
                  </div>
                </div>
              </div>
            )}

            {/* Letter note */}
            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/60 shadow-xs space-y-2 relative">
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/50">
                <span className="text-xs font-bold text-[#243B53] font-serif">
                  {page.title || 'Cherished Moment'}
                </span>
                <span className="text-[10px] text-gray-500">{page.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 font-serif leading-relaxed italic">
                "{page.content}"
              </p>
              <div className="text-right pt-1">
                <span className="text-xs font-semibold text-[#FF6B6B] font-serif">
                  — With love, {page.contributor}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. LAYOUT C: SCRAPBOOK COLLAGE */}
        {/* ========================================================================= */}
        {page.layout === 'collage' && (
          <div className="space-y-4">
            <div className="relative h-52 sm:h-60 flex items-center justify-center">
              {/* Photo 1: Tilted Left */}
              {page.mediaUrl && (
                <div
                  onClick={() =>
                    onOpenMedia({
                      url: page.mediaUrl!,
                      type: 'image',
                      title: page.title,
                      contributor: page.contributor,
                      date: page.date,
                      caption: page.content,
                    })
                  }
                  className="absolute left-2 sm:left-4 top-2 w-36 sm:w-44 bg-white p-2 rounded shadow-lg border border-gray-200 transform -rotate-3 hover:rotate-0 hover:z-20 transition-all cursor-pointer group"
                >
                  <div className="w-full h-28 sm:h-36 overflow-hidden rounded-xs">
                    <img
                      src={page.mediaUrl}
                      alt="Moment 1"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center pt-1 font-serif">
                    {page.date || 'Moment'}
                  </p>
                </div>
              )}

              {/* Photo 2 / Secondary or Accent Polaroid: Tilted Right */}
              <div
                onClick={() => {
                  if (page.mediaUrl) {
                    onOpenMedia({
                      url: page.mediaUrl,
                      type: 'image',
                      title: page.title,
                      contributor: page.contributor,
                      date: page.date,
                      caption: page.content,
                    });
                  }
                }}
                className="absolute right-2 sm:right-4 bottom-2 w-36 sm:w-44 bg-white p-2 rounded shadow-xl border border-gray-200 transform rotate-4 hover:rotate-0 hover:z-20 transition-all cursor-pointer group"
              >
                {/* Washi tape on top of polaroid */}
                <div className="absolute -top-2 left-6 w-12 h-4 bg-amber-200/70 transform rotate-6 shadow-xs pointer-events-none" />
                <div className="w-full h-28 sm:h-36 overflow-hidden rounded-xs bg-gray-50 flex items-center justify-center">
                  <img
                    src={page.secondaryMediaUrl || page.mediaUrl}
                    alt="Moment 2"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] font-bold text-[#FF6B6B] text-center pt-1">
                  {page.contributor}
                </p>
              </div>
            </div>

            {/* Collage caption */}
            <div className="text-center px-2 pt-2">
              <h4 className="text-xs font-bold text-[#243B53] font-serif uppercase tracking-wider">
                {page.title}
              </h4>
              <p className="text-xs text-gray-600 font-serif italic line-clamp-2 mt-1">
                "{page.content}"
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. LAYOUT D: FULL MEMORY LETTER (TYPOGRAPHY FOCUSED) */}
        {/* ========================================================================= */}
        {page.layout === 'memory-letter' && (
          <div className="relative px-3 sm:px-6 py-4 my-auto space-y-4">
            {/* Elegant watermark quote mark */}
            <div className="absolute top-0 left-2 text-7xl font-serif text-[#FF6B6B]/15 leading-none select-none pointer-events-none">
              “
            </div>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6B6B]">
                A Heartfelt Letter
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#243B53]">
                {page.title || 'A Message of Love'}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
                <span className="font-semibold text-gray-700">From {page.contributor}</span>
                <span>•</span>
                <span>{page.date}</span>
              </div>
            </div>

            <div className="w-16 h-[2px] bg-[#FF6B6B]/40 rounded-full" />

            <div className="relative z-10 max-w-md">
              <p className="text-sm sm:text-base font-serif italic text-gray-700 leading-relaxed">
                "{page.content}"
              </p>
            </div>

            {/* Decorative floral or heart accent */}
            <div className="pt-2 flex items-center justify-end text-[#FF6B6B]">
              <div className="flex items-center gap-1.5 text-xs font-serif font-medium bg-[#FF6B6B]/10 px-3 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Cherished Wish</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. LAYOUT E: POLAROID SCRAPBOOK PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'polaroid' && (
          <div className="space-y-4 flex flex-col items-center">
            {/* The Polaroid Card */}
            <div
              onClick={() => {
                if (page.mediaUrl) {
                  onOpenMedia({
                    url: page.mediaUrl,
                    type: 'image',
                    title: page.title,
                    contributor: page.contributor,
                    date: page.date,
                    caption: page.content,
                  });
                }
              }}
              className="relative bg-white pt-3 px-3 pb-8 rounded-sm shadow-xl border border-gray-200 transform -rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer max-w-[280px] sm:max-w-[310px] w-full group"
            >
              {/* Scotch tape in top center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/70 border border-gray-200/50 shadow-xs pointer-events-none transform -rotate-2" />

              <div className="w-full aspect-square overflow-hidden bg-gray-100 rounded-xs">
                {page.mediaUrl ? (
                  <img
                    src={page.mediaUrl}
                    alt={page.title || 'Polaroid memory'}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera className="w-8 h-8 opacity-40" />
                  </div>
                )}
              </div>

              {/* Handwritten note at bottom of Polaroid */}
              <div className="pt-3 text-center">
                <p className="text-xs sm:text-sm font-serif italic text-gray-800 line-clamp-1">
                  {page.title || 'Unforgettable day'}
                </p>
                <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                  — {page.contributor}, {page.date}
                </p>
              </div>
            </div>

            {/* Note text below polaroid */}
            <div className="text-center px-4 max-w-sm">
              <p className="text-xs text-gray-600 font-serif italic leading-relaxed">
                "{page.content}"
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 7. LAYOUT F: CINEMATIC SPECIAL MEMORY PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'cinematic-moment' && (
          <div className="space-y-4 my-auto">
            {page.mediaUrl && (
              <div
                onClick={() =>
                  onOpenMedia({
                    url: page.mediaUrl!,
                    type: 'image',
                    title: page.title,
                    contributor: page.contributor,
                    date: page.date,
                    caption: page.content,
                  })
                }
                className="relative rounded-xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/40 cursor-pointer group"
              >
                <img
                  src={page.mediaUrl}
                  alt={page.title || 'Special moment'}
                  className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ECC94B]">
                    Special Memory
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold leading-tight">
                    {page.title}
                  </h3>
                  <p className="text-xs text-gray-300">By {page.contributor}</p>
                </div>
              </div>
            )}

            <div className="px-2 text-center space-y-2">
              <p className="text-xs sm:text-sm text-gray-700 font-serif italic leading-relaxed">
                "{page.content}"
              </p>
              <div className="flex items-center justify-center gap-1 text-[11px] text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>Recorded on {page.date}</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. AUDIO MEMORY PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'audio-memory' && (
          <div className="space-y-5 px-2 sm:px-4 my-auto">
            {/* Vintage Sound Recording Card Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] text-[11px] font-bold uppercase tracking-wider">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voice Memory Keepsake</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#243B53]">
                {page.title || `Voice Note from ${page.contributor}`}
              </h3>
              <p className="text-xs text-gray-500 font-sans">
                Recorded with warmth by {page.contributor} • {page.date}
              </p>
            </div>

            {/* Embedded AudioPlayer */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
              <AudioPlayer
                duration={page.duration || '0:48'}
                contributorName={page.contributor}
                title={page.title}
                variant="full"
              />
            </div>

            {/* Note text / Context */}
            {page.content && (
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-center">
                <p className="text-xs sm:text-sm text-gray-700 font-serif italic leading-relaxed">
                  "{page.content}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 9. VIDEO MEMORY PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'video-memory' && (
          <div className="space-y-4 px-2 my-auto">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#243B53]/10 text-[#243B53] text-[11px] font-bold uppercase tracking-wider">
                <Film className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>Video Message</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#243B53]">
                {page.title || 'Video Greeting'}
              </h3>
            </div>

            {/* Video preview frame */}
            <div
              onClick={() =>
                onOpenMedia({
                  url: page.mediaUrl || 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
                  type: 'video',
                  title: page.title,
                  contributor: page.contributor,
                  date: page.date,
                  caption: page.content,
                })
              }
              role="button"
              tabIndex={0}
              className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-xl border-4 border-white cursor-pointer group"
            >
              <img
                src={
                  page.mediaUrl ||
                  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80'
                }
                alt="Video preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#FF6B6B] group-hover:bg-[#fa5a5a] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 active:scale-95">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="text-[11px] font-bold text-white tracking-wider mt-2 drop-shadow">
                  Click to Play Video ({page.duration || 'Video'})
                </span>
              </div>
            </div>

            {/* Video caption */}
            <div className="text-center px-2">
              <p className="text-xs sm:text-sm text-gray-700 font-serif italic line-clamp-2">
                "{page.content}"
              </p>
              <span className="text-[11px] font-semibold text-[#FF6B6B] block mt-1">
                From {page.contributor} • {page.date}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 10. EPILOGUE / CONCLUDING PAGE */}
        {/* ========================================================================= */}
        {page.layout === 'epilogue' && (
          <div className="text-center space-y-6 px-4 my-auto">
            {/* Gold foil archive seal */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#ECC94B] to-[#996515] p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-[#243B53] text-[#ECC94B] flex flex-col items-center justify-center p-2 text-center">
                <Sparkles className="w-6 h-6 mb-0.5" />
                <span className="text-[8px] font-extrabold uppercase tracking-widest">
                  Archive
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#243B53]">
                These moments are yours to keep.
              </h2>
              <p className="text-xs sm:text-sm font-serif italic text-gray-500">
                Created with boundless love for
              </p>
              <p className="text-lg sm:text-xl font-serif font-bold text-[#FF6B6B]">
                {page.celebrationPersonName}
              </p>
            </div>

            <div className="w-28 h-[1px] mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Every voice, photo, and memory within this book is permanently preserved. You can
              download the full archive package below anytime.
            </p>

            {onReturnToStart && (
              <div className="pt-2">
                <button
                  onClick={onReturnToStart}
                  className="px-4 py-2 rounded-full bg-[#243B53] hover:bg-[#1B2D40] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md cursor-pointer transition-transform hover:scale-105"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return to Cover</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 11. BACK COVER */}
        {/* ========================================================================= */}
        {page.layout === 'back-cover' && (
          <div className="text-center space-y-4 my-auto px-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#243B53]/10 flex items-center justify-center text-[#243B53]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#243B53]">Moments & Memories</h3>
            <p className="text-xs text-gray-500">Forever Digital Keepsake Archive</p>
            <div className="pt-4">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                {page.formattedDate || 'Permanent Digital Collection'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* SUBTLE PAGE NUMBER IN BOOK CORNER */}
      {page.layout !== 'cover' && page.layout !== 'back-cover' && (
        <div
          className={`pt-3 text-[10px] text-gray-400 font-serif flex items-center ${
            isLeftPage ? 'justify-start' : 'justify-end'
          }`}
        >
          <span>{String(page.pageNumber).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
};
