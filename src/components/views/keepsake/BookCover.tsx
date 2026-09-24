import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface BookCoverProps {
  occasionName: string;
  celebrationPersonName: string;
  coverImage: string;
  onOpen: () => void;
  isOpening?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  occasionName,
  celebrationPersonName,
  coverImage,
  onOpen,
  isOpening = false,
}) => {
  return (
    <div
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label="Open your memory book"
      className={`relative w-full max-w-md mx-auto aspect-[3/4] sm:aspect-[4/5] rounded-r-2xl rounded-l-md cursor-pointer transition-all duration-700 select-none group focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/40 ${
        isOpening
          ? 'scale-105 opacity-0 -translate-x-12 rotate-y-[-90deg]'
          : 'hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)]'
      }`}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(135deg, #1C2D42 0%, #243B53 60%, #152232 100%)',
        boxShadow: `
          -6px 0 0 #152232,
          -12px 0 15px rgba(0,0,0,0.4),
          15px 20px 40px rgba(0,0,0,0.5),
          inset 0 0 40px rgba(0,0,0,0.4)
        `,
      }}
    >
      {/* Physical Book Spine Ridge on the Left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 sm:w-10 rounded-l-md pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0.08) 35%, rgba(0,0,0,0.4) 75%, transparent 100%)',
          boxShadow: 'inset 2px 0 3px rgba(255,255,255,0.1)',
        }}
      >
        {/* Embossed spine hinges */}
        <div className="absolute top-12 left-1 right-1 h-0.5 bg-black/40 border-b border-white/10" />
        <div className="absolute top-14 left-1 right-1 h-0.5 bg-black/40 border-b border-white/10" />
        <div className="absolute bottom-12 left-1 right-1 h-0.5 bg-black/40 border-b border-white/10" />
        <div className="absolute bottom-14 left-1 right-1 h-0.5 bg-black/40 border-b border-white/10" />
      </div>

      {/* Pages Edge / Physical Thickness on the Right & Bottom */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1 bottom-1 w-3 sm:w-4 rounded-r-md pointer-events-none translate-x-[3px]"
        style={{
          background: 'repeating-linear-gradient(to bottom, #EFECE6 0px, #DDD7CB 2px, #EFECE6 3px)',
          boxShadow: 'inset -2px 0 3px rgba(0,0,0,0.25)',
        }}
      />

      {/* Satin Bookmark Ribbon hanging from bottom */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 right-16 w-5 h-12 bg-[#FF6B6B] shadow-md z-10 pointer-events-none transform transition-transform group-hover:translate-y-1"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        }}
      />

      {/* Debossed Gold / Coral Foil Border */}
      <div className="absolute inset-4 sm:inset-6 ml-9 sm:ml-12 border-2 border-[#D4AF37]/50 rounded-r-xl rounded-l-xs p-5 sm:p-7 flex flex-col items-center justify-between text-center pointer-events-none">
        {/* Inner fine border */}
        <div className="absolute inset-1.5 border border-[#D4AF37]/30 rounded-r-lg rounded-l-xxs pointer-events-none" />

        {/* Top Header Foil Typography */}
        <div className="space-y-1 mt-1 z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
            <span
              className="text-[10px] sm:text-xs tracking-[0.35em] font-extrabold uppercase text-[#ECC94B]"
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.7)' }}
            >
              MEMORIES
            </span>
            <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
          </div>
          <p className="text-xs font-serif italic text-gray-300">For</p>
          <h2
            className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
          >
            {celebrationPersonName}
          </h2>
        </div>

        {/* Center Debossed Frame with Cover Image */}
        <div className="relative my-auto z-10">
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 shadow-2xl relative"
            style={{
              background: 'linear-gradient(135deg, #ECC94B 0%, #D4AF37 50%, #996515 100%)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.4)',
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-black/40">
              <img
                src={coverImage}
                alt={celebrationPersonName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Corner sparkles accent */}
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FF6B6B] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        </div>

        {/* Bottom Details & Occasion Name */}
        <div className="space-y-2 mb-2 z-10 max-w-xs">
          <div className="h-[1px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <h3 className="text-sm sm:text-base font-semibold text-gray-100 tracking-wide font-sans">
            {occasionName}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-300 font-serif italic">
            A collection of moments to remember
          </p>
        </div>
      </div>

      {/* Floating Call to Action "Open Your Memory Book" */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="px-5 py-2.5 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-black/30"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Your Memory Book</span>
        </button>
      </div>
    </div>
  );
};
