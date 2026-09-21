import React, { createContext, useContext, useState } from 'react';
import {
  AppView,
  Occasion,
  Memory,
  GiftFinderData,
  SongGenerationData,
  GiftItem,
} from '../types';

import {
  INITIAL_OCCASIONS,
  INITIAL_MEMORIES,
  INITIAL_FRIEND_RESPONSES,
} from '../data/mockData';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface PhysicalOrder {
  id: string;
  productName: string;
  date: string;
  status: string;
  recipient: string;
  trackingNumber: string;
  address: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  occasions: Occasion[];
  activeOccasionId: string;
  setActiveOccasionId: (id: string) => void;
  activeOccasion: Occasion;
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'date' | 'status'>) => void;
  updateMemoryStatus: (id: string, status: 'Approved' | 'Pending Review' | 'Removed') => void;
  removeMemory: (id: string) => void;
  createOccasion: (data: Partial<Occasion>) => string;
  finalizeCelebration: (occasionId: string) => void;
  contributorConsentAgreed: boolean;
  setContributorConsentAgreed: (agreed: boolean) => void;
  contributorName: string;
  setContributorName: (name: string) => void;
  storageUsedGb: number;
  storageLimitGb: number;
  currentPlanName: string;
  upgradeStorage: (planId: string) => void;
  purchasedDigitalItems: string[];
  purchaseDigitalItem: (productId: string, title: string) => void;
  physicalOrders: PhysicalOrder[];
  createPhysicalOrder: (productName: string, recipient: string, address: string) => void;
  giftFinder: GiftFinderData;
  updateGiftFinder: (data: Partial<GiftFinderData>) => void;
  addFriendGiftResponse: (name: string, suggestion: string, category: string) => void;
  songGeneration: SongGenerationData;
  updateSongGeneration: (data: Partial<SongGenerationData>) => void;
  toast: string | null;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  storagePlan: {
    tier: string;
    usedGB: number;
    totalGB: number;
  };
  giftFinderData: GiftFinderData;
  updateGiftFinderData: (data: Partial<GiftFinderData>) => void;
  giftRecommendations: GiftItem[];
  confettiTrigger: number;
  triggerConfetti: () => void;

  activeRolePreview: 'creator' | 'contributor' | 'celebration-person' | 'gift-finder' | 'guest';
  setActiveRolePreview: (role: 'creator' | 'contributor' | 'celebration-person' | 'gift-finder' | 'guest') => void;
  // helper to switch to a specific occasion
  selectOccasionAndNavigate: (id: string, view: AppView) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });
  const [occasions, setOccasions] = useState<Occasion[]>(INITIAL_OCCASIONS);
  const [activeOccasionId, setActiveOccasionId] = useState<string>('occ-sarah-25');
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  
  // Contributor session
  const [contributorConsentAgreed, setContributorConsentAgreed] = useState<boolean>(false);
  const [contributorName, setContributorName] = useState<string>('');

  // Storage
  const [storageUsedGb] = useState<number>(2.4);
  const [storageLimitGb, setStorageLimitGb] = useState<number>(5.0);
  const [currentPlanName, setCurrentPlanName] = useState<string>('Free Starter');

  // Digital Purchases
  const [purchasedDigitalItems, setPurchasedDigitalItems] = useState<string[]>([
    'dk-classic',
    'dsp-2',
  ]);

  // Physical orders
  const [physicalOrders, setPhysicalOrders] = useState<PhysicalOrder[]>([
    {
      id: 'ORD-9821',
      productName: 'Heirloom Hardcover Memory Book',
      date: '2027-06-20',
      status: 'Being Prepared',
      recipient: 'Sarah Jenkins',
      trackingNumber: 'TRK-8829-US',
      address: '742 Evergreen Terrace, Portland, OR',
    },
  ]);

  // Gift Finder State
  const [giftFinder, setGiftFinder] = useState<GiftFinderData>({
    personName: 'Sarah Jenkins',
    age: '25',
    ageRange: '20-29',
    relationship: 'Best Friend',
    occasionType: 'Birthday',
    interests: ['Specialty Coffee', 'Books & Reading', 'Outdoors & Hiking', 'Music & Vinyl'],
    personality: ['Creative & Artistic', 'Sentimental & Nostalgic', 'Adventurous Explorer'],
    hobbies: ['Ceramics & Pottery', 'Coastal Hiking', 'Specialty Coffee', 'Indie Music'],
    favoriteActivities: 'Morning coffee rituals, weekend road trips, and exploring vintage bookshops.',
    thingsTheyUse: 'Chemex dripper, Olympus film camera, Moleskine notebooks.',
    thingsTheyOwn: 'Lots of fiction books, watercolor sets, standard headphones.',
    budget: '$50 - $100',
    friendResponses: INITIAL_FRIEND_RESPONSES,
  });


  // Song Generator State
  const [songGeneration, setSongGeneration] = useState<SongGenerationData>({
    personName: 'Sarah',
    relationship: 'Best Friend',
    occasion: '25th Birthday',
    specialMemories: 'Waking up at 5am in Amalfi, college graduation night, and road trips singing 90s indie hits.',
    message: 'You bring light and laughter wherever you go. Here is to 25 wonderful years and the endless adventures ahead!',
    musicStyle: 'Acoustic Folk / Indie Singer-Songwriter',
    audioGenerated: true,
    songTitle: 'Amalfi Sunrise (Sarah’s 25th Year)',
    duration: '2:14',
    lyrics: [
      'Waking up before the world began to wake,',
      'Climbing Amalfi hills for golden sunrise’s sake.',
      'Through every college night and every open highway road,',
      'You carry warmth into every heart and lighten every load.',
      'Here is to twenty-five years of grace and joyful cheer,',
      'Sarah, you make us grateful for every single year.',
    ],
  });

  // Notifications & UI feedback
  const [toast, setToast] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState<number>(0);
  const [activeRolePreview, setActiveRolePreview] = useState<'creator' | 'contributor' | 'celebration-person' | 'gift-finder' | 'guest'>('guest');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const triggerConfetti = () => {
    setConfettiTrigger((prev) => prev + 1);
  };

  const login = (email: string, name: string = 'Eleanor Vance') => {
    setUser({
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
    showToast('Signed out successfully.');
  };

  const activeOccasion =
    occasions.find((o) => o.id === activeOccasionId) || occasions[0];

  const addMemory = (memoryData: Omit<Memory, 'id' | 'date' | 'status'>) => {
    const newMem: Memory = {
      ...memoryData,
      id: `mem-${Date.now()}`,
      date: 'Just now',
      status: 'Pending Review',
      isMyUpload: true,
      likesCount: 1,
    };
    setMemories((prev) => [newMem, ...prev]);

    // Update occasion memory counter
    setOccasions((prev) =>
      prev.map((occ) =>
        occ.id === memoryData.occasionId
          ? {
              ...occ,
              memoriesCount: occ.memoriesCount + 1,
              contributorsCount: occ.contributorsCount + 1,
            }
          : occ
      )
    );
  };

  const updateMemoryStatus = (id: string, status: 'Approved' | 'Pending Review' | 'Removed') => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    showToast(`Memory marked as ${status}.`);
  };

  const removeMemory = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'Removed' } : m))
    );
    showToast('Memory moved to Removed items.');
  };

  const createOccasion = (data: Partial<Occasion>): string => {
    const newId = `occ-${Date.now()}`;
    const newOccasion: Occasion = {
      id: newId,
      name: data.name || "Untitled Occasion",
      occasionType: data.occasionType || 'Birthday',
      celebrationPersonName: data.celebrationPersonName || 'Special Person',
      celebrationPersonPhoto:
        data.celebrationPersonPhoto ||
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      date: data.date || new Date().toISOString().split('T')[0],
      formattedDate: data.formattedDate || 'Upcoming Celebration',
      description: data.description || 'A collection of heartfelt memories.',
      coverImage:
        data.coverImage ||
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
      memoriesCount: 0,
      contributorsCount: 0,
      status: 'Collecting Memories',
      isFinalized: false,
    };
    setOccasions((prev) => [newOccasion, ...prev]);
    setActiveOccasionId(newId);
    triggerConfetti();
    return newId;
  };

  const finalizeCelebration = (occasionId: string) => {
    setOccasions((prev) =>
      prev.map((occ) =>
        occ.id === occasionId
          ? { ...occ, status: 'Finalized', isFinalized: true }
          : occ
      )
    );
    triggerConfetti();
    showToast('Celebration has been finalized and is ready to share!');
  };

  const upgradeStorage = (planId: string) => {
    if (planId === 'plan-plus') {
      setStorageLimitGb(25);
      setCurrentPlanName('Memory Plus (25 GB)');
    } else if (planId === 'plan-forever') {
      setStorageLimitGb(100);
      setCurrentPlanName('Memory Forever (100 GB)');
    }
    triggerConfetti();
    showToast('Storage plan successfully upgraded!');
  };

  const purchaseDigitalItem = (productId: string, title: string) => {
    if (!purchasedDigitalItems.includes(productId)) {
      setPurchasedDigitalItems((prev) => [...prev, productId]);
    }
    triggerConfetti();
    showToast(`Purchased "${title}" successfully!`);
  };

  const createPhysicalOrder = (
    productName: string,
    recipient: string,
    address: string
  ) => {
    const newOrder: PhysicalOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName,
      date: new Date().toISOString().split('T')[0],
      status: 'Being Prepared',
      recipient,
      trackingNumber: `TRK-${Math.floor(1000 + Math.random() * 9000)}-EXP`,
      address,
    };
    setPhysicalOrders((prev) => [newOrder, ...prev]);
    triggerConfetti();
    showToast(`Order for "${productName}" confirmed!`);
  };

  const updateGiftFinder = (data: Partial<GiftFinderData>) => {
    setGiftFinder((prev) => ({ ...prev, ...data }));
  };

  const addFriendGiftResponse = (name: string, suggestion: string, category: string) => {
    const newResp = {
      id: `fr-${Date.now()}`,
      friendName: name,
      suggestion,
      category,
      date: 'Just now',
    };
    setGiftFinder((prev) => ({
      ...prev,
      friendResponses: [newResp, ...prev.friendResponses],
    }));
    showToast(`Thank you, ${name}! Your gift idea was saved privately.`);
  };

  const updateSongGeneration = (data: Partial<SongGenerationData>) => {
    setSongGeneration((prev) => ({ ...prev, ...data }));
  };

  const selectOccasionAndNavigate = (id: string, view: AppView) => {
    setActiveOccasionId(id);
    setCurrentView(view);
  };

  const giftRecommendations: GiftItem[] = [
    {
      id: 'g-1',
      title: 'Artisan Ceramic Pour-Over Coffee Set',
      category: 'Coffee & Rituals',
      price: '$58.00',
      description: 'Handcrafted stoneware dripper with organic single-origin Ethiopian beans and filters.',
      matchReason: 'Morning rituals & coffee lover',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'g-2',
      title: 'Monogrammed Full Grain Leather Travel Journal',
      category: 'Travel & Writing',
      price: '$48.00',
      description: 'Refillable vegetable-tanned leather notebook with custom gold foil initials.',
      matchReason: 'Documenting adventures & reflections',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'g-3',
      title: 'Handmade Pottery Workshop for Two',
      category: 'Experiences',
      price: '$120.00',
      description: 'A 3-hour private ceramics masterclass with clay throwing, glazing, and kiln firing.',
      matchReason: 'Friend questionnaire suggestion: Emma noted pottery',
      imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'g-4',
      title: 'Warm Cashmere Travel Throw & Eye Mask',
      category: 'Cozy Lifestyle',
      price: '$135.00',
      description: 'Pure Mongolian ribbed cashmere blanket for road trips, flights, and fireside reading.',
      matchReason: 'Relaxation & comfort',
      imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'g-5',
      title: 'Vinyl Turntable & Classic Indie Record',
      category: 'Music & Audio',
      price: '$149.00',
      description: 'Belt-drive stereo record player with built-in preamp and retro walnut finish.',
      matchReason: 'Indie music & nostalgic vibes',
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'g-6',
      title: 'Custom Constellation Night Sky Print',
      category: 'Sentimental Art',
      price: '$45.00',
      description: 'Astronomically verified star map showing the night sky exactly as it looked on Sarah’s birth date.',
      matchReason: 'Sentimental milestone',
      imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        login,
        logout,
        occasions,
        activeOccasionId,
        setActiveOccasionId,
        activeOccasion,
        memories,
        addMemory,
        updateMemoryStatus,
        removeMemory,
        createOccasion,
        finalizeCelebration,
        contributorConsentAgreed,
        setContributorConsentAgreed,
        contributorName,
        setContributorName,
        storageUsedGb,
        storageLimitGb,
        currentPlanName,
        upgradeStorage,
        purchasedDigitalItems,
        purchaseDigitalItem,
        physicalOrders,
        createPhysicalOrder,
        giftFinder,
        updateGiftFinder,
        giftFinderData: giftFinder,
        updateGiftFinderData: updateGiftFinder,
        giftRecommendations,
        addFriendGiftResponse,
        songGeneration,
        updateSongGeneration,
        toast,
        toastMessage: toast,
        showToast,
        storagePlan: {
          tier: currentPlanName === 'PRO_50GB' || currentPlanName === 'Pro 50GB' ? 'PRO_50GB' : 'FREE',
          usedGB: storageUsedGb,
          totalGB: storageLimitGb,
        },
        confettiTrigger,
        triggerConfetti,
        activeRolePreview,
        setActiveRolePreview,
        selectOccasionAndNavigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );

};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
