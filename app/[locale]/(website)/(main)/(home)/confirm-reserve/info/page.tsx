import {
 getRequestData,
 type TSearchQueries,
} from '@/app/utils/getDefaultsReuestData';
import Form from './components/Form';
import RoomsInfoProvider from './services/RoomsInfoProvider';
import { type Store } from './services/roomsInfoContext';

export default async function page({
 searchParams,
}: {
 searchParams: Promise<TSearchQueries>;
}) {
 const searchQuries = await searchParams;
 const checkInDate = new Date(searchQuries.checkinDate as string);
 const checkOutDate = new Date(searchQuries.checkoutDate as string);
 const requestData: Omit<Store, 'nights'> = {
  requestData: { ...getRequestData(searchQuries) },
  checkInDate,
  checkOutDate,
 };
 return (
  <RoomsInfoProvider {...requestData}>
   <Form />
  </RoomsInfoProvider>
 );
}
