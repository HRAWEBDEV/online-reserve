'use client';
import AlinLogoShapeIcon from '@/icons/AlinLogoShapeIcon';
import DehazeIcon from '@mui/icons-material/Dehaze';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { useNavigationContext } from '../../services/navigation/navigation';
import { useAppConfig } from '@/app/services/app-config/appConfig';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { websiteMenu } from '../../utils/websiteMenu';

export default function Logo() {
 const { navbarIsVisible, toggleNavbar } = useNavigationContext();
 const { localeInfo } = useAppConfig();

 return (
  <div className='flex gap-2 items-center -ms-2 lg:ms-0'>
   <div className='lg:hidden'>
    <IconButton
     size='large'
     sx={{
      color: 'inherit',
     }}
     onClick={toggleNavbar}
    >
     <DehazeIcon />
    </IconButton>
   </div>
   <Link href='/'>
    <AlinLogoShapeIcon fill='currentColor' className='w-[2.4rem] lg:w-[3rem]' />
   </Link>
   <Drawer
    sx={{
     '& .MuiPaper-root': {
      width: '100%',
     },
    }}
    open={navbarIsVisible}
    onClose={toggleNavbar}
    anchor={localeInfo.dir === 'rtl' ? 'left' : 'right'}
   >
    <div className='p-4 flex gap-4'>
     <div>
      <IconButton color='error' onClick={toggleNavbar}>
       {localeInfo.dir === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </IconButton>
     </div>
    </div>
    <div>
     <ul>
      {websiteMenu.map((menu) => (
       <li key={menu.title}>
        <div
         role='button'
         className='flex gap-3 items-center text-neutral-600 container py-3 hover:bg-neutral-100 focus:bg-neutral-100'
        >
         {menu.icon}
         <span>{menu.title}</span>
        </div>
       </li>
      ))}
     </ul>
    </div>
   </Drawer>
  </div>
 );
}
