'use client';
import GuestInfo from './guest-info/GuestInfo';
import ReserveInfo from './ReserveInfo';
import ConfirmReserveProvider from '../services/ConfirmReserveProvider';

export default function Form() {
 return (
  <section className='container flex flex-col lg:flex-row gap-4 mb-10'>
   <ConfirmReserveProvider>
    <GuestInfo />
    <ReserveInfo />
   </ConfirmReserveProvider>
  </section>
 );
}
