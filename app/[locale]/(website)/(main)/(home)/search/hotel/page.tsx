import Booking from '../../components/booking/Booking';
import InfoSectionMenu from './components/InfoSectionMenu';
import HotelReview from './components/hotel-review/HotelReview';
import Description from './components/hotel-description/Description';
import SearchBreadCrumb from './components/SearchBreadCrumb';
import RoomSection from './components/rooms/RoomSection';
import RoomsInfoProvider from './services/RoomsInfoProvider';
import {
 type TRequestData,
 getDefaultsRequestData,
} from '@/app/utils/getDefaultsReuestData';
import { redirect } from 'next/navigation';

export default async function page({
 searchParams,
}: {
 searchParams: Promise<{
  checkinDate: string | null;
  checkoutDate: string | null;
 }>;
}) {
 const searchQuries = await searchParams;

 const defaultRequest = getDefaultsRequestData();
 const requestData: TRequestData = {
  arzID: defaultRequest.arzID || 1,
  providerID: defaultRequest.providerID || 1,
  channelID: defaultRequest.channelID || 1,
  hotelID: defaultRequest.hotelID || 1,
 };

 if (!searchQuries.checkinDate) {
  const urlSearchQuries = new URLSearchParams();
  const checkinDate = '2025-02-20T12:03:58.363Z';
  const checkoutDate = '2025-02-24T13:03:58.363Z';
  urlSearchQuries.set('checkinDate', checkinDate);
  urlSearchQuries.set('checkoutDate', checkoutDate);
  Object.entries(searchQuries).forEach(
   ([key, val]) => val && urlSearchQuries.set(key, val)
  );
  redirect(`/search/hotel?${urlSearchQuries.toString()}`);
 }

 return (
  <div>
   <RoomsInfoProvider requestData={requestData}>
    {process.env.NEXT_PUBLIC_DEPLOY_MODE !== 'local' && <Booking />}
    <SearchBreadCrumb />
    <InfoSectionMenu />
    <HotelReview />
    <Description />
    <RoomSection />
   </RoomsInfoProvider>
  </div>
 );
}
