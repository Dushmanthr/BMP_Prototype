import React from 'react';
import { BloomPetalData, BloomStage } from './types';
import { BloomPetal } from './BloomPetal';
import { BloomCenter } from './BloomCenter';

interface BloomSceneProps {
  memories: BloomPetalData[];
  stage: BloomStage;
  personName: string;
  centerSubtitle: string;
  exploredIds: string[];
  activeMemoryId: string | null;
  onSelectPetal: (petal: BloomPetalData) => void;
  onCenterClick: () => void;
}

export const BloomScene: React.FC<BloomSceneProps> = ({
  memories,
  stage,
  personName,
  centerSubtitle,
  exploredIds,
  activeMemoryId,
  onSelectPetal,
  onCenterClick,
}) => {
  const centerPos = { x: 400, y: 400 };

  // Sort petals by layer so outer petals render behind middle and inner petals
  const outerPetals = memories.filter((m) => m.layer === 'outer');
  const middlePetals = memories.filter((m) => m.layer === 'middle');
  const innerPetals = memories.filter((m) => m.layer === 'inner');

  return (
    <div className="relative w-full max-w-[640px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Ambient background glow behind the flower */}
      <div 
        className="absolute inset-4 rounded-full pointer-events-none transition-all duration-1000 blur-3xl opacity-60"
        style={{
          background: stage === 'fully-bloomed'
            ? 'radial-gradient(circle, rgba(255, 182, 193, 0.45) 0%, rgba(255, 237, 213, 0.3) 50%, transparent 75%)'
            : stage === 'closed'
            ? 'radial-gradient(circle, rgba(255, 228, 230, 0.35) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(255, 209, 220, 0.4) 0%, rgba(254, 243, 199, 0.2) 55%, transparent 75%)',
        }}
      />

      {/* Main SVG Flower Composition */}
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full relative z-10 overflow-visible transition-transform duration-1000 ease-out"
        style={{
          filter: 'drop-shadow(0 20px 35px rgba(225, 29, 72, 0.08))',
        }}
      >
        <defs>
          {/* Soft blur filter for petal shadows */}
          <filter id="petal-soft-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>

          {/* Center drop shadow */}
          <filter id="center-drop-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="0" dy="4" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.18" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Center Ambient Glow */}
          <radialGradient id="center-ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FECDD3" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FFE4E6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* Center Velvet Core Gradient */}
          <radialGradient id="center-velvet-grad" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFF1F2" />
            <stop offset="85%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#FECDD3" />
          </radialGradient>

          {/* Gradient: Special Gold Sheen (Memories #1 & #8) */}
          <linearGradient id="petal-grad-special-gold" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.92" />
            <stop offset="85%" stopColor="#FDE68A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
          </linearGradient>

          {/* Gradient: Rose Blush */}
          <linearGradient id="petal-grad-rose-blush" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#FFF1F2" stopOpacity="0.92" />
            <stop offset="80%" stopColor="#FFE4E6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0.85" />
          </linearGradient>

          {/* Gradient: Warm Peach */}
          <linearGradient id="petal-grad-warm-peach" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFF7ED" stopOpacity="0.92" />
            <stop offset="80%" stopColor="#FFEDD5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.82" />
          </linearGradient>

          {/* Gradient: Soft Lavender */}
          <linearGradient id="petal-grad-soft-lavender" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FAF5FF" stopOpacity="0.92" />
            <stop offset="80%" stopColor="#F3E8FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D8B4FE" stopOpacity="0.82" />
          </linearGradient>

          {/* Gradient: Coral Glow (Platform Accent #FF6B6B) */}
          <linearGradient id="petal-grad-coral-glow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FFF1F2" stopOpacity="0.92" />
            <stop offset="80%" stopColor="#FECDD3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.82" />
          </linearGradient>
        </defs>

        {/* Floating / Breathing flower group with smooth continuous rhythm */}
        <g className="animate-bloom-breathe origin-center">
          {/* Layer 1: Outer Petals (5 petals, back layer) */}
          <g id="outer-petals-layer">
            {outerPetals.map((petal) => (
              <BloomPetal
                key={petal.id}
                petal={petal}
                stage={stage}
                isExplored={exploredIds.includes(petal.id)}
                isSelected={activeMemoryId === petal.id}
                isDimmed={activeMemoryId !== null && activeMemoryId !== petal.id}
                onSelect={onSelectPetal}
                centerPos={centerPos}
              />
            ))}
          </g>

          {/* Layer 2: Middle Petals (4 petals, intermediate layer) */}
          <g id="middle-petals-layer">
            {middlePetals.map((petal) => (
              <BloomPetal
                key={petal.id}
                petal={petal}
                stage={stage}
                isExplored={exploredIds.includes(petal.id)}
                isSelected={activeMemoryId === petal.id}
                isDimmed={activeMemoryId !== null && activeMemoryId !== petal.id}
                onSelect={onSelectPetal}
                centerPos={centerPos}
              />
            ))}
          </g>

          {/* Layer 3: Inner Petals (3 petals, tender inner ring) */}
          <g id="inner-petals-layer">
            {innerPetals.map((petal) => (
              <BloomPetal
                key={petal.id}
                petal={petal}
                stage={stage}
                isExplored={exploredIds.includes(petal.id)}
                isSelected={activeMemoryId === petal.id}
                isDimmed={activeMemoryId !== null && activeMemoryId !== petal.id}
                onSelect={onSelectPetal}
                centerPos={centerPos}
              />
            ))}
          </g>

          {/* Center Heart / Pistil Core */}
          <BloomCenter
            personName={personName}
            centerSubtitle={centerSubtitle}
            stage={stage}
            totalMemories={memories.length}
            exploredCount={exploredIds.length}
            onCenterClick={onCenterClick}
            centerPos={centerPos}
          />
        </g>
      </svg>
    </div>
  );
};
