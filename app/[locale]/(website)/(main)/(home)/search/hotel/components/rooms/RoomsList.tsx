'use client';
import { useState, useMemo } from 'react';
import PricingCalendar from '../pricing-calendar/PricingCalendar';
import Skeleton from '@mui/material/Skeleton';
import Room from './Room';
import { useInternalID } from '@/hooks/useInternalID';
import { type RoomInventory } from '../../services/HotelApiActions';

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

 const selectedRoom = useMemo(
  () =>
   selectedRoomId
    ? rooms.find((item) => item.internalID === selectedRoomId) || null
    : null,
  [rooms, selectedRoomId]
 );

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
 console.log(selectedRoom, selectedRoomPlan);

 return (
  <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
   {isLoadingRooms ? (
    <>
     {[1, 2, 3, 4].map((item) => (
      <Skeleton
       key={item}
       variant='rounded'
       height={150}
       width={'100%'}
       sx={{ backgroundColor: (theme) => theme.palette.neutral[200] }}
      />
     ))}
    </>
   ) : (
    <>
     {rooms.map((room) => {
      getID(room);
      return (
       <>
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
       </>
      );
     })}
    </>
   )}
   {selectedRoom && selectedRoomPlan && (
    <PricingCalendar
     open={showPricingCalendar}
     selectedRoom={selectedRoom}
     selectedRoomPlan={selectedRoomPlan}
     onCloseCalendar={() => setShowPricingCalendar(false)}
    />
   )}
  </section>
 );
}
