import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Music,
  Sparkles,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
  Download,
  Share2,
  Heart,
  Check,
} from 'lucide-react';

export const AIBirthdaySongView: React.FC = () => {
  const { activeOccasion, setCurrentView, triggerConfetti, showToast } = useApp();

  const [genre, setGenre] = useState<string>('Acoustic Folk');
  const [insideJokes, setInsideJokes] = useState<string>(
    'Always orders iced oat matcha, obsessed with golden retrievers, and never leaves without taking a sunset photo.'
  );
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [songReady, setSongReady] = useState<boolean>(true); // Pre-ready for smooth preview
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);

  const genres = [
    'Acoustic Folk',
    'Upbeat Indie Pop',
    'Warm Jazz Lounge',
    'Piano & Cinematic Strings',
  ];

  const lyrics = [
    { time: '0:00', text: `Here’s to ${activeOccasion.celebrationPersonName} on this golden day,` },
    { time: '0:06', text: 'With iced oat matcha in hand to guide the way.' },
    { time: '0:12', text: 'Chasing every dog at the park with pure delight,' },
    { time: '0:18', text: 'And stopping for every sunset in the evening light.' },
    { time: '0:24', text: `Twenty-five years of bringing laughter everywhere you go,` },
    { time: '0:30', text: `Sarah, we love you more than you could ever know!` },
  ];

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      triggerConfetti();
      // Simulate lyric progression
      const interval = setInterval(() => {
        setCurrentLineIndex((prev) => {
          if (prev >= lyrics.length - 1) {
            clearInterval(interval);
            return 0;
          }
          return prev + 1;
        });
      }, 3500);
    }
  };

  const handleComposeNew = () => {
    setIsComposing(true);
    setTimeout(() => {
      setIsComposing(false);
      setSongReady(true);
      triggerConfetti();
      showToast('Personalized AI song generated with custom lyrics!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => setCurrentView('creator-dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
          AI Celebration Studio
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
          Personalized Celebration Song
        </h1>
        <p className="text-sm text-gray-600">
          Turn your memories, inside jokes, and personality quirks into a real studio-quality acoustic song dedicated to{' '}
          <strong>{activeOccasion.celebrationPersonName}</strong>.
        </p>
      </div>

      {/* Main Studio Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customization Form (Left 5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-5">
          <h3 className="font-bold text-base text-[#243B53] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
            Song Generator
          </h3>

          <div>
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
              Musical Genre
            </label>
            <div className="space-y-1.5">
              {genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`w-full py-2 px-3 text-xs font-bold rounded-xl border text-left transition-all cursor-pointer ${
                    genre === g
                      ? 'border-2 border-[#FF6B6B] bg-[#FF6B6B]/5 text-[#FF6B6B]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
              Inside Jokes & Quirk Details
            </label>
            <textarea
              rows={4}
              value={insideJokes}
              onChange={(e) => setInsideJokes(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-xs text-[#243B53] leading-relaxed"
            />
          </div>

          <button
            onClick={handleComposeNew}
            disabled={isComposing}
            className="w-full py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-xs shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isComposing ? 'Composing Lyrics & Harmony...' : 'Compose Song'}
          </button>
        </div>

        {/* Audio Player & Karaoke Lyrics (Right 7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#243B53] to-[#1A2D40] text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B6B]">
                Track 01 • {genre}
              </span>
              <h3 className="text-xl font-bold mt-0.5">
                The Ballad of {activeOccasion.celebrationPersonName}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#FF6B6B]">
              <Music className="w-5 h-5" />
            </div>
          </div>

          {/* Interactive Player Console */}
          <div className="p-5 bg-white/10 rounded-2xl backdrop-blur-md flex items-center gap-5">
            <button
              onClick={handlePlayToggle}
              id="ai-song-play-btn"
              className="w-14 h-14 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>{isPlaying ? '0:14' : '0:00'}</span>
                <span className="font-mono text-[11px] text-gray-400">0:36</span>
              </div>

              {/* Animated waveform */}
              <div className="flex items-center gap-1 h-8">
                {[40, 65, 85, 30, 95, 75, 45, 90, 60, 80, 50, 95, 70, 40, 85, 60, 75, 30, 90, 55, 70, 85].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        isPlaying ? 'bg-[#FF6B6B] animate-pulse' : 'bg-white/20'
                      }`}
                      style={{ height: `${isPlaying ? h : Math.max(20, h * 0.4)}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Karaoke Lyrics Display */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Karaoke Lyrics
            </span>
            <div className="space-y-3 font-serif">
              {lyrics.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl transition-all duration-500 text-sm sm:text-base leading-relaxed ${
                    idx === currentLineIndex && isPlaying
                      ? 'bg-white/20 text-[#FF6B6B] font-bold shadow-sm translate-x-2'
                      : 'text-gray-300 opacity-70'
                  }`}
                >
                  <span className="text-xs font-mono text-gray-400 mr-3">{line.time}</span>
                  “{line.text}”
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => showToast('Master audio track downloaded (.WAV)')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Audio File
            </button>

            <button
              onClick={() => showToast('Song link copied to clipboard!')}
              className="px-4 py-2.5 rounded-xl bg-[#FF6B6B] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm hover:bg-[#fa5a5a]"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Song
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
