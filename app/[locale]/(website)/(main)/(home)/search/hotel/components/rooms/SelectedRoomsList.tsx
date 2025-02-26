import Button from '@mui/material/Button';

export default function SelectedRoomsList() {
 return (
  <section>
   <div className='rounded-lg border border-neutral-300 p-4 hidden lg:flex flex-col sticky top-32'>
    <div>
     <div className='min-h-20 text-center mt-4 font-medium'>
      اتاقی انتخاب نشده است.
     </div>
     <div>
      <Button size='large' className='w-full' variant='contained' color='error'>
       ثبت رزرو
      </Button>
     </div>
    </div>
   </div>
  </section>
 );
}
