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
import {
 type HotelImage,
 type Facilities,
 getHotelImagesApi,
 getHotelFacilitiesApi,
 getRoomFacilitiesApi,
} from './services/HotelApiActions';

export default async function page({
 searchParams,
}: {
 searchParams: Promise<TSearchQueries>;
}) {
 const searchQuries = await searchParams;
 const requestData: TRequestData = getRequestData(searchQuries);
 if (!searchQuries.checkinDate) {
  const urlSearchQuries = new URLSearchParams();
  const checkinDate = DateFns.startOfToday().toISOString();
  const checkoutDate = DateFns.addDays(DateFns.startOfToday(), 4).toISOString();
  urlSearchQuries.set('checkinDate', checkinDate);
  urlSearchQuries.set('checkoutDate', checkoutDate);
  Object.entries(searchQuries).forEach(
   ([key, val]) => val && urlSearchQuries.set(key, val)
  );
  redirect(`/search/hotel?${urlSearchQuries.toString()}`);
 }

 let images: HotelImage[] = [];
 let facilities: Facilities[] = [];
 const searchQueries = new URLSearchParams({
  channelID: requestData.channelID.toString(),
  hotelID: requestData.hotelID.toString(),
 });
 const imageResponse = await fetch(
  `${
   process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
  }${getHotelImagesApi}?${searchQueries.toString()}`,
  {
   method: 'GET',
   headers: {
    'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
   },
  }
 );
 if (imageResponse.ok) {
  images = await imageResponse.json();
 }
 console.log(images);

 const facilityResponse = await fetch(
  `${
   process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
  }${getHotelFacilitiesApi}?${searchQueries.toString()}`,
  {
   method: 'GET',
   headers: {
    'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
   },
  }
 );
 if (facilityResponse.ok) {
  facilities = await facilityResponse.json();
 }

 let roomFacilities: Facilities[] = [];
 const roomFacilityResponse = await fetch(
  `${
   process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
  }${getRoomFacilitiesApi}?${searchQueries.toString()}`,
  {
   method: 'GET',
   headers: {
    'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
   },
  }
 );
 if (roomFacilityResponse.ok) {
  roomFacilities = await roomFacilityResponse.json();
 }

 return (
  <div>
   <RoomsInfoProvider requestData={requestData}>
    {process.env.NEXT_PUBLIC_DEPLOY_MODE !== 'local' && <Booking />}
    <SearchBreadCrumb />
    <InfoSectionMenu />
    <HotelReview />
    <Description facilities={facilities} roomFacilities={roomFacilities} />
    <RoomSection />
    <HouseRules />
   </RoomsInfoProvider>
  </div>
 );
}
