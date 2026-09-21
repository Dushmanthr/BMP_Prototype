import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  duration?: string;
  contributorName?: string;
  title?: string;
  variant?: 'compact' | 'full';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  duration = '0:48',
  contributorName,
  title,
  variant = 'compact',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Mock audio timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  // Fixed bars height simulation for waveform
  const waveformHeights = [
    30, 45, 60, 80, 55, 35, 70, 90, 85, 65, 40, 50, 75, 95, 60, 45, 80, 70, 50,
    30, 65, 85, 40, 60, 90, 75, 50, 35, 70, 85,
  ];

  return (
    <div
      className={`rounded-2xl p-4 transition-all duration-200 ${
        variant === 'full'
          ? 'bg-[#243B53] text-white shadow-lg'
          : 'bg-[#FAFAFB] border border-gray-200 text-[#243B53]'
      }`}
    >
      {(title || contributorName) && (
        <div className="flex items-center justify-between mb-3">
          <div>
            {title && (
              <p className="font-semibold text-sm line-clamp-1">{title}</p>
            )}
            {contributorName && (
              <p
                className={`text-xs ${
                  variant === 'full' ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                Voice message from {contributorName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#FF6B6B] font-medium">
            <Volume2 className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          id="audio-play-toggle-btn"
          className="w-11 h-11 rounded-full bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
          aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        {/* Waveform bars */}
        <div className="flex-1 flex items-center gap-0.5 sm:gap-1 h-10 px-2 overflow-hidden">
          {waveformHeights.map((h, idx) => {
            const barProgress = (idx / waveformHeights.length) * 100;
            const isFilled = progress >= barProgress;
            return (
              <div
                key={idx}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${isPlaying ? Math.max(20, (h * (progress % 20 + 20)) / 30) : h}%`,
                  backgroundColor: isFilled
                    ? '#FF6B6B'
                    : variant === 'full'
                    ? '#3A506B'
                    : '#CBD5E1',
                }}
              />
            );
          })}
        </div>

        <button
          onClick={handleReset}
          id="audio-reset-btn"
          className={`p-2 rounded-lg transition-colors cursor-pointer shrink-0 ${
            variant === 'full'
              ? 'hover:bg-white/10 text-gray-300'
              : 'hover:bg-gray-200 text-gray-400'
          }`}
          title="Restart audio"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] mt-2 font-mono">
        <span className={variant === 'full' ? 'text-gray-300' : 'text-gray-500'}>
          {isPlaying
            ? `0:${Math.floor((progress / 100) * 48)
                .toString()
                .padStart(2, '0')}`
            : '0:00'}
        </span>
        <span className={variant === 'full' ? 'text-gray-300' : 'text-gray-500'}>
          {duration}
        </span>
      </div>
    </div>
  );
};
