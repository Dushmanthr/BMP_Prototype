import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Upload,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  StopCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { MemoryType } from '../../types';

export const ContributorUpload: React.FC = () => {
  const {
    activeOccasion,
    contributorName,
    addMemory,
    setCurrentView,
    triggerConfetti,
  } = useApp();

  const [selectedType, setSelectedType] = useState<MemoryType>('photo');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
  );
  const [videoUrl, setVideoUrl] = useState<string>(
    'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80'
  );
  
  // Audio recording simulation state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioRecorded, setAudioRecorded] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleStartRecord = () => {
    setIsRecording(true);
    setAudioRecorded(false);
    setRecordDuration(0);
    const timer = setInterval(() => {
      setRecordDuration((prev) => {
        if (prev >= 25) {
          clearInterval(timer);
          setIsRecording(false);
          setAudioRecorded(true);
          return 25;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    setAudioRecorded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addMemory({
      occasionId: activeOccasion.id,
      contributorName: contributorName || 'Julian Ross',
      type: selectedType,
      title: title || `${selectedType.toUpperCase()} memory from ${contributorName || 'Julian'}`,
      content:
        content ||
        (selectedType === 'audio'
          ? 'Heartfelt voice message recorded for your special day!'
          : 'A cherished memory uploaded with love.'),
      mediaUrl:
        selectedType === 'photo'
          ? photoUrl
          : selectedType === 'video'
          ? videoUrl
          : undefined,
      duration:
        selectedType === 'audio'
          ? `0:${recordDuration.toString().padStart(2, '0') || '35'}`
          : selectedType === 'video'
          ? '1:15'
          : undefined,
      isMyUpload: true,
    });

    setIsSubmitted(true);
    triggerConfetti();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl space-y-8 animate-in fade-in">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
                Contributing for {activeOccasion.celebrationPersonName}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#243B53]">
              Add Your Memory
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Choose how you would like to contribute. You can add as many as you wish.
            </p>
          </div>

          {/* 4 Large Clean Cards for Memory Type */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setSelectedType('photo')}
              id="upload-type-photo-btn"
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                selectedType === 'photo'
                  ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFB]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 text-[#FF6B6B]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#243B53]">Photo</span>
              <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                Favorite photo
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('video')}
              id="upload-type-video-btn"
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                selectedType === 'video'
                  ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFB]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 text-[#FF6B6B]">
                <Video className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#243B53]">Video</span>
              <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                Special video
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('audio')}
              id="upload-type-audio-btn"
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                selectedType === 'audio'
                  ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFB]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 text-[#FF6B6B]">
                <Mic className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#243B53]">Audio</span>
              <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                Voice message
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedType('wish')}
              id="upload-type-wish-btn"
              className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                selectedType === 'wish'
                  ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-[#FAFAFB]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-2 text-[#FF6B6B]">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-[#243B53]">Write a Wish</span>
              <span className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                Personal note
              </span>
            </button>
          </div>

          {/* Form Content Specific to Type */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                Memory Title / Short Caption (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. That unforgettable summer sunset..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
              />
            </div>

            {/* Type 1: Photo */}
            {selectedType === 'photo' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
                  Photo Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-[#FF6B6B] transition-colors bg-[#FAFAFB]">
                  <img
                    src={photoUrl}
                    alt="Uploaded preview"
                    className="w-full max-h-56 object-cover rounded-2xl mb-4 shadow-sm"
                  />
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPhotoUrl(
                          'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      Sample 1: Hike
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPhotoUrl(
                          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      Sample 2: Friends
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPhotoUrl(
                          'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
                        )
                      }
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      Sample 3: Roadtrip
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Drag and drop your photo or tap sample to test
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                    Add a story to this photo
                  </label>
                  <textarea
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell the story behind this photo..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  />
                </div>
              </div>
            )}

            {/* Type 2: Video */}
            {selectedType === 'video' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
                  Video Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center hover:border-[#FF6B6B] transition-colors bg-[#FAFAFB]">
                  <div className="relative rounded-2xl overflow-hidden max-h-56 mb-4">
                    <img
                      src={videoUrl}
                      alt="Video preview"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Video className="w-12 h-12 text-[#FF6B6B]" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    Video file selected (1:15 MP4 clip)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                    Video Message Caption
                  </label>
                  <textarea
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="A few words about this video message..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  />
                </div>
              </div>
            )}

            {/* Type 3: Audio Voice Message */}
            {selectedType === 'audio' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
                  Record Voice Note
                </label>
                <div className="p-8 rounded-3xl bg-[#FAFAFB] border border-gray-200 text-center space-y-4">
                  {!isRecording && !audioRecorded && (
                    <>
                      <button
                        type="button"
                        onClick={handleStartRecord}
                        id="start-voice-record-btn"
                        className="w-20 h-20 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center justify-center mx-auto shadow-lg transition-transform active:scale-95 cursor-pointer"
                      >
                        <Mic className="w-9 h-9" />
                      </button>
                      <p className="text-sm font-bold text-[#243B53]">
                        Tap to start recording your voice message
                      </p>
                      <p className="text-xs text-gray-500">
                        Speak from the heart! You can re-record as many times as you like.
                      </p>
                    </>
                  )}

                  {isRecording && (
                    <div className="space-y-3">
                      <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                        <StopCircle className="w-9 h-9" />
                      </div>
                      <p className="text-sm font-bold text-red-600">
                        Recording... 0:{recordDuration.toString().padStart(2, '0')}
                      </p>
                      <button
                        type="button"
                        onClick={handleStopRecord}
                        className="px-5 py-2 rounded-xl bg-[#243B53] text-white text-xs font-bold cursor-pointer"
                      >
                        Stop Recording
                      </button>
                    </div>
                  )}

                  {audioRecorded && !isRecording && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold text-[#243B53] block">
                              Voice Recording Ready
                            </span>
                            <span className="text-[11px] text-gray-500">
                              0:{recordDuration.toString().padStart(2, '0')} length
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setAudioRecorded(false);
                            setRecordDuration(0);
                          }}
                          className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Re-record
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                    Written note alongside audio (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="e.g. Here is a special 30-second birthday wish from me!"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53]"
                  />
                </div>
              </div>
            )}

            {/* Type 4: Written Wish */}
            {selectedType === 'wish' && (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider">
                  Write Something Special...
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Dearest Sarah, you make everyone feel so special. Wishing you 25 years of love, joy, and adventure..."
                  className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-sm text-[#243B53] leading-relaxed"
                />
              </div>
            )}

            {/* Privacy Assurance Banner */}
            <div className="p-4 rounded-2xl bg-[#243B53]/5 border border-[#243B53]/10 flex items-center gap-3 text-xs text-[#243B53]">
              <Lock className="w-4 h-4 text-[#FF6B6B] shrink-0" />
              <span>
                <strong>Privacy Guaranteed:</strong> Only you and the occasion creator can see your contribution before it is finalized.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="contributor-submit-memory-btn"
              className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-base shadow-lg transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              Add Memory
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        /* After Submission Success Card */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-[#243B53]">
              Your memory has been added!
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for contributing! Only you and the occasion creator can see your contribution right now.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAFAFB] border border-gray-100 max-w-sm mx-auto text-xs text-gray-500 space-y-1">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-[#243B53]">
              <Lock className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Private & Encrypted
            </div>
            <p>Your contribution will be presented during the final celebration.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setContent('');
                setTitle('');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 text-[#243B53] font-bold text-sm cursor-pointer transition-colors"
            >
              Add Another Memory
            </button>
            <button
              onClick={() => setCurrentView('contributor-my-memories')}
              id="contributor-done-btn"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Done / View My Memories
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
