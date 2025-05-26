import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import { type HotelInfo } from '@/app/[locale]/(website)/services/HotelApiActions';

export default function SearchBreadCrumb({
 hotelInfo,
}: {
 hotelInfo: HotelInfo | null;
}) {
 return (
  <nav className='mb-4 mt-4'>
   <div className='container flex justify-between gap-3 items-center'>
    <Breadcrumbs separator={<NavigateBefore fontSize='small' />}>
     <Link href={'#'} className='text-secondary-dark font-medium'>
      {hotelInfo?.fName}
     </Link>
    </Breadcrumbs>
   </div>
  </nav>
 );
}
