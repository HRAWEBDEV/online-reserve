'use client';
import Button from '@mui/material/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckIcon from '@mui/icons-material/Check';
import { currencyFormatter } from '@/app/utils/currencyFormatter';
import { type LockInfoResult } from '../../services/confirmReserveApiActions';
import Alert from '@mui/material/Alert';

export default function Invoice({
 lockInfo,
 onPayment,
 onPaymentLoading,
}: {
 lockInfo: LockInfoResult;
 onPayment: () => void;
 onPaymentLoading: boolean;
}) {
 return (
  <form className='p-4 order-2 lg:order-1 lg:flex-grow rounded-lg border border-neutral-300'>
   <section className='mb-16'>
    <div>
     <div className='flex items-center gap-4'>
      <div>
       <p className='font-medium text-lg'>جمع کل:</p>
      </div>
      <div className='text-lg font-medium'>
       <span className='me-2'>
        {currencyFormatter.format(lockInfo.lockInfo.totalPrice)}
       </span>
       <span>ریال</span>
      </div>
     </div>
    </div>
   </section>
   <section className='mb-12'>
    <h3 className='font-medium text-base mb-4'>اطلاعات مشتری:</h3>
    <div className='flex gap-6 flex-wrap'>
     <div>
      <span>نام: </span>
      <span className='font-medium text-base'>
       {lockInfo.lockInfo.firstName}
      </span>
     </div>
     <div>
      <span>نام خانوادگی: </span>
      <span className='font-medium text-base'>
       {lockInfo.lockInfo.lastName}
      </span>
     </div>
     <div>
      <span>شماره همراه: </span>
      <span className='font-medium text-base'>
       {lockInfo.lockInfo.contactNo}
      </span>
     </div>
     <div>
      <span>ایمیل: </span>
      <span className='font-medium text-base'>
       {lockInfo.lockInfo.email || '----'}
      </span>
     </div>
    </div>
   </section>
   <section className='mb-6'>
    <h3 className='font-medium text-base mb-10'>روش پرداخت:</h3>
    <div className='grid lg:grid-cols-2 gap-4'>
     <Button
      variant='outlined'
      className='!rounded-lg !border-neutral-400 !bg-neutral-100'
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
         <span>پرداخت زرین پال</span>
        </p>
       </div>
      </div>
     </Button>
     <Button
      disabled
      variant='outlined'
      className='!rounded-lg !border-neutral-400'
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
         <span>-------</span>
        </p>
       </div>
      </div>
     </Button>
    </div>
   </section>
   <div className='mb-4'>
    <Alert severity='warning'>
     <ul>
      <li>در هنگام پرداخت از زدن کلید بازگشت خودداری کنید</li>
     </ul>
    </Alert>
   </div>
   <div className='flex justify-end'>
    <Button
     variant='contained'
     size='large'
     className='w-[12rem]'
     onClick={onPayment}
     loading={onPaymentLoading}
    >
     پرداخت
    </Button>
   </div>
  </form>
 );
}
