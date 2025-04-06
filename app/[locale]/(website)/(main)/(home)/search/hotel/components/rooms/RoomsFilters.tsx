import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { type RoomsFilterSchema } from '../../schema/roomsFilterSchema';
import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import * as dateFns from 'date-fns';
import Checkbox from '@mui/material/Checkbox';

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});

export default function RoomsFilters() {
 const { watch, setValue } = useFormContext<RoomsFilterSchema>();
 const [fromDateValue, untilDateValue] = watch(['fromDate', 'untilDate']);
 return (
  <>
   <div className='bg-neutral-50 p-4 border-y border-100 mb-6 lg:sticky top-0 z-10'>
    <div className='container grid grid-cols-[minmax(15rem,20rem)_1fr]'>
     <div className='pe-3 me-3 border-e border-e-neutral-300'>
      <Popover>
       <PopoverTrigger asChild>
        <Button
         variant={'outline'}
         className={cn(
          'w-full justify-start text-left font-normal border border-neutral-300 bg-background hover:bg-neutral-100'
         )}
        >
         <CalendarIcon />
         {fromDateValue && untilDateValue ? (
          <>
           {dateFormatter.format(fromDateValue)} -{' '}
           {dateFormatter.format(untilDateValue)}
          </>
         ) : (
          <span>انتخاب تاریخ</span>
         )}
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
         mode='range'
         autoFocus
         required
         selected={{
          from: fromDateValue || null,
          to: untilDateValue || null,
         }}
         onSelect={(selected) => {
          setValue('fromDate', selected.from!);
          setValue('untilDate', selected.to!);
         }}
         numberOfMonths={2}
         disabled={(date) => date < dateFns.startOfToday()}
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
     <div className='ms-4 md:flex items-center gap-2'>
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
    </div>
   </div>
  </>
 );
}
