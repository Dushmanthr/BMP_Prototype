import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Lock,
  Plus,
  Trash2,
  Eye,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';
import { Memory } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

export const ContributorMyContributions: React.FC = () => {
  const {
    activeOccasion,
    memories,
    contributorName,
    setCurrentView,
    removeMemory,
  } = useApp();

  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Filter memories that belong to this contributor (or marked as isMyUpload or matching name)
  const myMemories = memories.filter(
    (m) =>
      (m.isMyUpload ||
        (contributorName &&
          m.contributorName.toLowerCase() === contributorName.toLowerCase())) &&
      m.occasionId === activeOccasion.id &&
      m.status !== 'Removed'
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('contributor-upload')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Add More Memories
        </button>

        <button
          onClick={() => setCurrentView('contributor-upload')}
          className="px-4 py-2 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Memory
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-[#243B53]">Your Memories</h1>
        <p className="text-sm text-gray-500">
          Showing contributions you submitted for {activeOccasion.celebrationPersonName}.
        </p>

        {/* Mandatory Privacy Reassurance Message */}
        <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-[#243B53] uppercase tracking-wider">
              Completely Private Space
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              Your memories are private. Other contributors cannot see what you have shared. Only you and the occasion creator have access to review these files.
            </p>
          </div>
        </div>
      </div>

      {/* List of my memories */}
      {myMemories.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#243B53]">No memories added yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Share a photo, voice note, or written wish to make {activeOccasion.celebrationPersonName}'s celebration truly special.
          </p>
          <button
            onClick={() => setCurrentView('contributor-upload')}
            className="px-6 py-3 rounded-xl bg-[#FF6B6B] text-white font-bold text-sm shadow-md cursor-pointer"
          >
            Add a Memory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {myMemories.map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {mem.type === 'photo' && mem.mediaUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={mem.mediaUrl}
                      alt={mem.title || 'Memory photo'}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#243B53]/80 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Photo
                    </span>
                  </div>
                )}

                {mem.type === 'video' && (
                  <div className="h-48 bg-[#243B53] flex items-center justify-center relative">
                    <Video className="w-10 h-10 text-[#FF6B6B]" />
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Video ({mem.duration || '1:15'})
                    </span>
                  </div>
                )}

                {mem.type === 'audio' && (
                  <div className="p-4 bg-[#FAFAFB] border-b border-gray-100">
                    <AudioPlayer
                      duration={mem.duration || '0:35'}
                      contributorName={mem.contributorName}
                      title={mem.title || 'Voice Message'}
                      variant="compact"
                    />
                  </div>
                )}

                {mem.type === 'wish' && (
                  <div className="p-5 bg-gradient-to-br from-[#FAFAFB] to-white border-b border-gray-100">
                    <span className="text-[10px] font-bold text-[#FF6B6B] uppercase tracking-wider block mb-2">
                      Written Wish
                    </span>
                    <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-3">
                      "{mem.content}"
                    </p>
                  </div>
                )}

                <div className="p-5">
                  <h4 className="font-bold text-sm text-[#243B53] mb-1">
                    {mem.title || `${mem.type.toUpperCase()} Memory`}
                  </h4>
                  {mem.type !== 'wish' && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {mem.content}
                    </p>
                  )}
                  <span className="text-[11px] text-gray-400 mt-2 block">
                    Added {mem.date}
                  </span>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-100 bg-[#FAFAFB] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                  {mem.status}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedMemory(mem)}
                    className="p-1.5 text-xs text-gray-600 hover:text-[#243B53] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </button>
                  <button
                    onClick={() => removeMemory(mem.id)}
                    className="p-1.5 text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-lg text-[#243B53]">
                {selectedMemory.title || 'Memory Details'}
              </h3>
              <button
                onClick={() => setSelectedMemory(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedMemory.mediaUrl && selectedMemory.type === 'photo' && (
              <img
                src={selectedMemory.mediaUrl}
                alt="Selected memory"
                className="w-full max-h-72 object-cover rounded-2xl"
              />
            )}

            <div className="p-4 rounded-2xl bg-gray-50 text-sm text-gray-700 leading-relaxed italic">
              "{selectedMemory.content}"
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>Added {selectedMemory.date}</span>
              <span className="font-bold text-emerald-700">{selectedMemory.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
