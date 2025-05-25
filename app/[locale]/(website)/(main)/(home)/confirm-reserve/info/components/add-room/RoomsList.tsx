'use client';
import { Fragment } from 'react';
import Room from './Room';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import TuneIcon from '@mui/icons-material/Tune';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { type RoomInventory } from '../../../../../../services/HotelApiActions';
import { useInternalID } from '@/hooks/useInternalID';
import { type RoomsFilterSchema } from '../../../../search/hotel/schema/roomsFilterSchema';
import { useFormContext } from 'react-hook-form';

type Props = {
 result: number;
 isLoadingRooms: boolean;
 rooms: RoomInventory[];
 nights: number;
 toggleFilters: () => void;
 closeModal: () => void;
};

export default function RoomsList({
 result,
 toggleFilters,
 isLoadingRooms,
 nights,
 rooms,
 closeModal,
}: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { getID } = useInternalID();
 const { getValues } = useFormContext<RoomsFilterSchema>();

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
 if (!result) {
  return (
   <div className='grid place-content-center font-medium text-base'>
    اتاقی یافت نشد.
   </div>
  );
 }
 return (
  <>
   <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1 relative'>
    {rooms
     .filter((item) => item.roomCount)
     .map((room) => {
      getID(room);
      return (
       <Fragment key={room.internalID}>
        {room.accommodationTypePrices.map((roomPlan) => {
         getID(roomPlan);
         return (
          <Room
           key={roomPlan.internalID}
           nights={nights}
           roomPlan={roomPlan}
           room={room}
           closeModal={closeModal}
          />
         );
        })}
       </Fragment>
      );
     })}
   </section>
   {!isLargeDevice && result && (
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
