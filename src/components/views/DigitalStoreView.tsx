import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  Trash2,
  Check,
  Copy,
  Sparkles,
  Zap,
  ShieldCheck,
  Flame,
  ChevronRight,
  X,
  Gift,
  Clock,
  CreditCard,
  ArrowLeft,
  Star,
  Tag,
  Send,
  CheckCircle2,
  SlidersHorizontal,
  RefreshCw,
  Eye,
  KeyRound,
} from 'lucide-react';

// Types for Digital Store
interface DigitalProduct {
  id: string;
  title: string;
  brand: string;
  category: string;
  rating: number;
  reviewsCount: number;
  soldCount: number;
  discountPercent: number;
  denominations: number[];
  image: string;
  badge?: string;
  isFlashDeal?: boolean;
  description: string;
  howToRedeem: string[];
  region: string;
  officialVendor: string;
  accentColor: string;
}

interface CartItem {
  cartItemId: string; // unique per product + denomination
  product: DigitalProduct;
  selectedDenomination: number;
  quantity: number;
  unitPrice: number;
  originalUnitPrice: number;
}

interface PurchasedVoucher {
  id: string;
  productTitle: string;
  denomination: number;
  voucherCode: string;
  pinCode: string;
  purchaseDate: string;
  recipient: string;
  recipientNote?: string;
  officialVendor: string;
  region: string;
}

