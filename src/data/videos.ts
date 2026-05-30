export interface VideoItem {
  id: string;
  title: string;
  img: string;
  src: string;
  iframe?: string;
  aspect: '9/16' | '1/1';
  category: 'tiktok' | 'meta';
}

const YT_PARAMS = 'autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1';

const makeIframe = (id: string, title: string, width: number, height: number) =>
  `<iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/${id}?${YT_PARAMS}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

export const TIKTOK_VIDEOS: VideoItem[] = [
  {
    id: '4mode-faucet',
    title: '4Mode Faucet',
    img: '/ASSETS/TikTok/4Mode Faucet.webp',
    src: '',
    iframe: makeIframe('tnSqPTFp4ko', '4Mode Faucet', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'ripsurf',
    title: 'RipSurf Skateboard',
    img: 'ASSETS/TikTok/surfing.webp',
    src: '',
    iframe: makeIframe('1METwZVTdr4', 'RipSurf Skateboard', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'mosquito-bracelet',
    title: 'Mosquito Bracelet',
    img: 'ASSETS/TikTok/Mosquito Bracelet .webp',
    src: '',
    iframe: makeIframe('Y0Sm0erPUxQ', 'Mosquito Bracelet', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'waterproof-phone',
    title: 'Waterproof Phone Holder',
    img: 'ASSETS/TikTok/Water Proof PhoneHolder.webp',
    src: '',
    iframe: makeIframe('EKPoBKpOs4c', 'Water Proof PhoneHolder', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'facemask-machine',
    title: 'Wholefacemask Machine',
    img: 'ASSETS/TikTok/Wholefacemask Maker Machine.webp',
    src: '',
    iframe: makeIframe('KJYzpGujX9o', 'Wholefacemask Maker Machine', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'shoe-cleaner',
    title: 'Shoe Cleaner',
    img: 'ASSETS/TikTok/Shoe Cleaner.webp',
    src: '',
    iframe: makeIframe('rIPqaa9bejc', 'Shoe Cleaner', 479, 852),
    aspect: '9/16',
    category: 'tiktok',
  },
];

export const META_VIDEOS: VideoItem[] = [
  {
    id: 'intense-pulsed-light',
    title: 'Intense Pulsed Light',
    img: 'ASSETS/Meta Ads/Intense Pulsed Light - 101.webp',
    src: '',
    iframe: makeIframe('HqdRVE4NiNw', 'Intense Pulsed Light', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'robot',
    title: 'Robot',
    img: 'ASSETS/Meta Ads/Robot - 101.webp',
    src: '',
    iframe: makeIframe('SefQKfdHQ3Q', 'Robot Companion', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'triple-monitor',
    title: 'Triple Monitor',
    img: 'ASSETS/Meta Ads/Triple Monitor - 101.webp',
    src: '',
    iframe: makeIframe('i-dCNcvyi5o', 'Triple Monitor', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'a-maze-ball',
    title: 'A-Maze Ball',
    img: 'ASSETS/Meta Ads/A Maze Ball.webp',
    src: '',
    iframe: makeIframe('STRRFLww3Ws', 'A-Maze Ball', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'lint-remover',
    title: 'Lint Remover',
    img: 'ASSETS/Meta Ads/Lint Remover.webp',
    src: '',
    iframe: makeIframe('OwpDjaK52Mw', 'Lint Remover', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'sunscreen-applicator',
    title: 'Sunscreen Applicator',
    img: 'ASSETS/Meta Ads/Sunscreen Applicator.webp',
    src: '',
    iframe: makeIframe('lYRavOIoj3c', 'Sunscreen Applicator', 852, 852),
    aspect: '1/1',
    category: 'meta',
  },
];

export const CAROUSEL_VIDEOS = [...TIKTOK_VIDEOS, ...META_VIDEOS];