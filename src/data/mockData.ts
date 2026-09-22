import {
  Occasion,
  Memory,
  DigitalKeepsakeTemplate,
  PhysicalProduct,
  StoragePlan,
  DigitalStoreProduct,
  GiftRecommendation,
  FriendGiftResponse,
} from '../types';

export const INITIAL_OCCASIONS: Occasion[] = [
  {
    id: 'occ-sarah-25',
    name: "Sarah's 25th Birthday",
    occasionType: 'Birthday',
    celebrationPersonName: 'Sarah Jenkins',
    celebrationPersonPhoto:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    date: '2027-06-25',
    formattedDate: '25 June 2027',
    description:
      'A surprise digital celebration space gathering heartfelt photos, voice recordings, and memories from Sarah’s closest friends and family across the world.',
    coverImage:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    memoriesCount: 24,
    contributorsCount: 12,
    status: 'Collecting Memories',
    isFinalized: false,
  },
  {
    id: 'occ-clara-bride',
    name: "Clara's Bride to Be Celebration",
    occasionType: 'Bride to Be',
    celebrationPersonName: 'Clara Hughes',
    celebrationPersonPhoto:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    date: '2027-08-14',
    formattedDate: '14 August 2027',
    description:
      'Collecting bridal shower messages, secret marriage advice, and cherished throwback memories for Clara before the big day.',
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    memoriesCount: 18,
    contributorsCount: 9,
    status: 'Collecting Memories',
    isFinalized: false,
  },
  {
    id: 'occ-parents-anniversary',
    name: "Mom & Dad's 30th Anniversary",
    occasionType: 'Anniversary',
    celebrationPersonName: 'Elena & Marcus',
    celebrationPersonPhoto:
      'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80',
    date: '2027-09-30',
    formattedDate: '30 September 2027',
    description:
      'Three decades of love, travel, laughter, and family. A golden milestone celebration.',
    coverImage:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    memoriesCount: 32,
    contributorsCount: 16,
    status: 'Collecting Memories',
    isFinalized: false,
  },
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    occasionId: 'occ-sarah-25',
    contributorName: 'Emma Watson',
    contributorEmail: 'emma.w@example.com',
    type: 'photo',
    title: 'Our Sunrise Hike in Amalfi',
    content:
      'Remember waking up at 5am just to catch the golden light over the cliffs? You were complaining the entire way up, but the second the sun broke through, your smile lit up the whole coast. Happy 25th birthday, my soul sister! ❤️',
    mediaUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    date: 'Yesterday, 4:15 PM',
    status: 'Approved',
    likesCount: 9,
  },
  {
    id: 'mem-2',
    occasionId: 'occ-sarah-25',
    contributorName: 'Daniel Vance',
    contributorEmail: 'daniel.v@example.com',
    type: 'audio',
    title: 'A Little Song & Big Birthday Wishes',
    content:
      'Recorded this from the studio! Sarah, you have been my rock through college and beyond. Hit play for a 45-second acoustic birthday serenade and a whole lot of love.',
    duration: '0:48',
    date: 'Yesterday, 6:30 PM',
    status: 'Approved',
    likesCount: 14,
  },
  {
    id: 'mem-3',
    occasionId: 'occ-sarah-25',
    contributorName: 'Michael Chen',
    contributorEmail: 'michael.c@example.com',
    type: 'wish',
    title: 'To 25 Years of Pure Grace',
    content:
      'Sarah, you make everyone around you feel seen, valued, and loved. Wishing you a year ahead filled with bold creative projects, slow Sunday mornings, and all the warm matcha lattes you could ever dream of.',
    date: '2 days ago',
    status: 'Approved',
    likesCount: 7,
  },
  {
    id: 'mem-4',
    occasionId: 'occ-sarah-25',
    contributorName: 'Sophie & Liam',
    contributorEmail: 'sophie.l@example.com',
    type: 'photo',
    title: 'College Graduation Rooftop Night',
    content:
      'Found this candid from graduation night! Look how proud you looked holding that degree. We are so lucky to walk through life by your side.',
    mediaUrl:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    date: '3 days ago',
    status: 'Approved',
    likesCount: 11,
  },
  {
    id: 'mem-5',
    occasionId: 'occ-sarah-25',
    contributorName: 'Grandma Rose',
    contributorEmail: 'rose.j@example.com',
    type: 'audio',
    title: 'Blessings From Grandma',
    content:
      'My dearest Sarah, watching you grow into this wonderful, compassionate young woman has been one of the sweetest blessings of my life. May God bless your 25th year with peace and joy.',
    duration: '1:15',
    date: '3 days ago',
    status: 'Approved',
    likesCount: 22,
  },
  {
    id: 'mem-6',
    occasionId: 'occ-sarah-25',
    contributorName: 'Lucas Grey',
    contributorEmail: 'lucas.g@example.com',
    type: 'video',
    title: 'Surprise Video Message From Kyoto',
    content:
      'Sending love all the way from Japan! Couldn’t be there in person for your birthday dinner, but I walked through the bamboo grove sending good vibes your way. Watch till the end for the funny blooper!',
    mediaUrl:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    duration: '1:42',
    date: '4 days ago',
    status: 'Approved',
    likesCount: 16,
  },
  {
    id: 'mem-7',
    occasionId: 'occ-sarah-25',
    contributorName: 'Chloe Taylor',
    contributorEmail: 'chloe.t@example.com',
    type: 'photo',
    title: 'Road Trip to Big Sur',
    content:
      'Windows down, 90s indie music blasting, and singing every lyric at the top of our lungs. The happiest memories are made with you.',
    mediaUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    date: '5 days ago',
    status: 'Pending Review',
    likesCount: 4,
  },
  {
    id: 'mem-8',
    occasionId: 'occ-sarah-25',
    contributorName: 'Aiden Brooks',
    contributorEmail: 'aiden.b@example.com',
    type: 'wish',
    title: 'Happy Quarter Century!',
    content:
      'Happy 25th Sarah! Here is to conquering quarter-life with your signature humor, wisdom, and boundless kindness. Let’s celebrate soon!',
    date: '5 days ago',
    status: 'Pending Review',
    likesCount: 2,
  },
];

