'use client';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckIcon from '@mui/icons-material/Check';
import { currencyFormatter } from '@/app/utils/currencyFormatter';

export default function Invoice() {
 return (
  <form className='p-4 order-2 lg:order-1 lg:flex-grow rounded-lg border border-neutral-300'>
   <section className='mb-16'>
    <div>
     <div className='flex items-center gap-4'>
      <div>
       <p className='font-medium text-lg'>جمع کل:</p>
      </div>
      <div className='text-lg font-medium'>
       <span className='me-2'>{currencyFormatter.format(120000000)}</span>
       <span>ریال</span>
      </div>
     </div>
    </div>
   </section>
   <section className='mb-12'>
    <h3 className='font-medium text-base mb-10'>روش پرداخت:</h3>
    <div className='grid grid-cols-2 gap-4'>
     <Button
      variant='outlined'
      className='!rounded-lg !border-neutral-400 min-h-[8rem] !bg-neutral-100'
      sx={{
       justifyContent: 'unset',
       alignItems: 'unset',
       textAlign: 'start',
       fontSize: 'inherit',
       color: 'inherit',
      }}
     >
      <div className='flex items-start gap-6'>
       <div className='text-neutral-500'>
        <CreditCardIcon sx={{ fontSize: '3rem' }} />
       </div>
       <div>
        <p className='text-base font-medium mt-2 flex items-center gap-2'>
         <CheckIcon sx={{ fontSize: '1.5rem' }} color='success' />
         <span>پرداخت آنلاین</span>
        </p>
        <p className='mt-2 text-neutral-600 text-[0.75rem]'>
         لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ لورم ایپسوم
         متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
        </p>
       </div>
      </div>
     </Button>
    </div>
   </section>
   <div className='flex justify-end'>
    <Button variant='contained' size='large' className='w-[12rem]'>
     پرداخت
    </Button>
   </div>
  </form>
 );
}
