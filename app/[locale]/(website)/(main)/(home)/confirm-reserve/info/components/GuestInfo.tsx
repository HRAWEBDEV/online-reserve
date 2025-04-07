'use client';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function GuestInfo() {
 return (
  <form className='p-4 order-2 md:order-1 md:flex-grow rounded-lg border border-neutral-300'>
   <div className='flex gap-4 justify-between items-center mb-4'>
    <h3 className='font-medium text-base'>مشخصات رزرو کننده</h3>
    <Button variant='outlined' color='error'>
     <div className='flex items-center gap-2'>
      <AddOutlinedIcon />
      افزودن اتاق
     </div>
    </Button>
   </div>
   <div className='grid grid-cols-2 gap-4 mb-6'>
    <TextField size='medium' label='نام و نام‌خانوادگی' required />
    <TextField size='medium' label='کدملی' required />
    <TextField size='medium' label='پست الکترونیکی' />
    <TextField size='medium' label='شماره همراه' required />
   </div>
   <h3 className='font-medium text-base mb-6'>مشخصات سرپرست اتاق‌ها</h3>
   {[1, 2].map((item) => (
    <div key={item} className='mb-4'>
     <div className='flex gap-2 items-center mb-4'>
      <p>
       <span className='text-neutral-600'>اتاق {item}: </span>
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
      <TextField size='medium' label='نام و نام‌خانوادگی' />
      <TextField size='medium' label='کدملی' />
     </div>
    </div>
   ))}

   <div className='flex justify-end'>
    <Button className='w-[10rem]' size='large' variant='contained'>
     تایید
    </Button>
   </div>
  </form>
 );
}
