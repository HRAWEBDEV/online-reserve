import Booking from './components/booking/Booking';
import TrendingHotels from './components/trending-hotels/TrendingHotels';
import Hotels from './components/hotels/Hotels';
import Customers from './components/customers/Customers';

export default function Home() {
 return (
  <>
   <Booking />
   <TrendingHotels />
   <Hotels />
   <Customers />
  </>
 );
}
