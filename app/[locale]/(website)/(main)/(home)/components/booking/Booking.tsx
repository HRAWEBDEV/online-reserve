'use client';
import { useState } from 'react';
import { bookingTypes } from '../../utils/bookingTypes';
import BookingBanner from './BookingBanner';
import BookignForm from './BookignForm';
import { useIsHomePage } from '../../hooks/useIsHomePage';

export default function Booking() {
 const isHomePage = useIsHomePage();
 const [selectedBookingType, setSelectedBookingType] =
  useState<(typeof bookingTypes)[number]['type']>('hotels');

 function handleChangeBookingType(
  type: (typeof bookingTypes)[number]['type']
 ): void {
  setSelectedBookingType(type);
 }

 return (
  <section className='bg-primary-dark text-primary-foreground'>
   {isHomePage && <BookingBanner />}
   <BookignForm
    isHomePage={isHomePage}
    selectedBookingType={selectedBookingType}
    onChangeSelectedBookingType={handleChangeBookingType}
   />
  </section>
 );
}
