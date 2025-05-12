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
  onSuccess(res: AxiosResponse<{ gatewayUrl: string }>) {
   window.location.href = res.data.gatewayUrl;
  },
  onError() {
   snackbar.enqueueSnackbar({
    message: 'خطایی رخ داده است، لطفا دوباره تلاش کنید',
    variant: 'error',
   });
  },
  mutationFn: () => {
   const searchParams = new URLSearchParams();
   searchParams.set('trackingCode', trackingCode!);
   searchParams.set('channelID', lockInfo!.lockInfo.channelID.toString()!);
   searchParams.set('hotelID', lockInfo!.lockInfo.hotelID.toString()!);
   searchParams.set('providerID', lockInfo!.lockInfo.providerID.toString()!);
   searchParams.set('trackID', lockInfo!.lockInfo.id.toString()!);
   searchParams.set('amount', lockInfo!.lockInfo.totalPrice.toString()!);
   searchParams.set('arzID', lockInfo!.lockInfo.arzID.toString()!);
   return getPaymentUrl({
    gateWayInfo: {
     callback_url: `${
      window.location.origin
     }/confirm-reserve/voucher?${searchParams.toString()}`,
     description: 'پرداخت رزرو آنلاین',
     amount: lockInfo!.lockInfo.totalPrice,
     mobile: lockInfo!.lockInfo.contactNo!,
     email: lockInfo!.lockInfo.email!,
    },
    iSB: process.env.NEXT_PUBLIC_MODE === 'development',
    hotelID: lockInfo!.lockInfo.hotelID,
   });
  },
 });

 if (loadingLockInfo || fetchingLockInfo) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 w-[min(100%,30rem)] mx-auto'>
    <CircularProgress />
   </div>
  );
 }

 if (isError || !lockInfo) {
  return (
   <div className='flex flex-col items-center justify-center gap-2 my-10 rounded-lg p-4 pt-12 pb-16 border border-neutral-300 w-[min(100%,30rem)] mx-auto'>
    <ErrorIcon className='text-red-500' sx={{ fontSize: '6rem' }} />
    <span className='text-lg font-bold'>خطایی رخ داده است</span>
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
