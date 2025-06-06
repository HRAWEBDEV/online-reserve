'use client';
import { useState, useRef } from 'react';
import { useAdFiltersScrollWatcher } from '../../../search/[[...slugs]]/utils/useAdFiltersScrollWatcher';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useRoomsInfoContext } from '../services/roomsInfoContext';
import * as dateFns from 'date-fns';
import { useConfirmReserveContext } from '../services/confirmReserveContext';
import Skeleton from '@mui/material/Skeleton';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});
const timeFormatter = new Intl.DateTimeFormat('fa', {
 hour: '2-digit',
 minute: '2-digit',
});
const numberFormatter = new Intl.NumberFormat('fa');

export default function ReserveInfo() {
 const { selectedRooms, isLoadingRooms, loadingAddRoom } =
  useConfirmReserveContext();
 const { checkInDate, checkOutDate } = useRoomsInfoContext();
 const nights = dateFns.differenceInDays(checkOutDate, checkInDate);
 const [showInfo, setShowInfo] = useState(false);
 const formWrapperRef = useRef<HTMLDivElement>(null);
 const formContainterRef = useRef<HTMLDivElement>(null);
 useAdFiltersScrollWatcher({
  formWrapperRef,
  formContainterRef,
  topPadding: 60,
 });

 return (
  <aside ref={formWrapperRef} className='order-1 lg:order-2 lg:w-[25rem]'>
   <div
    ref={formContainterRef}
    className='rounded-lg border border-neutral-300 p-4 sticky'
   >
    <h3 className='font-medium text-base  pb-4 border-b border-neutral-300'>
     هتل الماس
    </h3>
    <div className='p-4 mb-2'>
     <div className='flex gap-2 items-center'>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ ورود</div>
       <div className='font-medium mb-1'>
        {dateFormatter.format(checkInDate)}
       </div>
       <div>{timeFormatter.format(new Date())}</div>
      </div>
      <div className='flex flex-col items-center text-secondary-dark'>
       <span className='font-medium'>{nights} شب</span>
       <div className='flex items-center'>
        <ArrowLeftIcon className='-ms-3 invisible' />
        <span className='w-[3rem] h-[1px] bg-secondary-dark'></span>
        <ArrowLeftIcon className='-ms-3' />
       </div>
      </div>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ خروج</div>
       <div className='font-medium'>{dateFormatter.format(checkOutDate)}</div>
       <div>{timeFormatter.format(new Date())}</div>
      </div>
     </div>
    </div>
    {(isLoadingRooms || loadingAddRoom) && (
     <div className='p-4 mb-2'>
      <Skeleton
       variant='rounded'
       height={80}
       width='100%'
       sx={{ backgroundColor: (theme) => theme.palette.neutral[200] }}
      />
     </div>
    )}
    <div className={`hidden ${showInfo ? '!block' : ''} lg:block`}>
     {selectedRooms.map((room, i) => {
      const discountPercentage = room.accommodationTypePrice.roomOnlineShowRate
       ? Number(
          (
           ((room.accommodationTypePrice.netRoomRate -
            room.accommodationTypePrice.roomOnlineShowRate) *
            100) /
           room.accommodationTypePrice.roomOnlineShowRate
          ).toFixed(0)
         )
       : 0;
      return (
       <div key={room.internalID} className='mb-1'>
        <div className='flex gap-2 items-center mb-3'>
         <p>
          <span className='text-neutral-600'>اتاق {i + 1}: </span>
          <span className='font-medium text-[0.9rem]'>{room.fName}</span>
         </p>
         <div className='bg-neutral-300 h-[1px] flex-grow'></div>
        </div>
        <div>
         <div className='px-4 flex justify-between gap-2 mb-3'>
          <span className='font-medium'>قیمت: </span>
          <div className='flex items-center'>
           {discountPercentage > 0 && (
            <>
             <span className='me-1 font-light text-[0.7rem] text-red-700 line-through'>
              <strong>
               {numberFormatter.format(
                room.accommodationTypePrice.roomOnlineShowRate
               )}
              </strong>{' '}
              ریال
             </span>
             <div className='inline-grid place-items-center bg-teal-700 h-[1.5rem] aspect-square rounded-full me-4 text-primary-foreground text-[0.7rem]'>
              {discountPercentage}%
             </div>
            </>
           )}
           <span>
            <strong>
             {numberFormatter.format(room.accommodationTypePrice.netRoomRate)}
            </strong>{' '}
            ریال
           </span>
          </div>
         </div>
         <Swiper
          className='!pb-6 [&]:[--swiper-pagination-bottom:2px]'
          pagination={{ clickable: true }}
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
           1024: {
            slidesPerView: 3,
           },
          }}
         >
          {Array.from({ length: nights }, (_, i) => i).map((i) => (
           <SwiperSlide key={i}>
            <div className='border border-neutral-300 rounded-lg p-2'>
             <div className='font-medium text-[0.7rem] text-center text-primary-dark border-b border-neutral-300 mb-2 pb-2'>
              {dateFormatter.format(dateFns.addDays(checkInDate, i))}
             </div>
             {/* <div className='flex gap-2 items-center text-[0.7rem] mb-2 justify-center'>
             <span>
              <span className='line-through text-red-600'>
               {numberFormatter.format(1455566000)}
              </span>
             </span>
             <div className='bg-teal-500 text-primary-foreground flex items-center justify-center rounded-full w-[1.5rem] h-[1.5rem] text-[0.75rem] font-medium'>
              12%
             </div>
            </div> */}
             <div className='text-[0.75rem] flex justify-center'>
              <div>
               <strong>
                {numberFormatter.format(
                 room.accommodationTypePrice.dailyPrices[i].price
                )}
               </strong>
               <span className='text-[0.7rem] ps-1'>ریال</span>
              </div>
             </div>
            </div>
           </SwiperSlide>
          ))}
         </Swiper>
        </div>
       </div>
      );
     })}
    </div>
    <div className='lg:hidden'>
     <Button
      fullWidth
      className='!bg-neutral-300'
      onClick={() => setShowInfo((pre) => !pre)}
     >
      {showInfo ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
     </Button>
    </div>
   </div>
  </aside>
 );
}
