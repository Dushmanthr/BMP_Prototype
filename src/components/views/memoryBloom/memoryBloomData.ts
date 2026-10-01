import { OccasionType } from '../../../types';
import { BloomPetalData, OccasionBloomConfig } from './types';

export const BLOOM_MEMORIES_BASE: BloomPetalData[] = [
  // -------------------------------------------------------------
  // OUTER LAYER (5 Petals) - Wider spread, soft framing
  // -------------------------------------------------------------
  {
    id: 'petal-1',
    memoryNumber: 1,
    title: 'The Beginning',
    contributorName: 'Emma Watson',
    contributorRole: 'Lifelong Friend',
    contributorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    type: 'photo',
    content: 'Do you remember that brisk September afternoon when we met by the old campus fountain? Neither of us knew that an accidental conversation about coffee would turn into ten years of unbreakable sisterhood.',
    mediaUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    date: 'September 14, 2017',
    isSpecial: true,
    specialNote: 'First Chapter of Our Story',
    layer: 'outer',
    angleDeg: 345, // Top-right outer
    distanceRadius: 180,
    scale: 1.12,
    rotationDeg: -6,
    shapeType: 'sculpted-curve',
    gradientId: 'petal-grad-special-gold',
    baseColor: '#FFF1F2',
    tipColor: '#FFE4E6',
    accentColor: '#FF6B6B',
    veinOpacity: 0.28,
  },
  {
    id: 'petal-2',
    memoryNumber: 2,
    title: 'Our First Beautiful Moment',
    contributorName: 'Julian Croft',
    contributorRole: 'Brother',
    contributorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    type: 'photo',
    content: 'Watching the sunrise over Lake Como with sleepy eyes and lukewarm espresso in ceramic mugs. You whispered that moments like this make the whole noisy world stop spinning.',
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    date: 'June 4, 2019',
    layer: 'outer',
    angleDeg: 55, // Upper right
    distanceRadius: 185,
    scale: 1.04,
    rotationDeg: 8,
    shapeType: 'radiant-oval',
    gradientId: 'petal-grad-rose-blush',
    baseColor: '#FFF5F5',
    tipColor: '#FED7D7',
    accentColor: '#FF6B6B',
    veinOpacity: 0.2,
  },
  {
    id: 'petal-3',
    memoryNumber: 3,
    title: 'That Special Day',
    contributorName: 'Sophia Lin',
    contributorRole: 'College Roommate',
    contributorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    type: 'video',
    content: 'We pulled off the grand surprise picnic on the hill! Look at your face when you turned around and realized everyone flew in from across three time zones just to hold your hand.',
    mediaUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    date: 'August 19, 2021',
    layer: 'outer',
    angleDeg: 125, // Lower right
    distanceRadius: 175,
    scale: 1.02,
    rotationDeg: -5,
    shapeType: 'delicate-crest',
    gradientId: 'petal-grad-warm-peach',
    baseColor: '#FFF7ED',
    tipColor: '#FFEDD5',
    accentColor: '#FB923C',
    veinOpacity: 0.22,
  },
  {
    id: 'petal-4',
    memoryNumber: 4,
    title: 'Endless Laughter',
    contributorName: 'Marcus & Liam',
    contributorRole: 'Adventure Crew',
    contributorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    type: 'audio',
    content: 'The recording from our midnight camping disaster in Big Sur when our tent collapsed in the sudden drizzle and we ended up eating marshmallows in the backseat laughing until 4 AM.',
    mediaUrl: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80',
    audioDuration: '0:54',
    date: 'October 12, 2022',
    layer: 'outer',
    angleDeg: 195, // Lower left
    distanceRadius: 182,
    scale: 1.05,
    rotationDeg: 10,
    shapeType: 'sculpted-curve',
    gradientId: 'petal-grad-soft-lavender',
    baseColor: '#FAF5FF',
    tipColor: '#F3E8FF',
    accentColor: '#A855F7',
    veinOpacity: 0.18,
  },
  {
    id: 'petal-5',
    memoryNumber: 5,
    title: 'A Little Surprise',
    contributorName: 'Aunt Clara',
    contributorRole: 'Family',
    contributorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    type: 'wish',
    content: 'Dearest, watching you grow into such a generous, radiant human being has been one of the quiet miracles of my life. Never lose that bright curiosity you’ve held since you were five.',
    mediaUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    date: 'December 24, 2022',
    layer: 'outer',
    angleDeg: 265, // Middle left
    distanceRadius: 178,
    scale: 1.06,
    rotationDeg: -8,
    shapeType: 'heirloom-rose',
    gradientId: 'petal-grad-coral-glow',
    baseColor: '#FFF1F2',
    tipColor: '#FFE4E6',
    accentColor: '#FF6B6B',
    veinOpacity: 0.24,
  },

  // -------------------------------------------------------------
  // MIDDLE LAYER (4 Petals) - Intermediate depth, luminous warmth
  // -------------------------------------------------------------
  {
    id: 'petal-6',
    memoryNumber: 6,
    title: 'Together Again',
    contributorName: 'Elena Rostova',
    contributorRole: 'Cousin',
    contributorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    type: 'photo',
    content: 'After three long years apart across oceans, running through terminal 4 and dropping our luggage to embrace. True family never skips a beat.',
    mediaUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    date: 'March 18, 2023',
    layer: 'middle',
    angleDeg: 25, // Upper-right middle
    distanceRadius: 130,
    scale: 0.98,
    rotationDeg: 4,
    shapeType: 'soft-taper',
    gradientId: 'petal-grad-rose-blush',
    baseColor: '#FFF5F5',
    tipColor: '#FED7D7',
    accentColor: '#FF6B6B',
    veinOpacity: 0.2,
  },
  {
    id: 'petal-7',
    memoryNumber: 7,
    title: 'One to Remember',
    contributorName: 'Daniel Vance',
    contributorRole: 'Bandmate',
    contributorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    type: 'audio',
    content: 'The acoustic demo we recorded on a vintage tape deck in the garage while rain drummed on the tin roof. Listen closely and you can hear your laughter right before the guitar solo.',
    mediaUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    audioDuration: '0:48',
    date: 'July 9, 2023',
    layer: 'middle',
    angleDeg: 110, // Lower-right middle
    distanceRadius: 132,
    scale: 0.96,
    rotationDeg: -6,
    shapeType: 'radiant-oval',
    gradientId: 'petal-grad-warm-peach',
    baseColor: '#FFF7ED',
    tipColor: '#FFEDD5',
    accentColor: '#F97316',
    veinOpacity: 0.22,
  },
  {
    id: 'petal-8',
    memoryNumber: 8,
    title: 'The Celebration',
    contributorName: 'Maya & David',
    contributorRole: 'Best Friends',
    contributorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    type: 'photo',
    content: 'The rooftop party under a sky lit with sparklers and fairy lights. Every single person raised a glass to you, singing at the top of their lungs because you make every room feel warmer.',
    mediaUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    date: 'November 22, 2023',
    isSpecial: true,
    specialNote: 'A Golden Milestone',
    layer: 'middle',
    angleDeg: 215, // Lower-left middle
    distanceRadius: 135,
    scale: 1.1,
    rotationDeg: 7,
    shapeType: 'sculpted-curve',
    gradientId: 'petal-grad-special-gold',
    baseColor: '#FFFBEB',
    tipColor: '#FEF3C7',
    accentColor: '#F59E0B',
    veinOpacity: 0.26,
  },
  {
    id: 'petal-9',
    memoryNumber: 9,
    title: 'A Quiet Moment',
    contributorName: 'Claire Bennet',
    contributorRole: 'Mentor',
    contributorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    type: 'wish',
    content: 'Among all the loud milestones, it is the quiet afternoon tea talks on your porch that stay with me. You listen with your whole heart, and that is your superpower.',
    mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    date: 'January 15, 2024',
    layer: 'middle',
    angleDeg: 300, // Upper-left middle
    distanceRadius: 128,
    scale: 0.95,
    rotationDeg: -4,
    shapeType: 'heirloom-rose',
    gradientId: 'petal-grad-coral-glow',
    baseColor: '#FFF1F2',
    tipColor: '#FFE4E6',
    accentColor: '#FF6B6B',
    veinOpacity: 0.2,
  },

  // -------------------------------------------------------------
  // INNER LAYER (3 Petals) - Tender, close to the central heart
  // -------------------------------------------------------------
  {
    id: 'petal-10',
    memoryNumber: 10,
    title: 'Something We Will Never Forget',
    contributorName: 'Hannah Lee',
    contributorRole: 'Soulmate',
    contributorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    type: 'video',
    content: 'The midnight boat ride through the bioluminescent bay. The water glowed with electric cyan sparkles whenever our fingers touched the waves, just like pure magic.',
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    date: 'May 3, 2024',
    layer: 'inner',
    angleDeg: 70, // Upper-right inner
    distanceRadius: 78,
    scale: 0.92,
    rotationDeg: 3,
    shapeType: 'delicate-crest',
    gradientId: 'petal-grad-soft-lavender',
    baseColor: '#FAF5FF',
    tipColor: '#F3E8FF',
    accentColor: '#A855F7',
    veinOpacity: 0.22,
  },
  {
    id: 'petal-11',
    memoryNumber: 11,
    title: 'With Love',
    contributorName: 'Oliver Jenkins',
    contributorRole: 'Father',
    contributorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    type: 'wish',
    content: 'No matter how far you travel or what new chapters unfold, our home will always be your anchor. We are endlessly proud of who you are.',
    mediaUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
    date: 'August 12, 2024',
    layer: 'inner',
    angleDeg: 190, // Lower inner
    distanceRadius: 75,
    scale: 0.9,
    rotationDeg: -5,
    shapeType: 'soft-taper',
    gradientId: 'petal-grad-rose-blush',
    baseColor: '#FFF5F5',
    tipColor: '#FED7D7',
    accentColor: '#FF6B6B',
    veinOpacity: 0.25,
  },
  {
    id: 'petal-12',
    memoryNumber: 12,
    title: 'The Story Continues',
    contributorName: 'All of Us Together',
    contributorRole: 'Everyone Who Loves You',
    contributorAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80',
    type: 'photo',
    content: 'Twelve petals gathered here today, but this is only the garden of what has been. Countless more memories are waiting to bloom in the years ahead.',
    mediaUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    date: 'Today & Forever',
    layer: 'inner',
    angleDeg: 310, // Upper-left inner
    distanceRadius: 76,
    scale: 0.94,
    rotationDeg: 6,
    shapeType: 'sculpted-curve',
    gradientId: 'petal-grad-coral-glow',
    baseColor: '#FFF1F2',
    tipColor: '#FFE4E6',
    accentColor: '#FF6B6B',
    veinOpacity: 0.26,
  },
];

