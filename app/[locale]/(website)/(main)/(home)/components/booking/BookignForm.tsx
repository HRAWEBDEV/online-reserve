import Button from '@mui/material/Button';
import InputAdornemnt from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { Theme } from '@mui/material/styles';
import { motion } from 'motion/react';
import { bookingTypes } from '../../utils/bookingTypes';
import BookingSearch from './BookingSearch';
import { Calendar } from '@/components/ui/calendar';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Button as ShadButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TProps = {
 selectedBookingType: (typeof bookingTypes)[number]['type'];
 isHomePage: boolean;
 onChangeSelectedBookingType: (
  type: (typeof bookingTypes)[number]['type']
 ) => void;
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
 const {
  isQueryTrue: showBookingSearch,
  handleToggle: handleToggleBookingSearch,
 } = useQueryToggler('show-booking-search');

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
          <InputAdornemnt position='end'>
           <SearchIcon fontSize='medium' />
          </InputAdornemnt>
         ),
        },
       }}
      />
      <Popover>
       <PopoverTrigger asChild>
        <ShadButton
         variant={'outline'}
         className={cn(
          'min-h-[3.5rem] rounded-sm border-neutral-300 text-foreground w-full justify-start text-left font-normal border bg-background hover:bg-neutral-100 hover:text-foreground'
         )}
        >
         <CalendarIcon />
         {false ? (
          <>
           {/* {dateFormatter.format(fromDateValue)} -{' '}
           {dateFormatter.format(untilDateValue)} */}
          </>
         ) : (
          <span>از تاریخ</span>
         )}
        </ShadButton>
       </PopoverTrigger>
       <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
         mode='range'
         autoFocus
         showOutsideDays={false}
         numberOfMonths={2}
         formatters={{
          formatWeekdayName(date, locale) {
           const weekday =
            new Intl.DateTimeFormat(locale?.locale?.code || 'fa', {
             dateStyle: 'full',
            })
             .formatToParts(date)
             .at(-1)?.value || '';
           return weekday[0];
          },
         }}
        />
       </PopoverContent>
      </Popover>
      <Popover>
       <PopoverTrigger asChild>
        <ShadButton
         variant={'outline'}
         className={cn(
          'min-h-[3.5rem] rounded-sm text-foreground w-full justify-start text-left font-normal border border-neutral-300 bg-background hover:bg-neutral-100 hover:text-foreground'
         )}
        >
         <CalendarIcon />
         {false ? (
          <>
           {/* {dateFormatter.format(fromDateValue)} -{' '}
           {dateFormatter.format(untilDateValue)} */}
          </>
         ) : (
          <span>تا تاریخ</span>
         )}
        </ShadButton>
       </PopoverTrigger>
       <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
         mode='range'
         numberOfMonths={2}
         autoFocus
         showOutsideDays={false}
         formatters={{
          formatWeekdayName(date, locale) {
           const weekday =
            new Intl.DateTimeFormat(locale?.locale?.code || 'fa', {
             dateStyle: 'full',
            })
             .formatToParts(date)
             .at(-1)?.value || '';
           return weekday[0];
          },
         }}
        />
       </PopoverContent>
      </Popover>
     </div>
     <Button
      disableElevation
      variant='contained'
      size='large'
      className='min-h-[3.5rem]'
     >
      <span className='font-medium'>جستجو هتل یا اقامتگاه</span>
     </Button>
    </div>
   </form>
   <BookingSearch
    open={showBookingSearch}
    onClose={() => {
     handleToggleBookingSearch(false);
    }}
   />
  </article>
 );
}
