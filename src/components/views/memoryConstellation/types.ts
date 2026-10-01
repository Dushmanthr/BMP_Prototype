import { MemoryType, OccasionType } from '../../../types';

export type StarSize = 'small' | 'medium' | 'large';
export type StarBrightness = 'soft' | 'bright' | 'radiant';

export interface ConstellationStar {
  id: string;
  occasionId?: string;
  title: string;
  subtitle?: string;
  contributorName: string;
  contributorRole?: string;
  contributorAvatar?: string;
  type: MemoryType;
  content: string; // Message, wish, or caption
  mediaUrl?: string;
  duration?: string; // For audio / video
  date: string;
  likesCount: number;
  x: number; // Percentage coordinate across canvas (10 - 90)
  y: number; // Percentage coordinate across canvas (10 - 90)
  size: StarSize;
  brightness: StarBrightness;
  isSpecial?: boolean; // 2-3 prominent highlight memories
  starName: string; // Celestial designation (e.g. "Alpha Memoria")
  glowColor: string; // Coral, Gold, Cyan, Violet
  connections: string[]; // Connected star IDs for constellation lines
  quote?: string;
}

export interface AmbientNebula {
  x: number; // Percentage
  y: number; // Percentage
  color: string;
  radius: number; // in px
  opacity: number;
}

export interface OccasionConstellationConfig {
  occasionType: OccasionType;
  personName: string;
  headerTitle: string;
  tagline: string;
  centerpieceTitle: string;
  centerpieceSubtitle: string;
  centerpieceQuote: string;
  accentColor: string;
  ambientNebulae: AmbientNebula[];
  stars: ConstellationStar[];
}
