import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import SelectedRoomsList from './SelectedRoomsList';

export default function RoomSection() {
 return (
  <section id='rooms'>
   <div className='container'>
    <header className='mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
    </header>
    <RoomsFilters />
    <div className='grid gap-4 lg:grid-cols-[1fr_20rem] mb-8'>
     <RoomsList />
     <SelectedRoomsList />
    </div>
   </div>
  </section>
 );
}
