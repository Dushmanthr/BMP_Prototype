import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Volume2,
  Image as ImageIcon,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Memory, MemoryType } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

type KeepsakePage =
  | {
      type: 'cover';
      title: string;
      subtitle: string;
      image: string;
    }
  | {
      type: 'memory';
      title: string;
      contributor: string;
      date: string;
      content: string;
      mediaUrl?: string;
      mediaType: MemoryType;
      duration?: string;
    };

export const DigitalKeepsakeView: React.FC = () => {
  const { activeOccasion, memories, setCurrentView, triggerConfetti, showToast } = useApp();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isPurchased, setIsPurchased] = useState<boolean>(false);

  const approvedMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status === 'Approved'
  );

  const pages: KeepsakePage[] = [
    {
      type: 'cover',
      title: activeOccasion.name,
      subtitle: `Curated digital archive for ${activeOccasion.celebrationPersonName}`,
      image: activeOccasion.coverImage,
    },
    ...approvedMemories.map((m) => ({
      type: 'memory' as const,
      title: m.title || `Memory from ${m.contributorName}`,
      contributor: m.contributorName,
      date: m.date,
      content: m.content,
      mediaUrl: m.mediaUrl,
      mediaType: m.type,
      duration: m.duration,
    })),
  ];


  const handleUnlock = () => {
    setIsPurchased(true);
    triggerConfetti();
    showToast('Digital Keepsake unlocked! Ready for offline download.');
  };

  const handleDownloadZip = () => {
    showToast('Preparing high-res archive package (.ZIP)... Download started!');
  };

  const currentItem = pages[currentPage];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
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

      {/* Interactive Flipbook Simulation */}
      <div className="bg-[#243B53] rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative">
        <div className="flex items-center justify-between text-xs text-gray-300 pb-4 border-b border-white/10 mb-6">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#FF6B6B]" />
            Interactive Keepsake Viewer
          </span>
          <span>
            Page {currentPage + 1} of {pages.length}
          </span>
        </div>

        {/* Page Content Card */}
        <div className="min-h-[380px] sm:min-h-[420px] bg-white rounded-2xl text-[#243B53] p-6 sm:p-8 flex flex-col justify-between shadow-lg">
          {currentItem.type === 'cover' ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#FF6B6B] shadow-md">
                <img
                  src={currentItem.image}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243B53]">
                {currentItem.title}
              </h2>
              <p className="text-sm text-gray-500 max-w-sm">
                {currentItem.subtitle}
              </p>
              <span className="text-xs font-semibold text-[#FF6B6B] px-3 py-1 bg-[#FF6B6B]/10 rounded-full">
                Flip to begin reading →
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                  From {currentItem.contributor}
                </span>
                <span className="text-xs text-gray-400">{currentItem.date}</span>
              </div>

              {currentItem.mediaUrl && currentItem.mediaType === 'photo' && (
                <div className="h-56 rounded-xl overflow-hidden shadow-xs">
                  <img
                    src={currentItem.mediaUrl}
                    alt={currentItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {currentItem.mediaType === 'audio' && (
                <AudioPlayer
                  duration={currentItem.duration}
                  contributorName={currentItem.contributor || 'Contributor'}
                  title={currentItem.title}
                  variant="compact"
                />
              )}

              <p className="text-sm sm:text-base text-gray-700 font-serif italic leading-relaxed">
                "{currentItem.content}"
              </p>
            </div>
          )}

          {/* Navigation arrows */}
          <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg ${
                currentPage === 0
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#243B53] hover:bg-gray-100 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => setCurrentPage((p) => Math.min(pages.length - 1, p + 1))}
              disabled={currentPage === pages.length - 1}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg ${
                currentPage === pages.length - 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#FF6B6B] hover:bg-gray-100 cursor-pointer'
              }`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

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
