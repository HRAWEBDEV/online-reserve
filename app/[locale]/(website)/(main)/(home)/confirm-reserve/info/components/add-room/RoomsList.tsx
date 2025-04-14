'use client';
import { Fragment } from 'react';
import Room from './Room';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import TuneIcon from '@mui/icons-material/Tune';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';

type Props = {
 result: number;
 toggleFilters: () => void;
};

export default function RoomsList({ result, toggleFilters }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 if (false) {
  return (
   <div className='grid place-content-center font-medium text-base'>
    اتاقی یافت نشد.
   </div>
  );
 }
 return (
  <>
   <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1 relative'>
    {[1, 2, 3].map((room) => {
     return (
      <Fragment key={room}>
       {[1, 2, 3].map((roomPlan) => {
        return <Room key={roomPlan} />;
       })}
      </Fragment>
     );
    })}
   </section>
   {!isLargeDevice && result && (
    <div className='sticky bottom-10 z-10 flex justify-center start-0 end-0'>
     <Button
      onClick={toggleFilters}
      className='!bg-primary-foreground'
      sx={{ borderRadius: '2rem' }}
      variant='outlined'
      size='large'
     >
      <div className='flex gap-4 items-center'>
       <Badge badgeContent={10} color='error'>
        <TuneIcon />
       </Badge>
       <span>فیلترها</span>
      </div>
     </Button>
    </div>
   )}
  </>
 );
}
