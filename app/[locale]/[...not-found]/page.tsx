import Link from 'next/link';
import Button from '@mui/material/Button';

export default function page() {
 return (
  <div className='h-[100vh] flex flex-col justify-center items-center p-4'>
   <div>
    <img
     src='/images/not-found.png'
     alt='not found image'
     className='dark:brightness-90'
    />
   </div>
   <Button
    variant='contained'
    className='!font-medium'
    LinkComponent={Link}
    href='/'
   >
    برو به صفحه اصلـــی
   </Button>
  </div>
 );
}
