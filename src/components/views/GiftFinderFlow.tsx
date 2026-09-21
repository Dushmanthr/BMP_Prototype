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
  Compass,
} from 'lucide-react';
import { GiftItem } from '../../types';

export const GiftFinderFlow: React.FC = () => {
  const {
    activeOccasion,
    giftFinderData,
    updateGiftFinderData,
    giftRecommendations,
    setCurrentView,
    triggerConfetti,
    showToast,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
  const [surveySent, setSurveySent] = useState<boolean>(false);
  const [addedGifts, setAddedGifts] = useState<Record<string, boolean>>({});

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

  const handleAddGiftToSpace = (gift: GiftItem) => {
    setAddedGifts((prev) => ({ ...prev, [gift.id]: true }));
    triggerConfetti();
    showToast(`"${gift.title}" added to celebration wishlist!`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Back button */}
      <button
        onClick={() => {
          if (step > 1) setStep(step - 1);
          else setCurrentView('creator-dashboard');
        }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        {step > 1 ? 'Previous Step' : 'Back to Dashboard'}
      </button>

      {/* Progress Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
            AI & Collaborative Gift Finder
          </span>
          <h1 className="text-3xl font-extrabold text-[#243B53] mt-0.5">
            {step === 3 ? 'Curated Gift Recommendations' : 'Find the Perfect Gift'}
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <span
            onClick={() => setStep(1)}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              step === 1 ? 'bg-[#FF6B6B] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            1. Details
          </span>
          <span
            onClick={() => setStep(2)}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              step === 2 ? 'bg-[#FF6B6B] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            2. Interests
          </span>
          <span
            onClick={() => setStep(3)}
            className={`px-3 py-1.5 rounded-lg cursor-pointer ${
              step === 3 ? 'bg-[#FF6B6B] text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            3. Recommendations
          </span>
        </div>
      </div>

      {/* Step 1: Who is the celebration for? */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-2xl font-bold text-[#243B53]">
              Who are you choosing a gift for?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Give us a few basics so we can dial in the recommendations.
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
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Age / Milestone (e.g. 25th, 30th, 50th)
              </label>
              <input
                type="text"
                value={giftFinderData.age}
                onChange={(e) => updateGiftFinderData({ age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                Your Relationship
              </label>
              <select
                value={giftFinderData.relationship}
                onChange={(e) => updateGiftFinderData({ relationship: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] bg-white"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] bg-white"
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

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              id="gift-finder-step1-continue"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              Next: Interests & Budget
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: What do they love? */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-8 animate-in fade-in">
          <div>
            <h3 className="text-2xl font-bold text-[#243B53]">
              What do they love?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Select interests and personality traits to personalize the ideas.
            </p>
          </div>

          {/* Interests Tags */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
              Favorite Interests & Hobbies
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
                        ? 'bg-[#FF6B6B] text-white shadow-sm'
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

          {/* Personality Traits */}
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
                        ? 'bg-[#243B53] text-white shadow-sm'
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

          {/* Friend Questionnaire Feature Callout */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-600" />
                Unsure? Ask their friends with a quick survey!
              </h4>
              <p className="text-xs text-amber-800">
                Send a 3-question survey link to friends in the celebration space to aggregate their collective thoughts.
              </p>
            </div>

            <button
              onClick={() => setShowSurveyModal(true)}
              id="open-friend-survey-modal-btn"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 cursor-pointer shadow-sm transition-colors"
            >
              Ask Friends
            </button>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => {
                setStep(3);
                triggerConfetti();
              }}
              id="gift-finder-generate-btn"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              Generate Gift Ideas
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Screen 15 - Curated Gift Recommendations */}
      {step === 3 && (
        <div className="space-y-8 animate-in fade-in">
          {/* Top category tabs */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Curated for <strong>{giftFinderData.personName}</strong> based on{' '}
              {giftFinderData.interests.slice(0, 2).join(', ')} & budget {giftFinderData.budget}.
            </p>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#FF6B6B] font-bold hover:underline cursor-pointer"
            >
              Adjust Preferences
            </button>
          </div>

          {/* Grid of Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftRecommendations.map((gift: GiftItem) => {
              const isAdded = addedGifts[gift.id];
              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
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
                      id={`add-gift-${gift.id}-to-space-btn`}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#243B53] hover:bg-[#1B2D40] text-white shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Added to Celebration Space
                        </>
                      ) : (
                        <>
                          <Gift className="w-3.5 h-3.5" />
                          Add to Memory Space
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

      {/* Screen 14 Feature: Friend Survey Modal */}
      {showSurveyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 animate-in zoom-in-95">
            <div>
              <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
                Crowdsourced Gift Brainstorming
              </span>
              <h3 className="text-2xl font-bold text-[#243B53] mt-1">
                Friend Questionnaire
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Share this quick 3-question survey link with friends who know{' '}
                {giftFinderData.personName} best.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-gray-200 space-y-3 text-xs text-gray-700">
              <div className="font-semibold text-[#243B53]">Survey Questions Included:</div>
              <ol className="list-decimal pl-4 space-y-1.5">
                <li>What’s their favorite hobby or obsession right now?</li>
                <li>What is something they’ve mentioned wishing they had?</li>
                <li>Should this gift be practical or deeply sentimental?</li>
              </ol>
            </div>

            {!surveySent ? (
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setSurveySent(true);
                    triggerConfetti();
                    showToast('Survey invitations dispatched to friends!');
                  }}
                  id="send-survey-to-friends-btn"
                  className="w-full py-3 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md cursor-pointer transition-transform active:scale-98"
                >
                  Send Survey to Friends
                </button>
                <button
                  onClick={() => setShowSurveyModal(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="font-bold text-base text-[#243B53]">
                  Survey Dispatched!
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Responses will feed directly into your recommendations engine once submitted.
                </p>
                <button
                  onClick={() => {
                    setShowSurveyModal(false);
                    setSurveySent(false);
                  }}
                  className="px-6 py-2 rounded-xl bg-[#243B53] text-white text-xs font-bold cursor-pointer"
                >
                  Return to Ideas
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
