import React, { useState } from 'react';
import {
  Camera,
  Video,
  Mic,
  Mail,
  Heart,
  Sparkles,
  MapPin,
  Play,
  Volume2,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { JourneyMemory } from './types';
import { journeySoundManager } from './journeySoundManager';

interface MemoryStopNodeProps {
  memory: JourneyMemory;
  index: number;
  isDiscovered: boolean;
  onSelect: (memory: JourneyMemory) => void;
  accentColor: string;
}

export const MemoryStopNode: React.FC<MemoryStopNodeProps> = ({
  memory,
  index,
  isDiscovered,
  onSelect,
  accentColor,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    journeySoundManager.playChime();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onSelect(memory);
  };

  // Memory Type Badge rendering
  const renderTypeIcon = () => {
    switch (memory.type) {
      case 'photo':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <Camera className="w-3 h-3" />
            <span>Photo</span>
          </span>
        );
      case 'video':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <Video className="w-3 h-3" />
            <span>Video {memory.duration && `• ${memory.duration}`}</span>
          </span>
        );
      case 'audio':
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm animate-pulse">
            <Mic className="w-3 h-3" />
            <span>Audio {memory.duration && `• ${memory.duration}`}</span>
          </span>
        );
      case 'wish':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
            <Mail className="w-3 h-3" />
            <span>Wish</span>
          </span>
        );
    }
  };

  // Render the specific visual style variation requested
  const renderCardContent = () => {
    switch (memory.styleVariant) {
      // 1. Polaroid-style memory frame
      case 'polaroid':
        return (
          <div
            className={`relative bg-white p-2.5 pb-3 rounded-lg shadow-xl border border-stone-200/80 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl ${
              memory.side === 'left' ? '-rotate-2 group-hover:rotate-0' : 'rotate-2 group-hover:rotate-0'
            }`}
            style={{ width: '220px' }}
          >
            {/* Washi tape sticker */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/90 border border-amber-300/40 rounded-xs shadow-xs rotate-1 pointer-events-none backdrop-blur-xs" />

            {/* Media thumbnail */}
            <div className="relative aspect-4/3 rounded overflow-hidden bg-stone-100 shadow-inner">
              {memory.mediaUrl ? (
                <img
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50 text-amber-600">
                  <Mail className="w-10 h-10 opacity-60" />
                </div>
              )}
              <div className="absolute bottom-1.5 left-1.5">{renderTypeIcon()}</div>
            </div>

            {/* Handwritten style title & contributor */}
            <div className="mt-2.5 px-1 space-y-1">
              <h4 className="font-serif font-bold text-xs text-stone-800 line-clamp-1 group-hover:text-[#243B53]">
                {memory.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-stone-500 font-sans">
                <span className="truncate font-medium">{memory.contributorName}</span>
                <span className="flex items-center gap-0.5 text-rose-500 shrink-0">
                  <Heart className="w-2.5 h-2.5 fill-current" />
                  {memory.likesCount}
                </span>
              </div>
            </div>
          </div>
        );

      // 2. Circular photo landmark
      case 'circular-landmark':
        return (
          <div
            className="relative flex flex-col items-center group-hover:scale-105 transition-all duration-300"
            style={{ width: '180px' }}
          >
            {/* Circular gold ring container */}
            <div className="relative w-24 h-24 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-xl border-2 border-white">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner bg-stone-100">
                {memory.mediaUrl ? (
                  <img
                    src={memory.mediaUrl}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-700">
                    <Sparkles className="w-8 h-8" />
                  </div>
                )}
                {/* Audio pulse indicator if audio */}
                {memory.type === 'audio' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                    <Volume2 className="w-6 h-6 animate-pulse" />
                  </div>
                )}
              </div>
              {/* Type pill attached to ring */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                {renderTypeIcon()}
              </div>
            </div>

            {/* Circular title plaque */}
            <div className="mt-2.5 text-center bg-white/95 px-3 py-1.5 rounded-xl shadow-md border border-amber-200/80 max-w-full">
              <p className="font-serif font-bold text-xs text-stone-800 line-clamp-1">
                {memory.title}
              </p>
              <p className="text-[10px] text-amber-700 font-medium truncate mt-0.5">
                {memory.contributorName}
              </p>
            </div>
          </div>
        );

      // 3. Floating glassmorphic photo card
      case 'floating-glass':
        return (
          <div
            className="relative bg-white/85 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/80 group-hover:shadow-2xl group-hover:bg-white transition-all duration-300 group-hover:scale-105"
            style={{ width: '220px' }}
          >
            <div className="relative aspect-16/10 rounded-xl overflow-hidden shadow-sm bg-stone-100">
              {memory.mediaUrl ? (
                <img
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-50">
                  <Video className="w-8 h-8 text-indigo-500" />
                </div>
              )}
              {memory.type === 'video' && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </span>
                </div>
              )}
              <div className="absolute top-2 left-2">{renderTypeIcon()}</div>
            </div>

            <div className="mt-2 space-y-1">
              <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">
                {memory.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-stone-500">
                <span className="truncate font-medium">{memory.contributorName}</span>
                <span>{memory.date}</span>
              </div>
            </div>
          </div>
        );

      // 4. Memory Bubble: glowing iridescent orb
      case 'memory-bubble':
        return (
          <div
            className="relative flex flex-col items-center group-hover:scale-105 transition-all duration-300"
            style={{ width: '190px' }}
          >
            <div className="relative w-24 h-24 rounded-full p-2 bg-gradient-to-tr from-purple-400/40 via-pink-300/60 to-cyan-300/40 shadow-xl backdrop-blur-sm border border-white/60 animate-pulse">
              <div className="w-full h-full rounded-full overflow-hidden relative shadow-inner">
                {memory.mediaUrl ? (
                  <img
                    src={memory.mediaUrl}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-pink-500 fill-current" />
                  </div>
                )}
                {/* Bubble reflection sheen */}
                <div className="absolute top-1 left-2 w-5 h-3 bg-white/60 rounded-full rotate-45 pointer-events-none" />
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                {renderTypeIcon()}
              </div>
            </div>

            <div className="mt-2 text-center bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-purple-200/50 max-w-full">
              <p className="font-serif font-bold text-xs text-stone-800 line-clamp-1">
                {memory.title}
              </p>
              <p className="text-[10px] text-purple-700 font-medium truncate">
                {memory.contributorName}
              </p>
            </div>
          </div>
        );

      // 5. Gilded Frame: archival gold picture frame
      case 'gilded-frame':
        return (
          <div
            className="relative bg-[#2A231C] p-2 rounded-xl shadow-2xl border-4 border-[#C5A059] group-hover:scale-105 transition-all duration-300"
            style={{ width: '210px' }}
          >
            {/* Ornate corner flourish dots */}
            <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-[#E5C158] shadow-xs" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E5C158] shadow-xs" />
            <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-[#E5C158] shadow-xs" />
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#E5C158] shadow-xs" />

            <div className="relative aspect-4/3 rounded-sm overflow-hidden bg-stone-900 border border-[#C5A059]/40">
              {memory.mediaUrl ? (
                <img
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#FDFBF7] text-stone-800">
                  <Mail className="w-6 h-6 text-[#C5A059] mb-1" />
                  <p className="font-serif italic text-[11px] line-clamp-2 text-stone-700">
                    "{memory.content}"
                  </p>
                </div>
              )}
              <div className="absolute top-1.5 left-1.5">{renderTypeIcon()}</div>
            </div>

            <div className="mt-2 px-1 text-center">
              <h4 className="font-serif font-bold text-xs text-[#E5C158] line-clamp-1">
                {memory.title}
              </h4>
              <p className="text-[10px] text-stone-300 font-sans truncate">
                {memory.contributorName}
              </p>
            </div>
          </div>
        );

      // 6. Scenic milestone landmark
      case 'scenic-milestone':
      default:
        return (
          <div
            className="relative bg-white rounded-2xl p-2.5 shadow-xl border border-stone-200 group-hover:scale-105 transition-all duration-300"
            style={{ width: '210px' }}
          >
            {/* Top milestone plaque */}
            <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10px] text-stone-500 font-bold uppercase tracking-wider">
              <Compass className="w-3 h-3 text-[#243B53]" />
              <span>Milestone Stop</span>
              <span className="ml-auto font-mono text-[9px] text-stone-400">
                #{index + 1}
              </span>
            </div>

            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-100">
              {memory.mediaUrl ? (
                <img
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-stone-100 text-stone-600">
                  <MapPin className="w-8 h-8 text-rose-500" />
                </div>
              )}
              <div className="absolute bottom-1.5 left-1.5">{renderTypeIcon()}</div>
            </div>

            <div className="mt-2 px-1">
              <h4 className="font-bold text-xs text-stone-900 line-clamp-1">
                {memory.title}
              </h4>
              <div className="flex items-center justify-between text-[10px] text-stone-500 mt-0.5">
                <span className="truncate">{memory.contributorName}</span>
                <span className="text-emerald-700 font-medium">
                  {memory.locationTag || 'Keepsake Stop'}
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative group cursor-pointer select-none transition-all duration-300 ${
        isHovered ? 'z-40' : 'z-20'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      id={`memory-stop-${memory.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`View memory: ${memory.title} by ${memory.contributorName}`}
    >
      {/* Visual Stop Card */}
      <div className="relative">
        {renderCardContent()}

        {/* Discovered Checkmark Badge */}
        {isDiscovered && (
          <div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in-50"
            title="Memory Discovered"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        )}

        {/* View Memory Hover Action Button Affordance */}
        <div
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-200 pointer-events-none ${
            isHovered
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-1 scale-95'
          }`}
        >
          <span
            className="px-3 py-1 rounded-full text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5 border border-white/20"
            style={{ backgroundColor: accentColor }}
          >
            <Sparkles className="w-3 h-3 animate-spin" />
            View Memory
          </span>
        </div>
      </div>

      {/* Rich Tooltip Popover on Hover */}
      {isHovered && (
        <div
          className={`absolute top-full mt-4 w-64 bg-stone-900/95 text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md pointer-events-none transition-all duration-200 z-50 animate-in fade-in slide-in-from-top-2 ${
            memory.side === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {memory.contributorAvatar && (
              <img
                src={memory.contributorAvatar}
                alt={memory.contributorName}
                className="w-6 h-6 rounded-full object-cover border border-white/30"
              />
            )}
            <div>
              <p className="text-xs font-bold text-white leading-tight">
                {memory.contributorName}
              </p>
              {memory.contributorRole && (
                <p className="text-[10px] text-amber-300">
                  {memory.contributorRole}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-stone-200 line-clamp-2 italic font-serif mt-1">
            "{memory.content}"
          </p>

          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-400">
            <span>{memory.date}</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <span>Click to open</span> &rarr;
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
