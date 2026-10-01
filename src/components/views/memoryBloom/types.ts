import { MemoryType, OccasionType } from '../../../types';

export type BloomStage = 'closed' | 'unfolding' | 'partially-open' | 'fully-bloomed';

export type PetalLayer = 'outer' | 'middle' | 'inner';

export type PetalShapeType = 
  | 'sculpted-curve' 
  | 'heirloom-rose' 
  | 'radiant-oval' 
  | 'soft-taper' 
  | 'delicate-crest';

export interface BloomPetalData {
  id: string;
  memoryNumber: number; // 1 to 12
  title: string;
  contributorName: string;
  contributorRole?: string;
  contributorAvatar?: string;
  type: MemoryType; // 'photo' | 'video' | 'audio' | 'wish'
  content: string; // The memory story / heartfelt message
  mediaUrl?: string; // High-res photo or video poster
  audioDuration?: string; // e.g. "0:45"
  date: string;
  isSpecial?: boolean; // Visually significant petal (Memory #1 & #8)
  specialNote?: string;

  // Spatial & visual petal layout attributes
  layer: PetalLayer;
  angleDeg: number; // Base angle (0-360) around center
  distanceRadius: number; // Offset radius from center in px
  scale: number; // Scale variation (0.92 to 1.15)
  rotationDeg: number; // Subtle natural tilt
  shapeType: PetalShapeType;

  // Organic artistic coloring
  gradientId: string;
  baseColor: string;
  tipColor: string;
  accentColor: string;
  veinOpacity: number;
}

export interface OccasionBloomConfig {
  occasionType: OccasionType;
  personName: string;
  occasionTitle: string;
  subtitle: string;
  centerSubtitle: string;
  finalStoryMessage: string;
  finalStoryQuote: string;
  accentColor: string;
  memories: BloomPetalData[];
}
