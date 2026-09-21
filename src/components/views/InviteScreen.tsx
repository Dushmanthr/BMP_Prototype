import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Mail,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export const InviteScreen: React.FC = () => {
  const { activeOccasion, setCurrentView, showToast } = useApp();
  const [copied, setCopied] = useState<boolean>(false);

  const inviteUrl = `https://celebrate.momentsmemories.app/invite/${activeOccasion.id}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    showToast('Invitation link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = `Join us in creating a surprise memory celebration for ${activeOccasion.celebrationPersonName}! Add your photo, voice note, or wish here: ${inviteUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = `Special Celebration for ${activeOccasion.celebrationPersonName}`;
    const body = `Hi!\n\nWe are gathering photos, voice messages, and memories for ${activeOccasion.celebrationPersonName}'s celebration.\n\nYou don't need an account—just open the private link to contribute:\n${inviteUrl}\n\nLooking forward to your memory!`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <button
        onClick={() => setCurrentView('occasion-space')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Memory Space
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#243B53]">
            Invite Friends & Family
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Share this link with the people who should add a memory to this celebration.
          </p>
        </div>

        {/* Occasion summary chip */}
        <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-gray-100 flex items-center gap-4">
          <img
            src={activeOccasion.coverImage}
            alt={activeOccasion.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-bold text-sm text-[#243B53]">{activeOccasion.name}</h4>
            <p className="text-xs text-gray-500">
              Celebrating {activeOccasion.celebrationPersonName} • {activeOccasion.formattedDate}
            </p>
          </div>
        </div>

        {/* Invite Link Box */}
        <div>
          <label className="block text-xs font-bold text-[#243B53] mb-2 uppercase tracking-wider">
            Private Contributor Invite Link
          </label>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-200">
            <input
              type="text"
              readOnly
              value={inviteUrl}
              className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-gray-600 outline-none font-mono"
            />
            <button
              onClick={handleCopy}
              id="copy-invite-link-btn"
              className="px-5 py-3 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Direct Sharing Buttons */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
            Share Directly Via
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={handleShareWhatsApp}
              id="share-whatsapp-btn"
              className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-[#243B53] font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              WhatsApp
            </button>

            <button
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteUrl)}`,
                  '_blank'
                );
              }}
              id="share-facebook-btn"
              className="p-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-[#243B53] font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-5 h-5 text-blue-600" />
              Facebook
            </button>

            <button
              onClick={handleShareEmail}
              id="share-email-btn"
              className="p-3.5 rounded-xl border border-gray-200 hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/5 text-[#243B53] font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-5 h-5 text-[#FF6B6B]" />
              Email
            </button>

            <button
              onClick={handleCopy}
              id="share-copy-btn"
              className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 text-[#243B53] font-bold text-xs flex flex-col items-center gap-2 transition-all cursor-pointer"
            >
              <Copy className="w-5 h-5 text-[#243B53]" />
              Copy Link
            </button>
          </div>
        </div>

        {/* Contributor Assurance Note */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            Contributors don't need to create an account
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            They can open the link, agree to the contribution guidelines, and share their memory in under 60 seconds without creating passwords.
          </p>
        </div>

        {/* Live Simulator Link */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Want to test what contributors see?
          </span>
          <button
            onClick={() => setCurrentView('contributor-consent')}
            id="test-contributor-experience-btn"
            className="text-xs font-bold text-[#FF6B6B] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Open Contributor Experience
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
