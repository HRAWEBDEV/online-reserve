'use client';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';

export default function RoomSection() {
 const { isQueryTrue, handleToggle } = useQueryToggler('show-rooms-filters');
 const { isFetchingRooms, rooms, nights } = useRoomsInfoContext();
 return (
  <section id='rooms' className='mb-10'>
   <div>
    <header className='container mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
    </header>
    <RoomsFilters showFilters={isQueryTrue} toggleFilters={handleToggle} />
    <div className='container grid gap-4 mb-8 mx-auto w-[min(65rem,100%)]'>
     <RoomsList
      toggleFilters={handleToggle}
      rooms={rooms}
      isLoadingRooms={isFetchingRooms}
      nights={nights}
     />
    </div>
   </div>
  </section>
 );
}
