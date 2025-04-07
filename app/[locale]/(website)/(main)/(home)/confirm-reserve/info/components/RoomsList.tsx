'use client';
import { Fragment } from 'react';
import Room from './Room';

export default function RoomsList() {
 if (false) {
  return (
   <div className='grid place-content-center font-medium text-base'>
    اتاقی یافت نشد.
   </div>
  );
 }
 return (
  <>
   <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1 relative'>
    {[1, 2, 3].map((room) => {
     return (
      <Fragment key={room}>
       {[1, 2, 3].map((roomPlan) => {
        return <Room key={roomPlan} />;
       })}
      </Fragment>
     );
    })}
   </section>
  </>
 );
}
