import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PickersDay } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import { currencyFormatter } from '@/app/utils/currencyFormatter';
import { useQuery } from '@tanstack/react-query';
import {
 type RoomInventory,
 type RoomAccomodationType,
 getRoomDailyPriceKey,
 getRoomPriceDaily,
} from '../../services/HotelApiActions';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';
import * as dateFns from 'date-fns-jalali';

type Props = {
 open: boolean;
 selectedRoom: RoomInventory;
 selectedRoomPlan: RoomAccomodationType;
 onCloseCalendar: () => void;
};

function CustomCalendarHeader() {
 return <div></div>;
}

export default function PricingCalendar({
 open,
 onCloseCalendar,
 selectedRoom,
 selectedRoomPlan,
}: Props) {
 const { requestData, checkInDate, checkOutDate } = useRoomsInfoContext();
 const { isLargeDevice } = useAppMonitorConfig();
 const daysCellWidth = isLargeDevice ? '5rem' : '2.8rem';

 const { data } = useQuery({
  queryKey: [
   getRoomDailyPriceKey,
   selectedRoom.internalID!,
   selectedRoomPlan.internalID!,
  ],
  async queryFn({ signal }) {
   const res = await getRoomPriceDaily({
    signal,
    arzID: requestData.arzID,
    channelID: requestData.channelID,
    hotelID: requestData.hotelID,
    providerID: requestData.providerID,
    startDate: dateFns.startOfMonth(checkInDate).toISOString(),
    endDate: dateFns.endOfMonth(checkOutDate).toISOString(),
    beds: selectedRoomPlan?.beds,
    roomTypeID: selectedRoom.roomTypeID,
    ratePlanID: selectedRoomPlan.ratePlanID,
   });
   return res.data;
  },
 });

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
       minHeight: '420px',
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
          <div className='font-medium text-[0.8rem]'>
           {currencyFormatter.format(80000000)}
          </div>
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
    <div className='bg-neutral-200 border border-neutral-300 p-3 rounded-lg flex flex-wrap gap-4 justify-center items-center text-[0.8rem]'>
     <div className='flex items-center gap-1'>
      <div className='bg-red-500 h-4 w-4 rounded-full'></div>
      <div>محدودیت فروش</div>
     </div>
     <div className='flex items-center gap-1'>
      <div className='bg-purple-500 h-4 w-4 rounded-full'></div>
      <div>محدودیت ورود</div>
     </div>
     <div className='flex items-center gap-1'>
      <div className='bg-orange-500 h-4 w-4 rounded-full'></div>
      <div>محدودیت خروج</div>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 );
}
