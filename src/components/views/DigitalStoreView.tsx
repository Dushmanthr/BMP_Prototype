import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Video,
  Music,
  Mail,
  Palette,
  Check,
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
} from 'lucide-react';

export const DigitalStoreView: React.FC = () => {
  const { setCurrentView, triggerConfetti, showToast } = useApp();
  const [purchasedItems, setPurchasedItems] = useState<Record<string, boolean>>({});

  const storeItems = [
    {
      id: 'montage-reel',
      title: 'Automated Video Montage Reel',
      category: 'Video & Audio',
      price: '$12.99',
      description:
        'AI stitches together all submitted photos and videos into a cinematic 3-minute celebration reel set to heartwarming licensed music.',
      icon: Video,
      badge: 'Popular',
      image:
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'spotify-sync',
      title: 'Celebration Soundtrack Sync',
      category: 'Video & Audio',
      price: '$3.99',
      description:
        'Enable contributors to each dedicate a song to the honoree. Automatically compiles a collaborative Spotify / Apple Music celebratory playlist.',
      icon: Music,
      badge: 'New',
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'animated-cards',
      title: '3D Origami Animated Envelope',
      category: 'Interactive',
      price: '$4.99',
      description:
        'A magical virtual unboxing experience featuring interactive wax seals, gold ribbon pulls, and sound effects.',
      icon: Mail,
      badge: null,
      image:
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'mosaic-poster',
      title: 'Printable Memory Mosaic Poster',
      category: 'Keepsakes',
      price: '$19.99',
      description:
        'Generates an ultra-high resolution printable 24x36” vector mosaic of the celebration person crafted from 150+ contributor snapshot tiles.',
      icon: Palette,
      badge: 'Bestseller',
      image:
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handlePurchase = (item: any) => {
    setPurchasedItems((prev) => ({ ...prev, [item.id]: true }));
    triggerConfetti();
    showToast(`"${item.title}" added to your celebration experience!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <button
        onClick={() => setCurrentView('creator-dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
          Celebration Upgrades
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
          Digital Store & Add-ons
        </h1>
        <p className="text-sm text-gray-600">
          Make the celebration unforgettable with cinematic montage reels, collaborative soundtracks, and interactive keepsakes.
        </p>
      </div>

      {/* Store Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {storeItems.map((item) => {
          const isBought = purchasedItems[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF6B6B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-medium text-gray-200">
                      {item.category}
                    </span>
                    <span className="text-xl font-black bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#243B53] flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#FF6B6B]" />
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handlePurchase(item)}
                  id={`purchase-item-${item.id}-btn`}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isBought
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white shadow-md active:scale-98'
                  }`}
                >
                  {isBought ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      Unlocked & Active
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to Celebration ({item.price})
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
