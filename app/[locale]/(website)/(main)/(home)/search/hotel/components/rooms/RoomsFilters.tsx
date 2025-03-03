'use client';
import { useState, useRef } from 'react';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { type RoomsFilterSchema } from '../../schema/roomsFilterSchema';
import { useFormContext, Controller } from 'react-hook-form';
import * as dateFns from 'date-fns';

const datePickerStyles = {
 '& .MuiPickersArrowSwitcher-button': {
  fontSize: '2rem',
 },
};

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});

export default function RoomsFilters() {
 const { control, watch, setValue } = useFormContext<RoomsFilterSchema>();
 const fromDateValue = watch('fromDate');
 const untilDateValue = watch('untilDate');
 const fromDateRef = useRef<HTMLDivElement>(null);
 const untilDateRef = useRef<HTMLDivElement>(null);
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

 function handleCloseFromDate() {
  setFromDateAnchor(null);
  handleToggleFromDate(false);
 }
 function handleCloseUntilDate() {
  setUntilDateAnchor(null);
  handleToggleUntilDate(false);
 }
 function handleOpenFromDate(anchor: HTMLDivElement) {
  setFromDateAnchor(anchor);
  handleToggleFromDate(true);
 }
 function handleOpenUntilDate(anchor: HTMLDivElement) {
  setUntilDateAnchor(anchor);
  handleToggleUntilDate(true);
 }

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
        handleCloseFromDate();
       }}
      >
       <CloseIcon />
      </IconButton>
     </div>
    </div>
   )}
   <div className='container max-w-[22rem] lg:max-w-[unset] lg:p-0'>
    <Controller
     control={control}
     name='fromDate'
     render={({ field }) => (
      <StaticDatePicker
       {...field}
       disablePast
       onChange={(newValue) => {
        field.onChange(newValue);
        if (newValue && untilDateValue <= newValue) {
         setValue('untilDate', dateFns.addDays(newValue, 3));
        }
       }}
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
     )}
    />
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
        handleCloseUntilDate();
       }}
      >
       <CloseIcon />
      </IconButton>
     </div>
    </div>
   )}
   <div className='container max-w-[22rem] lg:max-w-[unset] lg:p-0'>
    <Controller
     name='untilDate'
     control={control}
     render={({ field }) => (
      <StaticDatePicker
       {...field}
       disablePast
       minDate={fromDateValue}
       onChange={(newValue) => {
        field.onChange(newValue);
        handleCloseUntilDate();
       }}
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
     )}
    />
   </div>
  </>
 );

 return (
  <>
   <div className='bg-neutral-50 p-4 rounded-lg border border-100 md:mb-2 lg:sticky top-4 z-10'>
    <div className='grid gap-4 grid-cols-2'>
     <TextField
      label='از تاریخ'
      value={dateFormatter.format(fromDateValue) || null}
      ref={fromDateRef}
      onClick={(e) => {
       handleOpenFromDate(e.currentTarget);
      }}
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
     />
     <TextField
      label='تا تاریخ'
      value={dateFormatter.format(untilDateValue) || null}
      ref={untilDateRef}
      onClick={(e) => {
       handleOpenUntilDate(e.currentTarget);
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