export function getBloomConfig(
  occasionType: OccasionType = 'Birthday',
  personName: string = 'Sarah Jenkins'
): OccasionBloomConfig {
  switch (occasionType) {
    case 'Anniversary':
      return {
        occasionType: 'Anniversary',
        personName,
        occasionTitle: 'Our Story in Bloom',
        subtitle: 'Every moment helped us bloom together.',
        centerSubtitle: '30 Golden Years',
        finalStoryMessage: 'Thirty years of love, devotion, and countless shared smiles.',
        finalStoryQuote: '“Grow old along with me; the best is yet to be.”',
        accentColor: '#FF6B6B',
        memories: BLOOM_MEMORIES_BASE.map((m) => {
          if (m.memoryNumber === 1) {
            return {
              ...m,
              title: 'Our First Dance',
              content: 'That autumn evening when time stood still. The song played softly and everyone else melted into shadows.',
            };
          }
          if (m.memoryNumber === 8) {
            return {
              ...m,
              title: 'The Silver Milestone',
              content: 'Surrounded by our children, grandchildren, and lifetime friends renewing our vows.',
            };
          }
          return m;
        }),
      };

    case 'Wedding':
      return {
        occasionType: 'Wedding',
        personName,
        occasionTitle: 'Our New Beginning',
        subtitle: 'Every memory brought us to this beautiful moment.',
        centerSubtitle: 'Joined in Love',
        finalStoryMessage: 'Two lives woven into one extraordinary lifelong tapestry.',
        finalStoryQuote: '“Whatever our souls are made of, his and mine are the same.”',
        accentColor: '#FF6B6B',
        memories: BLOOM_MEMORIES_BASE.map((m) => {
          if (m.memoryNumber === 1) {
            return {
              ...m,
              title: 'When Our Paths Crossed',
              content: 'A chance meeting that was meant to be from the very beginning.',
            };
          }
          return m;
        }),
      };

    case 'Bride to Be':
      return {
        occasionType: 'Bride to Be',
        personName,
        occasionTitle: "Clara's Radiant Bloom",
        subtitle: 'Cherished memories unfolding into tomorrow’s forever.',
        centerSubtitle: 'Bride to Be',
        finalStoryMessage: 'To the bride who brightens every room she enters.',
        finalStoryQuote: '“May your love bloom brighter with each passing season.”',
        accentColor: '#FF6B6B',
        memories: BLOOM_MEMORIES_BASE,
      };

    case 'Graduation':
      return {
        occasionType: 'Graduation',
        personName,
        occasionTitle: 'A Journey Worth Remembering',
        subtitle: 'Every milestone became part of your story.',
        centerSubtitle: 'Class of 2026',
        finalStoryMessage: 'The culmination of hard work, grit, ambition, and endless friendship.',
        finalStoryQuote: '“Go confidently in the direction of your dreams.”',
        accentColor: '#FF6B6B',
        memories: BLOOM_MEMORIES_BASE.map((m) => {
          if (m.memoryNumber === 1) {
            return {
              ...m,
              title: 'First Step on Campus',
              content: 'Excited, slightly nervous, and carrying big dreams into that lecture hall.',
            };
          }
          return m;
        }),
      };

    case 'Birthday':
    default:
      return {
        occasionType: 'Birthday',
        personName,
        occasionTitle: `${personName.split(' ')[0]}'s Bloom`,
        subtitle: 'Every memory adds a new petal to her story.',
        centerSubtitle: '25th Birthday',
        finalStoryMessage: 'Twenty-five years of warmth, laughter, and irreplaceable moments.',
        finalStoryQuote: '“Every memory adds a new petal to our story.”',
        accentColor: '#FF6B6B',
        memories: BLOOM_MEMORIES_BASE,
      };
  }
}
