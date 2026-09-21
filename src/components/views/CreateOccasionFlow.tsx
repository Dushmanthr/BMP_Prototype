import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calendar,
  Camera,
  Heart,
  Users,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { OccasionType } from '../../types';

export const CreateOccasionFlow: React.FC = () => {
  const { createOccasion, setCurrentView, selectOccasionAndNavigate } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [createdOccasionId, setCreatedOccasionId] = useState<string>('');

  // Form states
  const [occasionType, setOccasionType] = useState<OccasionType>('Birthday');
  const [personName, setPersonName] = useState<string>('Sarah Jenkins');
  const [personPhoto, setPersonPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
  );
  const [occasionTitle, setOccasionTitle] = useState<string>("Sarah's 25th Birthday Celebration");
  const [date, setDate] = useState<string>('2027-06-25');
  const [description, setDescription] = useState<string>(
    'Collecting memories, heartwarming photos, audio greetings, and wishes for Sarah’s milestone 25th year.'
  );
  const [coverImage, setCoverImage] = useState<string>(
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80'
  );

  const occasionTypes: Array<{ type: OccasionType; icon: string; subtitle: string }> = [
    { type: 'Birthday', icon: '🎂', subtitle: 'Milestone years & birthdays' },
    { type: 'Anniversary', icon: '🥂', subtitle: 'Years of shared love' },
    { type: 'Bride to Be', icon: '💍', subtitle: 'Bridal showers & bachelorettes' },
    { type: 'Wedding', icon: '💐', subtitle: 'Weddings & vow renewals' },
    { type: 'Graduation', icon: '🎓', subtitle: 'Academic & life milestones' },
    { type: 'Other', icon: '✨', subtitle: 'Retirements, baby showers & more' },
  ];

  const handleCreateSpace = () => {
    const newId = createOccasion({
      name: occasionTitle,
      occasionType,
      celebrationPersonName: personName,
      celebrationPersonPhoto: personPhoto,
      date,
      formattedDate: new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      description,
      coverImage,
    });
    setCreatedOccasionId(newId);
    setIsCompleted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back button */}
      {!isCompleted && (
        <button
          onClick={() => {
            if (step > 1) setStep(step - 1);
            else setCurrentView('creator-dashboard');
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? 'Previous Step' : 'Back to Dashboard'}
        </button>
      )}

      {/* Progress Indicator */}
      {!isCompleted && (
        <div className="mb-10">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-3">
            <span className={step >= 1 ? 'text-[#FF6B6B]' : ''}>1. Occasion</span>
            <span className={step >= 2 ? 'text-[#FF6B6B]' : ''}>2. Person</span>
            <span className={step >= 3 ? 'text-[#FF6B6B]' : ''}>3. Details</span>
            <span className={step >= 4 ? 'text-[#FF6B6B]' : ''}>4. Memory Space</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FF6B6B] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step 1: What are you celebrating? */}
      {step === 1 && !isCompleted && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Step 1 of 4
            </span>
            <h2 className="text-3xl font-extrabold text-[#243B53] mt-1">
              What are you celebrating?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select the milestone to personalize your space's prompts and invitations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {occasionTypes.map((item) => {
              const isSelected = occasionType === item.type;
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setOccasionType(item.type)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFB]'
                  }`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#243B53] text-base">{item.type}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              id="step-1-continue-btn"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Who are you celebrating? */}
      {step === 2 && !isCompleted && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Step 2 of 4
            </span>
            <h2 className="text-3xl font-extrabold text-[#243B53] mt-1">
              Who are you celebrating?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add the name and a warm photo of the person at the heart of this celebration.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-2 uppercase tracking-wider">
                Celebration Person’s Full Name
              </label>
              <input
                type="text"
                required
                value={personName}
                onChange={(e) => {
                  setPersonName(e.target.value);
                  setOccasionTitle(`${e.target.value}’s ${occasionType} Celebration`);
                }}
                placeholder="e.g. Sarah Jenkins"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-base font-semibold text-[#243B53]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-2 uppercase tracking-wider">
                Optional Photo
              </label>
              <div className="flex items-center gap-6">
                <img
                  src={personPhoto}
                  alt={personName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200 shadow-sm"
                />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPersonPhoto(
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#243B53] cursor-pointer"
                    >
                      Photo 1
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPersonPhoto(
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#243B53] cursor-pointer"
                    >
                      Photo 2
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPersonPhoto(
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-[#243B53] cursor-pointer"
                    >
                      Photo 3
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    This photo will be featured in the invitations and celebration hero.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              id="step-2-continue-btn"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Tell us about the occasion */}
      {step === 3 && !isCompleted && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Step 3 of 4
            </span>
            <h2 className="text-3xl font-extrabold text-[#243B53] mt-1">
              Tell us about the occasion
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Provide context so contributors know what memories to share.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1.5 uppercase tracking-wider">
                Occasion Title
              </label>
              <input
                type="text"
                required
                value={occasionTitle}
                onChange={(e) => setOccasionTitle(e.target.value)}
                placeholder="e.g. Sarah's 25th Birthday Celebration"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1.5 uppercase tracking-wider">
                Occasion Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] mb-1.5 uppercase tracking-wider">
                Short Description / Invitation Note
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Share a favorite photo, record a quick voice message, or write your heartfelt wishes..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              id="step-3-continue-btn"
              className="px-8 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              Continue to Preview
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Your memory space is ready */}
      {step === 4 && !isCompleted && (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Step 4 of 4
            </span>
            <h2 className="text-3xl font-extrabold text-[#243B53] mt-1">
              Your memory space is ready
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Here is a preview of the celebration space you're about to create.
            </p>
          </div>

          {/* Space Card Preview */}
          <div className="rounded-3xl overflow-hidden border border-gray-200 bg-[#FAFAFB] shadow-md">
            <div className="relative h-48 sm:h-56">
              <img
                src={coverImage}
                alt={occasionTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#243B53]/90 via-[#243B53]/30 to-transparent flex items-end p-6">
                <div className="text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B6B] text-white text-[11px] font-bold uppercase tracking-wider">
                    {occasionType}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">{occasionTitle}</h3>
                  <p className="text-xs text-gray-200">
                    Celebrating {personName} • {date}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "{description}"
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-gray-500 border-t border-gray-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
                  Private Contributor Link
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
                  Photo, Video, Audio & Wishes
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={handleCreateSpace}
              id="create-memory-space-submit-btn"
              className="px-8 py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-base shadow-lg transition-transform active:scale-95 cursor-pointer"
            >
              Create Memory Space
            </button>
          </div>
        </div>
      )}

      {/* After Creation Success State */}
      {isCompleted && (
        <div className="bg-white rounded-3xl p-10 sm:p-12 border border-gray-100 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center mx-auto">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-[#243B53]">
              Your celebration space is ready!
            </h2>
            <p className="text-gray-600 text-base max-w-md mx-auto">
              Start adding your own memories or share the private invite link with friends and family.
            </p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => selectOccasionAndNavigate(createdOccasionId, 'contributor-upload')}
              id="after-create-add-memories-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Add Memories
            </button>
            <button
              onClick={() => selectOccasionAndNavigate(createdOccasionId, 'invite-contributors')}
              id="after-create-invite-friends-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#243B53] hover:bg-[#1B2D40] text-white font-bold text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4" />
              Invite Friends
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
