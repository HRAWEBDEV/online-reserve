import {
 getRequestData,
 type TSearchQueries,
} from '@/app/utils/getDefaultsReuestData';
import Form from './components/Form';
import RoomsInfoProvider from './services/RoomsInfoProvider';

export default async function page({
 searchParams,
}: {
 searchParams: Promise<
  TSearchQueries & {
   beds: string;
   roomType: string;
   ratePlan: string;
  }
 >;
}) {
 const searchQuries = await searchParams;
 const checkInDate = new Date(searchQuries.checkinDate as string);
 const checkOutDate = new Date(searchQuries.checkoutDate as string);
 const requestData = getRequestData(searchQuries);
 const props = {
  requestData,
  checkInDate,
  checkOutDate,
  ratePlanType: Number(searchQuries.ratePlan),
 };
 return (
  <RoomsInfoProvider {...props}>
   <Form />
  </RoomsInfoProvider>
 );
}
