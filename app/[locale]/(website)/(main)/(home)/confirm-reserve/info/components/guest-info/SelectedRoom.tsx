'use client';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

export default function SelectedRoom() {
 const [guestType, setGuestType] = useState<'normal' | 'foreign'>('normal');
 return (
  <div className='mb-4'>
   <div className='flex gap-2 items-center mb-4'>
    <p>
     <span className='text-neutral-600'>اتاق {1}: </span>
     <span className='font-medium text-[0.9rem]'>سوئیت دبل</span>
    </p>
    <div className='bg-neutral-300 h-[1px] flex-grow'></div>
   </div>
   <div className='grid grid-cols-2 gap-4 mb-6'>
    <div className='col-span-full'>
     <FormControlLabel
      label='نام رزرو کننده با سرپرست اتاق یکی می‌باشد.'
      control={<Checkbox />}
     />
    </div>
    <div className='col-span-full'>
     <ToggleButtonGroup
      color='error'
      exclusive
      value={guestType}
      onChange={(_, value) => setGuestType(value)}
     >
      <ToggleButton value='normal'>مهمان داخلی</ToggleButton>
      <ToggleButton value='foreign'>مهمان خارجی</ToggleButton>
     </ToggleButtonGroup>
    </div>
    <TextField size='medium' label='نام و نام‌خانوادگی' />
    <TextField size='medium' label='کدملی' />
   </div>
  </div>
 );
}