// Digital Products Catalog (Exclusively Digital: Gift Cards, Subscriptions, Codes)
const DIGITAL_CATALOG: DigitalProduct[] = [
  {
    id: 'netflix-card',
    title: 'Netflix Digital Subscription e-Gift Card',
    brand: 'Netflix',
    category: 'Streaming & TV',
    rating: 4.9,
    reviewsCount: 3820,
    soldCount: 14200,
    discountPercent: 5,
    denominations: [15, 30, 60, 100],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    isFlashDeal: true,
    description: 'Instant digital balance for Netflix streaming. Unlimited movies, TV shows, anime, and original productions across all devices.',
    howToRedeem: [
      'Visit netflix.com/redeem or log into your active account.',
      'Enter the unique 11-digit alphanumeric gift code.',
      'The subscription credit will immediately apply to your billing balance.',
    ],
    region: 'Global / Multi-region',
    officialVendor: 'Netflix Inc. Authorized Digital Partner',
    accentColor: '#E50914',
  },
  {
    id: 'spotify-premium',
    title: 'Spotify Premium e-Gift Card & Music Pass',
    brand: 'Spotify',
    category: 'Music & Audio',
    rating: 4.9,
    reviewsCount: 2940,
    soldCount: 9850,
    discountPercent: 8,
    denominations: [10, 30, 60, 99],
    image: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    isFlashDeal: true,
    description: 'Ad-free high-fidelity music streaming, offline downloads, and unlimited skips on mobile, desktop, and smart speakers.',
    howToRedeem: [
      'Navigate to spotify.com/redeem.',
      'Log into your Spotify account (Free or existing Premium).',
      'Paste your digital activation PIN to extend your premium access.',
    ],
    region: 'Global / US & Worldwide',
    officialVendor: 'Spotify AB Digital Delivery',
    accentColor: '#1DB954',
  },
  {
    id: 'apple-gift-card',
    title: 'Apple App Store & iTunes Digital Card',
    brand: 'Apple',
    category: 'Apps & Subscriptions',
    rating: 5.0,
    reviewsCount: 5120,
    soldCount: 18900,
    discountPercent: 4,
    denominations: [15, 25, 50, 100],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    description: 'One card for everything Apple. Redeem for apps, games, iCloud+ storage, Apple Music, Apple TV+, and digital subscriptions.',
    howToRedeem: [
      'Open the App Store on iPhone, iPad, or Mac.',
      'Tap your profile photo and choose "Redeem Gift Card or Code".',
      'Enter the 16-digit code starting with X.',
    ],
    region: 'Global (Apple ID)',
    officialVendor: 'Apple Authorized Distributor',
    accentColor: '#0071E3',
  },
  {
    id: 'steam-wallet',
    title: 'Steam Wallet Digital Code & Game Pass',
    brand: 'Steam',
    category: 'Gaming & PC',
    rating: 4.9,
    reviewsCount: 8410,
    soldCount: 24600,
    discountPercent: 6,
    denominations: [10, 20, 50, 100],
    image: 'https://images.unsplash.com/photo-1612287233202-0e2410a8d795?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot Gaming',
    isFlashDeal: true,
    description: 'Instantly add funds to your Steam Wallet. Buy thousands of PC games, downloadable content, microtransactions, and workshop items.',
    howToRedeem: [
      'Launch Steam Client or visit store.steampowered.com/account/redeemwalletcode.',
      'Paste the 15-character Steam Wallet redemption key.',
      'Funds are credited to your Steam balance immediately.',
    ],
    region: 'Global (Auto-currency conversion)',
    officialVendor: 'Valve Corporation Partner',
    accentColor: '#171A21',
  },
  {
    id: 'amazon-gift-card',
    title: 'Amazon Digital e-Gift Card (Global)',
    brand: 'Amazon',
    category: 'Shopping & Retail',
    rating: 4.9,
    reviewsCount: 10450,
    soldCount: 31200,
    discountPercent: 3,
    denominations: [25, 50, 100, 200],
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    badge: 'Versatile',
    description: 'The ultimate celebration gift. Millions of items from tech, books, fashion, home decor, and digital downloads with zero expiration.',
    howToRedeem: [
      'Visit amazon.com/gc/redeem.',
      'Log into your Amazon account and enter your Claim Code.',
      'Balance never expires and applies automatically to your next order.',
    ],
    region: 'Global / US / International',
    officialVendor: 'Amazon Services Digital Vouchers',
    accentColor: '#FF9900',
  },
  {
    id: 'playstation-network',
    title: 'PlayStation Network (PSN) Digital Card',
    brand: 'Sony PlayStation',
    category: 'Gaming & PC',
    rating: 4.8,
    reviewsCount: 4210,
    soldCount: 11400,
    discountPercent: 7,
    denominations: [10, 25, 50, 100],
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    badge: 'Console Pick',
    description: 'Wallet top-up for PlayStation 5 and PlayStation 4. Purchase games, PlayStation Plus tiers, season passes, and indie titles.',
    howToRedeem: [
      'Open PlayStation Store on your PS5/PS4 console or web browser.',
      'Select your avatar > "Redeem Codes".',
      'Input the 12-digit voucher code.',
    ],
    region: 'Global / Multi-region PSN',
    officialVendor: 'Sony Interactive Entertainment Authorized',
    accentColor: '#003791',
  },
  {
    id: 'xbox-gamepass',
    title: 'Xbox Game Pass Ultimate Digital Pass',
    brand: 'Microsoft Xbox',
    category: 'Gaming & PC',
    rating: 4.9,
    reviewsCount: 3180,
    soldCount: 8900,
    discountPercent: 10,
    denominations: [17, 45, 90],
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80',
    badge: '10% OFF',
    isFlashDeal: true,
    description: 'Play hundreds of high-quality games on Xbox Series X|S, Windows PC, and Cloud Gaming. Includes EA Play membership and online multiplayer.',
    howToRedeem: [
      'Go to redeem.microsoft.com or your Xbox console store.',
      'Sign in with your Microsoft account.',
      'Enter the 25-character digital activation key.',
    ],
    region: 'Global Key',
    officialVendor: 'Microsoft Digital Licensing',
    accentColor: '#107C10',
  },
  {
    id: 'roblox-card',
    title: 'Roblox Digital Card & Robux Credit',
    brand: 'Roblox',
    category: 'Gaming & PC',
    rating: 4.9,
    reviewsCount: 6100,
    soldCount: 16700,
    discountPercent: 5,
    denominations: [10, 25, 50],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    description: 'Get Robux currency to purchase avatars, unique accessories, exclusive abilities, and Roblox Premium subscriptions in-game.',
    howToRedeem: [
      'Go to roblox.com/redeem in any browser.',
      'Log into the recipient account.',
      'Enter PIN code and click "Redeem" to claim Robux.',
    ],
    region: 'Worldwide',
    officialVendor: 'Roblox Corporation Authorized',
    accentColor: '#D32F2F',
  },
  {
    id: 'google-play',
    title: 'Google Play Digital e-Gift Card',
    brand: 'Google',
    category: 'Apps & Subscriptions',
    rating: 4.8,
    reviewsCount: 3340,
    soldCount: 9400,
    discountPercent: 5,
    denominations: [10, 25, 50, 100],
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
    badge: 'Verified',
    description: 'Redeem millions of Android games, movies, books, YouTube Premium subscriptions, and in-app passes with no credit card required.',
    howToRedeem: [
      'Open Google Play Store on Android or go to play.google.com/redeem.',
      'Tap your profile > "Payments & subscriptions" > "Redeem code".',
      'Paste your digital code.',
    ],
    region: 'Global / US & Multi-Region',
    officialVendor: 'Google LLC Licensed Partner',
    accentColor: '#34A853',
  },
  {
    id: 'disney-plus',
    title: 'Disney+ Streaming Digital Subscription Pass',
    brand: 'Disney+',
    category: 'Streaming & TV',
    rating: 4.8,
    reviewsCount: 2150,
    soldCount: 5600,
    discountPercent: 8,
    denominations: [14, 40, 140],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    badge: 'Family Favorite',
    description: 'Stream Disney, Pixar, Marvel, Star Wars, National Geographic, and Star originals in 4K UHD with Dolby Atmos audio.',
    howToRedeem: [
      'Visit disneyplus.com/redeememail.',
      'Enter the digital redemption code from your confirmation email.',
      'Create or log into your Disney+ profile to activate streaming.',
    ],
    region: 'Global',
    officialVendor: 'The Walt Disney Company Digital Services',
    accentColor: '#113CCF',
  },
  {
    id: 'uber-eats',
    title: 'Uber & Uber Eats Digital Gift Voucher',
    brand: 'Uber',
    category: 'Food & Lifestyle',
    rating: 4.9,
    reviewsCount: 4520,
    soldCount: 13800,
    discountPercent: 6,
    denominations: [25, 50, 100],
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    badge: 'Must Have',
    description: 'One seamless digital voucher good for delicious restaurant delivery on Uber Eats or convenient rides on the Uber rides app.',
    howToRedeem: [
      'Open the Uber or Uber Eats app on your phone.',
      'Tap Account > Wallet > Add Payment Method > Gift Card.',
      'Enter the digital code to add instant credits to your wallet.',
    ],
    region: 'Global / Multi-country',
    officialVendor: 'Uber Technologies Authorized Partner',
    accentColor: '#000000',
  },
  {
    id: 'airbnb-gift-card',
    title: 'Airbnb Experiences & Travel e-Gift Card',
    brand: 'Airbnb',
    category: 'Travel & Experiences',
    rating: 4.9,
    reviewsCount: 1890,
    soldCount: 4950,
    discountPercent: 5,
    denominations: [50, 100, 250],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Adventure',
    description: 'Give the gift of unforgettable getaways, cozy mountain cabins, beachside villas, or one-of-a-kind guided local experiences worldwide.',
    howToRedeem: [
      'Go to airbnb.com/gift in your web browser or mobile app.',
      'Sign in or create an account.',
      'Enter your claim code. The balance automatically applies at checkout.',
    ],
    region: 'Worldwide',
    officialVendor: 'Airbnb Ireland UC Partner',
    accentColor: '#FF5A5F',
  },
  {
    id: 'nintendo-eshop',
    title: 'Nintendo eShop Digital Game Card',
    brand: 'Nintendo',
    category: 'Gaming & PC',
    rating: 4.8,
    reviewsCount: 2790,
    soldCount: 7800,
    discountPercent: 5,
    denominations: [10, 20, 35, 50],
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
    badge: 'Switch Ready',
    description: 'Download full games, classic titles, and DLC directly to your Nintendo Switch console. Fast, safe, and family-friendly digital fun.',
    howToRedeem: [
      'Open Nintendo eShop on your Nintendo Switch.',
      'Select "Redeem Code" from the left menu.',
      'Enter the 16-character code printed on your digital receipt.',
    ],
    region: 'Global / Nintendo Account',
    officialVendor: 'Nintendo Co., Ltd. Authorized',
    accentColor: '#E60012',
  },
  {
    id: 'starbucks-card',
    title: 'Starbucks e-Gift Coffee Card',
    brand: 'Starbucks',
    category: 'Food & Lifestyle',
    rating: 4.9,
    reviewsCount: 5210,
    soldCount: 14900,
    discountPercent: 5,
    denominations: [10, 25, 50],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    badge: 'Celebration Favorite',
    description: 'Treat the celebration honoree to artisan espresso drinks, seasonal cold brews, bakery treats, and whole-bean coffee bags.',
    howToRedeem: [
      'Add card directly to the Starbucks mobile app via Card Number & 8-digit security code.',
      'Or show the digital bar-code directly at register to pay contactless.',
    ],
    region: 'Worldwide participating stores',
    officialVendor: 'Starbucks Coffee International Partner',
    accentColor: '#00704A',
  },
  {
    id: 'doordash-card',
    title: 'DoorDash Food Delivery Digital Card',
    brand: 'DoorDash',
    category: 'Food & Lifestyle',
    rating: 4.8,
    reviewsCount: 2310,
    soldCount: 6400,
    discountPercent: 5,
    denominations: [20, 50, 100],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    badge: 'Instant Food',
    description: 'Order from thousands of favorite local restaurants, bakeries, grocery stores, and late-night spots delivered straight to the door.',
    howToRedeem: [
      'Open DoorDash app or visit doordash.com.',
      'Go to Account > Gift Card > enter PIN code.',
      'Credits automatically apply to your next delivery checkout.',
    ],
    region: 'US / Canada / Australia',
    officialVendor: 'DoorDash Digital Marketplace',
    accentColor: '#FF3008',
  },
  {
    id: 'audible-card',
    title: 'Audible Audiobook & Podcast Membership Card',
    brand: 'Audible',
    category: 'Music & Audio',
    rating: 4.9,
    reviewsCount: 1650,
    soldCount: 4200,
    discountPercent: 8,
    denominations: [15, 45, 90],
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    badge: 'Knowledge',
    description: 'Explore world-class audiobooks narrated by celebrated voices, exclusive original podcasts, and mindful audio guides anytime.',
    howToRedeem: [
      'Visit audible.com/giftcenter.',
      'Enter claim code and sign into Amazon/Audible.',
      'Redeem audiobook credits that remain yours forever.',
    ],
    region: 'Global',
    officialVendor: 'Audible, an Amazon Company',
    accentColor: '#F8991D',
  },
];

