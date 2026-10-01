import React, { useRef, useState } from 'react';
import { GardenMemory, GardenCenterpiece } from './types';
import { GardenPathLandscape } from './GardenPathLandscape';
import { GardenFlowerNode } from './GardenFlowerNode';

interface GardenCanvasProps {
  memories: GardenMemory[];
  centerpiece: GardenCenterpiece;
  finalMessage: string;
  finalQuote: string;
  onSelectMemory: (memory: GardenMemory) => void;
  discoveredMemoryIds: string[];
  onExploreAgain: () => void;
  onViewAllMemories: () => void;
  accentColor: string;
}

export const GardenCanvas: React.FC<GardenCanvasProps> = ({
  memories,
  centerpiece,
  finalMessage,
  finalQuote,
  onSelectMemory,
  discoveredMemoryIds,
  onExploreAgain,
  onViewAllMemories,
  accentColor,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas total height in pixels along the winding garden path
  const CANVAS_HEIGHT = 2800;

  // Gentle desktop mouse parallax for environmental depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return; // Only on desktop
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({ x: x * 14, y: y * 14 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-5xl mx-auto overflow-hidden select-none"
      style={{ minHeight: `${CANVAS_HEIGHT}px` }}
    >
      {/* ----------------------------------------------------
          ENVIRONMENTAL BACKGROUND LANDSCAPE & PATH
      ---------------------------------------------------- */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${parallaxOffset.x * 0.4}px, ${parallaxOffset.y * 0.4}px)`,
        }}
      >
        <GardenPathLandscape
          canvasHeight={CANVAS_HEIGHT}
          centerpiece={centerpiece}
          finalMessage={finalMessage}
          finalQuote={finalQuote}
          onExploreAgain={onExploreAgain}
          onViewAllMemories={onViewAllMemories}
          accentColor={accentColor}
        />
      </div>

      {/* ----------------------------------------------------
          BOTANICAL MEMORY FLOWERS LAYER
      ---------------------------------------------------- */}
      <div className="relative w-full" style={{ height: `${CANVAS_HEIGHT}px` }}>
        {memories.map((memory) => {
          const isDiscovered = discoveredMemoryIds.includes(memory.id);

          return (
            <GardenFlowerNode
              key={memory.id}
              memory={memory}
              onSelect={onSelectMemory}
              isDiscovered={isDiscovered}
            />
          );
        })}
      </div>
    </div>
  );
};
