'use client';
import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
 getLockInfo,
 getLockInfoKey,
 getPaymentUrl,
} from '../../services/confirmReserveApiActions';
import { useSearchParams } from 'next/navigation';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';

export default function PaymentWrapper() {
 const snackbar = useSnackbar();
 const searchParams = useSearchParams();
 const trackingCode = searchParams.get('trackingCode');

 const {
  data: lockInfo,
  isLoading: loadingLockInfo,
  isFetching: fetchingLockInfo,
  isError,
 } = useQuery({
  queryKey: [getLockInfoKey, trackingCode],
  enabled: !!trackingCode,
  queryFn: ({ signal }) => {
   return getLockInfo({
    signal,
    trackingCode: trackingCode!,
   }).then((res) => res.data);
  },
 });

 const { mutate: getPayment, isPending } = useMutation({
  onSuccess(res: AxiosResponse<{ url: string }>) {
   console.log(res);
  },
  onError() {
   snackbar.enqueueSnackbar({
    message: 'خطایی رخ داده است، لطفا دوباره تلاش کنید',
    variant: 'error',
   });
  },
  mutationFn: () => {
   return getPaymentUrl({
    gateWayInfo: {
     callback_url: `${window.location.origin}/confirm-reserve/payment/callback`,
     description: 'پرداخت رزرو آنلاین',
     amount: lockInfo!.lockInfo.totalPrice,
     mobile: lockInfo!.lockInfo.contactNo!,
     email: lockInfo!.lockInfo.email!,
    },
    iSB: true,
    hotelID: lockInfo!.lockInfo.hotelID,
   }).then((res) => res.data);
  },
 });

 if (isError) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 border border-neutral-300 w-[min(100%,30rem)] mx-auto'>
    <ErrorIcon className='text-red-500' sx={{ fontSize: '6rem' }} />
    <span className='text-lg font-bold'>خطایی رخ داده است</span>
   </div>
  );
 }
 if (loadingLockInfo || fetchingLockInfo || !lockInfo) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 w-[min(100%,30rem)] mx-auto'>
    <CircularProgress />
   </div>
  );
 }

 return (
  <section className='container flex flex-col lg:flex-row gap-4 mb-10'>
   <Invoice
    lockInfo={lockInfo!}
    onPayment={getPayment}
    onPaymentLoading={isPending}
   />
   <InvoiceDetails lockInfo={lockInfo!} />
  </section>
 );
}
