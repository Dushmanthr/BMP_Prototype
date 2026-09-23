import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Plus,
  Gift,
  HardDrive,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  ChevronDown,
  BookOpen,
  Music,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { AppView } from '../../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    user,
    logout,
    activeOccasion,
    storageUsedGb = 2.4,
    storageLimitGb = 5.0,
    currentPlanName = 'Free Starter',
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolsDropdownRef.current &&
        !toolsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsToolsDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine current mode
  const isContributorView =
    currentView === 'contributor-consent' ||
    currentView === 'contributor-upload' ||
    currentView === 'contributor-my-memories';

  const isCelebrationPersonView = currentView === 'celebration-page';

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setIsToolsDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const isToolsActive =
    currentView === 'ai-birthday-song' ||
    currentView === 'gift-finder' ||
    currentView === 'digital-keepsake' ||
    currentView === 'physical-keepsake' ||
    currentView === 'digital-store';

  const storagePercent = Math.min(
    100,
    Math.round((storageUsedGb / storageLimitGb) * 100)
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors shadow-[0_2px_10px_rgba(36,59,83,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Identity */}
        <button
          onClick={() => handleNav(user ? 'creator-dashboard' : 'landing')}
          id="header-logo-btn"
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] group-hover:bg-[#FF6B6B] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-[#FF6B6B]/20">
            <Heart className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl text-[#243B53] tracking-tight block leading-tight">
              Moments <span className="text-[#FF6B6B]">&</span> Memories
            </span>
            <span className="text-[11px] text-gray-500 font-medium block">
              Digital Celebration Platform
            </span>
          </div>
        </button>

        {/* View-Specific Navigation - Desktop (Clean & Systematic) */}
        {!isContributorView && !isCelebrationPersonView && (
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {user ? (
              <>
                {/* 1. Primary: Celebrations / Dashboard */}
                <button
                  onClick={() => handleNav('creator-dashboard')}
                  id="nav-my-occasions-btn"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    currentView === 'creator-dashboard'
                      ? 'bg-[#243B53] text-white shadow-xs'
                      : 'text-[#243B53] hover:bg-gray-100/80 hover:text-[#243B53]'
                  }`}
                >
                  My Celebrations
                </button>

                {/* 2. Primary: Active Memories Space */}
                <button
                  onClick={() => handleNav('occasion-space')}
                  id="nav-memory-space-btn"
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'occasion-space' || currentView === 'creator-review'
                      ? 'bg-[#243B53] text-white shadow-xs'
                      : 'text-[#243B53] hover:bg-gray-100/80 hover:text-[#243B53]'
                  }`}
                >
                  <span>Memories Space</span>
                  {activeOccasion && (
                    <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                  )}
                </button>

                {/* 3. Celebration Tools Popover Dropdown (Consolidating secondary tools) */}
                <div className="relative" ref={toolsDropdownRef}>
                  <button
                    onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                    id="nav-celebration-tools-dropdown-btn"
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isToolsActive
                        ? 'bg-[#243B53] text-white shadow-xs'
                        : isToolsDropdownOpen
                        ? 'bg-gray-100 text-[#243B53]'
                        : 'text-[#243B53] hover:bg-gray-100/80'
                    }`}
                  >
                    <div className="w-4 h-4 text-[#FF6B6B]" />
                    <span>Celebration Tools</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isToolsDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Modern Floating Popover */}
                  {isToolsDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-84 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6B6B] block">
                          Creative Studio & Add-ons
                        </span>
                        <p className="text-xs text-gray-500">
                          Tools to personalize and celebrate
                        </p>
                      </div>

                      <div className="space-y-1">
                        {/* AI Birthday Song */}
                        <button
                          onClick={() => handleNav('ai-birthday-song')}
                          id="dropdown-nav-ai-song"
                          className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 group cursor-pointer ${
                            currentView === 'ai-birthday-song'
                              ? 'bg-gray-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#FF6B6B]/10 text-[#FF6B6B] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Music className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors">
                                AI Birthday Song
                              </span>
                              <span className="text-[9px] font-bold bg-[#FF6B6B]/15 text-[#FF6B6B] px-1.5 py-0.5 rounded-full">
                                AI
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 truncate">
                              Personalized lyrics & custom music dedication
                            </p>
                          </div>
                        </button>

                        {/* Smart Gift Finder */}
                        <button
                          onClick={() => handleNav('gift-finder')}
                          id="dropdown-nav-gift-finder"
                          className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 group cursor-pointer ${
                            currentView === 'gift-finder'
                              ? 'bg-gray-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#243B53]/10 text-[#243B53] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <Gift className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors">
                                Smart Gift Finder
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 truncate">
                              Guided gift ideas & collaborative friend survey
                            </p>
                          </div>
                        </button>

                        {/* Keepsakes */}
                        <button
                          onClick={() => handleNav('digital-keepsake')}
                          id="dropdown-nav-keepsakes"
                          className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 group cursor-pointer ${
                            currentView === 'digital-keepsake' || currentView === 'physical-keepsake'
                              ? 'bg-gray-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors block">
                              Keepsakes & Photobooks
                            </span>
                            <p className="text-[11px] text-gray-500 truncate">
                              Digital flipbooks & heirloom hardcover books
                            </p>
                          </div>
                        </button>

                        {/* Digital Store */}
                        <button
                          onClick={() => handleNav('digital-store')}
                          id="dropdown-nav-digital-store"
                          className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-start gap-3 group cursor-pointer ${
                            currentView === 'digital-store'
                              ? 'bg-gray-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                            <ShoppingBag className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-[#243B53] group-hover:text-[#FF6B6B] transition-colors block">
                              Digital Party Store
                            </span>
                            <p className="text-[11px] text-gray-500 truncate">
                              Downloadable invitations & printable cards
                            </p>
                          </div>
                        </button>
                      </div>

                      {/* Footer Note */}
                      <div className="mt-2 pt-2 border-t border-gray-100 px-3 py-1 bg-gray-50/70 rounded-xl flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">
                          Accessible anytime on Dashboard
                        </span>
                        <button
                          onClick={() => handleNav('creator-dashboard')}
                          className="text-[10px] font-bold text-[#243B53] hover:text-[#FF6B6B] flex items-center gap-1 cursor-pointer"
                        >
                          View Hub <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('landing')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === 'landing'
                      ? 'bg-[#243B53] text-white'
                      : 'text-[#243B53] hover:bg-gray-100'
                  }`}
                >
                  How It Works
                </button>
                <button
                  onClick={() => handleNav('digital-keepsake')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    currentView === 'digital-keepsake'
                      ? 'bg-[#243B53] text-white'
                      : 'text-[#243B53] hover:bg-gray-100'
                  }`}
                >
                  Keepsakes
                </button>
                <button
                  onClick={() => handleNav('gift-finder')}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'gift-finder'
                      ? 'bg-[#243B53] text-white'
                      : 'text-[#243B53] hover:bg-gray-100'
                  }`}
                >
                  <Gift className="w-4 h-4 text-[#FF6B6B]" />
                  Find a Gift
                </button>
              </>
            )}
          </nav>
        )}

        {/* Contributor Header Mode */}
        {isContributorView && (
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-full">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              Contributor Mode (No Login Required)
            </span>
            <button
              onClick={() => handleNav('contributor-my-memories')}
              id="contributor-my-memories-btn"
              className="text-xs sm:text-sm font-semibold text-[#243B53] hover:text-[#FF6B6B] transition-colors cursor-pointer underline underline-offset-4"
            >
              My Contributions
            </button>
          </div>
        )}

        {/* Celebration Person Header Mode */}
        {isCelebrationPersonView && (
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 bg-[#FF6B6B]/10 text-[#FF6B6B] text-xs font-bold rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Celebration Experience
            </span>
            <button
              onClick={() => handleNav('creator-dashboard')}
              className="text-xs font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Exit to Dashboard
            </button>
          </div>
        )}

        {/* Right Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {user ? (
            <>
              {/* Primary Call to Action */}
              <button
                onClick={() => handleNav('create-occasion')}
                id="header-create-occasion-cta"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md hover:shadow-[#FF6B6B]/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Create Occasion
              </button>

              {/* User Account & Storage Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  id="user-profile-menu-btn"
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                  aria-label="User account menu"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover border-2 border-[#243B53]/10"
                  />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Profile Header */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center gap-2.5 mb-1">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#243B53] truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Integrated Storage Quota Widget */}
                    <div className="px-4 py-2.5 mx-2 my-1.5 bg-[#FAFAFB] rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#243B53] flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-[#FF6B6B]" />
                          Cloud Storage
                        </span>
                        <span className="text-[11px] font-bold text-gray-500">
                          {storageUsedGb} / {storageLimitGb} GB
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-[#FF6B6B] rounded-full transition-all duration-300"
                          style={{ width: `${storagePercent}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-gray-500">
                          {currentPlanName}
                        </span>
                        <button
                          onClick={() => {
                            handleNav('storage');
                            setIsProfileDropdownOpen(false);
                          }}
                          className="text-[10px] font-bold text-[#FF6B6B] hover:underline cursor-pointer"
                        >
                          Upgrade Plan
                        </button>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleNav('creator-dashboard');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-[#243B53] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-gray-400" />
                        My Celebrations
                      </button>

                      <button
                        onClick={() => {
                          handleNav('storage');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-[#243B53] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <HardDrive className="w-4 h-4 text-gray-400" />
                        Storage & Plan Details
                      </button>

                      <button
                        onClick={() => {
                          handleNav('digital-store');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-[#243B53] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-gray-400" />
                        Digital Products & Purchases
                      </button>
                    </div>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      id="header-logout-btn"
                      className="w-full px-4 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('auth')}
                id="header-signin-btn"
                className="px-4 py-2 text-sm font-semibold text-[#243B53] hover:text-[#FF6B6B] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('create-occasion')}
                id="header-create-first-btn"
                className="px-4 py-2.5 bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-sm rounded-xl shadow-sm hover:shadow-md hover:shadow-[#FF6B6B]/20 transition-all cursor-pointer"
              >
                Create an Occasion
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#243B53] hover:bg-gray-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#243B53]" />
            ) : (
              <Menu className="w-6 h-6 text-[#243B53]" />
            )}
          </button>
        </div>
      </div>

      {/* Systematic Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-gray-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          {/* User mini card in mobile menu */}
          {user && (
            <div className="mb-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-200"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#243B53] truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate">
                    {storageUsedGb} GB of {storageLimitGb} GB used
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleNav('storage')}
                className="text-[11px] font-bold text-[#FF6B6B] px-2.5 py-1 rounded-lg bg-[#FF6B6B]/10 hover:bg-[#FF6B6B]/20 shrink-0"
              >
                Plan
              </button>
            </div>
          )}

          {/* Section 1: Core Navigation */}
          <div className="space-y-1 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-1">
              Celebrations
            </span>
            <button
              onClick={() => handleNav('creator-dashboard')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between cursor-pointer ${
                currentView === 'creator-dashboard'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-[#FF6B6B]" />
                <span>My Celebrations</span>
              </div>
            </button>

            <button
              onClick={() => handleNav('occasion-space')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm flex items-center justify-between cursor-pointer ${
                currentView === 'occasion-space' || currentView === 'creator-review'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span>Memories Space</span>
              </div>
            </button>

            <button
              onClick={() => handleNav('create-occasion')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-sm bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white flex items-center gap-2.5 shadow-sm mt-1 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Create Occasion</span>
            </button>
          </div>

          {/* Section 2: Creative Tools & Add-ons */}
          <div className="space-y-1 mb-4 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B6B] px-3 block mb-1">
              Creative Studio & Add-ons
            </span>

            <button
              onClick={() => handleNav('ai-birthday-song')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                currentView === 'ai-birthday-song'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Music className="w-4 h-4 text-[#FF6B6B]" />
                <span>AI Birthday Song</span>
              </div>
              <span className="text-[9px] font-bold bg-[#FF6B6B]/20 text-[#FF6B6B] px-1.5 py-0.5 rounded">
                AI
              </span>
            </button>

            <button
              onClick={() => handleNav('gift-finder')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                currentView === 'gift-finder'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-[#FF6B6B]" />
                <span>Smart Gift Finder</span>
              </div>
            </button>

            <button
              onClick={() => handleNav('digital-keepsake')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                currentView === 'digital-keepsake' || currentView === 'physical-keepsake'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Keepsakes & Photobooks</span>
              </div>
            </button>

            <button
              onClick={() => handleNav('digital-store')}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                currentView === 'digital-store'
                  ? 'bg-[#243B53] text-white'
                  : 'text-[#243B53] hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <span>Digital Party Store</span>
              </div>
            </button>
          </div>

          {/* Section 3: Account & Session */}
          <div className="space-y-1 pt-3 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-1">
              Account & Storage
            </span>

            {user ? (
              <>
                <button
                  onClick={() => handleNav('storage')}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                    currentView === 'storage'
                      ? 'bg-[#243B53] text-white'
                      : 'text-[#243B53] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HardDrive className="w-4 h-4 text-gray-500" />
                    <span>Cloud Storage & Plan</span>
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">
                    {storageUsedGb} GB
                  </span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer mt-1"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNav('auth')}
                className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-[#243B53] hover:bg-gray-50 flex items-center gap-2.5 cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-gray-400" />
                <span>Sign In to Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
