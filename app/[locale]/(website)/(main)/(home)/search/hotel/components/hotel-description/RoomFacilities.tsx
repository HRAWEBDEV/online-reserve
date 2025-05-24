'use client';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { type Facilities } from '../../services/HotelApiActions';

type Props = {
 facilities: Facilities[];
};

const visibleItemsLimit = 5;
export default function RoomFacilities({ facilities }: Props) {
 const [showMore, setShowMore] = useState(false);
 const visibleFacilities = showMore
  ? facilities
  : facilities.slice(0, visibleItemsLimit);

 return (
  <div>
   <h4 className='text-lg text-secondary-dark font-medium mb-4 text-center'>
    امکانات اتاق
   </h4>
   <div className='flex flex-wrap items-center gap-2'>
    {visibleFacilities.map((item) => (
     <Chip
      key={item.key}
      label={item.value}
      sx={{
       paddingInline: '0.5rem',
      }}
     />
    ))}
    {facilities.length > visibleItemsLimit && (
     <Button
      sx={{ borderRadius: '2rem', paddingInline: '0.8rem' }}
      size='small'
      color='secondary'
      variant='outlined'
      onClick={() => setShowMore(!showMore)}
     >
      {showMore ? (
       <>
        <span>مشاهده کمتر</span>
       </>
      ) : (
       <span>مشاهده همه</span>
      )}
     </Button>
    )}
   </div>
  </div>
 );
}
