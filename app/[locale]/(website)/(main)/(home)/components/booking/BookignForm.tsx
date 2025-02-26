import { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import InputAdornemnt from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { StaticDatePicker } from '@mui/x-date-pickers';
import Drawer from '@mui/material/Drawer';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import CloseIcon from '@mui/icons-material/Close';
import { Theme } from '@mui/material/styles';
import { motion } from 'motion/react';
import { bookingTypes } from '../../utils/bookingTypes';
import BookingSearch from './BookingSearch';

type TProps = {
 selectedBookingType: (typeof bookingTypes)[number]['type'];
 isHomePage: boolean;
 onChangeSelectedBookingType: (
  type: (typeof bookingTypes)[number]['type']
 ) => void;
};

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

const buttonStyles = {
 color: (theme: Theme) => theme.palette.neutral['500'],
 transition: 'color 0.3s ease',
 padding: '1rem',
 borderRadius: 0,
 '&:is(:hover,:focus,[data-active-booking="true"])': {
  color: (theme: Theme) => theme.palette.primary.dark,
 },
};

export default function BookignForm({
 isHomePage,
 selectedBookingType,
 onChangeSelectedBookingType,
}: TProps) {
 const [fromDateAnchor, setFromDateAnchor] = useState<HTMLDivElement | null>(
  null
 );

 const [untilDateAnchor, setUntilDateAnchor] = useState<HTMLDivElement | null>(
  null
 );
 const { isLargeDevice } = useAppMonitorConfig();
 const { isQueryTrue: showFromDate, handleToggle: handleToggleFromDate } =
  useQueryToggler('show-reserve-from-date');
 const { isQueryTrue: showUntilDate, handleToggle: handleToggleUntilDate } =
  useQueryToggler('show-reserve-until-date');
 const {
  isQueryTrue: showBookingSearch,
  handleToggle: handleToggleBookingSearch,
 } = useQueryToggler('show-booking-search');

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
  <article className='container py-4 mb-24'>
   <form className='bg-background rounded-md border-2 border-secondary-dark -mb-20'>
    {isHomePage && (
     <div className='flex justify-center lg:justify-start border-b border-secondary-dark/30'>
      {bookingTypes.map((book) => (
       <Button
        data-active-booking={book.type === selectedBookingType}
        sx={buttonStyles}
        key={book.type}
        onClick={() => onChangeSelectedBookingType(book.type)}
       >
        <div className='flex flex-col items-center lg:flex-row lg:gap-2 min-w-[5rem] lg:min-w-[auto]'>
         {book.icon}
         <span className='font-medium'>{book.title}</span>
        </div>
        {selectedBookingType === book.type ? (
         <motion.div
          className='absolute w-full bottom-0 h-[2px] bg-primary-dark rounded-sm'
          layoutId='underline'
          id='underline'
         />
        ) : null}
       </Button>
      ))}
     </div>
    )}
    <div className='p-4 py-8 grid lg:grid-cols-[3fr_1fr] gap-4'>
     <div className='grid gap-4 md:grid-cols-3'>
      <TextField
       fullWidth
       label='نام شهر یا اقامتگاه'
       onClick={() => handleToggleBookingSearch(true)}
       slotProps={{
        inputLabel: {
         shrink: false,
        },
        input: {
         readOnly: true,
         endAdornment: (
          <InputAdornemnt position='end' className='-me-2'>
           <SearchIcon fontSize='large' />
          </InputAdornemnt>
         ),
        },
       }}
      />
      <TextField
       label='از تاریخ'
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
     <Button
      disableElevation
      variant='contained'
      size='large'
      className='min-h-[3.1rem]'
     >
      <span className='font-medium'>جستجو هتل یا اقامتگاه</span>
     </Button>
    </div>
   </form>
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
       horizontal: 'center',
      }}
      transformOrigin={{
       vertical: 'top',
       horizontal: 'center',
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
       horizontal: 'center',
      }}
      transformOrigin={{
       vertical: 'top',
       horizontal: 'center',
      }}
     >
      {untilDateContent}
     </Popover>
    </>
   )}
   <BookingSearch
    open={showBookingSearch}
    onClose={() => {
     handleToggleBookingSearch(false);
    }}
   />
  </article>
 );
}
