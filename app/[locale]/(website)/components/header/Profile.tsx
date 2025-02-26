'use client';
import { useState } from 'react';
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

const profileListStyles = {
 paddingBlock: 0,
};
const profileItemStyles = {
 fontSize: 'inherit',
 lineHeight: 'inherit',
 padding: 0,
};

export default function Profile() {
 const [profileMenuAnchor, setProfileMenuAnchor] =
  useState<HTMLButtonElement | null>(null);
 const { localeInfo } = useAppConfig();
 const { reserveCheckIsVisible, showReserveCheck } = useReserveCheckContext();
 const { isLargeDevice } = useAppMonitorConfig();
 const iconSize = isLargeDevice ? '1.6rem' : '1.8rem';
 const profileMenuHrAlign = localeInfo.dir == 'rtl' ? 'left' : 'right';

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
  <div className={`flex`}>
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
    fullWidth
    label='کد رزرو'
   />
   <Button
    sx={{
     borderStartStartRadius: 0,
     borderEndStartRadius: 0,
    }}
    disableElevation
    className='basis-1/3'
    variant='contained'
   >
    تایید
   </Button>
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
     onClose={() => showReserveCheck(false)}
     anchor='bottom'
    >
     <div className='flex items-center justify-between gap-2 px-4 py-2 border-b border-neutral-300'>
      <div className='basis-12'></div>
      <h3 className='font-bold text-base'>پیگیری رزرو</h3>
      <div className='basis-12'>
       <IconButton color='error' onClick={() => showReserveCheck(false)}>
        <CloseIcon />
       </IconButton>
      </div>
     </div>
     <div className='container my-8'>{reserveCheckForm}</div>
    </Drawer>
   ) : (
    <Dialog
     fullWidth
     open={reserveCheckIsVisible}
     onClose={() => showReserveCheck(false)}
    >
     <DialogTitle>
      <div className='flex items-center gap-3 justify-between'>
       <h3 className='text-base font-bold'>پیگیری رزرو</h3>
       <div>
        <IconButton color='error' onClick={() => showReserveCheck(false)}>
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
