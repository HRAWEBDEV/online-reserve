'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';

export default function VoucherWrapper() {
 return (
  <div className='w-[min(100%,50rem)] mx-auto mt-12 mb-12 min-h-[20rem] border border-neutral-300 rounded-lg p-4 flex flex-col items-center justify-center'>
   <div className='text-teal-800 text-4xl mb-4'>
    <CheckCircleIcon sx={{ fontSize: '8rem' }} />
   </div>
   <div className='text-2xl font-medium mb-12'>رزرو شما با موفقیت ثبت شد</div>
   <div className='text-sm text-neutral-500 flex gap-4'>
    <Button className='w-[12rem]' variant='outlined' size='large'>
     بازگشت به صفحه اصلی
    </Button>
    <Button
     className='w-[12rem]'
     variant='contained'
     color='success'
     size='large'
    >
     دانلود واچر رزرو
    </Button>
   </div>
  </div>
 );
}
