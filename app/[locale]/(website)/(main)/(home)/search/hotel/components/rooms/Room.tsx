import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { currencyFormatter } from '@/app/utils/currencyFormatter';
import {
 type RoomInventory,
 type RoomAccomodationType,
} from '../../services/HotelApiActions';
import Chip from '@mui/material/Chip';
import { addClass } from '@/utils/addClass';
import { ratePlanModel } from '../../utils/ratePlanModel';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Alert from '@mui/material/Alert';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';
import { useFormContext } from 'react-hook-form';
import { type RoomsFilterSchema } from '../../schema/roomsFilterSchema';

const chipStyles = { borderRadius: '0.2rem' };

export default function Room({
 roomPlan,
 room,
 nights,
 showPriceCalendar,
}: {
 roomPlan: RoomAccomodationType;
 showPriceCalendar: (params: { roomID: number; roomPlanID: number }) => void;
 room: RoomInventory;
 nights: number;
}) {
 const { getValues } = useFormContext<RoomsFilterSchema>();
 const router = useRouter();
 const searchParams = useSearchParams();
 const { requestData } = useRoomsInfoContext();

 const discountPercentage = roomPlan.roomOnlineShowRate
  ? Number(
     (
      ((roomPlan.netRoomRate - roomPlan.roomOnlineShowRate) * 100) /
      roomPlan.roomOnlineShowRate
     ).toFixed(0)
    )
  : 0;

 function handleReserveRoom() {
  const { hotelID, channelID, providerID, arzID } = requestData;
  const fromDateValue = getValues('fromDate');
  const untilDateValue = getValues('untilDate');
  const params = new URLSearchParams(searchParams.toString());
  params.set('hotelID', hotelID.toString());
  params.set('channelID', channelID.toString());
  params.set('providerID', providerID.toString());
  params.set('arzID', arzID.toString());
  params.set('roomType', room.roomTypeID.toString());
  params.set('beds', roomPlan.beds.toString());
  params.set('checkinDate', fromDateValue.toISOString());
  params.set('checkoutDate', untilDateValue.toISOString());
  params.set(
   'ratePlan',
   roomPlan.accommodationRatePlanModel.ratePlanID.toString()
  );
  //
  router.push(`/confirm-reserve/info?${params.toString()}`);
 }

 return (
  <article className='rounded-lg border border-neutral-300 lg:flex overflow-hidden'>
   <div className='border-b border-neutral-300 lg:border-b-0 lg:p-2'>
    <Swiper
     pagination
     modules={[Pagination]}
     className='h-[16rem] lg:w-[12rem] lg:h-[12rem] lg:rounded-lg overflow-hidden [&]:[--swiper-pagination-bullet-inactive-color:hsl(var(--primary-foreground))] [&]:[--swiper-pagination-color:hsl(var(--primary-foreground))] [&]:[--swiper-pagination-bullet-inactive-opacity:0.6]'
    >
     {[1, 2].map((item) => (
      <SwiperSlide key={item}>
       <div className='h-full'>
        <img
         loading='lazy'
         className='w-full h-full'
         src='/images/hotels/mashhad-almas.jpg'
         alt='hotel image'
        />
       </div>
      </SwiperSlide>
     ))}
    </Swiper>
   </div>
   <div className='lg:flex lg:flex-grow'>
    <div className='p-4 lg:border-e border-neutral-300 lg:flex-grow flex flex-col'>
     <div className='mb-6 flex-grow'>
      <p className='text-primary text-base font-medium lg:text-lg mb-4'>
       {room.fName}
      </p>
      <div className='flex items-center gap-4 flex-wrap'>
       <div className='flex items-center gap-1 text-neutral-600 font-medium'>
        <PersonOutlineOutlinedIcon />
        <span>تعداد: </span>
        <span>{roomPlan.beds}نفر</span>
       </div>
      </div>
     </div>
     <div className='flex flex-wrap gap-2'>
      {ratePlanModel
       .filter(
        (item) => roomPlan.accommodationRatePlanModel.ratePlanModel[item.type]
       )
       .map((item) => (
        <Chip
         sx={chipStyles}
         key={item.type}
         label={item.name}
         icon={item.icon || undefined}
        />
       ))}
     </div>
     {!room.roomCount && (
      <div className='mt-2'>
       <Alert severity='error'>
        امکان رزرو این اتاق در تاریخ انتخاب شده وجود ندارد، لطفا تاریخ را تغییر
        دهید.
       </Alert>
      </div>
     )}
    </div>
    <div className='p-4 basis-60'>
     <div className='flex items-end justify-end mb-3 gap-2 lg:flex-col lg:items-center'>
      <div className={`${addClass(discountPercentage === 0, 'invisible')}`}>
       <span className='text-[0.85rem] text-red-600 line-through'>
        {currencyFormatter.format(roomPlan.roomOnlineShowRate)}
       </span>
       <span className='bg-teal-100 ms-2 rounded-lg p-1 px-2 hidden lg:inline-block'>
        {discountPercentage}%
       </span>
      </div>
      <div>
       <span className='text-lg font-medium'>
        {currencyFormatter.format(roomPlan.netRoomRate)}
       </span>
       <span className='ps-1'>ریال</span>
       <span>/ {nights}شب</span>
       <span
        className={`bg-teal-100 ms-2 rounded-lg p-1 px-2 inline-block lg:hidden ${addClass(
         discountPercentage === 0,
         'hidden'
        )}`}
       >
        {discountPercentage}%
       </span>
      </div>
      <div></div>
     </div>
     <div className='mb-2'>
      <Button
       size='large'
       className='w-full'
       color='secondary'
       onClick={() =>
        showPriceCalendar({
         roomID: room.internalID!,
         roomPlanID: roomPlan.internalID!,
        })
       }
      >
       <div className='flex gap-1 items-center'>
        <CalendarMonthOutlinedIcon />
        <span>مشاهده تقویم قیمتی</span>
       </div>
      </Button>
     </div>
     <div className='lg:flex lg:justify-center lg:items-center'>
      <Button
       size='large'
       variant='contained'
       className='w-full'
       onClick={handleReserveRoom}
       //  disabled={!room.roomCount}
      >
       ثبت رزرو
      </Button>
     </div>
    </div>
   </div>
  </article>
 );
}
