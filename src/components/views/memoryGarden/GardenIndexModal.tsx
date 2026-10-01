import React, { useState } from 'react';
import { GardenMemory, GardenZone } from './types';
import {
  X,
  Search,
  Heart,
  Image as ImageIcon,
  Video,
  Volume2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { GardenFlowerSVG } from './GardenFlowerSVG';

interface GardenIndexModalProps {
  memories: GardenMemory[];
  onClose: () => void;
  onSelectMemory: (memory: GardenMemory) => void;
  personName: string;
}

export const GardenIndexModal: React.FC<GardenIndexModalProps> = ({
  memories,
  onClose,
  onSelectMemory,
  personName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<GardenZone | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredMemories = memories.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.contributorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'all' || m.zone === selectedZone;
    const matchesType = selectedType === 'all' || m.type === selectedType;
    return matchesSearch && matchesZone && matchesType;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
              <span>Garden Herbarium & Index</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              All Blooms in {personName}’s Garden
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Browse every memory blooming along the winding path ({memories.length} total)
            </p>
          </div>

          <button
            onClick={onClose}
            id="close-index-modal-btn"
            className="self-start sm:self-auto p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close index"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-6 py-3 border-b border-stone-100 bg-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search flowers or memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          {/* Zone and Type filter buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {/* Zone filters */}
            {(['all', 'beginning', 'moments', 'celebration'] as const).map((zone) => (
              <button
                key={zone}
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-full font-serif font-semibold text-xs transition-colors cursor-pointer ${
                  selectedZone === zone
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {zone === 'all'
                  ? 'All Zones'
                  : zone === 'beginning'
                  ? 'The Beginning'
                  : zone === 'moments'
                  ? 'Special Moments'
                  : 'Celebration'}
              </button>
            ))}

            <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

            {/* Type filters */}
            {['all', 'photo', 'video', 'audio', 'wish'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  selectedType === t
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Memories Grid */}
        <div className="overflow-y-auto flex-1 p-6">
          {filteredMemories.length === 0 ? (
            <div className="py-16 text-center text-stone-400 space-y-2">
              <p className="font-serif text-base">No blossoms found matching your search</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedZone('all');
                  setSelectedType('all');
                }}
                className="text-xs text-emerald-700 underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMemories.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onSelectMemory(m);
                    onClose();
                  }}
                  className="group p-4 rounded-2xl bg-stone-50/80 hover:bg-white border border-stone-200 hover:border-emerald-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    {/* Flower & Metadata Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 flex items-center justify-center shrink-0">
                          <GardenFlowerSVG
                            flowerType={m.flowerType}
                            bloomState={m.bloomState}
                            size="small"
                            petalColor={m.petalColor}
                            centerColor={m.centerColor}
                            memoryType={m.type}
                          />
                        </div>
                        <div>
                          <span className="text-[11px] font-serif font-bold text-stone-800 line-clamp-1">
                            {m.flowerVarietyName}
                          </span>
                          <span className="text-[10px] text-stone-400 block capitalize">
                            Zone: {m.zone}
                          </span>
                        </div>
                      </div>

                      {/* Type icon badge */}
                      <span className="p-1.5 rounded-lg bg-stone-200/60 text-stone-600">
                        {m.type === 'photo' && <ImageIcon className="w-3.5 h-3.5" />}
                        {m.type === 'video' && <Video className="w-3.5 h-3.5" />}
                        {m.type === 'audio' && <Volume2 className="w-3.5 h-3.5" />}
                        {m.type === 'wish' && <MessageSquare className="w-3.5 h-3.5" />}
                      </span>
                    </div>

                    {/* Image thumbnail if photo / video */}
                    {m.mediaUrl && (
                      <div className="h-32 rounded-xl overflow-hidden bg-stone-200">
                        <img
                          src={m.mediaUrl}
                          alt={m.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Title & Excerpt */}
                    <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {m.title}
                    </h3>

                    <p className="text-xs text-stone-600 italic line-clamp-2 leading-relaxed">
                      “{m.content}”
                    </p>
                  </div>

                  {/* Contributor footer */}
                  <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-medium truncate max-w-[120px]">
                      By {m.contributorName}
                    </span>
                    <span className="flex items-center gap-1 text-rose-500 font-semibold">
                      <Heart className="w-3 h-3 fill-rose-500" />
                      {m.likesCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
