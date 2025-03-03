'use client';
import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import SelectedRoomsList from './SelectedRoomsList';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';

export default function RoomSection() {
 const { isFetchingRooms, rooms, nights } = useRoomsInfoContext();
 return (
  <section id='rooms'>
   <div className='container'>
    <header className='mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
    </header>
    <RoomsFilters />
    <div className='grid gap-4 lg:grid-cols-[1fr_20rem] mb-8'>
     <RoomsList
      rooms={rooms}
      isLoadingRooms={isFetchingRooms}
      nights={nights}
     />
     <SelectedRoomsList />
    </div>
   </div>
  </section>
 );
}
