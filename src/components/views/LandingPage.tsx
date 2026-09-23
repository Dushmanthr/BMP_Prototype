import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Users,
  Image as ImageIcon,
  PartyPopper,
  Sparkles,
  ArrowRight,
  Shield,
  Gift,
  BookOpen,
  HardDrive,
  ShoppingBag,
  Volume2,
  CheckCircle2,
  Calendar,
  Lock,
  Cake,
  GlassWater,
  Gem,
  GraduationCap,
  Flower2
} from 'lucide-react';
import { OccasionType } from '../../types';

export const LandingPage: React.FC = () => {
  const { setCurrentView, user } = useApp();

  const handleCreateOccasion = () => {
    if (user) {
      setCurrentView('create-occasion');
    } else {
      setCurrentView('auth');
    }
  };

  const supportedOccasions: Array<{ type: OccasionType; desc: string; icon: string }> = [
    { type: 'Birthday', desc: 'Milestones, sweet sixteens & golden jubilees', icon: Cake },
    { type: 'Anniversary', desc: 'Celebrating lasting love & shared years', icon: GlassWater },
    { type: 'Bride to Be', desc: 'Bridal showers, bachelorette & bridal advice', icon: Gem },
    { type: 'Graduation', desc: 'Honoring hard work & bright new chapters', icon: GraduationCap },
    { type: 'Wedding', desc: 'Cherished memories & blessings for newlyweds', icon: Flower2 },
    { type: 'Other', desc: 'Retirement, baby showers & farewell honors', icon: Sparkles },
  ];

  const featureCards = [
    {
      title: 'Create an Occasion',
      desc: 'Set up a private celebration space in less than two minutes.',
      icon: <Calendar className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Invite Friends',
      desc: 'Share a simple link. Loved ones contribute without creating accounts.',
      icon: <Users className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Collect Memories',
      desc: 'Gather uncompressed photos, personal videos, audio voice notes & wishes.',
      icon: <ImageIcon className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Celebrate Together',
      desc: 'Review, approve, and present an unforgettable digital celebration page.',
      icon: <PartyPopper className="w-6 h-6 text-[#FF6B6B]" />,
    },
  ];

  const howItWorksSteps = [
    { num: '1', title: 'Create your occasion', desc: 'Choose the celebration type, add the person’s name, date, and a warm cover photo.' },
    { num: '2', title: 'Invite friends & family', desc: 'Send private invite links via WhatsApp, SMS, or email in one tap.' },
    { num: '3', title: 'Collect private memories', desc: 'Guests share photos, voice recordings, and memories without any passwords.' },
    { num: '4', title: 'Review & finalize', desc: 'Preview all submissions, approve the favorites, and finalize the celebration.' },
    { num: '5', title: 'Share the celebration', desc: 'Reveal the custom celebration experience on their special day.' },
  ];

  const whyPeopleLove = [
    {
      title: 'Private Contributions',
      desc: 'Guests upload directly without creating accounts. Submissions remain private to the creator until approved.',
      icon: <Lock className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Beautiful Memories',
      desc: 'Voice messages with animated audio players, high-resolution photography, and intimate written notes.',
      icon: <Sparkles className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Easy Sharing',
      desc: 'A seamless web link that loads gracefully on any phone, tablet, or laptop worldwide with zero app installs.',
      icon: <ArrowRight className="w-6 h-6 text-[#FF6B6B]" />,
    },
    {
      title: 'Long-term Preservation',
      desc: 'Export high-res archives, order heirloom hardcover books, or preserve memories in our encrypted cloud.',
      icon: <Shield className="w-6 h-6 text-[#FF6B6B]" />,
    },
  ];

  const products = [
    {
      title: 'Digital Keepsakes',
      desc: 'Editorial-grade interactive memory books with flip effects and voice audio playback.',
      price: 'From $12.99',
      icon: <BookOpen className="w-6 h-6 text-[#FF6B6B]" />,
      action: () => setCurrentView('digital-keepsake'),
    },
    {
      title: 'Physical Keepsakes',
      desc: 'Handmade linen hardcover photo books, solid oak frames, and archival memory chests.',
      price: 'From $24.00',
      icon: <ShoppingBag className="w-6 h-6 text-[#FF6B6B]" />,
      action: () => setCurrentView('physical-keepsake'),
    },
    {
      title: 'Memory Storage',
      desc: 'High-speed encrypted cloud vaults with lifetime preservation guarantees.',
      price: 'Free to $6.99/mo',
      icon: <HardDrive className="w-6 h-6 text-[#FF6B6B]" />,
      action: () => setCurrentView('storage'),
    },
    {
      title: 'Digital Products',
      desc: 'Printable celebration signage, stationery templates, and greeting card suites.',
      price: 'From $6.99',
      icon: <Sparkles className="w-6 h-6 text-[#FF6B6B]" />,
      action: () => setCurrentView('digital-store'),
    },
  ];

  return (
    <div className="bg-[#FAFAFB] min-h-screen text-[#FF6B6B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-semibold text-xs tracking-wide">
                <div className="w-3.5 h-3.5" />
                The Digital Celebration & Memory Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#243B53] tracking-tight leading-[1.15]">
                Turn Special Moments Into <span className="text-[#FF6B6B]">Memories</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bring friends and family together to create a beautiful collection of photos, videos, audio messages and wishes for someone special.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleCreateOccasion}
                  id="hero-create-occasion-btn"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-base shadow-lg shadow-[#FF6B6B]/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create an Occasion
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentView('gift-finder')}
                  id="hero-find-gift-btn"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-gray-50 text-[#243B53] font-bold text-base border-2 border-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Gift className="w-5 h-5 text-[#FF6B6B]" />
                  Find the Perfect Gift
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
                  No app download required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
                  100% Private contributions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B6B]" />
                  Loved by over 50,000 families
                </span>
              </div>
            </div>

            {/* Right Column Visual Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Visual Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=900&q=80"
                    alt="Celebration memories"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#243B53]/85 via-[#243B53]/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="px-3 py-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full w-max mb-2">
                      Sarah’s 25th Birthday Space
                    </span>
                    <h3 className="text-xl font-bold">24 Cherished Memories Collected</h3>
                    <p className="text-sm text-gray-200">From 12 loved ones across 4 countries</p>
                  </div>
                </div>

                {/* Floating Preview: Photo Memory Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-pulse">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Emma photo upload"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#FF6B6B] block">Photo from Emma</span>
                    <p className="text-xs text-[#243B53] font-semibold">“Sunrise hike in Amalfi”</p>
                  </div>
                </div>

                {/* Floating Preview: Voice Message Badge */}
                <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B]">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#243B53] block">Audio Message from Daniel</span>
                    <p className="text-xs text-gray-500 font-mono">0:48 Voice note & song</p>
                  </div>
                </div>

                {/* Floating Preview: Written Wish Badge */}
                <div className="absolute -bottom-4 -right-2 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 max-w-[210px] hidden sm:block">
                  <span className="text-[10px] font-bold text-[#FF6B6B] uppercase tracking-wider block">
                    Wish from Michael
                  </span>
                  <p className="text-xs text-gray-700 italic line-clamp-2">
                    “Sarah, you make everyone feel so seen and loved...”
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Simple Feature Cards */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((feat, index) => (
              <div
                key={index}
                className="bg-[#FAFAFB] p-6 rounded-2xl border border-gray-100 hover:border-[#FF6B6B]/30 transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#243B53] mb-2">{feat.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#FAFAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Step by Step
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] mt-2">
              How It Works
            </h2>
            <p className="text-gray-600 text-base mt-3">
              Simple, warm, and effortless for both the occasion organizer and all invited loved ones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {howItWorksSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF6B6B] text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-[#243B53] mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Occasions */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Every Milestone
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] mt-2">
              Celebrate Every Special Occasion
            </h2>
            <p className="text-gray-600 text-base mt-3">
              Customized spaces for life’s most joyful celebrations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supportedOccasions.map((occ, idx) => (
              <button
                key={idx}
                onClick={handleCreateOccasion}
                className="p-5 rounded-2xl bg-[#FAFAFB] hover:bg-white border border-gray-200 hover:border-[#FF6B6B] transition-all text-center hover:shadow-md group cursor-pointer"
              >
                <div className="text-3xl flex justify-center transform group-hover:scale-110 transition-transform">
                  <occ.icon className="w-9 h-9 text-[#FF6B6B]" strokeWidth={2}/>
                </div>
                <h3 className="font-bold text-sm text-[#243B53] group-hover:text-[#FF6B6B] transition-colors">
                  {occ.type}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                  {occ.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why People Love It */}
      <section className="py-20 bg-[#FAFAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Thoughtful & Trustworthy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] mt-2">
              Why People Love Moments & Memories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyPeopleLove.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#243B53]/5 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#243B53] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monetization / Product Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#FF6B6B] uppercase tracking-wider">
              Keepsakes & Tangible Memories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#243B53] mt-2">
              Preserve the Celebration Forever
            </h2>
            <p className="text-gray-600 text-base mt-3">
              Turn digital contributions into heirloom prints, audio memory albums, and cloud archives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAFAFB] border border-gray-200 hover:border-[#FF6B6B]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                    {prod.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#243B53] mb-1">{prod.title}</h3>
                  <span className="text-xs font-bold text-[#FF6B6B] block mb-3">{prod.price}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{prod.desc}</p>
                </div>
                <button
                  onClick={prod.action}
                  className="mt-6 w-full py-2.5 rounded-xl bg-white hover:bg-[#243B53] text-[#243B53] hover:text-white border border-gray-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Explore Options
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finish with Clean CTA Section */}
      <section className="py-20 bg-[#243B53] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/20 text-[#FF6B6B] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Make Someone Feel Deeply Loved
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Create a Memory They’ll Never Forget
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Invite friends and family in seconds. Gather photos, audio notes, and heartwarming wishes in one timeless digital space.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleCreateOccasion}
              id="cta-bottom-create-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#FF6B6B] hover:bg-[#fa5a5a] text-white font-bold text-base shadow-xl transition-transform active:scale-95 cursor-pointer"
            >
              Start an Occasion for Free
            </button>
            <button
              onClick={() => setCurrentView('gift-finder')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-colors cursor-pointer"
            >
              Explore Gift Ideas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
