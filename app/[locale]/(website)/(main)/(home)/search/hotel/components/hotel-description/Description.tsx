import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function Description() {
 return (
  <section className='container grid md:grid-cols-2 gap-4 mb-6'>
   <article>
    <div className='grid gap-4  lg:text-base justify-items-center grid-cols-4 mb-4'>
     <div className='text-center text-primary-dark font-medium'>
      <p className='mb-2'>ساعت ورود</p>
      <div>12:23</div>
     </div>
     <div className='text-center text-primary-dark font-medium'>
      <p className='mb-2'>ساعت خروج</p>
      <div>12:23</div>
     </div>
     <div className='text-center text-primary-dark font-medium'>
      <p className='mb-2'>تعداد اتاق</p>
      <div>23</div>
     </div>
     <div className='text-center text-primary-dark font-medium'>
      <p className='mb-2'>تعداد طبقه</p>
      <div>25</div>
     </div>
    </div>
    <p className='leading-7 text-neutral-500 text-justify'>
     هتل مدینه الرضا نزدیک ترین هتل پنچ ستاره مشهد از ورودی خیابان شیرازی به
     بارگاه ملکوتی امام رضا(علیه السلام) با محیطی فوق العاده زیبا، معماری اصیل
     ایرانی و نمای عالی در سال 1392 افتتاح گردید. این هتل با 18 طبقه بنا و 325
     باب سوئیت و اتاق های مدرن از امکانات رفاهی ویژه ای برخوردار می‌باشد که قطعا
     موجب کسب رضایت‌مندی شما از اقامت در این هتل می‌گردد. همچنین موقعیت مکانی
     هتل و نزدیکی به حرم مطهر لذت زیارت را برای شما میهمانان گرامی دو چندان
     می‌کند. هتل مدینه الرضا با کادری مجرب و آموزش دیده با افتخار آماده میزبانی
     از شما زائرین و مسافران عزیز می‌باشد.
     <Button color='secondary' className='!font-medium'>
      موارد بیشتر...
     </Button>
    </p>
   </article>
   <article className='grid gap-4 md:grid-cols-2 '>
    <div>
     <h4 className='text-lg text-secondary-dark font-medium mb-4 text-center'>
      امکانات عمومی
     </h4>
     <div className='flex flex-wrap items-center gap-2'>
      {[
       'استخر',
       'تخت',
       'اینترنت',
       'پارکینگ',
       'رستوران',
       'لابی',
       'لاندری',
       'ماساژ',
       'کافی شاپ',
      ].map((item) => (
       <Chip
        key={item}
        label={item}
        sx={{
         paddingInline: '0.5rem',
        }}
       />
      ))}
      <Button
       sx={{ borderRadius: '2rem', paddingInline: '0.8rem' }}
       size='small'
       color='secondary'
       variant='outlined'
      >
       مشاهده همه
      </Button>
     </div>
    </div>
    <div>
     <h4 className='text-lg text-secondary-dark font-medium mb-4 text-center'>
      امکانات اتاق
     </h4>
     <div className='flex flex-wrap gap-2'>
      {[
       'استخر',
       'تخت',
       'اینترنت',
       'پارکینگ',
       'رستوران',
       'لابی',
       'لاندری',
       'ماساژ',
       'کافی شاپ',
      ].map((item) => (
       <Chip
        key={item}
        label={item}
        sx={{
         paddingInline: '0.5rem',
        }}
       />
      ))}
      <Button
       sx={{ borderRadius: '2rem', paddingInline: '0.8rem' }}
       size='small'
       color='secondary'
       variant='outlined'
      >
       مشاهده همه
      </Button>
     </div>
    </div>
   </article>
  </section>
 );
}
