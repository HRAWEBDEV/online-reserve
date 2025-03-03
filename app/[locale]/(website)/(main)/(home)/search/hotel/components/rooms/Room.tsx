import Button from '@mui/material/Button';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import IconButton from '@mui/material/IconButton';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { currencyFormatter } from '@/app/utils/currencyFormatter';
import {
 type RoomInventory,
 type RoomAccomodationType,
} from '../../services/HotelApiActions';
import { addClass } from '@/utils/addClass';

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
 const discountPercentage = roomPlan.roomOnlineShowRate
  ? Number(
     (
      ((roomPlan.netRoomRate - roomPlan.roomOnlineShowRate) * 100) /
      roomPlan.roomOnlineShowRate
     ).toFixed(0)
    )
  : 0;

 return (
  <article className='rounded-lg border border-neutral-300 lg:flex overflow-hidden'>
   <div className='border-b border-neutral-300 lg:border-b-0 lg:p-2'>
    <div className='h-[16rem] lg:w-[12rem] lg:h-[12rem] lg:rounded-lg overflow-hidden'>
     <img
      className='w-full h-full'
      src='/images/hotels/mashhad-almas.jpg'
      alt='hotel image'
     />
    </div>
   </div>
   <div className='lg:flex lg:flex-grow'>
    <div className='p-4 border-e border-neutral-300 lg:flex-grow'>
     <div>
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
       <span className='bg-teal-100 ms-2 rounded-lg p-1 px-2 inline-block lg:hidden'>
        40%
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
      <div className='hidden lg:flex lg:items-center'>
       <IconButton color='success'>
        <AddOutlinedIcon />
       </IconButton>
       <div className='bg-neutral-100 p-1 py-2 rounded-lg min-w-11 text-center'>
        0
       </div>
       <IconButton color='error'>
        <RemoveOutlinedIcon />
       </IconButton>
      </div>
      <Button size='large' variant='contained' className='w-full lg:!hidden'>
       ثبت رزرو
      </Button>
     </div>
    </div>
   </div>
  </article>
 );
}