const CATEGORIES = [
  'All Digital Products',
  'Gaming & PC',
  'Streaming & TV',
  'Music & Audio',
  'Apps & Subscriptions',
  'Shopping & Retail',
  'Food & Lifestyle',
  'Travel & Experiences',
];

export const DigitalStoreView: React.FC = () => {
  const { setCurrentView, triggerConfetti, showToast, activeOccasion, user } = useApp();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Digital Products');
  const [sortBy, setSortBy] = useState<'popular' | 'topRated' | 'priceAsc' | 'priceDesc' | 'discount'>('popular');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under25' | '25to50' | 'over50'>('all');
  const [instantDeliveryOnly, setInstantDeliveryOnly] = useState(false);

  // Selected denomination tracking per product on the grid
  const [cardSelectedDenominations, setCardSelectedDenominations] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    DIGITAL_CATALOG.forEach((item) => {
      initial[item.id] = item.denominations[0];
    });
    return initial;
  });

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [giftingOption, setGiftingOption] = useState<'honoree' | 'self'>('honoree');
  const [honoreeGiftMessage, setHonoreeGiftMessage] = useState(
    `Happy Birthday ${activeOccasion?.celebrationPersonName || 'Sarah'}! Here is a digital gift card to enjoy! ❤️`
  );
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percentOff: number } | null>({
    code: 'CELEBRATE10',
    percentOff: 10,
  });
  const [promoError, setPromoError] = useState('');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<DigitalProduct | null>(null);
  const [quickViewDenom, setQuickViewDenom] = useState<number>(0);
  const [quickViewQty, setQuickViewQty] = useState<number>(1);

  // Checkout & Fulfillment State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [purchasedVouchers, setPurchasedVouchers] = useState<PurchasedVoucher[]>([]);
  const [showVouchersModal, setShowVouchersModal] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Calculate pricing for a card based on chosen denomination
  const calculatePrice = (product: DigitalProduct, denomination: number) => {
    const discountFactor = (100 - product.discountPercent) / 100;
    const discountedPrice = denomination * discountFactor;
    return {
      originalPrice: denomination,
      currentPrice: Number(discountedPrice.toFixed(2)),
      savings: Number((denomination - discountedPrice).toFixed(2)),
    };
  };

  // Add Item to Cart
  const handleAddToCart = (product: DigitalProduct, denomination?: number, quantity: number = 1) => {
    const chosenDenom = denomination ?? (cardSelectedDenominations[product.id] || product.denominations[0]);
    const pricing = calculatePrice(product, chosenDenom);
    const cartItemId = `${product.id}-${chosenDenom}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            selectedDenomination: chosenDenom,
            quantity,
            unitPrice: pricing.currentPrice,
            originalUnitPrice: pricing.originalPrice,
          },
        ];
      }
    });

    showToast(`Added ${product.title} ($${chosenDenom}) to cart!`);
    setIsCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove from Cart
  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart');
  };

  // Cart Totals Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const promoDiscountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return Number(((cartSubtotal * appliedPromo.percentOff) / 100).toFixed(2));
  }, [cartSubtotal, appliedPromo]);

  const cartFinalTotal = useMemo(() => {
    return Math.max(0, Number((cartSubtotal - promoDiscountAmount).toFixed(2)));
  }, [cartSubtotal, promoDiscountAmount]);

  const totalCartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Apply Promo Code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'CELEBRATE10') {
      setAppliedPromo({ code: 'CELEBRATE10', percentOff: 10 });
      showToast('Promo code CELEBRATE10 applied: 10% Extra Discount!');
    } else if (code === 'VIP15') {
      setAppliedPromo({ code: 'VIP15', percentOff: 15 });
      showToast('VIP Promo applied: 15% Off Total!');
    } else if (code === 'GIFT5') {
      setAppliedPromo({ code: 'GIFT5', percentOff: 5 });
      showToast('GIFT5 applied: 5% Off Total!');
    } else {
      setPromoError('Invalid promo code. Try CELEBRATE10 for 10% off.');
    }
    setPromoCodeInput('');
  };

  // Handle Instant Checkout & Voucher Code Generation
  const handleCompleteCheckout = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const generatedVouchers: PurchasedVoucher[] = [];
      const recipientName =
        giftingOption === 'honoree'
          ? activeOccasion?.celebrationPersonName || 'Sarah Jenkins'
          : user?.name || 'You';

      cartItems.forEach((cartItem) => {
        for (let i = 0; i < cartItem.quantity; i++) {
          const randomHex = () => Math.random().toString(36).substring(2, 6).toUpperCase();
          const code = `${cartItem.product.brand.substring(0, 4).toUpperCase()}-${randomHex()}-${randomHex()}-${randomHex()}`;
          const pin = Math.floor(1000 + Math.random() * 9000).toString();

          generatedVouchers.push({
            id: `vouch-${Date.now()}-${Math.random().toString(36).substring(7)}`,
            productTitle: cartItem.product.title,
            denomination: cartItem.selectedDenomination,
            voucherCode: code,
            pinCode: pin,
            purchaseDate: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            recipient: recipientName,
            recipientNote: giftingOption === 'honoree' ? honoreeGiftMessage : undefined,
            officialVendor: cartItem.product.officialVendor,
            region: cartItem.product.region,
          });
        }
      });

      setPurchasedVouchers((prev) => [...generatedVouchers, ...prev]);
      setCartItems([]);
      setIsProcessingPayment(false);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setShowVouchersModal(true);
      triggerConfetti();
      showToast('🎉 Digital Codes Issued Instantly & Ready to Redeem!');
    }, 1200);
  };

  // Copy code to clipboard with visual feedback
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    showToast(`Voucher code "${code}" copied to clipboard!`);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return DIGITAL_CATALOG.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All Digital Products' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesBrand && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      // Price filter
      const activeDenom = cardSelectedDenominations[product.id] || product.denominations[0];
      const activePrice = calculatePrice(product, activeDenom).currentPrice;
      if (priceFilter === 'under25' && activePrice >= 25) return false;
      if (priceFilter === '25to50' && (activePrice < 25 || activePrice > 50)) return false;
      if (priceFilter === 'over50' && activePrice <= 50) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.soldCount - a.soldCount;
      if (sortBy === 'topRated') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;

      const priceA = calculatePrice(a, cardSelectedDenominations[a.id] || a.denominations[0]).currentPrice;
      const priceB = calculatePrice(b, cardSelectedDenominations[b.id] || b.denominations[0]).currentPrice;
      if (sortBy === 'priceAsc') return priceA - priceB;
      if (sortBy === 'priceDesc') return priceB - priceA;
      return 0;
    });
  }, [selectedCategory, searchQuery, priceFilter, sortBy, cardSelectedDenominations]);

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#243B53] pb-24">
      {/* AliExpress/Daraz Style Global Announcement & Delivery Guarantee Bar */}
      <div className="bg-[#243B53] text-white text-xs py-2 px-4 border-b border-[#243B53]/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              Instant Digital Code Delivery (30s Guarantee)
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="inline-flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Authorized Vouchers
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-gray-300">
              <Gift className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Direct Gifting to Celebration Wall for {activeOccasion?.celebrationPersonName || 'Sarah'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/30 px-2 py-0.5 rounded font-mono font-bold">
              CODE: CELEBRATE10 (10% OFF)
            </span>
            {purchasedVouchers.length > 0 && (
              <button
                onClick={() => setShowVouchersModal(true)}
                className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                My Codes ({purchasedVouchers.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentView('creator-dashboard')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#243B53] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          {/* Top Cart Shortcut with Live Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="open-cart-header-btn"
            className="relative inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-[#FF6B6B] text-[#243B53] text-xs sm:text-sm font-bold transition-all cursor-pointer group"
          >
            <ShoppingCart className="w-4 h-4 text-[#FF6B6B] group-hover:scale-110 transition-transform" />
            <span>Celebration Cart</span>
            {totalCartItemCount > 0 && (
              <span className="bg-[#FF6B6B] text-white text-[11px] font-black px-2 py-0.5 rounded-full animate-bounce">
                {totalCartItemCount}
              </span>
            )}
            <span className="font-extrabold text-[#FF6B6B] ml-1">
              ${cartFinalTotal.toFixed(2)}
            </span>
          </button>
        </div>

        {/* E-Commerce Search & Marketplace Hero Banner */}
        <div className="bg-gradient-to-r from-[#243B53] via-[#2D4A6B] to-[#1E3146] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-12 -top-12 w-96 h-96 bg-[#FF6B6B]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
              Official Digital Marketplace • Instant Codes
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Digital Gift Cards & Entertainment Vouchers
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Instantly deliver Netflix subscriptions, Spotify passes, gaming balance, App Store credits, and dining vouchers directly to {activeOccasion?.celebrationPersonName || 'the honoree’s'} celebration wall or your inbox.
            </p>

            {/* Ali/Daraz Large Search Bar */}
            <div className="pt-2">
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg p-1.5 border border-gray-100 max-w-2xl text-[#243B53]">
                <Search className="w-5 h-5 text-gray-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Netflix, Spotify, Steam, Apple, Amazon, Gaming..."
                  className="w-full px-3 py-2 text-xs sm:text-sm text-[#243B53] placeholder-gray-400 bg-transparent focus:outline-none font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1 hover:bg-gray-100 rounded-full text-gray-400 mr-2 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  className="bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shrink-0 cursor-pointer shadow-md"
                >
                  Search
                </button>
              </div>

              {/* Trending Quick Search Chips */}
              <div className="flex items-center gap-2 mt-3 flex-wrap text-[11px] text-gray-300">
                <span className="font-semibold text-gray-400">Popular:</span>
                {['Netflix', 'Spotify', 'Apple', 'Steam', 'Xbox', 'Amazon', 'Roblox'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="bg-white/10 hover:bg-white/20 border border-white/10 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AliExpress SuperDeals / Daraz Flash Sale Carousel Banner */}
        <div className="bg-gradient-to-r from-[#FF6B6B]/10 via-amber-50 to-[#FF6B6B]/15 border border-[#FF6B6B]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6B6B] text-white flex items-center justify-center shrink-0 shadow-md">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base text-[#243B53] uppercase tracking-wide">
                  Flash Deals of the Day
                </span>
                <span className="bg-[#FF6B6B] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  Up to 10% OFF
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Instant delivery codes on high-demand entertainment & gaming cards. Limited celebration quantity!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#243B53]">
              <Clock className="w-4 h-4 text-[#FF6B6B]" />
              <span>Ends in:</span>
              <span className="bg-[#243B53] text-white px-2 py-1 rounded font-mono text-[11px]">04h</span>
              <span>:</span>
              <span className="bg-[#243B53] text-white px-2 py-1 rounded font-mono text-[11px]">28m</span>
              <span>:</span>
              <span className="bg-[#243B53] text-white px-2 py-1 rounded font-mono text-[11px]">45s</span>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('All Digital Products');
                setSortBy('discount');
              }}
              className="px-3.5 py-1.5 bg-[#243B53] hover:bg-[#1E3146] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              View All Deals
            </button>
          </div>
        </div>

        {/* Categories Bar (Daraz/AliExpress Tab Style) */}
        <div className="overflow-x-auto scrollbar-none pb-1">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count =
                cat === 'All Digital Products'
                  ? DIGITAL_CATALOG.length
                  : DIGITAL_CATALOG.filter((i) => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#243B53] text-white shadow-md'
                      : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#FF6B6B] text-white font-extrabold' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort and Secondary Filters Toolbar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          {/* Price Range Filter */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <span className="font-bold text-gray-500 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter Price:
            </span>
            {[
              { id: 'all', label: 'All Budgets' },
              { id: 'under25', label: '< $25' },
              { id: '25to50', label: '$25 - $50' },
              { id: 'over50', label: '$50+' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setPriceFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
                  priceFilter === f.id
                    ? 'bg-[#FF6B6B]/15 text-[#FF6B6B] border border-[#FF6B6B]/30'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}

            {/* Instant Delivery Toggle */}
            <button
              onClick={() => setInstantDeliveryOnly(!instantDeliveryOnly)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
                instantDeliveryOnly
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <Zap className="w-3 h-3 text-emerald-500" />
              Instant Codes Only
            </button>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-gray-500 font-medium">
              Showing <span className="font-bold text-[#243B53]">{filteredProducts.length}</span> digital products
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-[#243B53] focus:outline-none focus:border-[#FF6B6B] cursor-pointer"
              >
                <option value="popular">Most Popular & Sold</option>
                <option value="topRated">Top Rated (5.0 ★)</option>
                <option value="discount">Biggest Discount %</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* AliExpress / Daraz Style Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center space-y-4 max-w-md mx-auto shadow-sm my-8">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#243B53]">No digital cards match your criteria</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your search terms, removing filters, or resetting to view all digital cards.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Digital Products');
                setPriceFilter('all');
                setInstantDeliveryOnly(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#243B53] text-white font-bold text-xs hover:bg-[#1E3146] transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const activeDenom = cardSelectedDenominations[product.id] || product.denominations[0];
              const pricing = calculatePrice(product, activeDenom);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Top Image & Badges */}
                  <div>
                    <div
                      className="relative h-44 overflow-hidden bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setQuickViewProduct(product);
                        setQuickViewDenom(activeDenom);
                        setQuickViewQty(1);
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      {/* Top Badges (AliExpress / Daraz Style) */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        {product.discountPercent > 0 && (
                          <span className="bg-[#FF6B6B] text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
                            -{product.discountPercent}% OFF
                          </span>
                        )}
                        {product.badge && (
                          <span className="bg-[#243B53]/90 backdrop-blur-sm text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      {/* Instant Code Delivery pill */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/75 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                          <Zap className="w-2.5 h-2.5 fill-emerald-400" /> Instant
                        </span>
                      </div>

                      {/* Brand Pill overlay at bottom */}
                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                        <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-gray-200">
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-gray-300">
                          {product.region}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      {/* Product Title */}
                      <h3
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewDenom(activeDenom);
                          setQuickViewQty(1);
                        }}
                        className="text-sm font-bold text-[#243B53] line-clamp-2 leading-snug group-hover:text-[#FF6B6B] transition-colors cursor-pointer"
                        title={product.title}
                      >
                        {product.title}
                      </h3>

                      {/* Rating & Sold count (Ali/Daraz Signature) */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500 font-medium">
                          {(product.soldCount / 1000).toFixed(1)}k+ sold
                        </span>
                      </div>

                      {/* Denomination Selector Chips Directly on Card */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                          Select Card Value:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {product.denominations.map((denom) => {
                            const isSelected = denom === activeDenom;
                            return (
                              <button
                                key={denom}
                                onClick={() =>
                                  setCardSelectedDenominations((prev) => ({
                                    ...prev,
                                    [product.id]: denom,
                                  }))
                                }
                                className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#243B53] text-white shadow-sm ring-1 ring-[#243B53]'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                              >
                                ${denom}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Price Section */}
                      <div className="pt-1 border-t border-gray-100 flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-[#FF6B6B]">
                              ${pricing.currentPrice.toFixed(2)}
                            </span>
                            {pricing.savings > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                ${pricing.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {pricing.savings > 0 && (
                            <span className="text-[10px] font-bold text-emerald-600">
                              Save ${pricing.savings.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">
                          Digital Delivery
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setQuickViewProduct(product);
                        setQuickViewDenom(activeDenom);
                        setQuickViewQty(1);
                      }}
                      className="py-2.5 px-3 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      Details
                    </button>
                    <button
                      onClick={() => handleAddToCart(product, activeDenom, 1)}
                      id={`add-to-cart-${product.id}`}
                      className="py-2.5 px-3 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Cart Bar for Quick Access */}
      {totalCartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5">
          <button
            onClick={() => setIsCartOpen(true)}
            id="floating-cart-btn"
            className="flex items-center gap-3 bg-[#243B53] hover:bg-[#1E3146] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#FF6B6B]" />
              <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItemCount}
              </span>
            </div>
            <div className="text-left">
              <div className="text-[11px] text-gray-300 font-medium">View Cart</div>
              <div className="text-sm font-black text-white">${cartFinalTotal.toFixed(2)}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 ml-1" />
          </button>
        </div>
      )}

      {/* Cart Drawer Slide-Over (Right Side) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAFAFB]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#243B53]">Celebration Gift Cart</h2>
                    <p className="text-xs text-gray-500 font-medium">
                      {totalCartItemCount} digital {totalCartItemCount === 1 ? 'item' : 'items'} ready for delivery
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Delivery Free Banner */}
              <div className="bg-emerald-50 border-y border-emerald-100 px-5 py-2.5 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Digital Delivery via Email / Space included!</span>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="text-sm font-bold text-[#243B53]">Your cart is currently empty</h4>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto">
                      Add digital vouchers like Netflix, Spotify, or Steam to gift directly to {activeOccasion?.celebrationPersonName || 'Sarah'}!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 px-5 py-2 rounded-xl bg-[#243B53] text-white text-xs font-bold hover:bg-[#1E3146] cursor-pointer"
                    >
                      Browse Digital Cards
                    </button>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="bg-white rounded-2xl border border-gray-200 p-3.5 flex gap-3 shadow-sm"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 bg-gray-100"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="text-xs font-bold text-[#243B53] line-clamp-1">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => handleRemoveFromCart(item.cartItemId)}
                                className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-600">
                              Value: ${item.selectedDenomination} Tier
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity Adjuster */}
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 text-xs">
                              <button
                                onClick={() => handleUpdateQuantity(item.cartItemId, -1)}
                                className="px-2 py-1 hover:bg-gray-200 text-gray-600 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-bold text-[#243B53]">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.cartItemId, 1)}
                                className="px-2 py-1 hover:bg-gray-200 text-gray-600 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-sm font-extrabold text-[#FF6B6B]">
                                ${(item.unitPrice * item.quantity).toFixed(2)}
                              </div>
                              {item.product.discountPercent > 0 && (
                                <div className="text-[10px] text-gray-400 line-through">
                                  ${(item.originalUnitPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Gifting Destination Selector */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3">
                      <span className="text-xs font-extrabold text-[#243B53] block">
                        🎁 Digital Delivery Destination
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                        <button
                          onClick={() => setGiftingOption('honoree')}
                          className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                            giftingOption === 'honoree'
                              ? 'bg-white border-[#FF6B6B] text-[#243B53] shadow-sm ring-1 ring-[#FF6B6B]'
                              : 'bg-white/60 border-gray-200 text-gray-600'
                          }`}
                        >
                          <span className="font-bold flex items-center gap-1">
                            <Gift className="w-3 h-3 text-[#FF6B6B]" />
                            To Honoree
                          </span>
                          <span className="text-[10px] text-gray-500 truncate">
                            {activeOccasion?.celebrationPersonName || 'Sarah Jenkins'}
                          </span>
                        </button>

                        <button
                          onClick={() => setGiftingOption('self')}
                          className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 cursor-pointer transition-all ${
                            giftingOption === 'self'
                              ? 'bg-white border-[#FF6B6B] text-[#243B53] shadow-sm ring-1 ring-[#FF6B6B]'
                              : 'bg-white/60 border-gray-200 text-gray-600'
                          }`}
                        >
                          <span className="font-bold flex items-center gap-1">
                            <Send className="w-3 h-3 text-[#243B53]" />
                            To My Email
                          </span>
                          <span className="text-[10px] text-gray-500 truncate">
                            {user?.email || 'eleanor@example.com'}
                          </span>
                        </button>
                      </div>

                      {giftingOption === 'honoree' && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                            Gift Note to Display with Voucher:
                          </label>
                          <textarea
                            value={honoreeGiftMessage}
                            onChange={(e) => setHonoreeGiftMessage(e.target.value)}
                            rows={2}
                            className="w-full text-xs p-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B] text-[#243B53] resize-none"
                            placeholder="Write a sweet birthday wish..."
                          />
                        </div>
                      )}
                    </div>

                    {/* Promo Code Input */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#243B53] flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-[#FF6B6B]" />
                          Apply Promo Coupon
                        </span>
                        {appliedPromo && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                            {appliedPromo.code} (-{appliedPromo.percentOff}%)
                          </span>
                        )}
                      </div>

                      {appliedPromo ? (
                        <div className="flex items-center justify-between bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs">
                          <span className="font-bold text-emerald-700">
                            Coupon {appliedPromo.code} active!
                          </span>
                          <button
                            onClick={() => setAppliedPromo(null)}
                            className="text-gray-400 hover:text-red-500 font-bold text-[11px] cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="flex gap-2">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value)}
                            placeholder="Enter CELEBRATE10"
                            className="flex-1 text-xs uppercase px-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#FF6B6B]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#243B53] hover:bg-[#1E3146] text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                          >
                            Apply
                          </button>
                        </form>
                      )}

                      {promoError && (
                        <p className="text-[11px] text-red-600 font-medium">{promoError}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Drawer Footer with Price Summary and Checkout */}
              {cartItems.length > 0 && (
                <div className="p-5 border-t border-gray-200 bg-white space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Items Subtotal</span>
                      <span className="font-semibold text-gray-700">${cartSubtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-gray-500">
                      <span>Instant Digital Delivery Fee</span>
                      <span className="font-bold text-emerald-600">FREE ($0.00)</span>
                    </div>

                    {appliedPromo && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Promo Discount ({appliedPromo.code})</span>
                        <span>-${promoDiscountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline text-base font-extrabold text-[#243B53]">
                      <span>Estimated Total</span>
                      <span className="text-xl font-black text-[#FF6B6B]">
                        ${cartFinalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    id="proceed-checkout-btn"
                    className="w-full py-3.5 bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white rounded-2xl font-black text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Instant Checkout (${cartFinalTotal.toFixed(2)})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Quick-View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Visual */}
              <div className="relative h-64 md:h-full bg-gray-100">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="bg-[#FF6B6B] text-white text-xs font-black px-2.5 py-1 rounded-md shadow-md uppercase">
                    -{quickViewProduct.discountPercent}% OFF
                  </span>
                  <span className="bg-black/75 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-emerald-400" /> Instant Key
                  </span>
                </div>
              </div>

              {/* Modal Details */}
              <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                <div>
                  <span className="text-xs font-extrabold text-[#FF6B6B] uppercase tracking-wider block">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-lg font-black text-[#243B53] mt-1 leading-snug">
                    {quickViewProduct.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 font-extrabold">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{quickViewProduct.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">
                      {quickViewProduct.soldCount.toLocaleString()} verified vouchers delivered
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Denomination Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#243B53] block">
                    Select Gift Card Denomination:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {quickViewProduct.denominations.map((denom) => {
                      const isSelected = denom === quickViewDenom;
                      return (
                        <button
                          key={denom}
                          onClick={() => setQuickViewDenom(denom)}
                          className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#243B53] text-white shadow-md ring-2 ring-[#243B53]'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          ${denom}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50 text-xs">
                    <button
                      onClick={() => setQuickViewQty(Math.max(1, quickViewQty - 1))}
                      className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-extrabold text-[#243B53]">{quickViewQty}</span>
                    <button
                      onClick={() => setQuickViewQty(quickViewQty + 1)}
                      className="px-3 py-1.5 hover:bg-gray-200 text-gray-600 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Redemption Instructions */}
                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 space-y-1.5 text-xs">
                  <span className="font-extrabold text-[#243B53] flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#FF6B6B]" />
                    How to Redeem:
                  </span>
                  <ol className="list-decimal list-inside text-gray-600 space-y-1 text-[11px] leading-relaxed">
                    {quickViewProduct.howToRedeem.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Pricing & Add to Cart */}
                {(() => {
                  const pricing = calculatePrice(quickViewProduct, quickViewDenom);
                  return (
                    <div className="pt-2 border-t border-gray-100 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-[#FF6B6B]">
                              ${(pricing.currentPrice * quickViewQty).toFixed(2)}
                            </span>
                            {pricing.savings > 0 && (
                              <span className="text-xs text-gray-400 line-through">
                                ${(pricing.originalPrice * quickViewQty).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {pricing.savings > 0 && (
                            <span className="text-[11px] font-bold text-emerald-600">
                              You save ${(pricing.savings * quickViewQty).toFixed(2)} instantly
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> In Stock
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            handleAddToCart(quickViewProduct, quickViewDenom, quickViewQty);
                            setQuickViewProduct(null);
                          }}
                          className="py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#243B53] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => {
                            handleAddToCart(quickViewProduct, quickViewDenom, quickViewQty);
                            setQuickViewProduct(null);
                            setIsCheckoutOpen(true);
                          }}
                          className="py-3 px-4 rounded-xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Zap className="w-4 h-4" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B6B]/15 text-[#FF6B6B] flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-[#243B53]">Instant Digital Checkout</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Order Items Preview */}
            <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 max-h-36 overflow-y-auto space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                Order Summary ({cartItems.length} unique cards):
              </span>
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#243B53] truncate max-w-[240px]">
                    {item.quantity}x {item.product.title} (${item.selectedDenomination})
                  </span>
                  <span className="font-bold text-[#FF6B6B]">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Recipient Details */}
            <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-200/60 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                <Gift className="w-4 h-4 text-[#FF6B6B]" />
                <span>
                  Delivery to: {giftingOption === 'honoree' ? activeOccasion?.celebrationPersonName || 'Sarah Jenkins' : user?.name || 'You'}
                </span>
              </div>
              <p className="text-[11px] text-amber-800">
                Codes will be generated instantly and displayed with 1-click copy options and redemption instructions.
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#243B53] block">Select Payment Method:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'apple', label: 'Apple / Google', icon: Zap },
                  { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? 'border-[#FF6B6B] bg-[#FF6B6B]/10 text-[#243B53] ring-1 ring-[#FF6B6B]'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#FF6B6B]" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total and Authorize Button */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Total to Authorize</span>
                <span className="text-2xl font-black text-[#FF6B6B]">${cartFinalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCompleteCheckout}
                disabled={isProcessingPayment}
                className="px-6 py-3.5 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-black text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating Codes...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    Authorize & Issue Codes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Digital Codes / Fulfillment Modal */}
      {showVouchersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[#243B53]">Digital Codes Issued Successfully!</h3>
                  <p className="text-xs text-gray-500">
                    Your digital vouchers are active and ready to be redeemed immediately.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVouchersModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Generated Codes List */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {purchasedVouchers.map((vouch) => (
                <div
                  key={vouch.id}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 relative group hover:border-[#FF6B6B]/40 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF6B6B]">
                        ${vouch.denomination} Digital Voucher
                      </span>
                      <h4 className="text-xs font-bold text-[#243B53]">{vouch.productTitle}</h4>
                      <span className="text-[10px] text-gray-500">
                        Recipient: {vouch.recipient} • {vouch.purchaseDate}
                      </span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                      ACTIVE & UNLOCKED
                    </span>
                  </div>

                  {/* Code Card Box */}
                  <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-center justify-between gap-3 shadow-inner">
                    <div className="font-mono font-black text-sm text-[#243B53] tracking-wider select-all">
                      {vouch.voucherCode}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-400">PIN: {vouch.pinCode}</span>
                      <button
                        onClick={() => handleCopyCode(vouch.voucherCode, vouch.id)}
                        className={`p-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          copiedCodeId === vouch.id
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-gray-100 hover:bg-gray-200 text-[#243B53] border-gray-200'
                        }`}
                      >
                        {copiedCodeId === vouch.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {vouch.recipientNote && (
                    <div className="text-[11px] text-gray-600 bg-white/60 p-2 rounded-lg border border-gray-100 italic">
                      "{vouch.recipientNote}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setShowVouchersModal(false);
                  setCurrentView('celebration-page');
                }}
                className="py-2.5 px-4 rounded-xl border border-[#243B53] text-[#243B53] hover:bg-gray-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                View in Celebration Space
              </button>

              <button
                onClick={() => setShowVouchersModal(false)}
                className="py-2.5 px-5 rounded-xl bg-[#243B53] hover:bg-[#1E3146] text-white text-xs font-black transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
