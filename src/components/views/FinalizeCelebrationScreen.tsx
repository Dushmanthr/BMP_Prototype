import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  Eye,
  Share2,
  Heart,
  ShieldCheck,
} from 'lucide-react';

export const FinalizeCelebrationScreen: React.FC = () => {
  const {
    activeOccasion,
    memories,
    finalizeCelebration,
    setCurrentView,
    selectOccasionAndNavigate,
  } = useApp();

  const approvedMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status === 'Approved'
  );

  const photosCount = approvedMemories.filter((m) => m.type === 'photo').length;
  const videosCount = approvedMemories.filter((m) => m.type === 'video').length;
  const audioCount = approvedMemories.filter((m) => m.type === 'audio').length;
  const wishesCount = approvedMemories.filter((m) => m.type === 'wish').length;

  const handleFinalizeAndShare = () => {
    finalizeCelebration(activeOccasion.id);
    selectOccasionAndNavigate(activeOccasion.id, 'celebration-page');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => setCurrentView('creator-review')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Moderation
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#243B53]">
            Your Celebration Is Ready
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            You have reviewed the memories. Ready to create the final celebration experience for{' '}
            <strong>{activeOccasion.celebrationPersonName}</strong>?
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="p-6 rounded-3xl bg-[#FAFAFB] border border-gray-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Celebration Space
            </span>
            <span className="text-xs font-bold text-[#FF6B6B]">
              {activeOccasion.name}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-gray-100 text-center shadow-xs">
              <ImageIcon className="w-5 h-5 text-[#FF6B6B] mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-[#243B53]">{photosCount}</p>
              <span className="text-[11px] text-gray-500">Photos</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-100 text-center shadow-xs">
              <Video className="w-5 h-5 text-[#243B53] mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-[#243B53]">{videosCount}</p>
              <span className="text-[11px] text-gray-500">Videos</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-100 text-center shadow-xs">
              <Volume2 className="w-5 h-5 text-[#FF6B6B] mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-[#243B53]">{audioCount}</p>
              <span className="text-[11px] text-gray-500">Audio Notes</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-100 text-center shadow-xs">
              <FileText className="w-5 h-5 text-[#243B53] mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-[#243B53]">{wishesCount}</p>
              <span className="text-[11px] text-gray-500">Written Wishes</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-gray-600">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {approvedMemories.length} total memories approved
            </span>
            <span className="text-gray-400">
              Ready for presentation
            </span>
          </div>
        </div>

        {/* Privacy & Guarantee note */}
        <div className="p-4 rounded-2xl bg-[#243B53]/5 border border-[#243B53]/10 flex items-center gap-3 text-xs text-[#243B53]">
          <ShieldCheck className="w-5 h-5 text-[#FF6B6B] shrink-0" />
          <span>
            Once finalized, the celebration page will be ready to share with{' '}
            {activeOccasion.celebrationPersonName} and everyone who contributed.
          </span>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleFinalizeAndShare}
            id="finalize-and-share-btn"
            className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-base shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            Finalize & Share Celebration
          </button>

          <button
            onClick={() => selectOccasionAndNavigate(activeOccasion.id, 'celebration-page')}
            id="preview-celebration-page-btn"
            className="w-full py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-[#243B53] border-2 border-gray-200 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-gray-500" />
            Preview Celebration Page First
          </button>
        </div>
      </div>
    </div>
  );
};