export const DIGITAL_KEEPSAKE_TEMPLATES: DigitalKeepsakeTemplate[] = [
  {
    id: 'dk-classic',
    name: 'Classic Linen Memory Album',
    category: 'Classic',
    description:
      'Timeless editorial typography, generous margins, and subtle sepia-tinted photo borders designed to feel like a cherished family heirloom.',
    price: 14.99,
    previewImage:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    accent: '#243B53',
    pages: 32,
  },
  {
    id: 'dk-modern',
    name: 'Modern Atelier Edition',
    category: 'Modern',
    description:
      'Clean asymmetrical layouts, bold focal points, and elegant quote highlights that transform personal wishes into magazine-grade spreads.',
    price: 16.99,
    previewImage:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    accent: '#FF6B6B',
    pages: 28,
  },
  {
    id: 'dk-minimal',
    name: 'Pure Minimalist Archive',
    category: 'Minimal',
    description:
      'Understated elegance focusing purely on photography and handwritten wishes with airy breathing room and crisp sans-serif details.',
    price: 12.99,
    previewImage:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    accent: '#243B53',
    pages: 24,
  },
  {
    id: 'dk-celebration',
    name: 'Festive Radiance Keepsake',
    category: 'Celebration',
    description:
      'Vibrant celebratory accents, subtle champagne dust details, and special voice-message QR code pages ready for printing or viewing on tablets.',
    price: 18.99,
    previewImage:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    accent: '#FF6B6B',
    pages: 36,
  },
];

