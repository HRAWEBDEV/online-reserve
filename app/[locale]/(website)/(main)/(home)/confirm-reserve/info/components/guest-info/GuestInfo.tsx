'use client';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RoomsModal from '../add-room/RoomsModal';
import SelectedRoom from './SelectedRoom';
import { useFormContext } from 'react-hook-form';
import { ReserveInfoSchema } from '../../schema/reserveInfoSchema';
import { useConfirmReserveContext } from '../../services/confirmReserveContext';
import { useInternalID } from '@/hooks/useInternalID';
import Skeleton from '@mui/material/Skeleton';

export default function GuestInfo() {
 const { isQueryTrue, handleToggle } = useQueryToggler('show-add-rooms');
 const { getID } = useInternalID();
 const {
  selectedRooms,
  handleConfirmReserve,
  isLoadingRooms,
  loadingAddRoom,
  confirmReserveLoading,
 } = useConfirmReserveContext();
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useFormContext<ReserveInfoSchema>();

 return (
  <form className='p-4 order-2 lg:order-1 lg:flex-grow rounded-lg border border-neutral-300'>
   <div className='flex gap-4 justify-between items-center mb-4'>
    <h3 className='font-medium text-base'>مشخصات رزرو کننده</h3>
    <Button
     variant='outlined'
     color='error'
     onClick={() => handleToggle()}
     loading={isLoadingRooms || loadingAddRoom || confirmReserveLoading}
    >
     <div className='flex items-center gap-2'>
      <AddOutlinedIcon />
      افزودن اتاق
     </div>
    </Button>
   </div>
   <div className='grid grid-cols-2 gap-4 mb-6'>
    <div className='grid col-span-full lg:col-auto grid-cols-2 gap-4'>
     <TextField
      size='medium'
      label='نام'
      error={!!errors.reserveFirstName}
      helperText={errors.reserveFirstName?.message || ''}
      required
      {...register('reserveFirstName')}
     />
     <TextField
      size='medium'
      label='نام‌خانوادگی'
      error={!!errors.reserveLastName}
      helperText={errors.reserveLastName?.message || ''}
      required
      {...register('reserveLastName')}
     />
    </div>
    <TextField
     className='col-span-full lg:col-auto'
     size='medium'
     label='کدملی'
     error={!!errors.reserveNationalCode}
     helperText={errors.reserveNationalCode?.message || ''}
     required
     {...register('reserveNationalCode')}
    />
    <TextField
     size='medium'
     label='پست الکترونیکی'
     error={!!errors.reserveEmail}
     helperText={errors.reserveEmail?.message || ''}
     {...register('reserveEmail')}
    />
    <TextField
     size='medium'
     label='شماره همراه'
     required
     error={!!errors.reservePhoneNumber}
     helperText={errors.reservePhoneNumber?.message || ''}
     {...register('reservePhoneNumber')}
    />
   </div>
   <h3 className='font-medium text-base mb-6'>مشخصات سرپرست اتاق‌ها</h3>

   {(isLoadingRooms || loadingAddRoom) && (
    <div className='mb-6'>
     <Skeleton
      variant='rounded'
      height={100}
      width={'100%'}
      sx={{ backgroundColor: (theme) => theme.palette.neutral[200] }}
     />
    </div>
   )}
   {selectedRooms.map((room, i) => {
    getID(room);
    return <SelectedRoom key={room.internalID} room={room} itemIndex={i} />;
   })}
   <div className='flex justify-end'>
    <Button
     className='w-[8rem]'
     size='large'
     variant='contained'
     onClick={handleSubmit(handleConfirmReserve)}
     loading={isLoadingRooms || loadingAddRoom || confirmReserveLoading}
    >
     تایید
    </Button>
   </div>
   {isQueryTrue && <RoomsModal isOpen={isQueryTrue} onToggle={handleToggle} />}
  </form>
 );
}
