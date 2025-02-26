'use client';
import { useState, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useQueryToggler } from '@/hooks/useQueryToggler';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 day: 'numeric',
 month: 'long',
 year: 'numeric',
});

const datePickerStyles = {
 '& .MuiPickersArrowSwitcher-button': {
  fontSize: '2rem',
 },
};

export default function RoomsFilters() {
 const fromDateRef = useRef<HTMLInputElement>(null);
 const untilDateRef = useRef<HTMLInputElement>(null);
 const [fromDateAnchor, setFromDateAnchor] = useState<HTMLDivElement | null>(
  null
 );
 const [untilDateAnchor, setUntilDateAnchor] = useState<HTMLDivElement | null>(
  null
 );
 const { isLargeDevice } = useAppMonitorConfig();
 const { isQueryTrue: showFromDate, handleToggle: handleToggleFromDate } =
  useQueryToggler('show-reserve-room-from-date');
 const { isQueryTrue: showUntilDate, handleToggle: handleToggleUntilDate } =
  useQueryToggler('show-reserve-room-until-date');

 const fromDateContent = (
  <>
   {!isLargeDevice && (
    <div className='flex items-center justify-between px-2 py-4 mb-4 border-b border-neutral-300 text-center'>
     <div className='basis-20'></div>
     <p className='font-medium text-base'>از تاریخ</p>
     <div className='basis-20 text-end'>
      <IconButton
       color='error'
       onClick={() => {
        setFromDateAnchor(null);
        handleToggleFromDate(false);
       }}
      >
       <CloseIcon />
      </IconButton>
     </div>
    </div>
   )}
   <div className='container max-w-[22rem] lg:max-w-[unset] lg:p-0'>
    <StaticDatePicker
     sx={datePickerStyles}
     views={['year', 'month', 'day']}
     slotProps={{
      toolbar: {
       hidden: isLargeDevice,
      },
      actionBar: {
       actions: [],
      },
     }}
    />
    {!isLargeDevice && (
     <div className='flex justify-end'>
      <Button size='large' variant='contained' className='w-[7rem]'>
       تایید
      </Button>
     </div>
    )}
   </div>
  </>
 );

 const untilDateContent = (
  <>
   {!isLargeDevice && (
    <div className='flex items-center justify-between px-2 py-4 mb-4 border-b border-neutral-300 text-center'>
     <div className='basis-20'></div>
     <p className='font-medium text-base'>تا تاریخ</p>
     <div className='basis-20 text-end'>
      <IconButton
       color='error'
       onClick={() => {
        setUntilDateAnchor(null);
        handleToggleUntilDate(false);
       }}
      >
       <CloseIcon />
      </IconButton>
     </div>
    </div>
   )}
   <div className='container max-w-[22rem] lg:max-w-[unset] lg:p-0'>
    <StaticDatePicker
     sx={datePickerStyles}
     views={['year', 'month', 'day']}
     slotProps={{
      toolbar: {
       hidden: isLargeDevice,
      },
      actionBar: {
       actions: [],
      },
     }}
    />
    {!isLargeDevice && (
     <div className='flex justify-end'>
      <Button size='large' variant='contained' className='w-[7rem]'>
       تایید
      </Button>
     </div>
    )}
   </div>
  </>
 );

 return (
  <>
   <div className='bg-neutral-50 p-4 rounded-lg border border-100 md:mb-2 lg:sticky top-4 z-10'>
    <div className='grid gap-4 grid-cols-2'>
     <TextField
      label='از تاریخ'
      ref={fromDateRef}
      value={dateFormatter.format(new Date())}
      onClick={(e) => {
       setFromDateAnchor(e.currentTarget);
       handleToggleFromDate(true);
      }}
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
     />
     <TextField
      label='تا تاریخ'
      ref={untilDateRef}
      value={dateFormatter.format(new Date())}
      onClick={(e) => {
       setUntilDateAnchor(e.currentTarget);
       handleToggleUntilDate(true);
      }}
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
     />
    </div>
   </div>
   <div className='hidden ms-4 md:flex items-center gap-4 mb-6'>
    <span className='font-medium'>فیلتر: </span>
    <div className='pe-3 me-3 border-e border-e-neutral-300'>
     <FormControlLabel label='۱ نفره' control={<Radio color='success' />} />
     <FormControlLabel label='2 نفره' control={<Radio color='success' />} />
     <FormControlLabel
      label='۳ نفره یا بیشتر'
      control={<Radio color='success' />}
     />
    </div>
    <div>
     <FormControlLabel
      label='بدون صبحانه'
      control={<Checkbox color='secondary' />}
     />
     <FormControlLabel
      label='بدون جریمه'
      control={<Checkbox color='secondary' />}
     />
     <FormControlLabel
      label='فول برد'
      control={<Checkbox color='secondary' />}
     />
    </div>
   </div>
   {!isLargeDevice ? (
    <>
     <Drawer
      anchor='bottom'
      sx={{
       '& .MuiPaper-root': {
        height: '100%',
       },
      }}
      open={showFromDate}
      onClose={() => handleToggleFromDate(false)}
     >
      {fromDateContent}
     </Drawer>
     <Drawer
      anchor='bottom'
      sx={{
       '& .MuiPaper-root': {
        height: '100%',
       },
      }}
      open={showUntilDate}
      onClose={() => handleToggleUntilDate(false)}
     >
      {untilDateContent}
     </Drawer>
    </>
   ) : (
    <>
     <Popover
      anchorEl={fromDateAnchor}
      open={Boolean(fromDateAnchor)}
      onClose={() => {
       setFromDateAnchor(null);
       handleToggleFromDate(false);
      }}
      anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'right',
      }}
      transformOrigin={{
       vertical: 'top',
       horizontal: 'right',
      }}
     >
      {fromDateContent}
     </Popover>
     <Popover
      anchorEl={untilDateAnchor}
      open={Boolean(untilDateAnchor)}
      onClose={() => {
       setUntilDateAnchor(null);
       handleToggleUntilDate(false);
      }}
      anchorOrigin={{
       vertical: 'bottom',
       horizontal: 'right',
      }}
      transformOrigin={{
       vertical: 'top',
       horizontal: 'right',
      }}
     >
      {untilDateContent}
     </Popover>
    </>
   )}
  </>
 );
}
