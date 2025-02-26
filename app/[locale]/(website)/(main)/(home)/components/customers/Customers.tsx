'use client';
import Link from 'next/link';
// import Button from '@mui/material/Button';

const customers = [
 {
  customerName: 'Accor',
  image: '/images/customers/Accor.jpg',
 },
 {
  customerName: 'Melal',
  image: '/images/customers/Melal.jpg',
 },
 {
  customerName: 'Almas',
  image: '/images/customers/Almas.jpg',
 },
 {
  customerName: 'Arya',
  image: '/images/customers/Arya.jpg',
 },
 {
  customerName: 'Espinas',
  image: '/images/customers/Espinas.jpg',
 },
 {
  customerName: 'Ghasr',
  image: '/images/customers/Ghasr.jpg',
 },
 {
  customerName: 'Helia',
  image: '/images/customers/Helia.jpg',
 },
 {
  customerName: 'Homa',
  image: '/images/customers/Homa.jpg',
 },
 {
  customerName: 'Jahangardi',
  image: '/images/customers/Jahangardi.jpg',
 },
 {
  customerName: 'Kosar',
  image: '/images/customers/Kosar.jpg',
 },
 {
  customerName: 'Laleh',
  image: '/images/customers/Laleh.jpg',
 },
 {
  customerName: 'Mehr',
  image: '/images/customers/Mehr.jpg',
 },
 {
  customerName: 'Pars',
  image: '/images/customers/Pars.jpg',
 },
 {
  customerName: 'Parsian',
  image: '/images/customers/Parsian.jpg',
 },
 {
  customerName: 'Sorinet',
  image: '/images/customers/Sorinet.jpg',
 },
];

export default function Customers() {
 return (
  <section className='container mt-4 mb-8'>
   <div className='flex gap-4 items-center mb-4'>
    <h3 className='text-lg font-medium flex-grow text-center'>گروه هتل ها</h3>
   </div>
   <section>
    <ul className='flex flex-wrap gap-4 justify-center max-w-[min(100%,20rem)] md:max-w-[min(100%,40rem)] lg:max-w-[min(100%,60rem)] mx-auto'>
     {customers.map((customer) => (
      <li
       key={customer.customerName}
       className='basis-[calc((100%_-_1*1rem)/2)] md:basis-[calc((100%_-_2*1rem)/3)] lg:basis-[calc((100%_-_4*1rem)/5)]'
      >
       <Link href='#' className='block'>
        <img
         src={customer.image}
         alt='customers'
         className='w-full object-contain max-h-24'
        />
       </Link>
      </li>
     ))}
    </ul>
    {/* <div className='text-center sticky bottom-0 p-4 bg-gradient-to-t from-background to-background/4'>
     <Button variant='outlined' className='w-[12rem]'>
      نمایش بیشتر
     </Button>
    </div> */}
   </section>
  </section>
 );
}
