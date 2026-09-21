import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  ShieldCheck,
  CheckSquare,
  Square,
  ArrowRight,
  User,
  Sparkles,
} from 'lucide-react';

export const ContributorConsent: React.FC = () => {
  const {
    activeOccasion,
    setCurrentView,
    contributorConsentAgreed,
    setContributorConsentAgreed,
    contributorName,
    setContributorName,
  } = useApp();

  const [localName, setLocalName] = useState(contributorName || 'Julian Ross');
  const [agreed, setAgreed] = useState(contributorConsentAgreed || false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setContributorName(localName);
    setContributorConsentAgreed(true);
    setCurrentView('contributor-upload');
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
        {/* Occasion Hero Cover */}
        <div className="relative h-48 sm:h-56">
          <img
            src={activeOccasion.coverImage}
            alt={activeOccasion.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#243B53]/90 via-[#243B53]/40 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="px-3 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[11px] font-bold uppercase tracking-wider w-max mb-1">
              Private Celebration Invite
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              You’re Invited!
            </h1>
            <p className="text-xs sm:text-sm text-gray-200">
              Help make {activeOccasion.celebrationPersonName}'s celebration unforgettable.
            </p>
          </div>
        </div>

        {/* Consent & Guidelines Body */}
        <form onSubmit={handleContinue} className="p-6 sm:p-8 space-y-6">
          {/* Contributor Name Input */}
          <div>
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
              Your Name (So {activeOccasion.celebrationPersonName} knows it's from you)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                placeholder="e.g. Julian Ross"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] font-semibold"
              />
            </div>
          </div>

          {/* Guidelines Card */}
          <div className="p-5 rounded-2xl bg-[#FAFAFB] border border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#243B53]">
              <ShieldCheck className="w-4 h-4 text-[#FF6B6B]" />
              Before you contribute
            </div>

            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0" />
                <span>Only upload content you have permission to share.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0" />
                <span>Be respectful of everyone's privacy and feelings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0" />
                <span>You are responsible for the content you submit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0" />
                <span>Your contribution will be reviewed by the occasion creator.</span>
              </li>
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div
            onClick={() => setAgreed(!agreed)}
            id="contributor-consent-checkbox"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer select-none transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="text-[#FF6B6B]">
              {agreed ? (
                <CheckSquare className="w-5 h-5 fill-current text-[#FF6B6B]" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-[#243B53]">
              I understand and agree to the contribution guidelines.
            </span>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!agreed || !localName.trim()}
            id="contributor-consent-continue-btn"
            className={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
              agreed && localName.trim()
                ? 'bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white cursor-pointer active:scale-98'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
