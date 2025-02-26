import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import NearMeIcon from '@mui/icons-material/NearMe';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';

type Props = {
 open: boolean;
 onClose: () => void;
};

export default function BookingSearch({ open, onClose }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 return (
  <>
   <Dialog
    fullScreen={!isLargeDevice}
    fullWidth
    open={open}
    onClose={() => onClose()}
    maxWidth='md'
   >
    <DialogTitle>
     <div className='flex justify-between items-center'>
      <span className='text-base'>نام شهر یا اقامتگاه</span>
      <IconButton onClick={() => onClose()}>
       <CloseIcon />
      </IconButton>
     </div>
    </DialogTitle>
    <DialogContent dividers>
     <div className='mb-2'>
      <TextField
       autoFocus
       type='search'
       placeholder='برای مثال: تهران'
       sx={{
        '& .MuiOutlinedInput-notchedOutline': {
         borderWidth: '2px',
         borderRadius: 0,
        },
       }}
       InputProps={{
        endAdornment: (
         <InputAdornment position='end'>
          <SearchIcon />
         </InputAdornment>
        ),
       }}
       fullWidth
      />
     </div>
     <div>
      <Button className='w-full'>
       <div className='flex gap-2 items-center'>
        <NearMeIcon />
        <span>براساس موقعیت فعلی</span>
       </div>
      </Button>
      <div className='pt-6'>
       <h3 className='px-4 mb-2 font-medium'>موقعیت های یافت شده:‌ </h3>
       <ul className='[&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-neutral-300'>
        {Array.from({ length: 3 }, (_, i) => i).map((i) => (
         <li key={i}>
          <div
           className='flex justify-between gap-3 items-center transition-all hover:bg-neutral-100 p-3 py-2'
           role='button'
           tabIndex={-1}
          >
           <div className='flex gap-2 items-center'>
            <LocationOnIcon color='error' />
            <div className='flex flex-col gap-1'>
             <span className='font-medium'>تهران</span>
             <span className='font-light text-[0.7rem]'>ایران</span>
            </div>
           </div>
          </div>
         </li>
        ))}
       </ul>
      </div>
     </div>
    </DialogContent>
   </Dialog>
  </>
 );
}
