import React, { useEffect } from 'react';
import { X, Calendar, User, ZoomIn, Play } from 'lucide-react';
import { LightboxMedia } from './types';

interface LightboxModalProps {
  media: LightboxMedia | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ media, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (media) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [media, onClose]);

  if (!media) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Media preview"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-[#1B2D40] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#152433]">
          <div>
            <h4 className="font-bold text-base sm:text-lg text-white line-clamp-1">
              {media.title || 'Keepsake Memory'}
            </h4>
            {(media.contributor || media.date) && (
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-0.5">
                {media.contributor && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FF6B6B]" />
                    {media.contributor}
                  </span>
                )}
                {media.date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {media.date}
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close media preview"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Content */}
        <div className="flex-1 min-h-[280px] max-h-[65vh] flex items-center justify-center p-4 bg-black/40 overflow-hidden">
          {media.type === 'video' ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative rounded-2xl overflow-hidden bg-black">
              <img
                src={media.url}
                alt={media.title || 'Video preview'}
                className="w-full h-full max-h-[58vh] object-contain"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full bg-[#FF6B6B] text-white flex items-center justify-center shadow-xl mb-3 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <span className="text-sm font-semibold tracking-wide text-white drop-shadow">
                  Video Recording Archive
                </span>
                <span className="text-xs text-gray-300 mt-1">
                  Full HD video preservation included in keepsake download
                </span>
              </div>
            </div>
          ) : (
            <div className="relative group max-w-full max-h-full flex items-center justify-center">
              <img
                src={media.url}
                alt={media.title || 'Memory photo'}
                className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-2xl border-4 border-white/5"
              />
            </div>
          )}
        </div>

        {/* Caption text */}
        {media.caption && (
          <div className="px-6 py-4 bg-[#152433] border-t border-white/10">
            <p className="text-sm sm:text-base text-gray-200 font-serif italic leading-relaxed">
              "{media.caption}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
