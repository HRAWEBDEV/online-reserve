import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Dispatch, SetStateAction } from 'react';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import Link from 'next/link';

const hotelTypes = [
 {
  type: 'in',
  title: 'هتل های داخلی',
 },
 {
  type: 'out',
  title: 'هتل های خارجی',
 },
] as const;

const hotelsOptionSyles = {
 textAlign: 'start',
 color: 'inherit',
 justifyContent: 'start',
 fontWeight: 500,
 borderRadius: 0,
 borderInlineStart: '3px solid transparent',
 '&:is(:hover,:foucs)': {
  borderInlineStart: (theme: Theme) =>
   `3px solid ${theme.palette.primary.dark}`,
  backgroundColor: (theme: Theme) => theme.palette.sky['100'],
  color: (theme: Theme) => theme.palette.primary.dark,
 },
};

type TProps = {
 reserveHotelAnchorEl: HTMLAnchorElement | null;
 setReserveHotelAnchorEl: Dispatch<SetStateAction<HTMLAnchorElement | null>>;
};

export default function HotelReservationMenu({
 reserveHotelAnchorEl,
 setReserveHotelAnchorEl,
}: TProps) {
 const [selectedHotelType, setSelectedHotelType] =
  useState<(typeof hotelTypes)[number]['type']>('in');
 return (
  <Popover
   onClose={() => setReserveHotelAnchorEl(null)}
   slotProps={{
    paper: {
     onMouseLeave: () => setReserveHotelAnchorEl(null),
    },
   }}
   sx={{
    '& .MuiPaper-root': {
     minWidth: '26rem',
    },
   }}
   open={Boolean(reserveHotelAnchorEl)}
   anchorEl={reserveHotelAnchorEl}
   transformOrigin={{
    horizontal: 'right',
    vertical: 'top',
   }}
   anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
   }}
  >
   <div className='grid grid-cols-[9rem_1fr]'>
    <div className='border-e border-neutral-300 py-2'>
     {hotelTypes.map((item) => (
      <Button
       size='large'
       key={item.type}
       onMouseEnter={() => setSelectedHotelType(item.type)}
       sx={{
        color: (theme) =>
         item.type === selectedHotelType
          ? theme.palette.primary.dark
          : theme.palette.neutral[600],
        width: '100%',
        fontSize: '0.8rem',
        fontWeight: item.type === selectedHotelType ? 500 : 400,
       }}
      >
       {item.title}
      </Button>
     ))}
    </div>
    <div className='py-2'>
     <ul>
      <li>
       <Button
        LinkComponent={Link}
        href='#'
        className='block p-2 !px-6 w-full'
        sx={hotelsOptionSyles}
       >
        هتل های اصفهان
       </Button>
      </li>
      <li>
       <Button
        LinkComponent={Link}
        href='#'
        className='block p-2 !px-6 w-full'
        sx={hotelsOptionSyles}
       >
        هتل های تهران
       </Button>
      </li>
      <li>
       <Button
        LinkComponent={Link}
        href='#'
        className='block p-2 !px-6 w-full'
        sx={hotelsOptionSyles}
       >
        هتل های گیلان
       </Button>
      </li>
      <li>
       <Button
        LinkComponent={Link}
        href='#'
        className='block p-2 !px-6 w-full'
        sx={hotelsOptionSyles}
       >
        هتل های مازندران
       </Button>
      </li>
      <li>
       <Button
        LinkComponent={Link}
        href='#'
        className='block p-2 !px-6 w-full'
        sx={hotelsOptionSyles}
       >
        هتل های مشهد
       </Button>
      </li>
     </ul>
    </div>
   </div>
  </Popover>
 );
}
