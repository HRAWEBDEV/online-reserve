'use client';
import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';
import { useQuery } from '@tanstack/react-query';
import {
 getLockInfo,
 getLockInfoKey,
} from '../../services/confirmReserveApiActions';
import { useSearchParams } from 'next/navigation';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';

export default function PaymentWrapper() {
 const searchParams = useSearchParams();
 const lockBookID = searchParams.get('lockBookID');
 const arzID = searchParams.get('arzID');
 const trackingCode = searchParams.get('trackingCode');
 const hotelID = searchParams.get('hotelID');
 const channelID = searchParams.get('channelID');

 const {
  data: lockInfo,
  isLoading: loadingLockInfo,
  isFetching: fetchingLockInfo,
  isError,
 } = useQuery({
  queryKey: [getLockInfoKey],
  enabled:
   !!lockBookID && !!arzID && !!trackingCode && !!channelID && !!hotelID,
  queryFn: ({ signal }) => {
   return getLockInfo({
    signal,
    arzID: Number(arzID!),
    trackingCode: trackingCode!,
    channelID: Number(channelID!),
    hotelID: Number(hotelID!),
   }).then((res) => res.data);
  },
 });

 if (isError || !lockInfo) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 border border-neutral-300 w-[min(100%,30rem)] mx-auto'>
    <ErrorIcon className='text-red-500' sx={{ fontSize: '6rem' }} />
    <span className='text-lg font-bold'>خطایی رخ داده است</span>
   </div>
  );
 }
 if (loadingLockInfo || fetchingLockInfo) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 w-[min(100%,30rem)] mx-auto'>
    <CircularProgress />
   </div>
  );
 }

 return (
  <section className='container flex flex-col lg:flex-row gap-4 mb-10'>
   <Invoice lockInfo={lockInfo} />
   <InvoiceDetails lockInfo={lockInfo} />
  </section>
 );
}
