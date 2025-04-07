'use client';
import { useState, Fragment } from 'react';
import PricingCalendar from '../pricing-calendar/PricingCalendar';
import Skeleton from '@mui/material/Skeleton';
import Room from './Room';
import { type RoomInventory } from '../../services/HotelApiActions';
import { useInternalID } from '@/hooks/useInternalID';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import TuneIcon from '@mui/icons-material/Tune';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { useFormContext } from 'react-hook-form';
import { type RoomsFilterSchema } from '../../schema/roomsFilterSchema';

type Props = {
 isLoadingRooms: boolean;
 rooms: RoomInventory[];
 nights: number;
 toggleFilters: () => void;
};

export default function RoomsList({
 isLoadingRooms,
 rooms,
 nights,
 toggleFilters,
}: Props) {
 const { getValues, watch } = useFormContext<RoomsFilterSchema>();
 const [] = watch(['bedCount', 'noBreakfast', 'noPenalty', 'fullBoard']);
 const { isLargeDevice } = useAppMonitorConfig();
 const { getID } = useInternalID();
 const [showPricingCalendar, setShowPricingCalendar] = useState(false);
 const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
 const [selectedRoomPlanId, setSelectedRoomPlanId] = useState<number | null>(
  null
 );

 const selectedRoom = selectedRoomId
  ? rooms.find((item) => item.internalID === selectedRoomId) || null
  : null;

 const selectedRoomPlan =
  selectedRoomPlanId && selectedRoom
   ? selectedRoom.accommodationTypePrices.find(
      (item) => item.internalID === selectedRoomPlanId
     ) || null
   : null;

 const activeFilters = (() => {
  const countFilterKeys = ['bedCount', 'noBreakfast', 'fullBoard', 'noPenalty'];
  let activeFilters = 0;
  for (const key of countFilterKeys) {
   if (key === 'bedCount' && getValues('bedCount') !== 'all') {
    ++activeFilters;
    continue;
   }
   if (key !== 'bedCount' && getValues(key as keyof RoomsFilterSchema)) {
    ++activeFilters;
   }
  }
  return activeFilters;
 })();

 function showPriceCalendar({
  roomID,
  roomPlanID,
 }: {
  roomID: number;
  roomPlanID: number;
 }) {
  setSelectedRoomId(roomID);
  setSelectedRoomPlanId(roomPlanID);
  setShowPricingCalendar(true);
 }
 if (isLoadingRooms) {
  return (
   <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
    {[1, 2, 3, 4].map((item) => (
     <Skeleton
      key={item}
      variant='rounded'
      height={150}
      width={'100%'}
      sx={{ backgroundColor: (theme) => theme.palette.neutral[200] }}
     />
    ))}
   </section>
  );
 }
 if (!rooms.length) {
  return (
   <div className='grid place-content-center font-medium text-base'>
    اتاقی یافت نشد.
   </div>
  );
 }
 return (
  <>
   <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1 relative'>
    {rooms.map((room) => {
     getID(room);
     return (
      <Fragment key={room.internalID}>
       {room.accommodationTypePrices.map((roomPlan) => {
        getID(roomPlan);
        return (
         <Room
          key={roomPlan.internalID}
          showPriceCalendar={showPriceCalendar}
          nights={nights}
          roomPlan={roomPlan}
          room={room}
         />
        );
       })}
      </Fragment>
     );
    })}
    {showPricingCalendar && selectedRoom && selectedRoomPlan && (
     <PricingCalendar
      open={showPricingCalendar}
      selectedRoom={selectedRoom}
      selectedRoomPlan={selectedRoomPlan}
      onCloseCalendar={() => {
       setSelectedRoomPlanId(null);
       setSelectedRoomId(null);
       setShowPricingCalendar(false);
      }}
     />
    )}
   </section>
   {!isLargeDevice && (
    <div className='sticky bottom-10 z-10 flex justify-center start-0 end-0'>
     <Button
      onClick={toggleFilters}
      className='!bg-primary-foreground'
      sx={{ borderRadius: '2rem' }}
      variant='outlined'
      size='large'
     >
      <div className='flex gap-4 items-center'>
       <Badge badgeContent={activeFilters} color='error'>
        <TuneIcon />
       </Badge>
       <span>فیلترها</span>
      </div>
     </Button>
    </div>
   )}
  </>
 );
}
