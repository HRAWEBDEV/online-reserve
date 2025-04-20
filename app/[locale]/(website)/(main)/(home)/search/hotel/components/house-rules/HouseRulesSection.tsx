export default function HouseRules() {
 return (
  <section id='house-rules' className='mb-8 container'>
   <div>
    <header className='mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>قوانین و مقررات</h3>
    </header>
   </div>
   <section className='grid gap-4 lg:grid-cols-3'>
    {[1, 2, 3].map((item) => (
     <article key={item} className='border border-neutral-300 p-4 rounded-lg'>
      <div className='mb-3'>
       <h4 className='text-lg lg:text-xl text-red-800'>نیم بهاء</h4>
      </div>
      <p className='text-justify leading-6 text-neutral-600'>
       اقامت کودک زیر 7 سال (درصورت عدم استفاده از سرویس) رایگان می‌باشد و
       هزینه‌ی اقامت کودک بالای 7 سال به طور کامل محاسبه می‌گردد. لازم به ذکر
       است : اقامت رایگان و نیم بها تنها برای یک کودک محاسبه می‌گردد.
      </p>
     </article>
    ))}
   </section>
  </section>
 );
}
