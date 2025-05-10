'use client';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import MapIcon from '@mui/icons-material/Map';
import ImageWrapper from '@/components/ImageWrapper';
import { type HotelImage } from '../../services/HotelApiActions';
import { useSlideShowContext } from '@/app/services/slide-show/slideShowContext';

const HotelLocation = dynamic(() => import('./HotelLocation'), {
 loading: () => <div></div>,
 ssr: false,
});

export default function HotelReview({ images }: { images: HotelImage[] }) {
 const [showMap, setShowMap] = useState(false);
 const { showSlideShow } = useSlideShowContext();
 return (
  <section className='mb-8' id='overview'>
   <div className='container flex flex-wrap gap-4 items-start mb-4'>
    <div>
     <div className='flex flex-wrap items-center gap-2 mb-3'>
      <h2 className='font-bold text-2xl lg:text-3xl'>هتل الماس</h2>
      <div>
       {Array.from({ length: 5 }, (_, i) => i).map((item) => (
        <StarIcon key={item} color='warning' />
       ))}
      </div>
     </div>
     <div className='flex flex-wrap gap-2 items-center max=lg:text-base text-neutral-600'>
      <LocationOnIcon color='error' />
      <p>آدرس مشهد ، خیابان جمهوری ، کوچه احمدی</p>
     </div>
    </div>
    <div className='flex gap-4 items-center flex-grow justify-end'>
     <Button
      variant='contained'
      disableElevation
      onClick={() => {
       if (!navigator.share) return;
       navigator.share({
        title: 'آلین: رزرو آنلاین هتل',
        text: 'رزرو آنلاین هتل',
        url: location.href,
       });
      }}
     >
      <ShareIcon fontSize='small' />
      <span className='ps-2 hidden lg:inline-block'>اشتراک گذاری</span>
     </Button>
     <IconButton
      className='lg:!hidden'
      size='medium'
      color='warning'
      onClick={() => setShowMap(true)}
      sx={{
       backgroundColor: (theme) => theme.palette.orange['100'],
       '&:is(:hover,:focus)': {
        backgroundColor: (theme) => theme.palette.orange['200'],
       },
      }}
     >
      <MapIcon fontSize='medium' />
     </IconButton>
     <IconButton
      size='medium'
      color='default'
      sx={{
       backgroundColor: (theme) => theme.palette.neutral['100'],
       '&:is(:hover,:focus)': {
        backgroundColor: (theme) => theme.palette.neutral['200'],
       },
      }}
     >
      <FavoriteIcon fontSize='medium' />
     </IconButton>
    </div>
   </div>
   <section className='md:container'>
    <article className='grid lg:grid-cols-[3fr_1fr] gap-4 '>
     <section>
      <div className='grid gap-3 md:grid-cols-[4fr_2fr] overflow-hidden'>
       <Swiper className='w-full'>
        <SwiperSlide className='md:rounded-lg overflow-hidden'>
         <ImageWrapper
          img={{
           className: 'h-full w-full object-cover cursor-pointer',
           src: images[0]?.imageURL,
           alt: 'hotel image',
           onClick: () => {
            showSlideShow({
             slides: images.map((item) => ({ url: item.imageURL })),
            });
           },
          }}
          wrapper={{
           className: 'h-[23rem]',
          }}
         />
        </SwiperSlide>
       </Swiper>
       <div className='hidden md:flex flex-col gap-4'>
        <div className='rounded-lg overflow-hidden basis-0 flex-grow'>
         <ImageWrapper
          img={{
           className: 'h-full w-full object-cover',
           src: images[1]?.imageURL,
           alt: 'hotel image',
           onClick: () => {
            showSlideShow({
             slides: images.map((item) => ({ url: item.imageURL })),
            });
           },
          }}
          wrapper={{
           className: 'h-full w-full',
          }}
         />
        </div>
        <div className='rounded-lg overflow-hidden basis-0 flex-grow'>
         <ImageWrapper
          img={{
           className: 'h-full w-full object-cover',
           src: images[2]?.imageURL,
           alt: 'hotel image',
           onClick: () => {
            showSlideShow({
             slides: images.map((item) => ({ url: item.imageURL })),
            });
           },
          }}
          wrapper={{
           className: 'h-full w-full',
          }}
         />
        </div>
       </div>
      </div>
     </section>
     <HotelLocation open={showMap} close={() => setShowMap(false)} />
    </article>
   </section>
  </section>
 );
}
