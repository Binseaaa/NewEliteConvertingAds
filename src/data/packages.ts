import type { Package } from '../types';

export const PACKAGES: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'One format, one winning ad.',
    price: 100,
    deliveryTime: '24–48h',
    features: [
      '1 Ad Creative (9:16 or 1:1)',
      '1 Extra Variation',
      'Custom script + hook',
      'Footage sourced from scratch',
      'Captions & platform-native edits',
    ],
    videoCount: '2 VIDEOS TOTAL',
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'More angles. More chances to convert.',
    price: 250,
    deliveryTime: '48h',
    features: [
      '3 Ad Creatives (9:16 or 1:1)',
      '3 Extra Variations',
      'Custom scripts + multiple hooks',
      'Footage sourced from scratch',
      'Captions & platform-native edits',
    ],
    videoCount: '6 VIDEOS TOTAL',
    featured: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Full arsenal for serious scaling.',
    price: 500,
    deliveryTime: '48h',
    features: [
      '6 Ad Creatives (9:16 or 1:1)',
      '6 Extra Variations',
      'Custom scripts + hook testing set',
      'Footage sourced from scratch',
      'Captions & platform-native edits',
      'Priority delivery',
    ],
    videoCount: '12 VIDEOS TOTAL',
  },
];

export const PACKAGE_PRICES: Record<string, number> = {
  starter: 100,
  growth: 250,
  elite: 500,
};

export const VARIATION_PRICES: Record<string, number> = {
  '1': 10,
  '3': 25,
  '5': 40,
};
