import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PickersDay } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { currencyFormatter } from '@/app/utils/currencyFormatter';

type Props = {
 open: boolean;
 onCloseCalendar: () => void;
};

function CustomCalendarHeader() {
 return <div></div>;
}

export default function PricingCalendar({ open, onCloseCalendar }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const daysCellWidth = isLargeDevice ? '4.5rem' : '2.8rem';
 return (
  <Dialog
   open={open}
   fullWidth
   fullScreen={!isLargeDevice}
   maxWidth='md'
   onClose={onCloseCalendar}
  >
   <DialogTitle
    sx={{
     padding: '0.5rem 1rem',
    }}
   >
    <div className='flex justify-between items-center'>
     <div>
      <p className='text-base text-primary'>اتاق یک تخته</p>
     </div>
     <div>
      <IconButton color='error' onClick={onCloseCalendar}>
       <CloseIcon />
      </IconButton>
     </div>
    </div>
   </DialogTitle>
   <DialogContent dividers>
    <StaticDatePicker
     sx={{
      '& .MuiDateCalendar-root': {
       width: 'unset',
       maxHeight: 'unset',
       height: 'unset',
      },
      '& .MuiButtonBase-root': {
       borderRadius: 0,
      },
      '& .MuiPickersDay-today': {
       border: 0,
      },
      '& .Mui-selected': {
       backgroundColor: 'unset !important',
       color: 'unset !important',
      },
      '& .Mui-selected:is(:hover,:focus)': {
       backgroundColor: 'unset !important',
       color: 'unset !important',
      },
      '& .MuiTypography-caption': {
       width: daysCellWidth,
       height: daysCellWidth,
       fontWeight: 500,
       fontSize: '1rem',
       color: (theme) => theme.palette.primary.main,
      },
      '& .MuiPickersDay-root': {
       width: daysCellWidth,
       height: daysCellWidth,
      },
      '& .MuiPickersSlideTransition-root': {
       minHeight: '400px',
      },
     }}
     slots={{
      calendarHeader: CustomCalendarHeader,

      day(params) {
       return (
        <PickersDay {...params}>
         <div className='flex flex-col'>
          <div>
           <span className='font-medium text-base'>
            {new Intl.DateTimeFormat('fa', { day: 'numeric' }).format(
             params.day
            )}
           </span>
          </div>
          <div>{currencyFormatter.format(80000000)}</div>
         </div>
        </PickersDay>
       );
      },
     }}
     slotProps={{
      actionBar: {
       hidden: true,
       actions: [],
      },
      toolbar: {
       hidden: true,
      },
     }}
    />
    <div className='bg-neutral-200 border border-neutral-300 p-3 rounded-lg'>
     test
    </div>
   </DialogContent>
  </Dialog>
 );
}
