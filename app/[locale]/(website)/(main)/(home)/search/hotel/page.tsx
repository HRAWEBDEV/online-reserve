import Booking from '../../components/booking/Booking';
import InfoSectionMenu from './components/InfoSectionMenu';
import HotelReview from './components/hotel-review/HotelReview';
import Description from './components/hotel-description/Description';
import SearchBreadCrumb from './components/SearchBreadCrumb';
import RoomSection from './components/rooms/RoomSection';
import {
 getRoomInventoryKey,
 getRoomInventory,
} from './services/HotelApiActions';

export default async function page() {
 return (
  <div>
   {process.env.NEXT_PUBLIC_DEPLOY_MODE !== 'local' && <Booking />}
   <SearchBreadCrumb />
   <InfoSectionMenu />
   <HotelReview />
   <Description />
   <RoomSection />
  </div>
 );
}
