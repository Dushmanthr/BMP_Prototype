import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Confetti } from './components/common/Confetti';
import { PrototypeNavigator } from './components/common/PrototypeNavigator';

// Views
import { LandingPage } from './components/views/LandingPage';
import { AuthView } from './components/views/AuthView';
import { CreatorDashboard } from './components/views/CreatorDashboard';
import { CreateOccasionFlow } from './components/views/CreateOccasionFlow';
import { OccasionMemorySpace } from './components/views/OccasionMemorySpace';
import { InviteScreen } from './components/views/InviteScreen';
import { ContributorConsent } from './components/views/ContributorConsent';
import { ContributorUpload } from './components/views/ContributorUpload';
import { ContributorMyContributions } from './components/views/ContributorMyContributions';
import { CreatorReviewScreen } from './components/views/CreatorReviewScreen';
import { FinalizeCelebrationScreen } from './components/views/FinalizeCelebrationScreen';
import { CelebrationPersonView } from './components/views/CelebrationPersonView';
import { GiftFinderFlow } from './components/views/GiftFinderFlow';
import { DigitalKeepsakeView } from './components/views/DigitalKeepsakeView';
import { PhysicalKeepsakeView } from './components/views/PhysicalKeepsakeView';
import { StorageUpgradeView } from './components/views/StorageUpgradeView';
import { DigitalStoreView } from './components/views/DigitalStoreView';
import { AIBirthdaySongView } from './components/views/AIBirthdaySongView';

const AppContent: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'auth':
      case 'sign-in':
      case 'sign-up':
        return <AuthView />;

      case 'creator-dashboard':
        return <CreatorDashboard />;
      case 'create-occasion':
        return <CreateOccasionFlow />;
      case 'occasion-space':
        return <OccasionMemorySpace />;
      case 'invite-contributors':
        return <InviteScreen />;
      case 'contributor-consent':
        return <ContributorConsent />;
      case 'contributor-upload':
        return <ContributorUpload />;
      case 'contributor-my-memories':
        return <ContributorMyContributions />;
      case 'creator-review':
        return <CreatorReviewScreen />;
      case 'finalize-celebration':
        return <FinalizeCelebrationScreen />;
      case 'celebration-page':
        return <CelebrationPersonView />;
      case 'gift-finder':
        return <GiftFinderFlow />;
      case 'digital-keepsake':
        return <DigitalKeepsakeView />;
      case 'physical-keepsake':
        return <PhysicalKeepsakeView />;
      case 'storage':
      case 'storage-upgrade':
        return <StorageUpgradeView />;

      case 'digital-store':
        return <DigitalStoreView />;
      case 'ai-birthday-song':
        return <AIBirthdaySongView />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-[#243B53] font-sans selection:bg-[#FF6B6B]/20 selection:text-[#243B53]">
      <Confetti />
      {/* Floating Prototype Flow Navigator for Testing & Review */}
      <PrototypeNavigator />
      <Header />

      <main className="flex-1">
        {renderView()}
      </main>

      <Footer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#243B53] text-white px-6 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-ping" />
          {toastMessage}
        </div>
      )}
    </div>
  );

};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
