'use client';
import Modal from '@mui/material/Dialog';
import ModalContent from '@mui/material/DialogContent';
import ModalTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RoomsList from './RoomsList';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { FormProvider, useForm } from 'react-hook-form';
import {
 type RoomsFilterSchema,
 defaultValues,
 roomsFilterSchema,
} from '../../../../search/hotel/schema/roomsFilterSchema';
import { useRoomsInfoContext } from '../../services/roomsInfoContext';
import {
 getRoomInventory,
 getRoomInventoryKey,
 getRatePlanTypes,
 getRatePlanTypesKey,
} from '../../../../../../services/HotelApiActions';
import { useQuery } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import RoomsFilters from './RoomsFilters';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import * as dateFns from 'date-fns';

type Props = {
 isOpen: boolean;
 onToggle: () => void;
};

export default function RoomsModal({ isOpen, onToggle }: Props) {
 const { requestData, ratePlanType, checkInDate, checkOutDate } =
  useRoomsInfoContext();
 const nights = dateFns.differenceInDays(checkOutDate, checkInDate);
 const { isLargeDevice } = useAppMonitorConfig();
 const { isQueryTrue, handleToggle } = useQueryToggler('show-rooms-filters');
 const roomsFilterUseForm = useForm<RoomsFilterSchema>({
  defaultValues: {
   ...defaultValues,
   fromDate: checkInDate,
   untilDate: checkOutDate,
  },
  resolver: zodResolver(roomsFilterSchema),
 });
 const { watch, setValue } = roomsFilterUseForm;
 const bedCountValue = watch('bedCount');
 // rate plan types
 const { data: ratePlanTypes = [] } = useQuery({
  queryKey: [getRatePlanTypesKey, 'add-room'],
  async queryFn({ signal }) {
   const { data } = await getRatePlanTypes({ signal, ...requestData });
   if (ratePlanType) {
    const activeRatePlan = data.find(
     (ratePlan) => ratePlan.ratePlanID === ratePlanType
    );
    if (activeRatePlan) setValue('ratePlanType', activeRatePlan);
   }
   return data;
  },
 });
 //
 const {
  data: rooms = [],
  isFetching,
  isLoading,
 } = useQuery({
  queryKey: [getRoomInventoryKey, 'add-room', bedCountValue],
  async queryFn({ signal }) {
   if (
    !checkInDate ||
    !checkOutDate ||
    checkInDate.toISOString() === checkOutDate.toISOString()
   )
    return [];
   let personQuery = '0';
   switch (bedCountValue) {
    case 'one':
     personQuery = '1';
     break;
    case 'two':
     personQuery = '2';
     break;
    case 'more':
     personQuery = '3';
     break;
   }
   const res = await getRoomInventory({
    signal,
    checkinDate: checkInDate.toISOString(),
    checkoutDate: checkOutDate.toISOString(),
    person: personQuery,
    noBreakfast: 'false',
    fullBoard: 'false',
    refundable: 'false',
    ratePlanID: ratePlanType ? ratePlanType.toString() : '',
    ...requestData,
   });
   return res.data;
  },
 });

 return (
  <Modal
   open={isOpen}
   onClose={() => onToggle()}
   fullWidth
   maxWidth='xl'
   fullScreen={!isLargeDevice}
   sx={{
    '& .MuiPaper-root': {
     height: '100%',
    },
   }}
  >
   <ModalTitle>
    <div className='flex justify-between gap-4 items-center'>
     <span className='text-lg'>اتاق‌ها</span>
     <IconButton color='error' onClick={() => onToggle()}>
      <CloseIcon />
     </IconButton>
    </div>
   </ModalTitle>
   <ModalContent dividers>
    <FormProvider {...roomsFilterUseForm}>
     <RoomsFilters
      toggleFilters={handleToggle}
      showFilters={isQueryTrue}
      result={rooms.length}
      ratePlanTypes={ratePlanTypes}
     />
     <RoomsList
      result={rooms.length}
      toggleFilters={handleToggle}
      isLoadingRooms={isFetching || isLoading}
      rooms={rooms}
      nights={nights}
      closeModal={() => onToggle()}
     />
    </FormProvider>
   </ModalContent>
  </Modal>
 );
}
