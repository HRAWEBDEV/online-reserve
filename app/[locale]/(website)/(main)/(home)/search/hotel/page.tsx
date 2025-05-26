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
 type HotelInfo,
 getHotelImagesApi,
 getHotelFacilitiesApi,
 getRoomFacilitiesApi,
 hotelInfoApi,
} from '../../../../services/HotelApiActions';

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
 let roomFacilities: Facilities[] = [];
 let hotelInfo: HotelInfo | null = null;
 const searchQueries = new URLSearchParams({
  channelID: requestData.channelID.toString(),
  hotelID: requestData.hotelID.toString(),
 });
 try {
  const [
   imageResponse,
   facilityResponse,
   roomFacilityResponse,
   hotelInfoResponse,
  ] = await Promise.all([
   fetch(
    `${
     process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
    }${getHotelImagesApi}?${searchQueries.toString()}`,
    {
     method: 'GET',
     headers: {
      'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
     },
    }
   ),
   fetch(
    `${
     process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
    }${getHotelFacilitiesApi}?${searchQueries.toString()}`,
    {
     method: 'GET',
     headers: {
      'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
     },
    }
   ),
   fetch(
    `${
     process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
    }${getRoomFacilitiesApi}?${searchQueries.toString()}`,
    {
     method: 'GET',
     headers: {
      'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
     },
    }
   ),
   fetch(
    `${
     process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI
    }${hotelInfoApi}?${searchQueries.toString()}`,
    {
     method: 'GET',
     headers: {
      'x-token': process.env.NEXT_PUBLIC_X_AUTH!,
     },
    }
   ),
  ]);
  if (imageResponse.ok) {
   images = await imageResponse.json();
  }
  if (facilityResponse.ok) {
   facilities = await facilityResponse.json();
  }
  if (roomFacilityResponse.ok) {
   roomFacilities = await roomFacilityResponse.json();
  }
  if (hotelInfoResponse.ok) {
   hotelInfo = await hotelInfoResponse.json();
  }
 } catch {}
 //
 return (
  <div>
   <RoomsInfoProvider requestData={requestData}>
    {process.env.NEXT_PUBLIC_DEPLOY_MODE !== 'local' && <Booking />}
    <SearchBreadCrumb hotelInfo={hotelInfo} />
    <InfoSectionMenu />
    <HotelReview images={images} hotelInfo={hotelInfo} />
    <Description
     hotelInfo={hotelInfo}
     facilities={facilities}
     roomFacilities={roomFacilities}
    />
    <RoomSection />
    <HouseRules />
   </RoomsInfoProvider>
  </div>
 );
}
