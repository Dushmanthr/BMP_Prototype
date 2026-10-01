import { MemoryType, OccasionType } from '../../../types';

export type MemoryStyleVariant =
  | 'polaroid'          // Polaroid frame with washi tape, handwriting caption
  | 'circular-landmark' // Circular gold medal with botanical wreath/flourish
  | 'floating-glass'    // Modern frosted glassmorphism card with elevation
  | 'memory-bubble'     // Iridescent glowing orb with floating particle aura
  | 'gilded-frame'      // Archival gold picture frame with filigree corners
  | 'scenic-milestone'; // Wooden/brass milestone marker with compass icon

export interface JourneyMemory {
  id: string;
  occasionId?: string;
  title: string;
  contributorName: string;
  contributorRole?: string;
  contributorAvatar?: string;
  type: MemoryType;
  content: string;
  mediaUrl?: string;
  duration?: string;
  date: string;
  likesCount: number;
  styleVariant: MemoryStyleVariant;
  side: 'left' | 'right';
  roadProgress: number; // 0 to 100 percentage down the road
  xOffsetPercent: number; // organic offset from road centerline (-12% to +12%)
  chapter: 1 | 2 | 3 | 4;
  discovered?: boolean;
  locationTag?: string;
  accentQuote?: string;
}

export interface JourneyChapter {
  id: number;
  title: string;
  subtitle: string;
  roadProgress: number; // Where along the road (0-100) this chapter banner appears
  icon: string;
}

export interface OccasionThemeConfig {
  occasionType: OccasionType;
  personName: string;
  title: string;
  subtitle: string;
  instruction: string;
  destinationTitle: string;
  destinationQuote: string;
  startArchLabel: string;
  accentColor: string;
  ambientGradient: string;
  roadPalette: {
    surface: string;
    border: string;
    centerDash: string;
    curbGlow: string;
  };
  hillsPalette: {
    back: string;
    mid: string;
    front: string;
  };
}
