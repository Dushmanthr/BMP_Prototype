import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShieldCheck, Lock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#243B53] text-white pt-16 pb-12 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#FF6B6B] flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Moments <span className="text-[#FF6B6B]">&</span> Memories
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-md leading-relaxed">
              Bringing friends and family together to create timeless digital memory
              spaces, heartfelt voice recordings, private photo collections, and keepsake
              gifts for life’s most cherished celebrations.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF6B6B]" />
                Private & Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#FF6B6B]" />
                No Account Required for Contributors
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  About Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('landing')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('create-occasion')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer font-medium text-[#FF6B6B]"
                >
                  Create an Occasion
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('digital-keepsake')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Digital Keepsakes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('gift-finder')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Find the Perfect Gift
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Account */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">
              Trust & Security
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => alert('Privacy Policy: All contributor memories are completely private and only shared with the occasion creator and celebration recipient. Never sold or used for ad targeting.')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Terms of Service: Respectful celebration guidelines apply to all uploads.')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Contact our dedicated celebration team at support@momentsmemories.app')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('auth')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  Sign In to Account
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Moments & Memories. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-current" />
            <span>for life’s most meaningful celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
