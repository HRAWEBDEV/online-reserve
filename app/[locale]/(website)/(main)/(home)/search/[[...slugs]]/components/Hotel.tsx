import { useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { type ListViewOptions } from '../utils/listViewOptions';
import { addClass } from '@/utils/addClass';
import { Theme, alpha } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { AnimatePresence, motion } from 'motion/react';

const chipsStyles = {
 borderRadius: '0.3rem',
 backgroundColor: 'transparent',
 fontSize: '0.75rem',
 border: (theme: Theme) => `1px solid ${theme.palette.neutral['300']}`,
 color: (theme: Theme) => theme.palette.neutral['500'],
 height: 'auto',
 padding: '0.2rem 0.5rem',
 '& .MuiChip-label': {
  padding: 0,
 },
};

type TProps = {
 listViewMode: ListViewOptions;
};

export default function Hotel({ listViewMode }: TProps) {
 const [quickReserveState, setQuickReserveState] = useState<'close' | 'open'>(
  'close'
 );
 return (
  <article className='border border-neutral-300 rounded-lg overflow-hidden'>
   <div className={`${addClass(listViewMode === 'list', 'flex')}`}>
    <div
     className={`border-b border-neutral-300 ${addClass(
      listViewMode === 'list',
      'w-[18rem] border-e border-b-0'
     )}`}
    >
     <Swiper
      pagination={{
       clickable: true,
      }}
      modules={[Pagination]}
      className='[&]:[--swiper-pagination-bullet-inactive-color:white] [&]:[--swiper-pagination-bullet-inactive-opacity:0.7] [&]:[--swiper-pagination-color:white] [&]:[--swiper-pagination-bullet-width:0.5rem] [&]:[--swiper-pagination-bullet-height:0.5rem]'
     >
      {Array.from({ length: 2 }, (_, i) => i).map((item) => (
       <SwiperSlide key={item}>
        <Link
         href='#'
         className={`block h-[15rem] lg:h-[18rem] ${addClass(
          listViewMode === 'list',
          'lg:!h-[14rem]'
         )}`}
        >
         <img
          className='w-full h-full'
          src='/images/hotels/mashhad-almas.jpg'
          alt='hotel image'
         />
        </Link>
       </SwiperSlide>
      ))}
     </Swiper>
    </div>
    <div
     className={`p-4 ${addClass(
      listViewMode === 'list',
      'flex-grow flex flex-col border-e border-neutral-300'
     )}`}
    >
     <div className='mb-2 flex flex-wrap gap-2'>
      <p
       className={`font-medium text-base ${addClass(
        listViewMode === 'list',
        'text-lg'
       )}`}
      >
       هتل نگین مصلی مشهد
      </p>
      <div>
       {[1, 2, 3, 4, 5].map((item) => (
        <StarIcon fontSize='small' key={item} color='warning' />
       ))}
      </div>
     </div>
     <div className={`mb-4 ${addClass(listViewMode === 'list', 'flex-grow')}`}>
      <p className='text-neutral-500'>مشهد، خیابان سوم ، نرسیده به خیابان</p>
     </div>
     <div className='flex gap-2 flex-wrap'>
      <Chip sx={chipsStyles} label='ترانسفر رایگان' />
      <Chip sx={chipsStyles} label='نیم شارژ رایگان' />
      <Chip sx={chipsStyles} label='نزدیک حرم' />
     </div>
    </div>
    <div
     className={`p-4 flex justify-between gap-4 items-center flex-wrap ${addClass(
      listViewMode === 'list',
      '!justify-center flex-col w-[16rem]'
     )}`}
    >
     <div className='flex items-center gap-1'>
      <span className='font-light'>از</span>
      <div className='font-bold text-base'>
       <span>{new Intl.NumberFormat('fa').format(25000000)}</span>
       <span>ریال</span>
      </div>
      <span className='font-light'>/ شبی</span>
     </div>
     <Button
      size={listViewMode === 'list' ? 'large' : 'small'}
      disableElevation
      variant='contained'
      className={`${addClass(listViewMode === 'list', 'w-full')}`}
     >
      مشاهده قیمت ها
     </Button>
    </div>
   </div>
   {/* quick reservation */}
   {listViewMode === 'list' && (
    <>
     <AnimatePresence>
      {quickReserveState === 'open' && (
       <motion.div
        className='border-t border-neutral-300 bg-primary-light/10 overflow-hidden'
        initial={{
         height: 0,
        }}
        animate={{
         height: 'auto',
        }}
        exit={{
         height: 0,
        }}
       >
        <div className='p-4'>
         <Swiper
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
          {Array.from({ length: 20 }, (_, i) => i).map((item) => (
           <SwiperSlide key={item}>
            <div className='border-e border-neutral-300 p-4 py-2 '>
             <p className='font-medium text-[0.8rem] mb-2'>دوتخته دوبل</p>
             <div className='flex items-center gap-1 mb-4 text-[0.8rem]'>
              <div className='font-bold'>
               <span>{new Intl.NumberFormat('fa').format(25000000)}</span>
               <span>ریال</span>
              </div>
              <span className='font-light'>/ شبی</span>
             </div>
             <div>
              <Button
               color='secondary'
               size='small'
               className='w-full'
               variant='outlined'
               sx={{
                fontWeight: 500,
                backgroundColor: (theme) =>
                 alpha(theme.palette.orange['100'], 0.5),
               }}
              >
               رزرو
              </Button>
             </div>
            </div>
           </SwiperSlide>
          ))}
         </Swiper>
        </div>
       </motion.div>
      )}
     </AnimatePresence>
     <div className='border-t border-neutral-300 bg-primary-light/10 text-center'>
      <Button
       size='large'
       onClick={() => {
        setQuickReserveState((pre) => (pre === 'open' ? 'close' : 'open'));
       }}
       sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
      >
       <span>رزرو سریع</span>
       {quickReserveState === 'open' ? (
        <ArrowDropUpIcon />
       ) : (
        <ArrowDropDownIcon />
       )}
      </Button>
     </div>
    </>
   )}
  </article>
 );
}
