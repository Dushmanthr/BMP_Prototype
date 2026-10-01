import React, { useState } from 'react';
import {
  X,
  Grid,
  Sparkles,
  Heart,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  ArrowRight,
  Download,
} from 'lucide-react';
import { ConstellationStar } from './types';
import { MemoryType } from '../../../types';

interface ConstellationGridModalProps {
  stars: ConstellationStar[];
  personName: string;
  onClose: () => void;
  onSelectStar: (star: ConstellationStar) => void;
  onDownloadKeepsake?: () => void;
}

export const ConstellationGridModal: React.FC<ConstellationGridModalProps> = ({
  stars,
  personName,
  onClose,
  onSelectStar,
  onDownloadKeepsake,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | MemoryType>('all');

  const filteredStars =
    activeTab === 'all' ? stars : stars.filter((s) => s.type === activeTab);

  const photoCount = stars.filter((s) => s.type === 'photo').length;
  const videoCount = stars.filter((s) => s.type === 'video').length;
  const audioCount = stars.filter((s) => s.type === 'audio').length;
  const wishCount = stars.filter((s) => s.type === 'wish').length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#04060C]/90 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] rounded-3xl bg-[#090D1A]/95 border border-white/20 shadow-2xl flex flex-col overflow-hidden text-stone-100 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Sky Atlas: {personName}’s Constellation
              </h3>
              <p className="text-xs text-gray-400">
                {stars.length} celestial memories catalogued across the story
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDownloadKeepsake && (
              <button
                onClick={onDownloadKeepsake}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>Export Star Map</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 border-b border-white/10 bg-black/20 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#FF6B6B] text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            All Stars ({stars.length})
          </button>
          <button
            onClick={() => setActiveTab('photo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-[#FF6B6B] text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Photos ({photoCount})
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'video'
                ? 'bg-[#FF6B6B] text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Videos ({videoCount})
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'audio'
                ? 'bg-[#FF6B6B] text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            Voice Notes ({audioCount})
          </button>
          <button
            onClick={() => setActiveTab('wish')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'wish'
                ? 'bg-[#FF6B6B] text-white shadow-sm'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Wishes ({wishCount})
          </button>
        </div>

        {/* Stars Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStars.map((star, idx) => {
            return (
              <div
                key={star.id}
                onClick={() => {
                  onSelectStar(star);
                  onClose();
                }}
                className="group relative p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      ✦ {star.starName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {star.date}
                    </span>
                  </div>

                  {/* Thumbnail / Media preview */}
                  {star.mediaUrl ? (
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 bg-black/40 border border-white/10">
                      <img
                        src={star.mediaUrl}
                        alt=""
                        className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {star.type === 'video' && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center">
                            <Video className="w-4 h-4 ml-0.5" />
                          </span>
                        </div>
                      )}
                    </div>
                  ) : star.type === 'audio' ? (
                    <div className="w-full h-20 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center gap-2 mb-3 text-indigo-300 text-xs">
                      <Volume2 className="w-5 h-5 text-indigo-200" />
                      <span>Audio Recording ({star.duration || '0:48'})</span>
                    </div>
                  ) : (
                    <div className="w-full p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 mb-3 text-amber-200 text-xs italic font-serif line-clamp-3">
                      “{star.content}”
                    </div>
                  )}

                  <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors line-clamp-1">
                    {star.title}
                  </h4>

                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                    {star.content}
                  </p>
                </div>

                {/* Footer contributor */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-1.5 truncate">
                    {star.contributorAvatar && (
                      <img
                        src={star.contributorAvatar}
                        alt=""
                        className="w-4 h-4 rounded-full object-cover"
                      />
                    )}
                    <span className="truncate">{star.contributorName}</span>
                  </div>

                  <span className="text-[11px] font-bold text-[#FF6B6B] flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
