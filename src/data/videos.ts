export interface VideoItem {
  id: string;
  title: string;
  img: string;
  src: string;
  aspect: '9/16' | '1/1';
  category: 'tiktok' | 'meta';
}

export const TIKTOK_VIDEOS: VideoItem[] = [
  {
    id: '4mode-faucet',
    title: '4Mode Faucet',
    img: 'ASSETS/TikTok/4Mode Faucet.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/4Mode_Faucet_wtc6c2.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'mini-shaver',
    title: 'Mini Shaver',
    img: 'ASSETS/TikTok/Mini Shaver.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Mini_Shaver_mftsiw.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'ripsurf',
    title: 'RipSurf Skateboard',
    img: 'ASSETS/TikTok/surfing.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/RipSurf_Skateboard_-_101_mtnk7r.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'mosquito-bracelet',
    title: 'Mosquito Bracelet',
    img: 'ASSETS/TikTok/Mosquito Bracelet .png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Mosquito_Bracelet_kjvqum.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'waterproof-phone',
    title: 'Waterproof Phone Holder',
    img: 'ASSETS/TikTok/Water Proof PhoneHolder.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Waterproof_Phoneholder_dzuzka.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'facemask-machine',
    title: 'Wholefacemask Machine',
    img: 'ASSETS/TikTok/Wholefacemask Maker Machine.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Wholefacemask_machine_zwco4l.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'shoe-cleaner',
    title: 'Shoe Cleaner',
    img: 'ASSETS/TikTok/Shoe Cleaner.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Shoe_Cleaner_9x16_ur1zvu.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
];

export const META_VIDEOS: VideoItem[] = [
  {
    id: 'intense-pulsed-light',
    title: 'Intense Pulsed Light',
    img: 'ASSETS/Meta Ads/Intense Pulsed Light - 101.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Intense_Pulsed_Light_-_101_2x_byh5yg.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'robot',
    title: 'Robot',
    img: 'ASSETS/Meta Ads/Robot - 101.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Robot_-_101_owwzv7.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'triple-monitor',
    title: 'Triple Monitor',
    img: 'ASSETS/Meta Ads/Triple Monitor - 101.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Triple_Monitor_-_101_exbx5e.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'a-maze-ball',
    title: 'A-Maze Ball',
    img: 'ASSETS/Meta Ads/A Maze Ball.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/A-Maze_Ball_gjcxlq.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'lint-remover',
    title: 'Lint Remover',
    img: 'ASSETS/Meta Ads/Lint Remover.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Lint_Remover_wp3zce.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'sunscreen-applicator',
    title: 'Sunscreen Applicator',
    img: 'ASSETS/Meta Ads/Sunscreen Applicator.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Sunscreen_Applicator_teqhiu.mp4',
    aspect: '1/1',
    category: 'meta',
  },
];

export const CAROUSEL_VIDEOS = [...TIKTOK_VIDEOS, ...META_VIDEOS];