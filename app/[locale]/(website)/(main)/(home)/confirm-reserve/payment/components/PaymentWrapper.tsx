import Invoice from './Invoice';
import InvoiceDetails from './InvoiceDetails';

export default function PaymentWrapper() {
 return (
  <section className='container flex flex-col lg:flex-row gap-4 mb-10'>
   <Invoice />
   <InvoiceDetails />
  </section>
 );
}
