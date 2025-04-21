'use client';
import { PropsWithChildren, useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
 type RoomsFilterSchema,
 defaultValues,
 roomsFilterSchema,
} from '../schema/roomsFilterSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import {
 getRoomInventory,
 getRoomInventoryKey,
 getRatePlanTypesKey,
 getRatePlanTypes,
} from '../services/HotelApiActions';
import {
 type Store,
 type SelectedRoom,
 roomsInfoContext,
} from './roomsInfoContext';
import * as dataFns from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

export default function RoomsInfoProvider({
 requestData,
 children,
}: PropsWithChildren & {
 requestData: Store['requestData'];
}) {
 function getQueryBedCount(): RoomsFilterSchema['bedCount'] {
  const bedCount = searchParams.get('beds') as RoomsFilterSchema['bedCount'];
  const parsed = roomsFilterSchema
   .pick({ bedCount: true })
   .safeParse({ bedCount });
  return parsed.success ? bedCount : 'all';
 }
 const [selectedRooms] = useState<SelectedRoom[]>([]);
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const fromDateQuery = new Date(searchParams.get('checkinDate') as string);
 const untilDateQuery = new Date(searchParams.get('checkoutDate') as string);
 const ratePlanQueryID = Number(searchParams.get('ratePlanID'));
 const bedCountQuery = getQueryBedCount();
 const roomsFilterUseForm = useForm<RoomsFilterSchema>({
  defaultValues: {
   ...defaultValues,
   fromDate: fromDateQuery,
   untilDate: untilDateQuery,
   bedCount: bedCountQuery,
  },
  resolver: zodResolver(roomsFilterSchema),
 });
 const { watch, setValue } = roomsFilterUseForm;
 const [checkInDate, checkOutDate, bedCount, ratePlanType] = watch([
  'fromDate',
  'untilDate',
  'bedCount',
  'ratePlanType',
 ]);
 const nights = dataFns.differenceInDays(checkOutDate, checkInDate);
 // rate plan types
 const {
  data: ratePlanTypes = [],
  isLoading: isLoadingRatePlanTypes,
  isFetching: isFetchingRatePlanTypes,
  isError: isErrorRatePlanTypes,
 } = useQuery({
  queryKey: [getRatePlanTypesKey],
  async queryFn({ signal }) {
   const { data } = await getRatePlanTypes({ signal, ...requestData });
   if (ratePlanQueryID) {
    const activeRatePlan = data.find(
     (ratePlan) => ratePlan.ratePlanID === ratePlanQueryID
    );
    if (activeRatePlan) setValue('ratePlanType', activeRatePlan);
   }
   return data;
  },
 });
 //
 const {
  data: rooms = [],
  isFetching,
  isLoading,
  isError,
 } = useQuery({
  queryKey: [
   getRoomInventoryKey,
   fromDateQuery.toISOString(),
   untilDateQuery.toISOString(),
   bedCountQuery,
   ratePlanQueryID,
  ],
  async queryFn({ signal }) {
   if (
    !checkInDate ||
    !checkOutDate ||
    checkInDate.toISOString() === checkOutDate.toISOString()
   )
    return [];
   let personQuery = '0';
   switch (bedCountQuery) {
    case 'one':
     personQuery = '1';
     break;
    case 'two':
     personQuery = '2';
     break;
    case 'more':
     personQuery = '3';
     break;
   }
   const res = await getRoomInventory({
    signal,
    checkinDate: fromDateQuery.toISOString(),
    checkoutDate: untilDateQuery.toISOString(),
    person: personQuery,
    noBreakfast: 'false',
    fullBoard: 'false',
    refundable: 'false',
    ratePlanID: ratePlanQueryID ? ratePlanQueryID.toString() : '',
    ...requestData,
   });
   return res.data;
  },
 });

 const ctx = useMemo(
  () =>
   ({
    requestData,
    rooms,
    isFetchingRooms: isFetching || isLoading,
    isErrorRooms: isError,
    nights,
    selectedRooms,
    checkInDate,
    checkOutDate,
    ratePlanTypes,
    isFetchingRatePlanTypes: isFetchingRatePlanTypes || isLoadingRatePlanTypes,
    isRatePlanTypesError: isErrorRatePlanTypes,
   } as Store),
  [
   requestData,
   selectedRooms,
   isFetching,
   isLoading,
   rooms,
   nights,
   isError,
   checkInDate,
   checkOutDate,
   ratePlanTypes,
   isFetchingRatePlanTypes,
   isLoadingRatePlanTypes,
   isErrorRatePlanTypes,
  ]
 );

 useEffect(() => {
  const queryParams = new URLSearchParams(searchParams.toString());
  queryParams.set('checkinDate', checkInDate.toISOString());
  queryParams.set('checkoutDate', checkOutDate.toISOString());
  queryParams.set('beds', bedCount);
  queryParams.set(
   'ratePlanID',
   ratePlanType ? ratePlanType.ratePlanID.toString() : ''
  );
  router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
 }, [
  checkInDate,
  checkOutDate,
  bedCount,
  ratePlanType,
  router,
  searchParams,
  pathname,
 ]);

 return (
  <roomsInfoContext.Provider value={ctx}>
   <FormProvider {...roomsFilterUseForm}>{children}</FormProvider>
  </roomsInfoContext.Provider>
 );
}
