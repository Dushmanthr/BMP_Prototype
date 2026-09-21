import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Trash2,
  ArrowLeft,
  Filter,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Eye,
  X,
} from 'lucide-react';
import { Memory, MemoryStatus } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

export const CreatorReviewScreen: React.FC = () => {
  const {
    activeOccasion,
    memories,
    updateMemoryStatus,
    removeMemory,
    setCurrentView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Removed'>('Pending');
  const [memoryToRemove, setMemoryToRemove] = useState<Memory | null>(null);
  const [previewMemory, setPreviewMemory] = useState<Memory | null>(null);

  const occasionMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id
  );

  const pendingCount = occasionMemories.filter((m) => m.status === 'Pending Review').length;
  const approvedCount = occasionMemories.filter((m) => m.status === 'Approved').length;
  const removedCount = occasionMemories.filter((m) => m.status === 'Removed').length;

  const filteredMemories = occasionMemories.filter((m) => {
    if (activeTab === 'All') return m.status !== 'Removed';
    if (activeTab === 'Pending') return m.status === 'Pending Review';
    if (activeTab === 'Approved') return m.status === 'Approved';
    if (activeTab === 'Removed') return m.status === 'Removed';
    return true;
  });

  const handleConfirmRemove = () => {
    if (memoryToRemove) {
      removeMemory(memoryToRemove.id);
      setMemoryToRemove(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentView('occasion-space')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Memory Space
          </button>
          <h1 className="text-3xl font-extrabold text-[#243B53]">
            Review Memories
          </h1>
          <p className="text-sm text-gray-500">
            Review contributions before they become part of the final celebration for{' '}
            <strong>{activeOccasion.celebrationPersonName}</strong>.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('finalize-celebration')}
          id="review-proceed-to-finalize-btn"
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Finalize Celebration
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('Pending')}
          id="tab-pending-btn"
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'Pending'
              ? 'bg-[#243B53] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Pending Review
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Pending' ? 'bg-[#FF6B6B] text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {pendingCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('Approved')}
          id="tab-approved-btn"
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'Approved'
              ? 'bg-[#243B53] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Approved
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Approved' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {approvedCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('All')}
          id="tab-all-btn"
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'All'
              ? 'bg-[#243B53] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All Active
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'All' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {occasionMemories.length - removedCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('Removed')}
          id="tab-removed-btn"
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'Removed'
              ? 'bg-[#243B53] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Removed
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Removed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {removedCount}
          </span>
        </button>
      </div>

      {/* Moderation Media Grid */}
      {filteredMemories.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-gray-200 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-[#243B53]">
            No memories in {activeTab}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {activeTab === 'Pending'
              ? 'All submitted memories have been reviewed and approved.'
              : `There are currently no items under the ${activeTab} filter.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory: Memory) => (
            <div
              key={memory.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Visual Preview */}
                {memory.type === 'photo' && memory.mediaUrl && (
                  <div
                    className="h-48 overflow-hidden relative cursor-pointer"
                    onClick={() => setPreviewMemory(memory)}
                  >
                    <img
                      src={memory.mediaUrl}
                      alt={memory.title || 'Memory photo'}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#243B53]/80 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                      <ImageIcon className="w-3 h-3" /> Photo
                    </span>
                  </div>
                )}

                {memory.type === 'video' && (
                  <div
                    className="h-48 bg-[#243B53] relative flex items-center justify-center cursor-pointer"
                    onClick={() => setPreviewMemory(memory)}
                  >
                    {memory.mediaUrl ? (
                      <img
                        src={memory.mediaUrl}
                        alt="Video"
                        className="w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      <Video className="w-12 h-12 text-[#FF6B6B]" />
                    )}
                    <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                      Video ({memory.duration || '1:12'})
                    </span>
                  </div>
                )}

                {memory.type === 'audio' && (
                  <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <AudioPlayer
                      duration={memory.duration}
                      contributorName={memory.contributorName}
                      title={memory.title}
                      variant="compact"
                    />
                  </div>
                )}

                {memory.type === 'wish' && (
                  <div className="p-5 bg-[#FAFAFB] border-b border-gray-100">
                    <span className="text-[10px] font-bold text-[#FF6B6B] uppercase tracking-wider flex items-center gap-1 mb-2">
                      <FileText className="w-3 h-3" /> Written Wish
                    </span>
                    <p className="text-sm text-gray-700 italic leading-relaxed line-clamp-3">
                      "{memory.content}"
                    </p>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-[#243B53] line-clamp-1">
                      {memory.title || `${memory.type.toUpperCase()} from ${memory.contributorName}`}
                    </h4>
                  </div>
                  {memory.type !== 'wish' && (
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {memory.content}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="font-semibold text-[#243B53]">
                      From {memory.contributorName}
                    </span>
                    <span>{memory.date}</span>
                  </div>
                </div>
              </div>

              {/* Moderation Actions Bar */}
              <div className="p-4 bg-[#FAFAFB] border-t border-gray-100 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    memory.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : memory.status === 'Removed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {memory.status}
                </span>

                <div className="flex items-center gap-2">
                  {memory.status !== 'Approved' && (
                    <button
                      onClick={() => updateMemoryStatus(memory.id, 'Approved')}
                      id={`approve-memory-${memory.id}-btn`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}

                  {memory.status !== 'Removed' && (
                    <button
                      onClick={() => setMemoryToRemove(memory)}
                      id={`reject-memory-${memory.id}-btn`}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal When Removing */}
      {memoryToRemove && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#243B53]">
                Remove memory from celebration?
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                This memory from <strong>{memoryToRemove.contributorName}</strong> will be moved to
                the Removed tab and excluded from the celebration.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setMemoryToRemove(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                id="modal-confirm-remove-btn"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md cursor-pointer"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Lightbox Preview */}
      {previewMemory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-lg text-[#243B53]">
                {previewMemory.title || `Memory from ${previewMemory.contributorName}`}
              </h3>
              <button
                onClick={() => setPreviewMemory(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewMemory.mediaUrl && previewMemory.type === 'photo' && (
              <img
                src={previewMemory.mediaUrl}
                alt="Selected"
                className="w-full max-h-72 object-cover rounded-2xl"
              />
            )}

            <div className="p-4 rounded-2xl bg-gray-50 text-sm text-gray-700 italic leading-relaxed">
              "{previewMemory.content}"
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span>Submitted by {previewMemory.contributorName}</span>
              <span className="font-bold text-emerald-600">{previewMemory.status}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
