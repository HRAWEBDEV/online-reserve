'use client';
import Modal from '@mui/material/Dialog';
import ModalContent from '@mui/material/DialogContent';
import ModalTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RoomsList from './RoomsList';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import {
 defaultValues,
 type RoomsFilterSchema,
 roomsFilterSchema,
} from '../../schema/roomsFilterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import RoomsFilters from './RoomsFilters';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';

type Props = {
 isOpen: boolean;
 onToggle: () => void;
};

export default function RoomsModal({ isOpen, onToggle }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const { isQueryTrue, handleToggle } = useQueryToggler('show-rooms-filters');
 const searchParams = useSearchParams();
 const roomsFilterUseForm = useForm<RoomsFilterSchema>({
  defaultValues: {
   ...defaultValues,
   fromDate: new Date(searchParams.get('checkinDate') as string),
   untilDate: new Date(searchParams.get('checkoutDate') as string),
  },
  resolver: zodResolver(roomsFilterSchema),
 });
 return (
  <Modal
   open={isOpen}
   onClose={() => onToggle()}
   fullWidth
   maxWidth='xl'
   fullScreen={!isLargeDevice}
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
      result={10}
     />
     <RoomsList result={10} toggleFilters={handleToggle} />
    </FormProvider>
   </ModalContent>
  </Modal>
 );
}
