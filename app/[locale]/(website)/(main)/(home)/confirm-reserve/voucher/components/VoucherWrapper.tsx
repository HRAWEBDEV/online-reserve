'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ErrorIcon from '@mui/icons-material/Error';
import { useMutation, useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import {
 bookRoomKey,
 bookRoom,
 getVoucher,
} from '../../../../../services/confirmReserveApiActions';
import { useSnackbar } from 'notistack';

export default function VoucherWrapper() {
 const downloadVoucher = useRef<HTMLAnchorElement>(null);
 const snackbar = useSnackbar();
 const searchParams = useSearchParams();
 const trackingCode = searchParams.get('trackingCode');
 const channelID = searchParams.get('channelID');
 const hotelID = searchParams.get('hotelID');
 const providerID = searchParams.get('providerID');
 const tracingID = searchParams.get('trackID');
 const arzID = searchParams.get('arzID');
 const authority = searchParams.get('Authority');
 const amount = searchParams.get('amount');

 const returnToHome =
  process.env.NEXT_PUBLIC_DEPLOY_MODE === 'local' ? '/search/hotel' : '/';

 const {
  data: bookRoomData,
  isLoading: isBookRoomLoading,
  isFetching: isBookRoomFetching,
  isError: isBookRoomError,
 } = useQuery({
  queryKey: [bookRoomKey, trackingCode, authority, amount],
  queryFn({ signal }) {
   return bookRoom({
    signal,
    hotelID: Number(hotelID),
    channelID: Number(channelID),
    providerID: Number(providerID),
    lockBookID: Number(tracingID),
    arzID: Number(arzID),
    iSB: process.env.NEXT_PUBLIC_MODE === 'development',
    paymentInfo: {
     amount: Number(amount!),
     authority: authority!,
    },
   }).then((res) => res.data);
  },
 });

 const { isPending: isDownloadVoucherPending } = useMutation({
  onError() {
   snackbar.enqueueSnackbar({
    message: 'خطایی رخ داده است، دوباره تلاش کنید',
    variant: 'error',
   });
  },
  async mutationFn() {
   const res = await getVoucher({
    reserveID: Number(0),
    channelID: Number(channelID),
    hotelID: Number(hotelID),
   });
   const reportFile = new Blob([res.data], { type: 'application/pdf' });
   const reportFileUrl = URL.createObjectURL(reportFile);
   if (downloadVoucher.current) {
    downloadVoucher.current.href = reportFileUrl;
    downloadVoucher.current.click();
   }
   return res.data;
  },
 });

 if (isBookRoomLoading || isBookRoomFetching) {
  return (
   <div className='w-[min(100%,50rem)] mx-auto mt-12 mb-12 min-h-[20rem] rounded-lg p-4 flex flex-col items-center justify-center'>
    <div className='text-teal-800 text-4xl mb-4'>
     <CircularProgress />
    </div>
   </div>
  );
 }

 if (isBookRoomError || !bookRoomData || !bookRoomData?.success) {
  return (
   <div className='container'>
    <div
     className={`w-[min(100%,50rem)] mx-auto mt-12 mb-12 min-h-[20rem] border border-red-800 rounded-lg p-4 flex flex-col items-center justify-center bg-red-800/10`}
    >
     <div className='text-red-800 text-4xl mb-4'>
      <ErrorIcon sx={{ fontSize: '8rem' }} />
     </div>
     <div className='text-2xl font-medium mb-2'>
      <span>رزرو شما ناموفق بود</span>
     </div>
     <div className='mb-8 flex items-center gap-2 font-medium'>
      <span>کدپیگیری رزرو: </span>
      <span>{trackingCode}</span>
      <IconButton
       size='small'
       onClick={() => {
        navigator.clipboard.writeText(trackingCode!);
        snackbar.enqueueSnackbar('کدپیگیری رزرو کپی شد', {
         variant: 'success',
        });
       }}
      >
       <ContentCopyIcon fontSize='small' />
      </IconButton>
     </div>
     <div className='text-sm text-neutral-500 flex gap-4 flex-wrap justify-center'>
      <Button
       LinkComponent={Link}
       href={returnToHome}
       className='w-[12rem]'
       variant='outlined'
       size='large'
      >
       بازگشت به صفحه اصلی
      </Button>
     </div>
    </div>
   </div>
  );
 }

 return (
  <div className='container'>
   <div
    className={`w-[min(100%,50rem)] mx-auto mt-12 mb-12 min-h-[20rem] border border-teal-800 rounded-lg p-4 flex flex-col items-center justify-center bg-teal-800/10`}
   >
    <div className='text-teal-800 text-4xl mb-4'>
     <CheckCircleIcon sx={{ fontSize: '8rem' }} />
    </div>
    <div className='text-2xl font-medium mb-2'>
     <span>رزرو شما با موفقیت ثبت شد</span>
    </div>
    <div className='mb-8 flex items-center gap-2 font-medium'>
     <span>کدپیگیری رزرو: </span>
     <span className='font-sans'>
      {bookRoomData?.bookInfo?.lockInfo.trackingCode}
     </span>
     <IconButton
      size='small'
      onClick={() => {
       if (!bookRoomData?.bookInfo?.lockInfo.trackingCode) return;
       navigator.clipboard.writeText(
        bookRoomData.bookInfo.lockInfo.trackingCode
       );
       snackbar.enqueueSnackbar('کدپیگیری رزرو کپی شد', {
        variant: 'success',
       });
      }}
     >
      <ContentCopyIcon fontSize='small' />
     </IconButton>
    </div>
    <a href='' ref={downloadVoucher} download className='invisible'></a>
    <div className='text-sm text-neutral-500 flex gap-4 flex-wrap justify-center'>
     <Button
      LinkComponent={Link}
      href={returnToHome}
      className='w-[12rem]'
      variant='outlined'
      size='large'
     >
      بازگشت به صفحه اصلی
     </Button>
     <Button
      loading={isDownloadVoucherPending}
      className='w-[12rem] !bg-teal-800'
      variant='contained'
      color='success'
      size='large'
     >
      دانلود اطلاعات رزرو
     </Button>
    </div>
   </div>
  </div>
 );
}
