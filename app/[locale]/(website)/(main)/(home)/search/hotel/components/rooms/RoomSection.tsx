'use client';
import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';

export default function RoomSection() {
 const { isFetchingRooms, rooms, nights } = useRoomsInfoContext();
 return (
  <section id='rooms'>
   <div>
    <header className='container mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
    </header>
    <RoomsFilters />
    <div className='container grid gap-4 mb-8 mx-auto w-[min(65rem,100%)]'>
     <RoomsList
      rooms={rooms}
      isLoadingRooms={isFetchingRooms}
      nights={nights}
     />
    </div>
   </div>
  </section>
 );
}
