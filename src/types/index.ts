export type PackageId = 'starter' | 'growth' | 'elite';
export type VoiceoverAccent = 'british' | 'american' | 'asian';
export type VariationQty = '1' | '3' | '5';

export interface OrderFormData {
  productName: string;
  email: string;
  adFormat: string;
  package: PackageId | '';
  description: string;
  voiceover: boolean;
  voiceoverAccent: VoiceoverAccent | '';
  variations: boolean;
  variationsQty: VariationQty | '';
  thumbnail: boolean;
  productImage: File | null;
  brandLogo: File | null;
}

export interface VideoCard {
  img: string;
  src: string;
}

export interface Package {
  id: PackageId;
  name: string;
  tagline: string;
  price: number;
  deliveryTime: string;
  features: string[];
  videoCount: string;
  featured?: boolean;
}
