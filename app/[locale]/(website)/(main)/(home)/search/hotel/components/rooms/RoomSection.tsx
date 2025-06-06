'use client';
import { useMemo, useRef } from 'react';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';

export default function RoomSection() {
 const { isQueryTrue, handleToggle } = useQueryToggler('show-rooms-filters');
 const { isFetchingRooms, rooms, nights } = useRoomsInfoContext();
 const headerRef = useRef<HTMLHeadingElement>(null);

 const resultCount = useMemo(
  () =>
   (() => {
    return rooms.reduce(
     (acc, cur) => acc + cur.accommodationTypePrices.length,
     0
    );
   })(),
  [rooms]
 );

 return (
  <section id='rooms' className='mb-10'>
   <div>
    <header className='container mb-6' ref={headerRef}>
     <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
    </header>
    <RoomsFilters
     showFilters={isQueryTrue}
     toggleFilters={handleToggle}
     result={resultCount}
     headingRef={headerRef}
    />
    <div className='container grid gap-4 mb-8 mx-auto w-[min(65rem,100%)]'>
     <RoomsList
      result={resultCount}
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
