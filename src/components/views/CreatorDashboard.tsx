import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Plus,
  Calendar,
  Users,
  Image as ImageIcon,
  ArrowUpRight,
  Settings,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Gift,
  Share2,
  Music,
  BookOpen,
  ShoppingBag,
  HardDrive,
  ArrowRight,
} from 'lucide-react';
import { Occasion } from '../../types';

export const CreatorDashboard: React.FC = () => {
  const {
    user,
    occasions,
    setCurrentView,
    selectOccasionAndNavigate,
    storageUsedGb = 2.4,
    storageLimitGb = 5.0,
    currentPlanName = 'Free Starter',
  } = useApp();

  const [showEmptyState, setShowEmptyState] = useState<boolean>(false);

  const displayedOccasions = showEmptyState ? [] : occasions;
  const storagePercent = Math.min(
    100,
    Math.round((storageUsedGb / storageLimitGb) * 100)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Greeting & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
              Creator Dashboard
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            <button
              onClick={() => setShowEmptyState(!showEmptyState)}
              className="text-[11px] text-gray-500 hover:text-[#243B53] underline cursor-pointer"
            >
              {showEmptyState ? 'Show Sample Celebrations' : 'Preview Empty State'}
            </button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] tracking-tight">
            Good evening, {user?.name.split(' ')[0] || 'Celebrator'}
          </h1>
          <p className="text-gray-600 text-base mt-1">
            Your celebrations, memory spaces, and creative studio tools
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('create-occasion')}
            id="dashboard-create-occasion-cta"
            className="px-5 py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#FF6B6B]/20 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Create Occasion
          </button>
        </div>
      </div>

      {/* Cloud Storage & Quota Widget Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#243B53]/5 text-[#243B53] flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5 text-[#FF6B6B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#243B53]">Celebration Cloud Storage</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#243B53]/10 text-[#243B53]">
                {currentPlanName}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {storageUsedGb} GB of {storageLimitGb} GB used ({storagePercent}% capacity) for media & memories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:w-72">
          <div className="flex-1">
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF6B6B] rounded-full transition-all duration-500"
                style={{ width: `${storagePercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setCurrentView('storage')}
            className="text-xs font-bold text-[#243B53] hover:text-[#FF6B6B] shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
          >
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Occasions List or Empty State */}
      {displayedOccasions.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-[#243B53] mb-2">
            Create your first celebration
          </h3>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Bring everyone together and collect memories in one beautiful place.
          </p>
          <button
            onClick={() => setCurrentView('create-occasion')}
            id="empty-state-create-btn"
            className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            Create Occasion
          </button>
        </div>
      ) : (
        /* Grid of Occasion Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {displayedOccasions.map((occasion: Occasion) => (
            <div
              key={occasion.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#FF6B6B]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Cover Image & Status Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={occasion.coverImage}
                  alt={occasion.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243B53]/80 via-transparent to-black/20" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      occasion.isFinalized
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-[#243B53]'
                    }`}
                  >
                    {occasion.isFinalized ? 'Celebration Finalized' : occasion.status}
                  </span>
                </div>

                {/* Person portrait badge */}
                {occasion.celebrationPersonPhoto && (
                  <div className="absolute top-4 right-4">
                    <img
                      src={occasion.celebrationPersonPhoto}
                      alt={occasion.celebrationPersonName}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md"
                    />
                  </div>
                )}

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B6B] block">
                    {occasion.occasionType}
                  </span>
                  <h3 className="text-xl font-bold truncate leading-tight">
                    {occasion.name}
                  </h3>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-3 border-b border-gray-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#FF6B6B]" />
                      {occasion.formattedDate}
                    </span>
                    <span className="text-gray-700 font-semibold">
                      For {occasion.celebrationPersonName}
                    </span>
                  </div>

                  {/* Stats counts */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="p-3 rounded-2xl bg-[#FAFAFB] border border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <ImageIcon className="w-3.5 h-3.5 text-[#FF6B6B]" />
                        <span>Memories</span>
                      </div>
                      <p className="text-xl font-extrabold text-[#243B53]">
                        {occasion.memoriesCount}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FAFAFB] border border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <Users className="w-3.5 h-3.5 text-[#243B53]" />
                        <span>Contributors</span>
                      </div>
                      <p className="text-xl font-extrabold text-[#243B53]">
                        {occasion.contributorsCount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Open & Manage */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => selectOccasionAndNavigate(occasion.id, 'occasion-space')}
                    id={`open-occasion-${occasion.id}-btn`}
                    className="py-3 px-4 rounded-xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    Open Space
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => selectOccasionAndNavigate(occasion.id, 'creator-review')}
                    id={`manage-occasion-${occasion.id}-btn`}
                    className="py-3 px-4 rounded-xl bg-[#FAFAFB] hover:bg-gray-100 text-[#243B53] border border-gray-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    Manage & Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Celebration Studio & Creative Tools (Relocated from top navbar for clean, contextual discovery) */}
      <div className="pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                Celebration Studio & Add-ons
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#243B53] tracking-tight">
              Enhance Your Celebrations
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Creative tools, personalized gifts, custom songs, and handcrafted memory keepsakes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Birthday Song */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#FF6B6B]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all duration-300">
                  <Music className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B]">
                  AI Studio
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors mb-2">
                AI Birthday Song
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Compose custom birthday melodies, personalized lyrics, and downloadable voice dedications using AI.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('ai-birthday-song')}
              id="dashboard-tool-ai-song-btn"
              className="w-full py-2.5 px-4 rounded-xl bg-[#243B53] hover:bg-[#FF6B6B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Compose Song</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Smart Gift Finder */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#FF6B6B]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all duration-300">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B]">
                  Guided AI
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors mb-2">
                Smart Gift Finder
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Collect secret recommendations from friends and let AI recommend curated gifts matched to their passion.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('gift-finder')}
              id="dashboard-tool-gift-finder-btn"
              className="w-full py-2.5 px-4 rounded-xl bg-[#243B53] hover:bg-[#FF6B6B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Find Gifts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Keepsakes & Photobooks */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#FF6B6B]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B]">
                  Prints & Digital
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors mb-2">
                Keepsakes & Photobooks
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Transform crowd-sourced memories and high-res photos into luxury hardcover books and digital flipbooks.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('digital-keepsake')}
              id="dashboard-tool-keepsakes-btn"
              className="w-full py-2.5 px-4 rounded-xl bg-[#243B53] hover:bg-[#FF6B6B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Browse Keepsakes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Digital Store */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#FF6B6B]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FF6B6B] group-hover:text-white transition-all duration-300">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B]">
                  Store
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors mb-2">
                Digital Party Store
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Instant download designer invitation templates, custom thank-you cards, and printable celebration graphics.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('digital-store')}
              id="dashboard-tool-store-btn"
              className="w-full py-2.5 px-4 rounded-xl bg-[#243B53] hover:bg-[#FF6B6B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Visit Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
