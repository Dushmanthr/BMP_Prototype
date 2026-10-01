import React from 'react';
import { BloomPetalData } from './types';
import { X, Sparkles, CheckCircle2, Flower2, Mic, Video, Image, FileText } from 'lucide-react';

interface BloomIndexModalProps {
  memories: BloomPetalData[];
  exploredIds: string[];
  onSelectMemory: (memory: BloomPetalData) => void;
  onClose: () => void;
}

export const BloomIndexModal: React.FC<BloomIndexModalProps> = ({
  memories,
  exploredIds,
  onSelectMemory,
  onClose,
}) => {
  const getTypeIcon = (type: BloomPetalData['type']) => {
    switch (type) {
      case 'audio':
        return <Mic className="w-3 h-3 text-purple-600" />;
      case 'video':
        return <Video className="w-3 h-3 text-amber-600" />;
      case 'wish':
        return <FileText className="w-3 h-3 text-rose-600" />;
      case 'photo':
      default:
        return <Image className="w-3 h-3 text-[#FF6B6B]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/40 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="All Memory Petals Index"
    >
      <div
        className="relative w-full max-w-4xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-rose-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#FF6B6B] flex items-center justify-center">
              <Flower2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#243B53]">
                Story Petals Index
              </h3>
              <p className="text-xs text-stone-500">
                {exploredIds.length} of {memories.length} petals blossomed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close index"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Petals Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {memories.map((petal) => {
              const isExplored = exploredIds.includes(petal.id);

              return (
                <div
                  key={petal.id}
                  onClick={() => {
                    onSelectMemory(petal);
                    onClose();
                  }}
                  className={`group relative p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isExplored
                      ? 'bg-rose-50/30 border-rose-200/80 hover:border-[#FF6B6B] hover:shadow-md'
                      : 'bg-white border-stone-200/70 hover:border-rose-300 hover:shadow-sm'
                  }`}
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="relative w-full h-28 rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                      {petal.mediaUrl ? (
                        <img
                          src={petal.mediaUrl}
                          alt={petal.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-rose-300">
                          <Flower2 className="w-8 h-8" />
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 text-[10px] font-bold flex items-center justify-center shadow-xs">
                          {petal.memoryNumber}
                        </span>
                        {petal.isSpecial && (
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-xs" title="Special Memory">
                            <Sparkles className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      {/* Explored checkmark */}
                      {isExplored && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}

                      {/* Type icon at bottom right */}
                      <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                        {getTypeIcon(petal.type)}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-xs font-serif font-bold text-stone-900 group-hover:text-[#FF6B6B] transition-colors line-clamp-1">
                      {petal.title}
                    </h4>

                    {/* Contributor */}
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">
                      by {petal.contributorName}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                    <span className="text-stone-400 font-medium">
                      {petal.layer.toUpperCase()} LAYER
                    </span>
                    <span className="font-semibold text-[#FF6B6B] group-hover:underline">
                      View Petal →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
