import React from 'react';

export default function BookingBanner() {
 return (
  <article className='pb-8 relative grid'>
   <div className='absolute w-full top-0 bottom-0 z-[-1] before:absolute before:top-0 before:w-full before:h-[30%] after:absolute after:bottom-0 after:w-full after:h-[30%] before:bg-gradient-to-b before:from-white before:to-[hsla(0,0%,100%,0)] after:bg-gradient-to-t after:from-white after:to-[hsla(0,0%,100%,0)]'></div>
   <div className='pt-20 container text-center lg:text-start'>
    <div></div>
    <h1 className='text-lg lg:text-2xl font-bold mb-2'>
     رزرو آنلاین هتل و اقامتگاه
    </h1>
    <p className='text-neutral-200'>
     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
    </p>
   </div>
  </article>
 );
}
