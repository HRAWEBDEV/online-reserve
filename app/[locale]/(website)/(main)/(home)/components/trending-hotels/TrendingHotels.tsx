import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Link from 'next/link';

const hotels = [
 {
  title: 'هتل پیروزی اصفهان',
  image: '/images/mashad.jpg',
 },
 {
  title: 'هتل الماس',
  image: '/images/almas.jpg',
 },
 {
  title: 'هتل شیراز',
  image: '/images/shiraz.jpg',
 },
 {
  title: 'هتل تهران',
  image: '/images/tehran.jpg',
 },
];

export default function TrendingHotels() {
 return (
  <section className='container mt-4 mb-10'>
   <div className='flex gap-4 items-center mb-4'>
    <h3 className='text-lg font-medium flex-grow text-center lg:text-start'>
     هتل های برتر و پربازدید
    </h3>
    <div className='hidden lg:block'>
     <Button variant='outlined'>
      <span>نمایش همه ی هتل ها</span>
     </Button>
    </div>
   </div>
   <div className='flex gap-4 flex-wrap justify-center mb-4'>
    {hotels.map((hotel) => (
     <Link
      href={'#'}
      key={hotel.title}
      className='h-[18rem] lg:h-[23rem] basis-[calc((100%_-_16px)/2)] md:basis-[calc((100%_-_16px*2)/3)] lg:basis-[calc((100%_-_16px*3)/4)] rounded-md relative border border-neutral-300 bg-black overflow-hidden [&:is(:hover,:focus)]:scale-105 transition-transform'
     >
      <img
       className='h-full w-full object-coverj'
       src={hotel.image}
       alt='hotels image'
       loading='lazy'
      />
      <div className='flex flex-col absolute inset-0 bg-gradient-to-b from-black/5 from-50% to-black/50'>
       <div className='flex-grow'></div>
       <div className='text-white text-center p-2 pb-4 font-medium'>
        <div className='p-2 text-center'>
         {Array.from({ length: 5 }, (_, i) => i).map((item) => (
          <StarIcon key={item} color='warning' />
         ))}
        </div>
        <p className='mb-2 text-base'>هتل پیروزی اصفهان</p>
        <div>
         <span className='text-base'>3,423,000</span>
         <span className='ps-2'>ریال</span>
        </div>
       </div>
      </div>
     </Link>
    ))}
   </div>
   <Button size='large' variant='outlined' className='w-full lg:!hidden'>
    <span>نمایش همه ی هتل ها</span>
   </Button>
  </section>
 );
}
