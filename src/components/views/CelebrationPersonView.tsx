import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Share2,
  Sparkles,
  Image as ImageIcon,
  Video,
  Volume2,
  FileText,
  Copy,
  Check,
  X,
  MessageCircle,
  Download,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Memory } from '../../types';
import { AudioPlayer } from '../common/AudioPlayer';

export const CelebrationPersonView: React.FC = () => {
  const { activeOccasion, memories, triggerConfetti, showToast, setCurrentView } = useApp();

  const [activeCategory, setActiveCategory] = useState<'all' | 'photo' | 'video' | 'audio' | 'wish'>('all');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});

  // Approved memories for this occasion
  const approvedMemories = memories.filter(
    (m) => m.occasionId === activeOccasion.id && m.status === 'Approved'
  );

  const displayedMemories =
    activeCategory === 'all'
      ? approvedMemories
      : approvedMemories.filter((m) => m.type === activeCategory);

  const celebrationUrl = `https://celebrate.momentsmemories.app/celebration/${activeOccasion.id}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(celebrationUrl);
    setCopiedLink(true);
    showToast('Celebration link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMemories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    triggerConfetti();
  };

  return (
    <div className="bg-[#FAFAFB] min-h-screen pb-24 text-[#243B53]">
      {/* Full-width Celebration Hero */}
      <section className="relative overflow-hidden bg-[#243B53] text-white py-20 sm:py-28">
        {/* Background visual layering */}
        <div className="absolute inset-0 opacity-40">
          <img
            src={activeOccasion.coverImage}
            alt="Celebration background"
            className="w-full h-full object-cover scale-105 filter blur-sm"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#243B53]/90 via-[#243B53]/80 to-[#243B53]" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
            A Special Digital Gift For You
          </div>

          <div className="space-y-3">
            {activeOccasion.celebrationPersonPhoto && (
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#FF6B6B] overflow-hidden mx-auto shadow-2xl">
                <img
                  src={activeOccasion.celebrationPersonPhoto}
                  alt={activeOccasion.celebrationPersonName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Happy {activeOccasion.occasionType},{' '}
              <span className="text-[#FF6B6B]">{activeOccasion.celebrationPersonName}</span>!
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
              Your friends and family created something special for you. Here is a private
              collection of memories, laughter, voice messages, and heartfelt love.
            </p>
          </div>

          {/* Quick stats ribbon */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-gray-300 font-medium">
            <span>{approvedMemories.length} Personal Memories</span>
            <span>•</span>
            <span>{activeOccasion.contributorsCount} Loved Ones</span>
            <span>•</span>
            <span>{activeOccasion.formattedDate}</span>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('messages-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="start-exploring-memories-btn"
              className="px-8 py-3.5 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-xl transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              Explore Your Memories
              <Heart className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('share-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm transition-colors cursor-pointer flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Celebration
            </button>
          </div>
        </div>
      </section>

      {/* Main Section: Messages From Your People */}
      <div id="messages-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
            Curated With Love
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
            Messages From Your People
          </h2>
          <p className="text-gray-600 text-sm">
            Tap any memory to view photos, listen to personal voice notes, and read wishes.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            id="cat-all-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#243B53] text-white shadow-sm'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            All ({approvedMemories.length})
          </button>
          <button
            onClick={() => setActiveCategory('photo')}
            id="cat-photos-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'photo'
                ? 'bg-[#243B53] text-white shadow-sm'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Photos
          </button>
          <button
            onClick={() => setActiveCategory('audio')}
            id="cat-audio-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'audio'
                ? 'bg-[#243B53] text-white shadow-sm'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Voice Notes
          </button>
          <button
            onClick={() => setActiveCategory('video')}
            id="cat-videos-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'video'
                ? 'bg-[#243B53] text-white shadow-sm'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Videos
          </button>
          <button
            onClick={() => setActiveCategory('wish')}
            id="cat-wishes-btn"
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'wish'
                ? 'bg-[#243B53] text-white shadow-sm'
                : 'bg-white text-[#243B53] border border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#FF6B6B]" />
            Wishes
          </button>
        </div>

        {/* Masonry / Grid of Personal Memories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {displayedMemories.map((mem) => {
            const isLiked = likedMemories[mem.id];
            return (
              <div
                key={mem.id}
                onClick={() => setSelectedMemory(mem)}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group transform hover:-translate-y-1"
              >
                <div>
                  {/* Photo type */}
                  {mem.type === 'photo' && mem.mediaUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={mem.mediaUrl}
                        alt={mem.title || 'Memory photo'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 text-white text-xs font-semibold">
                        Tap to view full photograph
                      </div>
                    </div>
                  )}

                  {/* Video type */}
                  {mem.type === 'video' && (
                    <div className="relative h-64 bg-[#243B53] overflow-hidden">
                      {mem.mediaUrl ? (
                        <img
                          src={mem.mediaUrl}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover opacity-80"
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Video className="w-6 h-6 ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-mono">
                        {mem.duration || '1:12'}
                      </span>
                    </div>
                  )}

                  {/* Audio type */}
                  {mem.type === 'audio' && (
                    <div className="p-6 bg-gradient-to-br from-[#FAFAFB] to-white border-b border-gray-100">
                      <AudioPlayer
                        duration={mem.duration}
                        contributorName={mem.contributorName}
                        title={mem.title}
                        variant="compact"
                      />
                    </div>
                  )}

                  {/* Written Wish type */}
                  {mem.type === 'wish' && (
                    <div className="p-7 bg-gradient-to-br from-white to-[#FAFAFB] border-b border-gray-100">
                      <span className="text-4xl text-[#FF6B6B]/30 font-serif leading-none block mb-1">
                        “
                      </span>
                      <p className="text-base text-gray-800 leading-relaxed font-serif italic">
                        {mem.content}
                      </p>
                    </div>
                  )}

                  {/* Card Content & Contributor Name */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-[#FF6B6B] uppercase tracking-wider">
                        From {mem.contributorName}
                      </span>
                      <span className="text-[11px] text-gray-400">{mem.date}</span>
                    </div>

                    {mem.title && (
                      <h3 className="text-lg font-bold text-[#243B53] mb-2 leading-snug">
                        {mem.title}
                      </h3>
                    )}

                    {mem.type !== 'wish' && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {mem.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Footer with Heart Reaction */}
                <div className="p-4 px-6 border-t border-gray-100 bg-[#FAFAFB] flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {mem.type.charAt(0).toUpperCase() + mem.type.slice(1)} Memory
                  </span>

                  <button
                    onClick={(e) => toggleLike(mem.id, e)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isLiked
                        ? 'bg-[#FF6B6B] text-white shadow-sm'
                        : 'bg-white text-gray-600 hover:text-[#FF6B6B] border border-gray-200'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{(mem.likesCount || 0) + (isLiked ? 1 : 0)}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screen 13: Celebration Sharing Section */}
      <section id="share-section" className="max-w-4xl mx-auto px-4 pt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl text-center space-y-8">
          <div className="space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-3">
              <Share2 className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-extrabold text-[#243B53]">
              Share Your Celebration
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Send this celebration to the people who helped make it possible, or share your favorite memories.
            </p>
          </div>

          {/* Direct Share Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyLink}
              id="celebration-copy-link-btn"
              className="px-5 py-3 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              {copiedLink ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              {copiedLink ? 'Link Copied!' : 'Copy Celebration Link'}
            </button>

            <button
              onClick={() => {
                const text = `Take a look at the celebration page created for ${activeOccasion.celebrationPersonName}! ${celebrationUrl}`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp
            </button>

            <button
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(celebrationUrl)}`,
                  '_blank'
                );
              }}
              className="px-5 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              Facebook
            </button>

            <button
              onClick={() => {
                showToast('Instagram story asset prepared! Download and share to your story.');
              }}
              className="px-5 py-3 rounded-2xl bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              Instagram Story
            </button>
          </div>

          {/* Keepsake Upsell Card */}
          <div className="p-6 rounded-2xl bg-[#FAFAFB] border border-gray-200 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#243B53] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF6B6B]" />
                Keep These Memories in a Physical Heirloom Book
              </h4>
              <p className="text-xs text-gray-500">
                Turn this entire collection into an embossed linen memory photobook or digital keepsake.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('physical-keepsake')}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              View Keepsakes
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Private celebration link. Only accessible to people you share this URL with.</span>
          </div>
        </div>
      </section>

      {/* Lightbox / Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                  From {selectedMemory.contributorName}
                </span>
                <h3 className="text-2xl font-extrabold text-[#243B53] mt-0.5">
                  {selectedMemory.title || `${selectedMemory.type.toUpperCase()} Memory`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMemory(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {selectedMemory.type === 'photo' && selectedMemory.mediaUrl && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={selectedMemory.mediaUrl}
                  alt="Full memory preview"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}

            {selectedMemory.type === 'audio' && (
              <div className="p-4 rounded-2xl bg-gray-50">
                <AudioPlayer
                  duration={selectedMemory.duration}
                  contributorName={selectedMemory.contributorName}
                  title={selectedMemory.title}
                  variant="full"
                />
              </div>
            )}

            <div className="p-6 rounded-2xl bg-[#FAFAFB] text-base text-gray-800 leading-relaxed font-serif italic border border-gray-100">
              "{selectedMemory.content}"
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-gray-500 border-t border-gray-100">
              <span>Added with love by {selectedMemory.contributorName} • {selectedMemory.date}</span>
              <button
                onClick={(e) => toggleLike(selectedMemory.id, e)}
                className="px-4 py-2 rounded-xl bg-[#FF6B6B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                Send Love Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
