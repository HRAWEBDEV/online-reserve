'use client';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import HotelLocation from './HotelLocation';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function HotelReview() {
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
     <Button variant='contained' disableElevation>
      <ShareIcon fontSize='small' />
      <span className='ps-2 hidden lg:inline-block'>اشتراک گذاری</span>
     </Button>
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
    <article className='grid lg:grid-cols-[3fr_1fr] gap-4'>
     <section>
      <div className='grid gap-3 md:grid-cols-[4fr_2fr] overflow-hidden'>
       <Swiper className='w-full'>
        <SwiperSlide className='md:rounded-lg overflow-hidden'>
         <div>
          <img
           className='h-full w-full object-cover'
           src='/images/hotels/hotel-slider.jpg'
           alt='hotel image'
          />
         </div>
        </SwiperSlide>
       </Swiper>
       <div className='hidden md:flex flex-col gap-4'>
        <div className='rounded-lg overflow-hidden basis-0 flex-grow'>
         <img
          className='h-full w-full object-cover'
          src='/images/hotels/hotel-slider-5.jpg'
          alt='hotel image'
         />
        </div>
        <div className='rounded-lg overflow-hidden basis-0 flex-grow'>
         <img
          className='h-full w-full object-cover'
          src='/images/hotels/hotel-slider-3.jpg'
          alt='hotel image'
         />
        </div>
       </div>
      </div>
     </section>
     <section className='hidden lg:block border border-neutral-200 rounded-lg bg-neutral-100 gap-4'>
      <HotelLocation />
     </section>
    </article>
   </section>
  </section>
 );
}
