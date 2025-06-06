'use client';
import { useEffect } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTimer } from '../hooks/useTimer';
import { type LockInfoResult } from '../../../../../services/confirmReserveApiActions';
import { useSnackbar } from 'notistack';
import { useInternalID } from '@/hooks/useInternalID';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});
// const timeFormatter = new Intl.DateTimeFormat('fa', {
//  hour: '2-digit',
//  minute: '2-digit',
// });

export default function InvoiceDetails({
 lockInfo,
}: {
 lockInfo: LockInfoResult;
}) {
 const { getID } = useInternalID();
 const snackbar = useSnackbar();
 const { minutes, seconds, startTimer } = useTimer(200);
 function copyRefNumber() {
  navigator.clipboard.writeText(lockInfo.lockInfo.trackingCode);
  snackbar.enqueueSnackbar('کد پیگیری کپی شد', {
   variant: 'success',
  });
 }
 useEffect(() => {
  startTimer();
 }, [startTimer]);
 return (
  <section className='order-1 lg:order-2 lg:w-[25rem] shrink-0'>
   <div className='p-4 bg-neutral-200 border border-neutral-300 rounded-lg mb-4 flex items-center justify-between gap-4 flex-wrap'>
    <span className='font-medium'>کد پیگیری: </span>
    <div className='flex items-center gap-2'>
     <span className='text-base font-medium'>
      {lockInfo.lockInfo.trackingCode}
     </span>
     <IconButton size='small' onClick={copyRefNumber}>
      <ContentCopyIcon />
     </IconButton>
    </div>
   </div>
   <div className='border border-neutral-300 rounded-lg p-4 mb-4'>
    <div className='flex items-center justify-between gap-4'>
     <span className='font-medium'>مهلت پرداخت:</span>
     <div className='text-lg font-medium flex items-center text-red-800'>
      <span className='inline-block min-w-[1.5rem] text-center'>
       {seconds.toString().padStart(2, '0')}
      </span>
      <span>:</span>
      <span className='inline-block min-w-[1.5rem] text-center'>
       {minutes.toString().padStart(2, '0')}
      </span>
     </div>
    </div>
   </div>
   <div className='rounded-lg border border-neutral-300 p-4'>
    <h3 className='font-medium text-base  pb-4 border-b border-neutral-300'>
     هتل الماس
    </h3>
    <div className='p-4 mb-2'>
     <div className='flex gap-2 items-center'>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ ورود</div>
       <div className='font-medium mb-1'>
        {dateFormatter.format(
         new Date(lockInfo.lockInfo.arrivelDateTimeOffset)
        )}
       </div>
       {/* <div>
        {timeFormatter.format(
         new Date(lockInfo.lockInfo.arrivelDateTimeOffset)
        )}
       </div> */}
      </div>
      <div className='flex flex-col items-center text-secondary-dark'>
       <span className='font-medium'>{2} شب</span>
       <div className='flex items-center'>
        <ArrowLeftIcon className='-ms-3 invisible' />
        <span className='w-[3rem] h-[1px] bg-secondary-dark'></span>
        <ArrowLeftIcon className='-ms-3' />
       </div>
      </div>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ خروج</div>
       <div className='font-medium'>
        {dateFormatter.format(
         new Date(lockInfo.lockInfo.departureDateTimeOffset)
        )}
       </div>
       {/* <div>
        {timeFormatter.format(
         new Date(lockInfo.lockInfo.depatureDateTimeOffset)
        )}
       </div> */}
      </div>
     </div>
    </div>
    <div>
     <ul className='grid gap-1'>
      {lockInfo.rooms.map((item, index) => {
       getID(item);
       return (
        <li key={item.internalID} className='mb-2'>
         <span className='text-neutral-500'>اتاق {index + 1}: </span>
         <span className='font-medium'>{item.fName}</span>
         <span className='font-medium ms-4'>
          {item.accommodationTypePrice.beds} نفر
         </span>
        </li>
       );
      })}
     </ul>
    </div>
   </div>
  </section>
 );
}
