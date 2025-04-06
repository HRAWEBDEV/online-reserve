import Booking from '../../components/booking/Booking';
import InfoSectionMenu from './components/InfoSectionMenu';
import HotelReview from './components/hotel-review/HotelReview';
import Description from './components/hotel-description/Description';
import SearchBreadCrumb from './components/SearchBreadCrumb';
import RoomSection from './components/rooms/RoomSection';
import RoomsInfoProvider from './services/RoomsInfoProvider';
import HouseRules from './components/house-rules/HouseRulesSection';
import {
 type TRequestData,
 type TSearchQueries,
 getRequestData,
} from '@/app/utils/getDefaultsReuestData';
import { redirect } from 'next/navigation';
import * as DateFns from 'date-fns';

export default async function page({
 searchParams,
}: {
 searchParams: Promise<TSearchQueries>;
}) {
 const searchQuries = await searchParams;
 const requestData: TRequestData = getRequestData(searchQuries);
 if (!searchQuries.checkinDate) {
  const urlSearchQuries = new URLSearchParams();
  const checkinDate = DateFns.startOfYesterday().toISOString();
  const checkoutDate = DateFns.startOfToday().toISOString();
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
    <HouseRules />
   </RoomsInfoProvider>
  </div>
 );
}
