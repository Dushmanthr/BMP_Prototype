import React, { useState, useRef, useEffect } from 'react';
import { ConstellationStar, AmbientNebula } from './types';
import { ConstellationCenterpiece } from './ConstellationCenterpiece';
import { ConstellationStarNode } from './ConstellationStarNode';
import { constellationSoundManager } from './constellationSoundManager';

interface ConstellationSkyProps {
  stars: ConstellationStar[];
  personName: string;
  centerpieceSubtitle: string;
  centerpieceQuote?: string;
  accentColor?: string;
  ambientNebulae: AmbientNebula[];
  onSelectStar: (star: ConstellationStar) => void;
  zoomLevel: number;
  isTourActive?: boolean;
  activeTourStarId?: string | null;
}

export const ConstellationSky: React.FC<ConstellationSkyProps> = ({
  stars,
  personName,
  centerpieceSubtitle,
  centerpieceQuote,
  accentColor = '#FF6B6B',
  ambientNebulae,
  onSelectStar,
  zoomLevel,
  isTourActive = false,
  activeTourStarId = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hovered star for highlighting connection lines
  const [hoveredStarId, setHoveredStarId] = useState<string | null>(null);

  // Parallax tracking
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Pan / drag state
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });

  // Mouse parallax handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPanOffset({
        x: dragStartRef.current.initialPanX + dx,
        y: dragStartRef.current.initialPanY + dy,
      });
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx * 24, y: ny * 24 });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only initiate drag if left mouse button and not on interactive element
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panOffset.x,
      initialPanY: panOffset.y,
    };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('[role="button"]')) return;

      setIsDragging(true);
      dragStartRef.current = {
        x: t.clientX,
        y: t.clientY,
        initialPanX: panOffset.x,
        initialPanY: panOffset.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = t.clientX - dragStartRef.current.x;
      const dy = t.clientY - dragStartRef.current.y;
      setPanOffset({
        x: dragStartRef.current.initialPanX + dx,
        y: dragStartRef.current.initialPanY + dy,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleStarHover = (id: string | null) => {
    setHoveredStarId(id);
    if (id) {
      constellationSoundManager.playStarHover();
    }
  };

  // Helper map for fast star coordinate lookup
  const starsMap = new Map(stars.map((s) => [s.id, s]));

  // Build connection line segments (avoid duplicates: A-B vs B-A)
  const connectionPairs: Array<{
    id: string;
    from: ConstellationStar;
    to: ConstellationStar;
  }> = [];

  const seenConnections = new Set<string>();

  stars.forEach((star) => {
    star.connections.forEach((targetId) => {
      const target = starsMap.get(targetId);
      if (target) {
        const pairKey = [star.id, target.id].sort().join('--');
        if (!seenConnections.has(pairKey)) {
          seenConnections.add(pairKey);
          connectionPairs.push({ id: pairKey, from: star, to: target });
        }
      }
    });
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-[82vh] sm:h-[88vh] min-h-[580px] overflow-hidden bg-[#070B16] select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* LAYER 0: Deep space midnight gradient canvas background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090E1D] via-[#070A14] to-[#04060C] pointer-events-none" />

      {/* LAYER 1: Soft atmospheric cosmic nebulae */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {ambientNebulae.map((nebula, idx) => (
          <div
            key={idx}
            className="absolute rounded-full blur-[90px] transition-transform duration-1000 ease-out"
            style={{
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              width: `${nebula.radius}px`,
              height: `${nebula.radius}px`,
              background: nebula.color,
              opacity: nebula.opacity,
              transform: `translate(-50%, -50%) translate(${parallax.x * 0.4}px, ${
                parallax.y * 0.4
              }px)`,
            }}
          />
        ))}
      </div>

      {/* LAYER 2: Deterministic Twinkling Micro-Stars Field */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${parallax.x * 0.25}px, ${parallax.y * 0.25}px)`,
        }}
      >
        {Array.from({ length: 80 }).map((_, i) => {
          // Deterministic pseudorandom values based on index
          const top = ((i * 37) % 97) + 1;
          const left = ((i * 59) % 97) + 1;
          const size = (i % 3) + 1;
          const delay = (i % 5) * 0.8;
          const duration = 2 + (i % 4);
          const opacity = 0.2 + ((i % 5) * 0.15);

          return (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animation: `pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
                boxShadow: size > 2 ? '0 0 6px rgba(255,255,255,0.8)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* LAYER 3: Interactive Constellation World Canvas (Pannable & Zoomable) */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${panOffset.x + parallax.x * 0.7}px, ${
            panOffset.y + parallax.y * 0.7
          }px) scale(${zoomLevel})`,
          transformOrigin: '50% 50%',
        }}
      >
        {/* SVG Constellation Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="stardustGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Lines connecting stars */}
          {connectionPairs.map((pair) => {
            const isLineActive =
              hoveredStarId === pair.from.id ||
              hoveredStarId === pair.to.id ||
              activeTourStarId === pair.from.id ||
              activeTourStarId === pair.to.id;

            return (
              <g key={pair.id}>
                {/* Glow underlay if active */}
                {isLineActive && (
                  <line
                    x1={`${pair.from.x}%`}
                    y1={`${pair.from.y}%`}
                    x2={`${pair.to.x}%`}
                    y2={`${pair.to.y}%`}
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeOpacity="0.6"
                    filter="url(#lineGlow)"
                  />
                )}

                {/* Primary Constellation Stardust Line */}
                <line
                  x1={`${pair.from.x}%`}
                  y1={`${pair.from.y}%`}
                  x2={`${pair.to.x}%`}
                  y2={`${pair.to.y}%`}
                  stroke={isLineActive ? '#FFF' : 'rgba(255, 255, 255, 0.22)'}
                  strokeWidth={isLineActive ? 2 : 1}
                  strokeDasharray={isLineActive ? 'none' : '3 4'}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}

          {/* Delicate orbital radial guidelines to centerpiece */}
          <circle
            cx="50%"
            cy="50%"
            r="28%"
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeDasharray="4 8"
          />
          <circle
            cx="50%"
            cy="50%"
            r="42%"
            fill="none"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeDasharray="6 12"
          />
        </svg>

        {/* Centerpiece Emotional Heart */}
        <ConstellationCenterpiece
          name={personName}
          subtitle={centerpieceSubtitle}
          quote={centerpieceQuote}
          accentColor={accentColor}
          onClick={() => {
            constellationSoundManager.playConstellationSwell();
          }}
        />

        {/* Constellation Star Nodes */}
        {stars.map((star, idx) => {
          const isCurrentHovered = hoveredStarId === star.id;
          const isTourActiveCurrent = activeTourStarId === star.id;
          return (
            <ConstellationStarNode
              key={star.id}
              star={star}
              index={idx}
              isHovered={isCurrentHovered || isTourActiveCurrent}
              onHover={handleStarHover}
              onSelect={onSelectStar}
            />
          );
        })}
      </div>
    </div>
  );
};
