import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
const dateFormatter = new Intl.DateTimeFormat('fa', {
 year: 'numeric',
 month: 'long',
 day: '2-digit',
});
const timeFormatter = new Intl.DateTimeFormat('fa', {
 hour: '2-digit',
 minute: '2-digit',
});

export default function InvoiceDetails() {
 return (
  <section className='order-1 lg:order-2 lg:w-[25rem]'>
   <div className='rounded-lg border border-neutral-300 p-4 sticky'>
    <h3 className='font-medium text-base  pb-4 border-b border-neutral-300'>
     هتل الماس
    </h3>
    <div className='p-4 mb-2'>
     <div className='flex gap-2 items-center'>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ ورود</div>
       <div className='font-medium mb-1'>
        {dateFormatter.format(new Date())}
       </div>
       <div>{timeFormatter.format(new Date())}</div>
      </div>
      <div className='flex flex-col items-center text-secondary-dark'>
       <span className='font-medium'>{2} شب</span>
       <div className='flex items-center'>
        <ArrowLeftIcon className='-ms-3 invisible' />
        <span className='w-[3rem] h-[1px] bg-secondary-dark'></span>
        <ArrowLeftIcon className='-ms-3' />
       </div>
      </div>
      <div className='flex-grow text-center'>
       <div className='text-primary font-medium  mb-2'>تاریخ خروج</div>
       <div className='font-medium'>{dateFormatter.format(new Date())}</div>
       <div>{timeFormatter.format(new Date())}</div>
      </div>
     </div>
    </div>
    <div>
     <ul className='grid gap-1'>
      {[1, 2, 3].map((item) => (
       <li key={item}>
        <span className='text-neutral-500'>اتاق ۱: </span>
        <span className='font-medium'>دوتخته تویین</span>
       </li>
      ))}
     </ul>
    </div>
   </div>
  </section>
 );
}
