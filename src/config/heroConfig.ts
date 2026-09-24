/**
 * Hero Section Image Configuration
 * 
 * You can configure or replace the landing page hero image here:
 * 
 * METHOD 1 (Recommended - Direct File Replacement):
 * - Drop your image file into `public/images/hero/` and name it `hero-image.jpg`.
 * - It will load automatically without changing any code.
 * 
 * METHOD 2 (Custom Filename or Format):
 * - Put your file in `public/images/hero/` (e.g. `my-celebration.png`).
 * - Update `src` below to: `'/images/hero/my-celebration.png'`.
 * 
 * METHOD 3 (External Web URL):
 * - Set `src` below to any external image URL (e.g. `'https://example.com/photo.jpg'`).
 */

export interface HeroImageConfig {
  src: string;
  fallbackSrc: string;
  alt: string;
}

export const HERO_IMAGE_CONFIG: HeroImageConfig = {
  // Path relative to public directory:
  src: '/images/hero/hero2.jpg',
  // Graceful fallback if local file fails or is missing:
  fallbackSrc: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  alt: 'Loved ones celebrating together and making memories',
};
