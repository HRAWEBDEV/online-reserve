import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateBefore from '@mui/icons-material/NavigateBefore';

export default function SearchBreadCrumb() {
 return (
  <nav className='container flex justify-between gap-3 items-center mb-4'>
   <Breadcrumbs separator={<NavigateBefore fontSize='small' />}>
    <Link href={'#'}>رزرو هتل</Link>
    <Link href={'#'}>کیش</Link>
    <Link href={'#'} className='text-secondary-dark font-medium'>
     رزرو هتل کیش
    </Link>
   </Breadcrumbs>
  </nav>
 );
}
