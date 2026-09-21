import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Users,
  Shield,
  Gift,
  Heart,
  Music,
  HardDrive,
  ShoppingBag,
  Eye,
} from 'lucide-react';
import { AppView } from '../../types';

export const PrototypeNavigator: React.FC = () => {
  const { currentView, setCurrentView, occasions, activeOccasionId, selectOccasionAndNavigate } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const flows: Array<{ id: AppView; label: string; tag: string; icon: React.ReactNode }> = [
    { id: 'landing', label: '1. Landing Page', tag: 'Public', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'auth', label: '2. Sign Up / In', tag: 'Auth', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'creator-dashboard', label: '3. Creator Dashboard', tag: 'Creator', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'create-occasion', label: '4. Create Occasion Flow', tag: 'Creator', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'occasion-space', label: '5. Occasion Memory Space', tag: 'Creator', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'invite-contributors', label: '6. Invite Contributors', tag: 'Creator', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'contributor-consent', label: '7. Contributor Consent', tag: 'Contributor', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'contributor-upload', label: '8. Contributor Upload', tag: 'Contributor', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'contributor-my-memories', label: '9. Contributor My Memories', tag: 'Contributor', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'creator-review', label: '10. Creator Review & Moderate', tag: 'Creator', icon: <Shield className="w-3.5 h-3.5" /> },
    { id: 'finalize-celebration', label: '11. Finalize Celebration', tag: 'Creator', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'celebration-page', label: '12. Celebration Person View', tag: 'Celebration', icon: <Eye className="w-3.5 h-3.5 text-[#FF6B6B]" /> },
    { id: 'digital-keepsake', label: '14. Digital Keepsake', tag: 'Shop', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'physical-keepsake', label: '15. Physical Keepsake', tag: 'Shop', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'storage', label: '16. Storage Upgrade', tag: 'Storage', icon: <HardDrive className="w-3.5 h-3.5" /> },
    { id: 'gift-finder', label: '17. Gift Finder Guided', tag: 'Gift', icon: <Gift className="w-3.5 h-3.5" /> },
    { id: 'digital-store', label: '18. Digital Store', tag: 'Shop', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'ai-birthday-song', label: '19. AI Birthday Song', tag: 'AI Song', icon: <Music className="w-3.5 h-3.5 text-[#FF6B6B]" /> },
  ];

  return (
    <div className="bg-[#243B53] text-white border-b border-white/10 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-[#FF6B6B] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
            PROTOTYPE NAVIGATOR
          </span>
          <span className="text-gray-300 hidden sm:inline">
            Jump directly to any of the 10 flows & 4 perspectives:
          </span>
          <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded text-[11px]">
            {flows.find((f) => f.id === currentView)?.label || currentView}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct shortcuts */}
          <button
            onClick={() => selectOccasionAndNavigate('occ-sarah-25', 'celebration-page')}
            id="quick-nav-celebration-hero"
            className="hidden md:flex items-center gap-1.5 bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white px-2.5 py-1 rounded font-medium text-[11px] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            Celebration Person View
          </button>
          <button
            onClick={() => setCurrentView('contributor-consent')}
            id="quick-nav-contributor-flow"
            className="hidden md:flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded font-medium text-[11px] transition-colors cursor-pointer"
          >
            <Users className="w-3 h-3" />
            Contributor Flow
          </button>
          <button
            onClick={() => setCurrentView('gift-finder')}
            id="quick-nav-gift-finder"
            className="hidden lg:flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white px-2.5 py-1 rounded font-medium text-[11px] transition-colors cursor-pointer"
          >
            <Gift className="w-3 h-3" />
            Gift Finder
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            id="toggle-all-flows-btn"
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-gray-200 px-2.5 py-1 rounded cursor-pointer transition-colors"
          >
            <span>All 18 Screens</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-[#1B2D40] border-t border-white/10 px-4 py-3 max-w-7xl mx-auto">
          <p className="text-[11px] text-gray-400 mb-2">
            Click any step to test that screen directly. All interactions are fully interactive and share continuous state:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {flows.map((flow) => {
              const isActive = currentView === flow.id;
              return (
                <button
                  key={flow.id}
                  onClick={() => {
                    setCurrentView(flow.id);
                    setIsOpen(false);
                  }}
                  className={`px-2.5 py-2 rounded-lg text-left text-[11px] font-medium transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#FF6B6B] text-white shadow-sm font-semibold'
                      : 'bg-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <span className="truncate">{flow.label}</span>
                  <span
                    className={`text-[9px] uppercase px-1 py-0.5 rounded shrink-0 ${
                      isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    {flow.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
