'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker/persian';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function Calendar({
 className,
 classNames,
 showOutsideDays = true,
 ...props
}: React.ComponentProps<typeof DayPicker>) {
 return (
  <DayPicker
   showOutsideDays={showOutsideDays}
   className={cn('p-3', className)}
   classNames={{
    months: 'flex flex-col sm:flex-row gap-2 sm:gap-4',
    month: 'flex flex-col gap-4',
    month_caption: 'flex justify-center pt-1 relative items-center w-full',
    caption_label: 'text-sm font-medium',
    nav: 'flex items-center gap-1 justify-between absolute start-3 end-3 z-[2]',
    button_previous: cn(
     buttonVariants({ variant: 'outline' }),
     'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-neutral-100 focus:bg-neutral-100'
    ),
    button_next: cn(
     buttonVariants({ variant: 'outline' }),
     'size-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-neutral-100 focus:bg-neutral-100'
    ),
    month_grid: 'w-full border-collapse space-x-1',
    weekdays: 'flex',
    weekday: 'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
    week: 'flex w-full mt-2',
    day: cn(
     buttonVariants({ variant: 'ghost' }),
     'size-8 p-0 font-normal aria-selected:opacity-100 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-secondary [&:has([aria-selected].day-range-end)]:rounded-r-md hover:text-secondary-foreground',
     props.mode === 'range'
      ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
      : '[&:has([aria-selected])]:rounded-md'
    ),
    day_button: cn('size-8'),
    range_start:
     'day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground',
    range_end:
     'day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground',
    selected:
     'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    today: 'border border-neutral-200',
    outside:
     'day-outside text-muted-foreground aria-selected:text-muted-foreground',
    disabled: 'text-muted-foreground opacity-50',
    range_middle: 'aria-selected:bg-neutral-200 aria-selected:text-foreground',
    hidden: 'invisible',
    ...classNames,
   }}
   components={{
    PreviousMonthButton: (props) => {
     return (
      <button {...props}>
       <ArrowRightIcon fontSize='large' />
      </button>
     );
    },
    NextMonthButton: (props) => {
     return (
      <button {...props}>
       <ArrowLeftIcon fontSize='large' />
      </button>
     );
    },
   }}
   {...props}
  />
 );
}

export { Calendar };
