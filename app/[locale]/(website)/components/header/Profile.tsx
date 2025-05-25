'use client';
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useReserveCheckContext } from '../../services/reservation-check/reserveCheck';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { useAppConfig } from '@/app/services/app-config/appConfig';
import CloseIcon from '@mui/icons-material/Close';
import LuggageIcon from '@mui/icons-material/Luggage';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useSnackbar } from 'notistack';
import {
 getLockInfo,
 getVoucher,
} from '../../services/confirmReserveApiActions';
import { useMutation } from '@tanstack/react-query';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import { useRouter } from 'next/navigation';

const dateTimeFormatter = new Intl.DateTimeFormat('fa-IR', {
 year: 'numeric',
 month: '2-digit',
 day: '2-digit',
});

const profileListStyles = {
 paddingBlock: 0,
};
const profileItemStyles = {
 fontSize: 'inherit',
 lineHeight: 'inherit',
 padding: 0,
};

export default function Profile() {
 const router = useRouter();
 const downloadVoucher = useRef<HTMLAnchorElement>(null);
 const { enqueueSnackbar } = useSnackbar();
 const [profileMenuAnchor, setProfileMenuAnchor] =
  useState<HTMLButtonElement | null>(null);
 const [reserveCheckCode, setReserveCheckCode] = useState('');
 const { localeInfo } = useAppConfig();
 const { reserveCheckIsVisible, showReserveCheck } = useReserveCheckContext();
 const { isLargeDevice } = useAppMonitorConfig();
 const iconSize = isLargeDevice ? '1.6rem' : '1.8rem';
 const profileMenuHrAlign = localeInfo.dir == 'rtl' ? 'left' : 'right';

 const {
  mutate: handleSubmitCheckReserve,
  isPending: isLockInfoLoading,
  data: lockInfo,
  reset: resetLockInfo,
 } = useMutation({
  async mutationFn() {
   const abortController = new AbortController();
   const res = await getLockInfo({
    signal: abortController.signal,
    trackingCode: reserveCheckCode,
   });
   return res.data;
  },
  onError() {
   enqueueSnackbar({
    variant: 'error',
    message: 'اطلاعات رزرو بافت نشد',
   });
  },
 });

 const { isPending: isDownloadVoucherPending } = useMutation({
  onError() {
   enqueueSnackbar({
    message: 'خطایی رخ داده است، دوباره تلاش کنید',
    variant: 'error',
   });
  },
  async mutationFn() {
   const res = await getVoucher({
    reserveID: Number(0),
    channelID: Number(lockInfo?.lockInfo.channelID),
    hotelID: Number(lockInfo?.lockInfo.hotelID),
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

 const profileContent = (
  <div>
   <div className='container flex gap-2 items-center mb-8 xl:my-4 xl:px-4'>
    <Avatar sx={{ width: '3.3rem', height: '3.3rem' }}>
     <PersonIcon sx={{ fontSize: iconSize }} />
    </Avatar>
    <div>
     <p className='font-medium text-base'>حمیدرضا اکبری</p>
     <span className='font-light text-xs text-secondary-dark'>عضویت عادی</span>
    </div>
   </div>
   <div>
    <MenuList sx={profileListStyles}>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <PersonIcon sx={{ fontSize: iconSize }} />
       <span>تنظیمات حساب</span>
      </div>
     </MenuItem>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <LuggageIcon sx={{ fontSize: iconSize }} />
       <span>رزروها و سفرها</span>
      </div>
     </MenuItem>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <AccountBalanceWalletIcon sx={{ fontSize: iconSize }} />
       <span>کیف پول</span>
      </div>
     </MenuItem>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <RateReviewIcon sx={{ fontSize: iconSize }} />
       <span>نظرات</span>
      </div>
     </MenuItem>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <FavoriteIcon sx={{ fontSize: iconSize }} />
       <span>علاقه مندی ها</span>
      </div>
     </MenuItem>
     <MenuItem sx={profileItemStyles}>
      <div
       role='button'
       className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100 xl:px-4 xl:py-2'
      >
       <LogoutIcon sx={{ fontSize: iconSize }} color='error' />
       <span>خروج</span>
      </div>
     </MenuItem>
    </MenuList>
   </div>
  </div>
 );

 const reserveCheckForm = (
  <div>
   <div className='flex'>
    <TextField
     type='search'
     sx={{
      '& .MuiInputBase-root': {
       borderEndEndRadius: 0,
       borderStartEndRadius: 0,
      },
      '& .MuiOutlinedInput-notchedOutline': {
       borderInlineEnd: 0,
      },
     }}
     name='reserveCheckCode'
     value={reserveCheckCode}
     onChange={(e) => setReserveCheckCode(e.target.value)}
     fullWidth
     label='کد رزرو'
    />
    <Button
     sx={{
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,
     }}
     loading={isLockInfoLoading}
     disableElevation
     className='basis-1/3'
     variant='contained'
     onClick={(e) => {
      e.preventDefault();
      if (reserveCheckCode.length == 0) {
       enqueueSnackbar({
        variant: 'error',
        message: 'کد پیگیری رزرو را وارد کنید',
       });
       return;
      }
      handleSubmitCheckReserve();
     }}
    >
     تایید
    </Button>
   </div>
   {lockInfo &&
    (lockInfo.isBooked ? (
     <div className='mt-6 border border-neutral-300 rounded-lg p-6 bg-teal-100'>
      <div className='flex flex-col items-center gap-4 mb-4'>
       <CheckCircleIcon className='text-teal-600' sx={{ fontSize: '7rem' }} />
      </div>
      <div className='mb-8'>
       <h3 className='text-base font-medium mb-2 text-neutral-600'>
        اطلاعات مشتری:
       </h3>
       <div className='grid lg:grid-cols-3 gap-2'>
        <div>
         <span className='text-neutral-500'>نام و نام خانوادگی: </span>
         <span className='font-medium'>
          {lockInfo.lockInfo.firstName} {lockInfo.lockInfo.lastName}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>کدملی: </span>
         <span className='font-medium'>{lockInfo.lockInfo.nationalCode}</span>
        </div>
        <div>
         <span className='text-neutral-500'>شماره همراه: </span>
         <span className='font-medium'>{lockInfo.lockInfo.contactNo}</span>
        </div>
       </div>
      </div>
      <div>
       <h3 className='text-base font-medium mb-2 text-neutral-600'>
        اطلاعات رزرو:
       </h3>
       <div className='grid lg:grid-cols-3 gap-2'>
        <div>
         <span className='text-neutral-500'>تاریخ ورود: </span>
         <span className='font-medium'>
          {dateTimeFormatter.format(
           new Date(lockInfo.lockInfo.arrivelDateTimeOffset)
          )}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>تاریخ خروج: </span>
         <span className='font-medium'>
          {dateTimeFormatter.format(
           new Date(lockInfo.lockInfo.departureDateTimeOffset)
          )}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>وضعیت رزرو: </span>
         <span className='font-medium text-base text-teal-800'>موفق</span>
        </div>
       </div>
      </div>
      <div className='flex justify-center mt-10'>
       <a href='' ref={downloadVoucher} download className='invisible'></a>
       <Button
        loading={isDownloadVoucherPending}
        className='w-[12rem] !bg-teal-800'
        variant='contained'
        color='success'
       >
        دانلود اطلاعات رزرو
       </Button>
      </div>
     </div>
    ) : (
     <div className='mt-6 border border-neutral-300 rounded-lg p-6 bg-orange-100'>
      <div className='flex flex-col items-center gap-4 mb-4'>
       <PaymentIcon className='text-orange-600' sx={{ fontSize: '7rem' }} />
      </div>
      <div className='mb-8'>
       <h3 className='text-base font-medium mb-2 text-neutral-600'>
        اطلاعات مشتری:
       </h3>
       <div className='grid lg:grid-cols-3 gap-2'>
        <div>
         <span className='text-neutral-500'>نام و نام خانوادگی: </span>
         <span className='font-medium'>
          {lockInfo.lockInfo.firstName} {lockInfo.lockInfo.lastName}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>کدملی: </span>
         <span className='font-medium'>{lockInfo.lockInfo.nationalCode}</span>
        </div>
        <div>
         <span className='text-neutral-500'>شماره همراه: </span>
         <span className='font-medium'>{lockInfo.lockInfo.contactNo}</span>
        </div>
       </div>
      </div>
      <div>
       <h3 className='text-base font-medium mb-2 text-neutral-600'>
        اطلاعات رزرو:
       </h3>
       <div className='grid lg:grid-cols-3 gap-2'>
        <div>
         <span className='text-neutral-500'>تاریخ ورود: </span>
         <span className='font-medium'>
          {dateTimeFormatter.format(
           new Date(lockInfo.lockInfo.arrivelDateTimeOffset)
          )}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>تاریخ خروج: </span>
         <span className='font-medium'>
          {dateTimeFormatter.format(
           new Date(lockInfo.lockInfo.departureDateTimeOffset)
          )}
         </span>
        </div>
        <div>
         <span className='text-neutral-500'>وضعیت رزرو: </span>
         <span className='font-medium text-base text-orange-800'>پرداخت</span>
        </div>
       </div>
      </div>
      <div className='flex justify-center mt-10'>
       <a href='' ref={downloadVoucher} download className='invisible'></a>
       <Button
        loading={isDownloadVoucherPending}
        className='w-[12rem] !bg-orange-800'
        variant='contained'
        color='success'
        onClick={() => {
         router.push(
          `/confirm-reserve/payment?trackingCode=${lockInfo.lockInfo.trackingCode}`
         );
        }}
       >
        پرداخت رزرو
       </Button>
      </div>
     </div>
    ))}
  </div>
 );

 return (
  <div className='-me-2 lg:me-0'>
   <div className='flex items-center gap-2 lg:gap-4'>
    {isLargeDevice ? (
     <Button
      variant='outlined'
      className='!bg-primary-foreground'
      onClick={() => showReserveCheck(true)}
     >
      پیگیری رزرو
     </Button>
    ) : (
     <Tooltip title='پیگیری رزرو'>
      <IconButton color='inherit' onClick={() => showReserveCheck(true)}>
       <ReceiptLongOutlinedIcon />
      </IconButton>
     </Tooltip>
    )}
    <Tooltip title='زبان'>
     <IconButton color='inherit'>
      <Badge badgeContent='فا' color='secondary'>
       <LanguageIcon />
      </Badge>
     </IconButton>
    </Tooltip>
    <IconButton onClick={(e) => setProfileMenuAnchor(e.currentTarget)}>
     <Avatar />
    </IconButton>
   </div>
   {/* check reserve */}
   {!isLargeDevice ? (
    <Drawer
     open={reserveCheckIsVisible}
     onClose={() => {
      showReserveCheck(false);
      setReserveCheckCode('');
      resetLockInfo();
     }}
     anchor='bottom'
    >
     <div className='flex items-center justify-between gap-2 px-4 py-2 border-b border-neutral-300'>
      <div className='basis-12'></div>
      <h3 className='font-bold text-base'>پیگیری رزرو</h3>
      <div className='basis-12'>
       <IconButton
        color='error'
        onClick={() => {
         showReserveCheck(false);
         setReserveCheckCode('');
         resetLockInfo();
        }}
       >
        <CloseIcon />
       </IconButton>
      </div>
     </div>
     <div className='container my-8'>{reserveCheckForm}</div>
    </Drawer>
   ) : (
    <Dialog
     fullWidth
     maxWidth='md'
     open={reserveCheckIsVisible}
     onClose={() => {
      showReserveCheck(false);
      setReserveCheckCode('');
      resetLockInfo();
     }}
    >
     <DialogTitle>
      <div className='flex items-center gap-3 justify-between'>
       <h3 className='text-base font-bold'>پیگیری رزرو</h3>
       <div>
        <IconButton
         color='error'
         onClick={() => {
          showReserveCheck(false);
          setReserveCheckCode('');
          resetLockInfo();
         }}
        >
         <CloseIcon />
        </IconButton>
       </div>
      </div>
     </DialogTitle>
     <DialogContent dividers>
      <div>{reserveCheckForm}</div>
     </DialogContent>
    </Dialog>
   )}
   {/* profile */}
   {isLargeDevice ? (
    <Popover
     component={'div'}
     open={Boolean(profileMenuAnchor)}
     anchorEl={profileMenuAnchor}
     onClose={() => setProfileMenuAnchor(null)}
     anchorOrigin={{
      vertical: 'bottom',
      horizontal: profileMenuHrAlign,
     }}
     transformOrigin={{
      vertical: 'top',
      horizontal: profileMenuHrAlign,
     }}
     sx={{
      '& .MuiPaper-root': {
       minWidth: '14rem',
       maxWidth: '14rem',
      },
     }}
    >
     <div className='mb-4'>{profileContent}</div>
    </Popover>
   ) : (
    <Drawer
     open={Boolean(profileMenuAnchor)}
     onClose={() => setProfileMenuAnchor(null)}
     anchor='bottom'
     sx={{
      '& .MuiPaper-root': {
       height: '100%',
      },
     }}
    >
     <div className='flex items-center justify-between gap-2 px-4 py-2'>
      <div className='basis-12'></div>
      <div className='basis-12'>
       <IconButton color='error' onClick={() => setProfileMenuAnchor(null)}>
        <CloseIcon />
       </IconButton>
      </div>
     </div>
     <div className='my-4'>{profileContent}</div>
    </Drawer>
   )}
  </div>
 );
}
