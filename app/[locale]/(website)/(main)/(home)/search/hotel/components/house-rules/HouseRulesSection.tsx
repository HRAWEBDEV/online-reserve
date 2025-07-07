import Alert from '@mui/material/Alert';
import { type HotelInfo } from '@/app/[locale]/(website)/services/HotelApiActions';

type TProps = {
 hotelInfo: HotelInfo | null;
};

export default function HouseRules({ hotelInfo }: TProps) {
 return (
  <section id='rules' className='mb-8 container'>
   <div>
    <header className='mb-6'>
     <h3 className='font-medium text-xl lg:text-2xl'>قوانین و مقررات</h3>
    </header>
   </div>
   <section>
    {hotelInfo?.publicRules ? <Alert severity='error'>test</Alert> : '---'}
   </section>
  </section>
 );
}
