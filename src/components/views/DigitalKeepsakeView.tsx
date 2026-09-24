import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { MagicFlipBook } from './keepsake/MagicFlipBook';

export const DigitalKeepsakeView: React.FC = () => {
  const { activeOccasion, memories, setCurrentView, triggerConfetti, showToast } = useApp();
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const approvedMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status === 'Approved'
  );

  const handleUnlock = () => {
    setIsPurchased(true);
    triggerConfetti();
    showToast('Digital Keepsake unlocked! Ready for offline download.');
  };

  const handleDownloadZip = () => {
    showToast('Preparing high-res archive package (.ZIP)... Download started!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Back to Celebration */}
      <button
        onClick={() => setCurrentView('celebration-page')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Celebration
      </button>

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
          Forever Digital Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
          The Digital Keepsake
        </h1>
        <p className="text-sm text-gray-600">
          A timeless interactive digital memory book and full-resolution download package that preserves every memory forever.
        </p>
      </div>

      {/* Magic Interactive Photo Book Viewer */}
      <MagicFlipBook occasion={activeOccasion} memories={approvedMemories} />

      {/* Feature Value Props & Purchase Box */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              One-Time Purchase
            </span>
            <h3 className="text-2xl font-bold text-[#243B53]">
              Downloadable Memory Bundle
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Includes full-resolution media export, offline reader, and MP3 audio clips.
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-extrabold text-[#243B53]">$9.99</span>
            <span className="text-xs text-gray-500 block">USD one-time</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>High-resolution ZIP file with all photos & videos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Lossless MP3 audio exports of every voice note</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Offline PDF keepsake memory booklet</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Lifetime cloud storage preservation</span>
          </div>
        </div>

        <div className="pt-2">
          {!isPurchased ? (
            <button
              onClick={handleUnlock}
              id="unlock-digital-keepsake-btn"
              className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-base shadow-lg transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              Unlock Digital Keepsake ($9.99)
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center font-bold text-sm">
                Keepsake Unlocked! Your download is ready.
              </div>
              <button
                onClick={handleDownloadZip}
                id="download-archive-btn"
                className="w-full py-4 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-extrabold text-base shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Complete Archive (.ZIP)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
