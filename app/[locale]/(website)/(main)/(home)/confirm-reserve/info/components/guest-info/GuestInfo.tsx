'use client';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RoomsModal from '../add-room/RoomsModal';
import SelectedRoom from './SelectedRoom';

export default function GuestInfo() {
 const { isQueryTrue, handleToggle } = useQueryToggler('show-add-rooms');
 return (
  <form className='p-4 order-2 md:order-1 md:flex-grow rounded-lg border border-neutral-300'>
   <div className='flex gap-4 justify-between items-center mb-4'>
    <h3 className='font-medium text-base'>مشخصات رزرو کننده</h3>
    <Button variant='outlined' color='error' onClick={() => handleToggle()}>
     <div className='flex items-center gap-2'>
      <AddOutlinedIcon />
      افزودن اتاق
     </div>
    </Button>
   </div>
   <div className='grid grid-cols-2 gap-4 mb-6'>
    <TextField size='medium' label='نام و نام‌خانوادگی' required />
    <TextField size='medium' label='کدملی' required />
    <TextField size='medium' label='پست الکترونیکی' />
    <TextField size='medium' label='شماره همراه' required />
   </div>
   <h3 className='font-medium text-base mb-6'>مشخصات سرپرست اتاق‌ها</h3>
   {[1].map((item) => (
    <SelectedRoom key={item} />
   ))}
   <div className='flex justify-end'>
    <Button className='w-[8rem]' size='large' variant='contained'>
     تایید
    </Button>
   </div>
   <RoomsModal isOpen={isQueryTrue} onToggle={handleToggle} />
  </form>
 );
}
