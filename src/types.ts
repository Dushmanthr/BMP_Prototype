export type OccasionType =
  | 'Birthday'
  | 'Anniversary'
  | 'Bride to Be'
  | 'Wedding'
  | 'Graduation'
  | 'Other';

export type MemoryType = 'photo' | 'video' | 'audio' | 'wish';

export type MemoryStatus = 'Approved' | 'Pending Review' | 'Removed';

export interface Memory {
  id: string;
  occasionId: string;
  contributorName: string;
  contributorEmail?: string;
  type: MemoryType;
  title?: string;
  content: string; // text wish or caption
  mediaUrl?: string; // photo/video/audio url
  duration?: string; // for audio/video (e.g., "0:45")
  date: string;
  status: MemoryStatus;
  isMyUpload?: boolean; // to filter for contributor's "My Contributions"
  likesCount?: number;
}

export interface Occasion {
  id: string;
  name: string;
  occasionType: OccasionType;
  celebrationPersonName: string;
  celebrationPersonPhoto?: string;
  date: string;
  formattedDate: string;
  description: string;
  coverImage: string;
  memoriesCount: number;
  contributorsCount: number;
  status: 'Collecting Memories' | 'Reviewing' | 'Finalized';
  isFinalized: boolean;
}

export interface DigitalKeepsakeTemplate {
  id: string;
  name: string;
  category: 'Classic' | 'Modern' | 'Minimal' | 'Celebration';
  description: string;
  price: number;
  previewImage: string;
  accent: string;
  pages: number;
}

export interface PhysicalProduct {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  image: string;
  deliveryDays: string;
  specs: string[];
}

export interface StoragePlan {
  id: string;
  name: string;
  capacity: string;
  capacityGb: number;
  price: string;
  priceMonthly: number;
  features: string[];
  isPopular?: boolean;
}

export interface DigitalStoreProduct {
  id: string;
  name: string;
  category: 'Invitations' | 'Birthday Cards' | 'Celebration Templates' | 'Memory Templates' | 'Printable Designs';
  price: number;
  previewImage: string;
  downloadsCount: number;
  rating: number;
  description: string;
}

export interface GiftRecommendation {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  whySuitsThem: string;
  image: string;
}

export interface FriendDetailNote {
  id: string;
  friendName: string;
  noteType: 'secret-wish' | 'already-owns' | 'preference' | 'size-brand';
  content: string;
  date: string;
}

export interface FriendGiftResponse {
  id: string;
  friendName: string;
  suggestion: string;
  category: string;
  date: string;
  priceEstimate?: string;
  link?: string;
  votes?: number;
  likedBy?: string[];
}

export interface GiftFinderData {
  personName: string;
  age: string;
  ageRange?: string;
  relationship: string;
  occasionType: string;
  interests: string[];
  personality: string[];
  hobbies?: string[];
  favoriteActivities?: string;
  thingsTheyUse?: string;
  thingsTheyOwn?: string;
  budget: string;
  friendResponses: FriendGiftResponse[];
  friendDetails?: FriendDetailNote[];
  spaceCreated?: boolean;
  spaceShareId?: string;
}



export interface SongGenerationData {
  personName: string;
  relationship: string;
  occasion: string;
  specialMemories: string;
  message: string;
  musicStyle: string;
  audioGenerated?: boolean;
  songTitle?: string;
  lyrics?: string[];
  duration?: string;
}

export interface GiftItem {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  matchReason: string;
  imageUrl: string;
  externalUrl?: string;
}

export type AppView =
  | 'landing'
  | 'auth'
  | 'sign-in'
  | 'sign-up'
  | 'creator-dashboard'
  | 'create-occasion'
  | 'occasion-space'
  | 'invite-contributors'
  | 'contributor-consent'
  | 'contributor-upload'
  | 'contributor-my-memories'
  | 'creator-review'
  | 'finalize-celebration'
  | 'celebration-page'
  | 'digital-keepsake'
  | 'physical-keepsake'
  | 'storage'
  | 'storage-upgrade'
  | 'gift-finder'

  | 'digital-store'
  | 'ai-birthday-song';

