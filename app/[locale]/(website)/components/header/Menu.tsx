'use client';
import { useState } from 'react';
import { websiteMenu } from '../../utils/websiteMenu';
import Link from 'next/link';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import HotelReservationMenu from './HotelReservationMenu';
import { addClass } from '@/utils/addClass';

export default function Menu() {
 const [reserveHotelAnchorEl, setReserveHotelAnchorEl] =
  useState<HTMLAnchorElement | null>(null);
 const { isLargeDevice } = useAppMonitorConfig();
 return (
  <>
   {isLargeDevice ? (
    <div className='ms-8 flex-grow self-stretch hidden lg:block'>
     <ul className='gap-6 h-full flex'>
      {websiteMenu.map((menu) => (
       <li key={menu.type}>
        <Link
         onMouseEnter={(e) => {
          const targetLink = e.currentTarget;
          if (menu.type == 'hotelReservation') {
           setReserveHotelAnchorEl(targetLink);
           return;
          }
         }}
         href='#'
         className={`font-medium transition-colors hover:text-secondary-light focus:text-secondary-light flex items-center h-full ${addClass(
          menu.type === 'hotelReservation' && !!reserveHotelAnchorEl,
          'text-secondary-light'
         )}`}
        >
         {menu.title}
        </Link>
        {menu.type === 'hotelReservation' && (
         <HotelReservationMenu
          reserveHotelAnchorEl={reserveHotelAnchorEl}
          setReserveHotelAnchorEl={setReserveHotelAnchorEl}
         />
        )}
       </li>
      ))}
     </ul>
    </div>
   ) : null}
  </>
 );
}
