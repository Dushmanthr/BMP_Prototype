import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Database,
  CheckCircle2,
  Video,
  Mic,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const StorageUpgradeView: React.FC = () => {
  const { storagePlan, upgradeStorage, setCurrentView, triggerConfetti } = useApp();

  const handleUpgrade = () => {
    upgradeStorage('PRO_50GB');
    triggerConfetti();
  };

  const isUpgraded = storagePlan.tier === 'PRO_50GB';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <button
        onClick={() => setCurrentView('creator-dashboard')}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#243B53] cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B6B]">
          Media Space & Fidelity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#243B53]">
          Storage & HD Video Upgrade
        </h1>
        <p className="text-sm text-gray-600">
          Unlock 4K cinematic video submissions, extended audio notes, and 10x storage capacity for all your celebration contributors.
        </p>
      </div>

      {/* Current Usage Meter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#243B53]/10 text-[#243B53] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#243B53]">
                Current Space Allocation
              </h3>
              <p className="text-xs text-gray-500">
                Plan: <strong>{storagePlan.tier === 'PRO_50GB' ? 'Pro 50GB Tier' : 'Standard Starter (5GB)'}</strong>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-base font-extrabold text-[#243B53]">
              {storagePlan.usedGB} GB
            </span>
            <span className="text-xs text-gray-400"> / {storagePlan.totalGB} GB</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isUpgraded ? 'bg-emerald-500' : 'bg-[#FF6B6B]'
            }`}
            style={{ width: `${(storagePlan.usedGB / storagePlan.totalGB) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>{Math.round((storagePlan.usedGB / storagePlan.totalGB) * 100)}% capacity used</span>
          <span>
            {storagePlan.totalGB - storagePlan.usedGB > 0
              ? `${(storagePlan.totalGB - storagePlan.usedGB).toFixed(1)} GB remaining`
              : 'Limit reached'}
          </span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Basic Plan */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Free Default
            </span>
            <h4 className="text-xl font-bold text-[#243B53]">Standard Space</h4>
            <div className="text-2xl font-black text-[#243B53] pt-1">$0</div>
          </div>

          <ul className="space-y-3 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>5 GB total storage</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>1080p video compression</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gray-400" />
              <span>Up to 2-minute voice recordings</span>
            </li>
          </ul>

          <div className="pt-2">
            <span className="text-xs text-gray-400 block text-center font-semibold">
              Included with every occasion
            </span>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-[#243B53] to-[#1a2d40] text-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-[#FF6B6B] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
            Recommended
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Unlimited Memories
            </span>
            <h4 className="text-xl font-bold">Pro Celebration Space</h4>
            <div className="text-2xl font-black pt-1">
              $14.99 <span className="text-xs font-normal text-gray-300">/ one-time</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-gray-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
              <span><strong>50 GB storage</strong> (10x capacity)</span>
            </li>
            <li className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#FF6B6B]" />
              <span><strong>Full 4K UHD video</strong> submissions</span>
            </li>
            <li className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-[#FF6B6B]" />
              <span><strong>Up to 10-minute</strong> audio voice stories</span>
            </li>
            <li className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF6B6B]" />
              <span>Ultra-fast accelerated video processing</span>
            </li>
          </ul>

          <div className="pt-2">
            {!isUpgraded ? (
              <button
                onClick={handleUpgrade}
                id="upgrade-storage-plan-btn"
                className="w-full py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-extrabold text-sm shadow-md transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade Space ($14.99)
              </button>
            ) : (
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-center text-xs font-bold border border-emerald-500/40">
                ✓ Pro 50GB Space Activated
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