export const PHYSICAL_PRODUCTS: PhysicalProduct[] = [
  {
    id: 'phys-book',
    name: 'Heirloom Hardcover Memory Book',
    shortDescription:
      'Handcrafted linen fabric cover with embossed foil lettering, lay-flat ultra-thick matte pages, and vivid archival ink printing.',
    price: 49.0,
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    deliveryDays: '4-7 business days',
    specs: [
      '8.5 x 11 inch Premium Hardcover',
      '200gsm Matte Archival Art Paper',
      'Foil-Stamped Custom Title',
      'QR Code integration for Audio Messages',
    ],
  },
  {
    id: 'phys-print',
    name: 'Gallery Framed Memory Collage',
    shortDescription:
      'Solid oak frame with museum-grade UV-protective acrylic glazing, featuring a curated grid of your celebration’s best photos and heartfelt quotes.',
    price: 34.0,
    image:
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    deliveryDays: '3-5 business days',
    specs: [
      '12 x 16 inch Solid Oak Frame',
      'Acid-Free White Beveled Mat',
      'Lustre Photographic Fine Print',
      'Pre-installed hanging hardware',
    ],
  },
  {
    id: 'phys-cards',
    name: 'Custom Celebration Keepsake Cards',
    shortDescription:
      'Set of 24 individual heavyweight textured cards, each printing one contributor’s personal wish and photo, held in a debossed navy presentation box.',
    price: 24.0,
    image:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    deliveryDays: '3-6 business days',
    specs: [
      '350gsm Cotton Texture Stock',
      'Coral and Navy Hand-Finished Edges',
      'Debossed Keepsake Box Included',
      'Wooden Desktop Display Stand',
    ],
  },
  {
    id: 'phys-box',
    name: 'Celebration Wooden Memory Box',
    shortDescription:
      'Laser-engraved solid walnut memory chest to store celebration prints, audio thumb drive, dried flower petals, and personal letters forever.',
    price: 59.0,
    image:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    deliveryDays: '5-8 business days',
    specs: [
      'Solid Walnut with Brass Hinges',
      'Personalized Laser Engraving',
      'Velvet-Lined Interior Compartments',
      'Includes USB Drive with all Full-Res Videos & Audio',
    ],
  },
];

export const STORAGE_PLANS: StoragePlan[] = [
  {
    id: 'plan-free',
    name: 'Free Starter',
    capacity: '5 GB',
    capacityGb: 5,
    price: '$0',
    priceMonthly: 0,
    features: [
      'Up to 3 Active Occasions',
      'Photos & Written Wishes',
      'Standard Resolution Storage',
      '1-Year Archive Guarantee',
    ],
  },
  {
    id: 'plan-plus',
    name: 'Memory Plus',
    capacity: '25 GB',
    capacityGb: 25,
    price: '$2.99/mo',
    priceMonthly: 2.99,
    isPopular: true,
    features: [
      'Unlimited Occasions',
      'High-Definition Photo & 4K Video',
      'Studio Quality Voice Messages',
      '5-Year Archive Guarantee',
      'High-Speed Bulk ZIP Downloads',
    ],
  },
  {
    id: 'plan-forever',
    name: 'Memory Forever',
    capacity: '100 GB',
    capacityGb: 100,
    price: '$6.99/mo',
    priceMonthly: 6.99,
    features: [
      'Unlimited Occasions & Contributors',
      'Uncompressed Raw Media Storage',
      'Lifetime Cloud Preservation Guarantee',
      'Automated Multi-Region Backups',
      'Complimentary Annual Digital Keepsake',
      'Priority Concierge Support',
    ],
  },
];

