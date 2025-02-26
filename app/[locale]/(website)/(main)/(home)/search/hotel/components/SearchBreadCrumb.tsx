import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateBefore from '@mui/icons-material/NavigateBefore';

export default function SearchBreadCrumb() {
 return (
  <nav className='mb-4 mt-4'>
   <div className='container flex justify-between gap-3 items-center'>
    <Breadcrumbs separator={<NavigateBefore fontSize='small' />}>
     <Link href={'#'}>رزرو هتل</Link>
     <Link href={'#'}>کیش</Link>
     <Link href={'#'}>رزرو هتل کیش</Link>
     <Link href={'#'} className='text-secondary-dark font-medium'>
      هتل الماس
     </Link>
    </Breadcrumbs>
   </div>
  </nav>
 );
}
