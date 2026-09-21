import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Palette,
  Heart,
} from 'lucide-react';

export const PhysicalKeepsakeView: React.FC = () => {
  const { activeOccasion, memories, setCurrentView, triggerConfetti, showToast } = useApp();

  const [coverColor, setCoverColor] = useState<string>('#243B53'); // Navy default
  const [colorName, setColorName] = useState<string>('Midnight Navy');
  const [foilColor, setFoilColor] = useState<'Gold' | 'Rose Gold' | 'Silver'>('Gold');
  const [customFoilText, setCustomFoilText] = useState<string>(activeOccasion.name);
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  const colors = [
    { name: 'Midnight Navy', hex: '#243B53' },
    { name: 'Warm Coral Blush', hex: '#FF6B6B' },
    { name: 'Oatmeal Linen', hex: '#D8CFBC' },
    { name: 'Earthy Sage', hex: '#4A6B5B' },
  ];

  const foilOptions = [
    { name: 'Gold', style: 'text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' },
    { name: 'Rose Gold', style: 'text-rose-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' },
    { name: 'Silver', style: 'text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]' },
  ];

  const handleOrderBook = () => {
    setIsOrdered(true);
    triggerConfetti();
    showToast('Heirloom Memory Book order placed! Crafting starts today.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => setCurrentView('celebration-page')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Celebration
      </button>

      {/* Title */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
          Physical Keepsake
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
          The Heirloom Memory Book
        </h1>
        <p className="text-sm text-gray-600">
          Transform every photo, wish, and QR-audio code from {activeOccasion.celebrationPersonName}’s celebration into an archival linen hardcover book.
        </p>
      </div>

      {/* Book Customizer & Live Book Rendering */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Book Rendering Preview (Left 7 cols) */}
        <div className="lg:col-span-7 bg-[#FAFAFB] p-8 sm:p-12 rounded-3xl border border-gray-200 flex items-center justify-center shadow-inner">
          <div
            className="w-64 sm:w-80 h-80 sm:h-96 rounded-r-2xl rounded-l-xs shadow-2xl relative transition-colors duration-500 flex flex-col justify-between p-8 border-l-8 border-black/30 transform hover:-rotate-1 transition-transform"
            style={{ backgroundColor: coverColor }}
          >
            {/* Book spine simulation texture */}
            <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/25 to-transparent" />

            {/* Foil stamped header emblem */}
            <div className="text-center pt-8">
              <Sparkles
                className={`w-8 h-8 mx-auto mb-4 ${
                  foilColor === 'Gold'
                    ? 'text-amber-300'
                    : foilColor === 'Rose Gold'
                    ? 'text-rose-200'
                    : 'text-slate-200'
                }`}
              />
              <h2
                className={`font-serif text-xl sm:text-2xl font-bold tracking-wider leading-snug uppercase ${
                  foilColor === 'Gold'
                    ? 'text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                    : foilColor === 'Rose Gold'
                    ? 'text-rose-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                    : 'text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                {customFoilText || activeOccasion.name}
              </h2>
              <p
                className={`text-xs mt-2 uppercase tracking-widest font-serif ${
                  foilColor === 'Gold' ? 'text-amber-200/80' : 'text-white/80'
                }`}
              >
                {activeOccasion.formattedDate}
              </p>
            </div>

            {/* Bottom foil maker stamp */}
            <div className="text-center pb-2">
              <span
                className={`text-[9px] uppercase tracking-widest font-mono ${
                  foilColor === 'Gold' ? 'text-amber-300/60' : 'text-white/60'
                }`}
              >
                Archival Linen Edition • {activeOccasion.celebrationPersonName}
              </span>
            </div>
          </div>
        </div>

        {/* Customizer Controls (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-3">
                1. Select Linen Fabric Color: <span className="text-[#FF6B6B]">{colorName}</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => {
                      setCoverColor(col.hex);
                      setColorName(col.name);
                    }}
                    className={`h-12 rounded-xl border-2 transition-all cursor-pointer relative flex items-center justify-center ${
                      coverColor === col.hex
                        ? 'border-[#243B53] scale-105 shadow-md'
                        : 'border-transparent hover:scale-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {coverColor === col.hex && (
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          col.hex === '#D8CFBC' ? 'text-[#243B53]' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-2">
                2. Foil Stamping Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {foilOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setFoilColor(opt.name as any)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      foilColor === opt.name
                        ? 'border-2 border-[#243B53] bg-gray-50 text-[#243B53]'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#243B53] uppercase tracking-wider mb-1.5">
                3. Cover Title Foil Text
              </label>
              <input
                type="text"
                value={customFoilText}
                onChange={(e) => setCustomFoilText(e.target.value)}
                maxLength={45}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF6B6B] text-xs font-semibold text-[#243B53]"
              />
            </div>

            {/* Price and Specs */}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-2xl font-extrabold text-[#243B53]">$49.99</span>
                <span className="text-[11px] text-gray-500 block flex items-center gap-1">
                  <Truck className="w-3 h-3 text-emerald-600" /> Free Expedited Shipping
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                48 Archival Pages
              </span>
            </div>

            {!isOrdered ? (
              <button
                onClick={handleOrderBook}
                id="order-memory-book-btn"
                className="w-full py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-sm shadow-lg transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Customize & Order Memory Book
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-center font-bold text-xs space-y-1">
                <div>🎉 Order #MM-9824 Confirmed!</div>
                <div className="text-[11px] font-normal text-emerald-700">
                  Estimated arrival: 4–6 business days in gift box packaging.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
