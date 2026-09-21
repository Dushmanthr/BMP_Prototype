import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  Plus,
  Share2,
  Sparkles,
  CheckCircle2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Heart,
  X,
  AlertCircle,
} from 'lucide-react';
import { Memory } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

export const OccasionMemorySpace: React.FC = () => {
  const {
    activeOccasion,
    memories,
    removeMemory,
    setCurrentView,
    updateMemoryStatus,
    showToast,
  } = useApp();

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [memoryToRemove, setMemoryToRemove] = useState<Memory | null>(null);

  // Filter memories for active occasion
  const occasionMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status !== 'Removed'
  );

  const photosCount = occasionMemories.filter((m) => m.type === 'photo').length;
  const videosCount = occasionMemories.filter((m) => m.type === 'video').length;
  const audioCount = occasionMemories.filter((m) => m.type === 'audio').length;
  const wishesCount = occasionMemories.filter((m) => m.type === 'wish').length;

  const filteredMemories =
    filterType === 'all'
      ? occasionMemories
      : occasionMemories.filter((m) => m.type === filterType);

  const handleConfirmRemove = () => {
    if (memoryToRemove) {
      removeMemory(memoryToRemove.id);
      setMemoryToRemove(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-[#243B53] text-white">
        <div className="h-56 sm:h-72 w-full relative">
          <img
            src={activeOccasion.coverImage}
            alt={activeOccasion.name}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#243B53] via-[#243B53]/50 to-transparent" />
        </div>

        <div className="p-6 sm:p-8 relative -mt-24 sm:-mt-28 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#FF6B6B] text-white text-xs font-bold uppercase tracking-wider">
                {activeOccasion.occasionType}
              </span>
              <span className="text-xs text-gray-300 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#FF6B6B]" />
                {activeOccasion.formattedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {activeOccasion.name}
            </h1>
            <p className="text-sm text-gray-300">
              Celebration for <strong className="text-white">{activeOccasion.celebrationPersonName}</strong>
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('invite-contributors')}
              id="space-invite-friends-btn"
              className="px-5 py-3 rounded-xl bg-white hover:bg-gray-100 text-[#243B53] font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#FF6B6B]" />
              Invite Friends
            </button>

            <button
              onClick={() => setCurrentView('contributor-upload')}
              id="space-add-memory-btn"
              className="px-5 py-3 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              Add Memory
            </button>

            <button
              onClick={() => setCurrentView('finalize-celebration')}
              id="space-finalize-celebration-btn"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Finalize Celebration
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div
          onClick={() => setFilterType('all')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-[#243B53] text-white shadow-md border-[#243B53]'
              : 'bg-white text-[#243B53] border-gray-200 hover:border-[#FF6B6B]/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Memories</span>
            <Heart className={`w-4 h-4 ${filterType === 'all' ? 'text-[#FF6B6B]' : 'text-[#FF6B6B]'}`} />
          </div>
          <p className="text-2xl font-extrabold">{occasionMemories.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white text-[#243B53] border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Contributors</span>
            <Users className="w-4 h-4 text-[#243B53]" />
          </div>
          <p className="text-2xl font-extrabold">{activeOccasion.contributorsCount}</p>
        </div>

        <div
          onClick={() => setFilterType('photo')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filterType === 'photo'
              ? 'bg-[#243B53] text-white shadow-md border-[#243B53]'
              : 'bg-white text-[#243B53] border-gray-200 hover:border-[#FF6B6B]/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Photos</span>
            <ImageIcon className="w-4 h-4 text-[#FF6B6B]" />
          </div>
          <p className="text-2xl font-extrabold">{photosCount}</p>
        </div>

        <div
          onClick={() => setFilterType('video')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filterType === 'video'
              ? 'bg-[#243B53] text-white shadow-md border-[#243B53]'
              : 'bg-white text-[#243B53] border-gray-200 hover:border-[#FF6B6B]/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Videos</span>
            <Video className="w-4 h-4 text-[#243B53]" />
          </div>
          <p className="text-2xl font-extrabold">{videosCount}</p>
        </div>

        <div
          onClick={() => setFilterType('audio')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
            filterType === 'audio'
              ? 'bg-[#243B53] text-white shadow-md border-[#243B53]'
              : 'bg-white text-[#243B53] border-gray-200 hover:border-[#FF6B6B]/40'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Audio Notes</span>
            <Volume2 className="w-4 h-4 text-[#FF6B6B]" />
          </div>
          <p className="text-2xl font-extrabold">{audioCount}</p>
        </div>
      </div>

      {/* Main Section: Memories Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-extrabold text-[#243B53]">Memories</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Showing all contributor submissions. Review and moderate before final celebration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('creator-review')}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#243B53] text-xs font-bold transition-colors cursor-pointer"
            >
              Go to Moderation Queue
            </button>
          </div>
        </div>

        {/* Visual Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory: Memory) => (
            <div
              key={memory.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Media Preview based on type */}
              <div>
                {memory.type === 'photo' && memory.mediaUrl && (
                  <div className="h-52 overflow-hidden relative cursor-pointer" onClick={() => setSelectedMemory(memory)}>
                    <img
                      src={memory.mediaUrl}
                      alt={memory.title || 'Memory photo'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#243B53]/80 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3" /> Photo
                    </span>
                  </div>
                )}

                {memory.type === 'video' && (
                  <div className="h-52 overflow-hidden relative bg-[#243B53] cursor-pointer" onClick={() => setSelectedMemory(memory)}>
                    {memory.mediaUrl ? (
                      <img
                        src={memory.mediaUrl}
                        alt={memory.title || 'Video preview'}
                        className="w-full h-full object-cover opacity-80"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <Video className="w-12 h-12 text-[#FF6B6B]" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-[#243B53]/80 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <Video className="w-3 h-3" /> Video ({memory.duration || '1:12'})
                    </span>
                  </div>
                )}

                {memory.type === 'audio' && (
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <AudioPlayer
                      duration={memory.duration || '0:48'}
                      contributorName={memory.contributorName}
                      title={memory.title}
                      variant="compact"
                    />
                  </div>
                )}

                {memory.type === 'wish' && (
                  <div className="p-5 bg-gradient-to-br from-[#FAFAFB] to-white border-b border-gray-100">
                    <span className="text-[10px] font-bold text-[#FF6B6B] uppercase tracking-wider flex items-center gap-1 mb-2">
                      <FileText className="w-3 h-3" /> Written Wish
                    </span>
                    <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-3">
                      "{memory.content}"
                    </p>
                  </div>
                )}

                {/* Content text if photo or video */}
                {memory.type !== 'wish' && (
                  <div className="p-5 pb-3">
                    {memory.title && (
                      <h4 className="font-bold text-sm text-[#243B53] mb-1">
                        {memory.title}
                      </h4>
                    )}
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {memory.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Meta & Creator Actions */}
              <div className="p-5 pt-3 border-t border-gray-100 bg-[#FAFAFB]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold text-[#243B53] block">
                      {memory.contributorName}
                    </span>
                    <span className="text-[11px] text-gray-400">{memory.date}</span>
                  </div>

                  {/* Status Indicator */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      memory.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {memory.status}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedMemory(memory)}
                    id={`view-memory-${memory.id}-btn`}
                    className="p-2 rounded-lg text-gray-600 hover:text-[#243B53] hover:bg-white transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1 border border-gray-200"
                    title="View full memory"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>

                  <button
                    onClick={() => setMemoryToRemove(memory)}
                    id={`remove-memory-${memory.id}-btn`}
                    className="p-2 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                    title="Remove memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Memory Lightbox Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                  {selectedMemory.type} memory
                </span>
                <h3 className="text-xl font-bold text-[#243B53]">
                  {selectedMemory.title || `Memory from ${selectedMemory.contributorName}`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemory(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedMemory.mediaUrl && selectedMemory.type === 'photo' && (
              <img
                src={selectedMemory.mediaUrl}
                alt="Selected memory"
                className="w-full max-h-80 object-cover rounded-2xl"
              />
            )}

            {selectedMemory.type === 'audio' && (
              <AudioPlayer
                duration={selectedMemory.duration}
                contributorName={selectedMemory.contributorName}
                title={selectedMemory.title}
                variant="full"
              />
            )}

            <div className="p-4 rounded-2xl bg-gray-50 text-sm text-gray-700 leading-relaxed italic">
              "{selectedMemory.content}"
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>Submitted by {selectedMemory.contributorName} • {selectedMemory.date}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {selectedMemory.status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal when Removing a Memory */}
      {memoryToRemove && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#243B53]">Remove this memory?</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Are you sure you want to remove the contribution from{' '}
                <strong>{memoryToRemove.contributorName}</strong>? It will not appear in the
                final celebration page.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={() => setMemoryToRemove(null)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                id="confirm-remove-memory-btn"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md cursor-pointer"
              >
                Remove Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
