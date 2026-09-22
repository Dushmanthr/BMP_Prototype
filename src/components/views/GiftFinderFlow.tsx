import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Gift,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Check,
  ExternalLink,
  Heart,
  Share2,
  Tag,
  DollarSign,
  Copy,
  Plus,
  ThumbsUp,
  AlertCircle,
  MessageCircle,
  Lightbulb,
  Eye,
  Send,
  Calendar,
  Lock,
  BookmarkCheck,
} from 'lucide-react';
import { GiftItem } from '../../types';

export const GiftFinderFlow: React.FC = () => {
  const {
    activeOccasion,
    giftFinderData,
    updateGiftFinderData,
    addFriendGiftResponse,
    addFriendDetailNote,
    voteFriendGiftResponse,
    giftRecommendations,
    setCurrentView,
    triggerConfetti,
    showToast,
  } = useApp();

  // Navigation steps: 1 = Details & Setup, 2 = Collaborative Space & Ideas, 3 = Final Recommendations
  const [step, setStep] = useState<number>(giftFinderData.spaceCreated ? 2 : 1);

  // Perspective: 'organizer' (the finder who created the space) vs 'friend' (friend opening shared link)
  const [activePerspective, setActivePerspective] = useState<'organizer' | 'friend'>('organizer');

  // Copy link feedback state
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [addedGifts, setAddedGifts] = useState<Record<string, boolean>>({});
  const [votedIdeas, setVotedIdeas] = useState<Record<string, boolean>>({});

  // Friend Contribution Modals / Inline Forms
  const [showAddDetailModal, setShowAddDetailModal] = useState<boolean>(false);
  const [detailFriendName, setDetailFriendName] = useState<string>('Emma Watson');
  const [detailType, setDetailType] = useState<'secret-wish' | 'already-owns' | 'preference' | 'size-brand'>('secret-wish');
  const [detailContent, setDetailContent] = useState<string>('');

  const [showSuggestGiftModal, setShowSuggestGiftModal] = useState<boolean>(false);
  const [suggestFriendName, setSuggestFriendName] = useState<string>('Michael Chen');
  const [suggestTitle, setSuggestTitle] = useState<string>('');
  const [suggestCategory, setSuggestCategory] = useState<string>('Home & Kitchen');
  const [suggestPrice, setSuggestPrice] = useState<string>('$50 - $100');
  const [suggestLink, setSuggestLink] = useState<string>('');
  const [suggestReason, setSuggestReason] = useState<string>('');

  // Filter for ideas board: 'all' | 'friends' | 'ai'
  const [ideaFilter, setIdeaFilter] = useState<'all' | 'friends' | 'ai'>('all');

  const shareableUrl = `https://celebrate.momentsmemories.app/gift-space/${giftFinderData.spaceShareId || 'gf-sarah-25th'}`;

  const availableInterests = [
    'Books & Reading',
    'Specialty Coffee',
    'Travel & Adventure',
    'Tech & Gadgets',
    'Fine Wine & Spirits',
    'Art & Design',
    'Wellness & Spa',
    'Cooking & Dining',
    'Music & Vinyl',
    'Outdoors & Hiking',
    'Fashion & Styling',
    'Photography',
  ];

  const availablePersonalities = [
    'Sentimental & Nostalgic',
    'Adventurous Explorer',
    'Practical & Minimalist',
    'Creative & Artistic',
    'Humorous & Fun',
    'Elegant & Refined',
  ];

  const toggleInterest = (interest: string) => {
    const current = giftFinderData.interests;
    const updated = current.includes(interest)
      ? current.filter((i: string) => i !== interest)
      : [...current, interest];
    updateGiftFinderData({ interests: updated });
  };

  const togglePersonality = (trait: string) => {
    const current = giftFinderData.personality;
    const updated = current.includes(trait)
      ? current.filter((p: string) => p !== trait)
      : [...current, trait];
    updateGiftFinderData({ personality: updated });
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(shareableUrl);
    setCopiedLink(true);
    showToast('Shareable Gift Space link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleAddGiftToSpace = (gift: GiftItem) => {
    setAddedGifts((prev) => ({ ...prev, [gift.id]: true }));
    triggerConfetti();
    showToast(`"${gift.title}" selected for ${giftFinderData.personName}!`);
  };

  const handleVote = (id: string) => {
    if (votedIdeas[id]) {
      showToast('You already voted for this gift idea!');
      return;
    }
    setVotedIdeas((prev) => ({ ...prev, [id]: true }));
    voteFriendGiftResponse(id);
  };

  const handleSaveDetailsAndCreateSpace = () => {
    updateGiftFinderData({ spaceCreated: true });
    setStep(2);
    triggerConfetti();
    showToast('Gift Space created! You can now share the link with friends.');
  };

  const handleCreateDetailNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailContent.trim()) {
      showToast('Please type a detail or note.');
      return;
    }
    addFriendDetailNote(detailFriendName.trim() || 'A Friend', detailType, detailContent.trim());
    setDetailContent('');
    setShowAddDetailModal(false);
  };

  const handleCreateGiftSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestTitle.trim()) {
      showToast('Please enter a gift idea title.');
      return;
    }
    addFriendGiftResponse(
      suggestFriendName.trim() || 'A Friend',
      `${suggestTitle.trim()} — ${suggestReason.trim()}`,
      suggestCategory,
      suggestPrice,
      suggestLink.trim() || undefined
    );
    setSuggestTitle('');
    setSuggestReason('');
    setSuggestLink('');
    setShowSuggestGiftModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Top Header & Perspective Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <button
            onClick={() => {
              if (step > 1) setStep(step - 1);
              else setCurrentView('creator-dashboard');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {step > 1 ? 'Back to Previous Step' : 'Back to Dashboard'}
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5" />
              Collaborative Gift Space
            </span>
            {giftFinderData.spaceCreated && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Space Active
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#243B53] mt-1 tracking-tight">
            Find the Perfect Gift for {giftFinderData.personName}
          </h1>
        </div>

        {/* Prototype Perspective Switcher */}
        <div className="bg-white rounded-2xl p-1.5 border border-gray-200 shadow-sm flex items-center gap-1 self-start md:self-auto">
          <span className="text-[11px] font-bold text-gray-400 px-2 uppercase tracking-wider hidden sm:inline">
            Viewing As:
          </span>
          <button
            onClick={() => setActivePerspective('organizer')}
            id="switch-view-organizer-btn"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activePerspective === 'organizer'
                ? 'bg-[#243B53] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#243B53] hover:bg-gray-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Organizer View
          </button>
          <button
            onClick={() => {
              setActivePerspective('friend');
              if (step === 1) setStep(2);
            }}
            id="switch-view-friend-btn"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activePerspective === 'friend'
                ? 'bg-[#FF6B6B] text-white shadow-xs'
                : 'text-gray-600 hover:text-[#FF6B6B] hover:bg-gray-100'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            Friend Contributor View
          </button>
        </div>
      </div>

      {/* Organizer Navigation Tabs */}
      {activePerspective === 'organizer' && (
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setStep(1)}
            id="tab-step-1"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              step === 1
                ? 'bg-[#243B53] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>1. Recipient Details</span>
          </button>
          <button
            onClick={() => setStep(2)}
            id="tab-step-2"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              step === 2
                ? 'bg-[#243B53] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>2. Share Space & Friends’ Ideas</span>
            <span className="bg-[#FF6B6B] text-white text-[10px] px-1.5 py-0.2 rounded-full">
              {(giftFinderData.friendResponses?.length || 0) + (giftFinderData.friendDetails?.length || 0)}
            </span>
          </button>
          <button
            onClick={() => setStep(3)}
            id="tab-step-3"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              step === 3
                ? 'bg-[#243B53] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span>3. Final Curated Gifts</span>
          </button>
        </div>
      )}

      {/* FRIEND PERSPECTIVE NOTICE BANNER */}
      {activePerspective === 'friend' && (
        <div className="bg-gradient-to-r from-[#243B53] to-[#1B2D40] text-white rounded-2xl p-5 shadow-lg border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-[#FF6B6B] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
              FRIEND'S SHARED LINK PERSPECTIVE
            </span>
            <h3 className="text-lg font-bold text-white">
              You are invited to help choose {giftFinderData.personName}’s Gift!
            </h3>
            <p className="text-xs text-gray-300">
              The organizer shared this link so you can contribute what you know (secret wishes, what she already has) and propose or vote on gift ideas.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowAddDetailModal(true)}
              className="px-4 py-2 rounded-xl bg-white text-[#243B53] font-bold text-xs hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Add a Detail / Note
            </button>
            <button
              onClick={() => setShowSuggestGiftModal(true)}
              className="px-4 py-2 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Gift className="w-3.5 h-3.5" />
              Suggest an Idea
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          STEP 1: FINDER CREATES AND ADDS DETAILS
      ========================================================= */}
      {step === 1 && activePerspective === 'organizer' && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
              Step 1 • Initial Setup
            </span>
            <h3 className="text-2xl font-extrabold text-[#243B53] mt-1">
              Add Recipient Details & Known Interests
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Start with what you already know. You’ll be able to invite friends with a shareable link to add more details!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Celebration Person’s Name
              </label>
              <input
                type="text"
                value={giftFinderData.personName}
                onChange={(e) => updateGiftFinderData({ personName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                placeholder="e.g. Sarah Jenkins"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Age / Milestone
              </label>
              <input
                type="text"
                value={giftFinderData.age}
                onChange={(e) => updateGiftFinderData({ age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                placeholder="e.g. 25th Birthday"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Your Relationship
              </label>
              <select
                value={giftFinderData.relationship}
                onChange={(e) => updateGiftFinderData({ relationship: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] bg-white cursor-pointer"
              >
                <option value="Best Friend">Best Friend</option>
                <option value="Partner / Spouse">Partner / Spouse</option>
                <option value="Sibling">Sibling</option>
                <option value="Parent">Parent</option>
                <option value="Colleague">Colleague</option>
                <option value="Group of Friends">Group of Friends</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Occasion Type
              </label>
              <select
                value={giftFinderData.occasionType}
                onChange={(e) => updateGiftFinderData({ occasionType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] bg-white cursor-pointer"
              >
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Bride to Be">Bride to Be</option>
                <option value="Wedding">Wedding</option>
                <option value="Graduation">Graduation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Budget Range */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
              Target Budget Range
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['$25 - $50', '$50 - $100', '$100 - $250', '$250+'].map((budget) => {
                const isSelected = giftFinderData.budget === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => updateGiftFinderData({ budget })}
                    className={`p-3.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]'
                        : 'border-gray-200 bg-[#FAFAFB] text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interests Tags */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
              Known Interests & Hobbies
            </label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => {
                const isSelected = giftFinderData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#FF6B6B] text-white shadow-xs'
                        : 'bg-[#FAFAFB] text-gray-700 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Personality Vibes */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
              Personality Vibe
            </label>
            <div className="flex flex-wrap gap-2">
              {availablePersonalities.map((trait) => {
                const isSelected = giftFinderData.personality.includes(trait);
                return (
                  <button
                    key={trait}
                    type="button"
                    onClick={() => togglePersonality(trait)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#243B53] text-white shadow-xs'
                        : 'bg-[#FAFAFB] text-gray-700 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    {trait}
                  </button>
                );
              })}
            </div>
          </div>

          {/* What they already own / avoid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
              Items They Already Own / Things to Avoid (Optional)
            </label>
            <input
              type="text"
              value={giftFinderData.thingsTheyOwn || ''}
              onChange={(e) => updateGiftFinderData({ thingsTheyOwn: e.target.value })}
              placeholder="e.g. Lots of fiction books, already owns standard headphones and mugs"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
            />
            <p className="text-[11px] text-gray-400">
              Friends will see this when adding their ideas to prevent duplicate gifts.
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSaveDetailsAndCreateSpace}
              id="save-and-create-gift-space-btn"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              <span>Create & Open Gift Space</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================
          STEP 2: SHAREABLE SPACE & COLLABORATIVE IDEAS BOARD
      ========================================================= */}
      {(step === 2 || activePerspective === 'friend') && (
        <div className="space-y-8 animate-in fade-in">
          {/* Shareable Link Box (Organizer View) */}
          {activePerspective === 'organizer' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B] flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    Shareable Collaboration Space
                  </span>
                  <h3 className="text-2xl font-bold text-[#243B53]">
                    Invite Friends to Add Details & Ideas
                  </h3>
                  <p className="text-xs text-gray-500">
                    Anyone with this link can view the space, add secret hints, and propose or vote on gifts for {giftFinderData.personName}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-gray-600">
                    {(giftFinderData.friendResponses?.length || 0) + 3} Collaborators Active
                  </span>
                </div>
              </div>

              {/* Shareable Link Input & Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    className="w-full pl-4 pr-10 py-3 rounded-2xl bg-[#FAFAFB] border border-gray-200 text-xs sm:text-sm text-[#243B53] font-mono select-all focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCopyShareLink}
                    id="copy-gift-space-link-btn"
                    className="flex-1 sm:flex-none px-5 py-3 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedLink ? 'Copied Link!' : 'Copy Link'}
                  </button>

                  <button
                    onClick={() => {
                      const text = `Hey! Join our secret gift space for ${giftFinderData.personName}’s ${giftFinderData.occasionType}: ${shareableUrl}`;
                      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="px-4 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    title="Share to WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Collaborator Avatars */}
              <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  {['EW', 'DV', 'SL', 'MC', 'RG'].map((initials, idx) => (
                    <span
                      key={idx}
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-[#243B53] text-white text-[10px] font-bold flex items-center justify-center"
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <span>Emma, Daniel, Sophie, and 2 other friends contributed</span>
              </div>
            </div>
          )}

          {/* =========================================================
              SECTION A: WHAT FRIENDS KNOW (DETAILS & SECRET WISHES)
          ========================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Crowdsourced Recipient Insights
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#243B53] mt-0.5">
                  Details & Secret Hints Added by Friends
                </h3>
              </div>

              <button
                onClick={() => setShowAddDetailModal(true)}
                id="add-detail-note-btn"
                className="px-4 py-2 rounded-xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-[#FF6B6B]" />
                Add a Detail / Note
              </button>
            </div>

            {/* Grid of Friend Detail Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(giftFinderData.friendDetails || []).map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-3 bg-[#FAFAFB] border-gray-200/90 hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {note.noteType === 'secret-wish' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B] text-[10px] font-extrabold uppercase tracking-wider">
                          🌟 Secret Wish
                        </span>
                      )}
                      {note.noteType === 'already-owns' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Already Owns
                        </span>
                      )}
                      {note.noteType === 'preference' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider">
                          🎨 Preference
                        </span>
                      )}
                      {note.noteType === 'size-brand' && (
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase tracking-wider">
                          🏷️ Size & Brand
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400">{note.date}</span>
                    </div>

                    <p className="text-xs text-gray-800 leading-relaxed font-medium">
                      "{note.content}"
                    </p>
                  </div>

                  <div className="text-[11px] font-bold text-gray-500 pt-2 border-t border-gray-200/60">
                    Added by <span className="text-[#243B53]">{note.friendName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================
              SECTION B: COLLABORATIVE IDEAS & VOTING BOARD
          ========================================================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  Group Wishlist & Brainstorming
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#243B53] mt-0.5">
                  Gift Ideas Suggested by the Group
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setShowSuggestGiftModal(true)}
                  id="suggest-gift-idea-btn"
                  className="px-4 py-2 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Suggest a Gift Idea
                </button>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {giftFinderData.friendResponses.map((item) => {
                const isVoted = votedIdeas[item.id];
                return (
                  <div
                    key={item.id}
                    className="bg-[#FAFAFB] rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-all space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#243B53]/10 text-[#243B53] text-[10px] font-extrabold uppercase tracking-wider">
                          {item.category}
                        </span>
                        {item.priceEstimate && (
                          <span className="text-xs font-bold text-[#FF6B6B]">
                            {item.priceEstimate}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-base text-[#243B53] leading-snug">
                        {item.suggestion}
                      </h4>

                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#243B53] hover:text-[#FF6B6B] font-semibold flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View Product Link
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                      <span className="text-gray-500 font-medium">
                        By <strong>{item.friendName}</strong>
                      </span>

                      <button
                        onClick={() => handleVote(item.id)}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isVoted
                            ? 'bg-[#FF6B6B] text-white shadow-xs'
                            : 'bg-white text-gray-700 hover:text-[#FF6B6B] border border-gray-200'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isVoted ? 'fill-current' : ''}`} />
                        <span>{item.votes || 0} Votes</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Continue to Curated Recommendations Button (Organizer) */}
          {activePerspective === 'organizer' && (
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
              >
                Back to Details
              </button>
              <button
                onClick={() => {
                  setStep(3);
                  triggerConfetti();
                }}
                id="step2-to-recommendations-btn"
                className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
              >
                <span>View Curated Gift Recommendations</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          STEP 3: CURATED RECOMMENDATIONS & FINAL SELECTION
      ========================================================= */}
      {step === 3 && activePerspective === 'organizer' && (
        <div className="space-y-8 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                Step 3 • Combined Selection
              </span>
              <h3 className="text-2xl font-extrabold text-[#243B53] mt-0.5">
                Curated Recommendations for {giftFinderData.personName}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Synthesized from your setup details and {(giftFinderData.friendResponses?.length || 0)} friend suggestions.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#FF6B6B] font-bold hover:underline cursor-pointer self-start sm:self-auto"
            >
              ← Back to Friends’ Ideas Space
            </button>
          </div>

          {/* Recommendation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftRecommendations.map((gift: GiftItem) => {
              const isAdded = addedGifts[gift.id];
              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      <img
                        src={gift.imageUrl}
                        alt={gift.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#243B53]/85 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-xs">
                        {gift.category}
                      </span>
                      <span className="absolute bottom-3 right-3 bg-white text-[#243B53] text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                        {gift.price}
                      </span>
                    </div>

                    <div className="p-6 space-y-2">
                      <h4 className="font-bold text-base text-[#243B53] leading-snug">
                        {gift.title}
                      </h4>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {gift.description}
                      </p>

                      <div className="pt-2">
                        <span className="text-[11px] font-semibold text-[#FF6B6B] bg-[#FF6B6B]/10 px-2.5 py-1 rounded-md inline-block">
                          💡 Match: {gift.matchReason}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 space-y-2">
                    <button
                      onClick={() => handleAddGiftToSpace(gift)}
                      id={`select-gift-${gift.id}-btn`}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Selected as Group Gift
                        </>
                      ) : (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          Select This Gift
                        </>
                      )}
                    </button>

                    <a
                      href={gift.externalUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast(`Redirecting to artisan merchant partner for ${gift.title}`);
                      }}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      View Purchase Options
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD DETAIL / RECIPIENT HINT
      ========================================================= */}
      {showAddDetailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                Crowdsourced Insights
              </span>
              <h3 className="text-2xl font-bold text-[#243B53] mt-1">
                Add a Detail for {giftFinderData.personName}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Share secret wishes you overheard, sizes/brands, or things she already owns so people don't buy duplicates!
              </p>
            </div>

            <form onSubmit={handleCreateDetailNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={detailFriendName}
                  onChange={(e) => setDetailFriendName(e.target.value)}
                  placeholder="e.g. Emma Watson"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Detail Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'secret-wish', label: '🌟 Secret Wish' },
                    { id: 'already-owns', label: '🚫 Already Owns' },
                    { id: 'preference', label: '🎨 Color / Style' },
                    { id: 'size-brand', label: '🏷️ Size & Brand' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setDetailType(t.id as any)}
                      className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer text-center ${
                        detailType === t.id
                          ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#FF6B6B]'
                          : 'border-gray-200 bg-[#FAFAFB] text-gray-700'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  What do you know?
                </label>
                <textarea
                  rows={3}
                  value={detailContent}
                  onChange={(e) => setDetailContent(e.target.value)}
                  placeholder="e.g. She was eyeing a ceramic pour-over dripper at the market in Rome last week..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDetailModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-detail-note-btn"
                  className="px-6 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Save Detail to Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: SUGGEST A GIFT IDEA
      ========================================================= */}
      {showSuggestGiftModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95 shadow-2xl">
            <div>
              <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                Collaborative Wishlist
              </span>
              <h3 className="text-2xl font-bold text-[#243B53] mt-1">
                Suggest a Gift Idea
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Propose a gift for {giftFinderData.personName}. Other friends can vote on your idea!
              </p>
            </div>

            <form onSubmit={handleCreateGiftSuggestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={suggestFriendName}
                  onChange={(e) => setSuggestFriendName(e.target.value)}
                  placeholder="e.g. Michael Chen"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Gift Idea Title
                </label>
                <input
                  type="text"
                  value={suggestTitle}
                  onChange={(e) => setSuggestTitle(e.target.value)}
                  placeholder="e.g. Weekend Pottery Throwing Masterclass"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={suggestCategory}
                    onChange={(e) => setSuggestCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-xs text-[#243B53] bg-white cursor-pointer"
                  >
                    <option value="Experience">Experience</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Music & Audio">Music & Audio</option>
                    <option value="Fashion & Accessories">Fashion & Accessories</option>
                    <option value="Books & Art">Books & Art</option>
                    <option value="Wellness & Spa">Wellness & Spa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                    Estimated Price
                  </label>
                  <select
                    value={suggestPrice}
                    onChange={(e) => setSuggestPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-xs text-[#243B53] bg-white cursor-pointer"
                  >
                    <option value="Under $50">Under $50</option>
                    <option value="$50 - $100">$50 - $100</option>
                    <option value="$100 - $200">$100 - $200</option>
                    <option value="$200+">$200+ (Group Gift)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Link to Product (Optional)
                </label>
                <input
                  type="url"
                  value={suggestLink}
                  onChange={(e) => setSuggestLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                  Why will they love this?
                </label>
                <textarea
                  rows={2}
                  value={suggestReason}
                  onChange={(e) => setSuggestReason(e.target.value)}
                  placeholder="e.g. She has been talking about wanting to try throwing clay on a pottery wheel!"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSuggestGiftModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-gift-idea-btn"
                  className="px-6 py-2.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Share Idea to Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
