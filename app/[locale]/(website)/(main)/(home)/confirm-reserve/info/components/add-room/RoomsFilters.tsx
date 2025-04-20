import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { type RoomsFilterSchema } from '../../schema/roomsFilterSchema';
import { useFormContext, Controller } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import MuiButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Calendar } from '@/components/ui/calendar';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import Drawer from '@mui/material/Drawer';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import * as dateFns from 'date-fns';
import Checkbox from '@mui/material/Checkbox';

type Props = {
 showFilters: boolean;
 toggleFilters: () => void;
 result: number;
};

const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});

export default function RoomsFilters({
 showFilters,
 toggleFilters,
 result,
}: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { watch, setValue, control } = useFormContext<RoomsFilterSchema>();
 const [fromDateValue, untilDateValue] = watch(['fromDate', 'untilDate']);

 const advancedFilters = (
  <>
   <div className='mb-6 pe-3 me-3 lg:mb-0 lg:border-e border-e-neutral-300'>
    <Controller
     name='bedCount'
     control={control}
     render={({ field }) => (
      <RadioGroup row={isLargeDevice} {...field}>
       <FormControlLabel
        label='همه'
        control={<Radio color='success' value='all' />}
       />
       <FormControlLabel
        label='۱ نفره'
        control={<Radio color='success' value='one' />}
       />
       <FormControlLabel
        label='2 نفره'
        control={<Radio color='success' />}
        value='two'
       />
       <FormControlLabel
        label='۳ نفره یا بیشتر'
        control={<Radio color='success' value='more' />}
       />
      </RadioGroup>
     )}
    />
   </div>
   <div className='flex flex-col lg:flex-row'>
    <Controller
     name='noBreakfast'
     control={control}
     render={({ field: { value, onChange, ...other } }) => (
      <FormControlLabel
       label='بدون صبحانه'
       control={
        <Checkbox
         color='secondary'
         {...other}
         onChange={(_, newValue) => onChange(newValue)}
         checked={value}
         value={value}
        />
       }
      />
     )}
    />
    <Controller
     name='noPenalty'
     control={control}
     render={({ field: { value, onChange, ...other } }) => (
      <FormControlLabel
       label='بدون جریمه'
       control={
        <Checkbox
         color='secondary'
         {...other}
         onChange={(_, newValue) => onChange(newValue)}
         checked={value}
         value={value}
        />
       }
      />
     )}
    />
    <Controller
     name='fullBoard'
     control={control}
     render={({ field: { value, onChange, ...other } }) => (
      <FormControlLabel
       label='فول برد'
       control={
        <Checkbox
         color='secondary'
         {...other}
         checked={value}
         onChange={(_, newValue) => onChange(newValue)}
         value={value}
        />
       }
      />
     )}
    />
   </div>
  </>
 );

 return (
  <>
   <div className='bg-neutral-50 p-4 border border-100 mb-6 sticky top-0 z-10 rounded-lg'>
    <div className='container grid gap-2 lg:gap-0 lg:grid-cols-[minmax(15rem,20rem)_1fr]'>
     <div className='lg:pe-3 lg:me-3 lg:border-e border-e-neutral-300'>
      <Popover>
       <PopoverTrigger asChild>
        <Button
         disabled
         variant={'outline'}
         className={cn(
          'w-full justify-start text-left font-normal border border-neutral-300 bg-background hover:bg-neutral-100 hover:text-foreground'
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
         showOutsideDays={false}
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
     <div className='hidden ms-4 lg:flex items-center gap-2'>
      {advancedFilters}
     </div>
    </div>
    {!isLargeDevice && (
     <Drawer
      anchor='bottom'
      open={showFilters}
      onClose={() => toggleFilters()}
      sx={{
       zIndex: 2000,
       '& .MuiPaper-root': {
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
       },
      }}
     >
      <div className='flex items-center p-4 border-b border-neutral-300'>
       <div className='text-secondary-dark font-medium basis-16'>
        <span>نتایج: </span>
        <span>{result}</span>
       </div>
       <div className='flex-grow text-center font-medium'>فیلترها</div>
       <div className='basis-16 text-end'>
        <MuiButton
         color='error'
         onClick={() => {
          toggleFilters();
         }}
        >
         <CloseIcon />
        </MuiButton>
       </div>
      </div>
      <div className='p-4 ps-8'>{advancedFilters}</div>
     </Drawer>
    )}
   </div>
  </>
 );
}
