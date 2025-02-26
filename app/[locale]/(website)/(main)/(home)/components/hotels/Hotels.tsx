'use client';
import Button from '@mui/material/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

const hotels = [
 {
  title: 'هتل پیروزی اصفهان',
  image: '/images/yazd.jpg',
 },
 {
  title: 'هتل الماس',
  image: '/images/esfahan.jpg',
 },
 {
  title: 'هتل شیراز',
  image: '/images/bandareabbas.jpg',
 },
 {
  title: 'هتل تهران',
  image: '/images/tabriz.jpg',
 },
 {
  title: 'هتل پیروزی اصفهان',
  image: '/images/yazd.jpg',
 },
];

export default function Hotels() {
 return (
  <section className='container mt-4 mb-10'>
   <div className='flex gap-4 items-center mb-4'>
    <h3 className='text-lg font-medium flex-grow text-center lg:text-start'>
     هتل ها
    </h3>
    <div className='hidden lg:block'>
     <Button variant='outlined'>
      <span>نمایش همه ی هتل ها</span>
     </Button>
    </div>
   </div>
   <Swiper
    className='mb-4'
    spaceBetween={16}
    slidesPerView={2.2}
    breakpoints={{
     768: {
      slidesPerView: 3.2,
     },
     1024: {
      slidesPerView: 4.2,
     },
    }}
   >
    {hotels.map((slide, i) => (
     <SwiperSlide key={i}>
      <Link
       href={'#'}
       className='flex flex-col relative scale-95 [&:is(:hover,:focus)]:scale-100 transition-transform'
      >
       <div className='overflow-hidden rounded-lg h-[8rem] lg:h-[10rem]'>
        <img
         className='max-h-[100%] h-full w-full object-cover object-center'
         src={slide.image}
         alt='hotels image'
        />
       </div>
       <div className='p-4 py-3'>
        <p className='font-medium text-base'>{slide.title}</p>
       </div>
      </Link>
     </SwiperSlide>
    ))}
   </Swiper>
   <Button size='large' variant='outlined' className='w-full lg:!hidden'>
    <span>نمایش همه ی هتل ها</span>
   </Button>
  </section>
 );
}
