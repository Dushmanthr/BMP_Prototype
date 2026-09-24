import { MemoryType } from '../../../types';

export type BookPageLayout =
  | 'cover'
  | 'dedication'
  | 'full-photo' // Layout A
  | 'photo-letter' // Layout B
  | 'collage' // Layout C
  | 'memory-letter' // Layout D
  | 'polaroid' // Layout E
  | 'cinematic-moment' // Layout F
  | 'audio-memory' // Layout Audio
  | 'video-memory' // Layout Video
  | 'epilogue' // Concluding Page
  | 'back-cover'; // Back Cover

export interface BookPageData {
  id: string;
  pageNumber: number;
  layout: BookPageLayout;
  title?: string;
  contributor?: string;
  contributorEmail?: string;
  date?: string;
  content?: string;
  mediaUrl?: string;
  secondaryMediaUrl?: string;
  mediaType?: MemoryType;
  duration?: string;
  likesCount?: number;
  // Metadata for dedication / cover / epilogue
  occasionName?: string;
  celebrationPersonName?: string;
  coverImage?: string;
  formattedDate?: string;
  description?: string;
  totalMemoriesCount?: number;
}

export interface BookSpread {
  spreadIndex: number;
  leftPage: BookPageData | null;
  rightPage: BookPageData | null;
}

export interface LightboxMedia {
  url: string;
  type: 'image' | 'video';
  title?: string;
  contributor?: string;
  date?: string;
  caption?: string;
}