export const DIGITAL_STORE_PRODUCTS: DigitalStoreProduct[] = [
  {
    id: 'dsp-1',
    name: 'Minimalist Botanical Birthday Invitation Suite',
    category: 'Invitations',
    price: 9.99,
    previewImage:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    downloadsCount: 1420,
    rating: 4.9,
    description:
      'Editable high-resolution invitation suite with mobile WhatsApp card, printable 5x7 template, and contributor invite instructions.',
  },
  {
    id: 'dsp-2',
    name: 'Warm Coral Celebration Milestone Card Set',
    category: 'Birthday Cards',
    price: 6.99,
    previewImage:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
    downloadsCount: 890,
    rating: 4.8,
    description:
      'Printable and digital greeting cards with thoughtful prompts to inspire friends and family when writing their memories.',
  },
  {
    id: 'dsp-3',
    name: 'Heirloom Photobook Layout Template (InDesign & Canva)',
    category: 'Memory Templates',
    price: 14.99,
    previewImage:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    downloadsCount: 2150,
    rating: 5.0,
    description:
      'Professional 40-page customizable photobook layout ready for blurb, shutterfly, or local print shops.',
  },
  {
    id: 'dsp-4',
    name: 'Bride-to-Be Party Welcome Sign & Memory Prompts',
    category: 'Printable Designs',
    price: 8.99,
    previewImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    downloadsCount: 760,
    rating: 4.9,
    description:
      'Cohesive welcome sign typography (18x24 and 24x36) plus table card inserts with QR codes for guests to upload live during the bridal shower.',
  },
  {
    id: 'dsp-5',
    name: 'Golden Anniversary Digital Slideshow Presentation',
    category: 'Celebration Templates',
    price: 12.99,
    previewImage:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    downloadsCount: 1120,
    rating: 4.8,
    description:
      'Smooth animated keynote and PowerPoint presentation template designed for projecting at celebration dinners.',
  },
];

export const GIFT_RECOMMENDATIONS: GiftRecommendation[] = [
  {
    id: 'gr-1',
    name: 'Artisan Ceramic Pour-Over & Single-Origin Coffee Set',
    category: 'Coffee & Rituals',
    priceRange: '$45 - $65',
    whySuitsThem:
      'Based on Sarah’s love for calm morning rituals and specialty coffee brewing mentioned by both you and Emma.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gr-2',
    name: 'Hand-Bound Full Grain Leather Travel Journal',
    category: 'Travel & Writing',
    priceRange: '$55 - $80',
    whySuitsThem:
      'Recommended because friends noted she loves documenting her coastal hikes and always carries a fountain pen.',
    image:
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gr-3',
    name: 'Portable High-Fidelity Bluetooth Speaker in Warm Linen',
    category: 'Music & Outdoors',
    priceRange: '$90 - $130',
    whySuitsThem:
      'Suggested because Lucas and Daniel highlighted her weekend beach picnics and impromptu acoustic music sessions.',
    image:
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gr-4',
    name: 'Fine Cashmere Ribbed Travel Wrap',
    category: 'Cozy Lifestyle',
    priceRange: '$120 - $160',
    whySuitsThem:
      'Luxury warmth for someone who appreciates timeless minimal fashion and weekend road trips.',
    image:
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_FRIEND_RESPONSES: FriendGiftResponse[] = [
  {
    id: 'fr-1',
    friendName: 'Emma Watson',
    suggestion:
      'She was admiring a handmade ceramic pour-over dripper at the market in Rome! She also mentioned wanting cozy woolen socks.',
    category: 'Home & Kitchen',
    date: 'Yesterday',
    votes: 5,
    priceEstimate: '$65',
  },
  {
    id: 'fr-2',
    friendName: 'Daniel Vance',
    suggestion:
      'She always loses her guitar picks and loves portable acoustic recording gear. Maybe something for her music space.',
    category: 'Music',
    date: '2 days ago',
    votes: 3,
    priceEstimate: '$85',
  },
  {
    id: 'fr-3',
    friendName: 'Sophie & Liam',
    suggestion:
      'An experience would be amazing for her! She has been wanting to try pottery throwing or a sourdough bread making masterclass.',
    category: 'Experience',
    date: '3 days ago',
    votes: 7,
    priceEstimate: '$120',
  },
];

