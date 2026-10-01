import { MemoryType, OccasionType } from '../../../types';

export type FlowerType =
  | 'rose'
  | 'peony'
  | 'hydrangea'
  | 'sunflower'
  | 'daisy'
  | 'lavender'
  | 'tulip'
  | 'cherry-blossom'
  | 'camellia'
  | 'calla-lily';

export type FlowerBloomState = 'bud' | 'blooming' | 'full-bloom';
export type FlowerSize = 'small' | 'medium' | 'large';
export type GardenZone = 'beginning' | 'moments' | 'celebration';

export interface GardenMemory {
  id: string;
  occasionId?: string;
  title: string;
  contributorName: string;
  contributorRole?: string;
  contributorAvatar?: string;
  type: MemoryType;
  content: string; // Emotional message, wish, or quote
  mediaUrl?: string; // Photo / video preview
  audioUrl?: string; // Optional audio file URL
  duration?: string; // For audio / video
  date: string;
  likesCount: number;

  // Botanical & Garden attributes
  flowerType: FlowerType;
  flowerVarietyName: string; // e.g. "Heirloom English Rose", "Blush Petal Peony"
  bloomState: FlowerBloomState;
  flowerSize: FlowerSize;
  isHighlight?: boolean; // Highlight memories with larger flower and gentle warm glow
  petalColor: string; // Hex or gradient CSS
  centerColor: string;
  leafColor?: string;
  stemHeight?: number; // relative height in px
  rotation?: number; // subtle natural tilt in degrees (-12 to +12)

  // Spatial coordinates along garden canvas
  zone: GardenZone;
  x: number; // percentage (18% to 82%) across width
  y: number; // absolute vertical position (px) along path
}

export interface GardenZoneInfo {
  id: GardenZone;
  name: string;
  tagline: string;
  botanicalDescription: string;
  accentColor: string;
}

export interface GardenCenterpiece {
  title: string;
  subtitle: string;
  emotionalQuote: string;
  memorialPlaque: string;
}

export interface OccasionGardenConfig {
  occasionType: OccasionType;
  personName: string;
  headerTitle: string;
  tagline: string;
  accentColor: string;
  centerpiece: GardenCenterpiece;
  finalMessage: string;
  finalQuote: string;
  memories: GardenMemory[];
}
