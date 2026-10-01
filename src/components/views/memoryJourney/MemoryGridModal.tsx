import React from 'react';
import { X, Camera, Video, Mic, Mail, Heart, Sparkles, MapPin } from 'lucide-react';
import { JourneyMemory, OccasionThemeConfig } from './types';

interface MemoryGridModalProps {
  memories: JourneyMemory[];
  discoveredIds: string[];
  theme: OccasionThemeConfig;
  onClose: () => void;
  onSelectMemory: (memory: JourneyMemory) => void;
}

export const MemoryGridModal: React.FC<MemoryGridModalProps> = ({
  memories,
  discoveredIds,
  theme,
  onClose,
  onSelectMemory,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[88vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
              Keepsake Index
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              All {memories.length} Memories on the Journey
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Click any stop to jump directly into the full memory viewer.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of Memories */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {memories.map((mem, index) => {
              const isDiscovered = discoveredIds.includes(mem.id);

              return (
                <div
                  key={mem.id}
                  onClick={() => {
                    onSelectMemory(mem);
                    onClose();
                  }}
                  className="group relative bg-white rounded-2xl p-3 border border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-100 mb-3">
                      {mem.mediaUrl ? (
                        <img
                          src={mem.mediaUrl}
                          alt={mem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-amber-50/60 text-amber-800">
                          <Mail className="w-6 h-6 mb-1 text-amber-600" />
                          <p className="text-xs font-serif italic line-clamp-2">
                            "{mem.content}"
                          </p>
                        </div>
                      )}

                      {/* Stop number badge */}
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-xs">
                        Stop #{index + 1}
                      </span>

                      {/* Type icon */}
                      <span className="absolute bottom-2 right-2 bg-white/90 text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {mem.type === 'photo' && '📸 Photo'}
                        {mem.type === 'video' && '🎥 Video'}
                        {mem.type === 'audio' && '🎵 Audio'}
                        {mem.type === 'wish' && '💌 Wish'}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-amber-700">
                      {mem.title}
                    </h4>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 font-sans">
                      {mem.content}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                    <span className="font-medium text-stone-700 truncate">
                      {mem.contributorName}
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-semibold shrink-0">
                      <Heart className="w-3 h-3 fill-current" />
                      {mem.likesCount}
                    </span>
                  </div>

                  {isDiscovered && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-sm">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>
            {discoveredIds.length} of {memories.length} memories discovered
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-900 text-white font-bold cursor-pointer hover:bg-stone-800"
          >
            Back to Journey Road
          </button>
        </div>
      </div>
    </div>
  );
};
