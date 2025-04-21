'use client';
import { useState } from 'react';
import { ratePlanModel } from '../../../../search/hotel/utils/ratePlanModel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Chip from '@mui/material/Chip';

const chipStyles = { borderRadius: '0.2rem' };

export default function SelectedRoom() {
 const [guestType, setGuestType] = useState<'normal' | 'foreign'>('normal');
 return (
  <div className='mb-4'>
   <div className='flex gap-2 items-center mb-4'>
    <p>
     <span className='text-neutral-600'>اتاق {1}: </span>
     <span className='font-medium text-[0.9rem]'>سوئیت دبل</span>
    </p>
    <div className='bg-neutral-600 h-[1px] flex-grow'></div>
    <IconButton color='error'>
     <DeleteOutlinedIcon />
    </IconButton>
   </div>
   <div className=' grid grid-cols-2 gap-4 mb-6'>
    <div>
     <div className='flex items-center gap-1 text-neutral-600 font-medium'>
      <PersonOutlineOutlinedIcon />
      <span>تعداد: </span>
      <span>{1}نفر</span>
     </div>
    </div>
    <div className='col-span-full flex flex-wrap gap-2'>
     {ratePlanModel.map((item) => (
      <Chip
       sx={chipStyles}
       key={item.type}
       label={item.name}
       icon={item.icon || undefined}
      />
     ))}
    </div>
    <div className='col-span-full flex flex-wrap'>
     <FormControlLabel
      label='نام رزرو کننده با سرپرست اتاق یکی می‌باشد'
      control={<Checkbox />}
     />
     <FormControlLabel label='نیم شارژ ورود' control={<Checkbox />} />
     <FormControlLabel label='نیم شارژ خروج' control={<Checkbox />} />
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
    <TextField label='نام و نام‌خانوادگی' size='small' />
    <TextField label='کدملی' size='small' />
    <div></div>
    <div className='col-span-full grid gap-8 lg:grid-cols-3 grid-cols-1'>
     <div className='grid gap-1 grid-cols-[max-content_1fr_max-content]'>
      <IconButton color='error' className='!bg-red-50'>
       <RemoveCircleOutlineIcon />
      </IconButton>
      <TextField
       fullWidth
       label='بزرگسال'
       size='small'
       slotProps={{ input: { readOnly: true } }}
      />
      <IconButton color='success' className='!bg-teal-50'>
       <ControlPointIcon />
      </IconButton>
     </div>
     <div className='grid gap-1 grid-cols-[max-content_1fr_max-content]'>
      <IconButton color='error' className='!bg-red-50'>
       <RemoveCircleOutlineIcon />
      </IconButton>
      <TextField
       fullWidth
       label='کودک'
       size='small'
       slotProps={{ input: { readOnly: true } }}
      />
      <IconButton color='success' className='!bg-teal-50'>
       <ControlPointIcon />
      </IconButton>
     </div>
     <div className='grid gap-1 grid-cols-[max-content_1fr_max-content]'>
      <IconButton color='error' className='!bg-red-50'>
       <RemoveCircleOutlineIcon />
      </IconButton>
      <TextField
       fullWidth
       label='نوزاد'
       size='small'
       slotProps={{ input: { readOnly: true } }}
      />
      <IconButton color='success' className='!bg-teal-50'>
       <ControlPointIcon />
      </IconButton>
     </div>
    </div>
   </div>
  </div>
 );
}
