'use client';
import { useState, Fragment } from 'react';
import PricingCalendar from '../pricing-calendar/PricingCalendar';
import Skeleton from '@mui/material/Skeleton';
import Room from './Room';
import { type RoomInventory } from '../../services/HotelApiActions';
import { useInternalID } from '@/hooks/useInternalID';

type Props = {
 isLoadingRooms: boolean;
 rooms: RoomInventory[];
 nights: number;
};

export default function RoomsList({ isLoadingRooms, rooms, nights }: Props) {
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
  <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
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
 );
}
