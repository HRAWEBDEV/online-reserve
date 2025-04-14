import GuestInfo from './guest-info/GuestInfo';
import ReserveInfo from './ReserveInfo';

export default function Form() {
 return (
  <section className='container flex flex-col md:flex-row gap-4 mb-10'>
   <GuestInfo />
   <ReserveInfo />
  </section>
 );
}
