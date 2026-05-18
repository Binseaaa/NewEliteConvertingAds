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
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/4Mode_Faucet_m2x5wg.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/4Mode_Faucet_wtc6c2.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'mini-shaver',
    title: 'Mini Shaver',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Mini_Shaver_ahz0zt.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Mini_Shaver_mftsiw.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'ripsurf',
    title: 'RipSurf Skateboard',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/surfing_nblxz5.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/RipSurf_Skateboard_-_101_mtnk7r.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'mosquito-bracelet',
    title: 'Mosquito Bracelet',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Mosquito_Bracelet_b9gyb2.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Mosquito_Bracelet_kjvqum.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'waterproof-phone',
    title: 'Waterproof Phone Holder',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Water_Proof_PhoneHolder_csmtmt.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Waterproof_Phoneholder_dzuzka.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'facemask-machine',
    title: 'Wholefacemask Machine',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Wholefacemask_Maker_Machine_n5xr7o.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Wholefacemask_machine_zwco4l.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
  {
    id: 'shoe-cleaner',
    title: 'Shoe Cleaner',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Shoe_Cleaner_ipmecv.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Shoe_Cleaner_9x16_ur1zvu.mp4',
    aspect: '9/16',
    category: 'tiktok',
  },
];

export const META_VIDEOS: VideoItem[] = [
  {
    id: 'intense-pulsed-light',
    title: 'Intense Pulsed Light',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Intense_Pulsed_Light_-_101_pga9ff.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Intense_Pulsed_Light_-_101_2x_byh5yg.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'robot',
    title: 'Robot',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Robot_-_101_e6z5jo.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Robot_-_101_owwzv7.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'triple-monitor',
    title: 'Triple Monitor',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Triple_Monitor_-_101_fpjv8x.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Triple_Monitor_-_101_exbx5e.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'a-maze-ball',
    title: 'A-Maze Ball',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/A_Maze_Ball_i7cln0.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/A-Maze_Ball_gjcxlq.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'lint-remover',
    title: 'Lint Remover',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Lint_Remover_iopwqu.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Lint_Remover_wp3zce.mp4',
    aspect: '1/1',
    category: 'meta',
  },
  {
    id: 'sunscreen-applicator',
    title: 'Sunscreen Applicator',
    img: 'https://res.cloudinary.com/drmpnuh83/image/upload/Sunscreen_Applicator_ag5q8z.png',
    src: 'https://res.cloudinary.com/drmpnuh83/video/upload/Sunscreen_Applicator_teqhiu.mp4',
    aspect: '1/1',
    category: 'meta',
  },
];

export const CAROUSEL_VIDEOS = [...TIKTOK_VIDEOS, ...META_VIDEOS];