'use client';
import { PropsWithChildren, useMemo, useState } from 'react';
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

export default function RoomsInfoProvider({
 requestData,
 children,
}: PropsWithChildren & {
 requestData: Store['requestData'];
}) {
 const [selectedRooms] = useState<SelectedRoom[]>([]);
 const searchParams = useSearchParams();
 const roomsFilterUseForm = useForm<RoomsFilterSchema>({
  defaultValues: {
   ...defaultValues,
   fromDate: new Date(searchParams.get('checkinDate') as string),
   untilDate: new Date(searchParams.get('checkoutDate') as string),
  },
  resolver: zodResolver(roomsFilterSchema),
 });
 const { watch } = roomsFilterUseForm;
 const [
  checkInDate,
  checkOutDate,
  bedCount,
  noBreakfast,
  fullBoard,
  noPenalty,
  ratePlanType,
 ] = watch([
  'fromDate',
  'untilDate',
  'bedCount',
  'noBreakfast',
  'fullBoard',
  'noPenalty',
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
   checkInDate.toISOString(),
   checkOutDate.toISOString(),
   bedCount,
   String(noBreakfast),
   String(fullBoard),
   String(noPenalty),
   ratePlanType?.ratePlanID.toString(),
  ],
  async queryFn({ signal }) {
   if (
    !checkInDate ||
    !checkOutDate ||
    checkInDate.toISOString() === checkOutDate.toISOString()
   )
    return [];
   let personQuery = '0';
   switch (bedCount) {
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
    checkinDate: checkInDate.toISOString(),
    checkoutDate: checkOutDate.toISOString(),
    person: personQuery,
    noBreakfast: String(noBreakfast),
    fullBoard: String(fullBoard),
    refundable: String(noPenalty),
    ratePlanID: ratePlanType?.ratePlanID.toString() || null,
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

 return (
  <roomsInfoContext.Provider value={ctx}>
   <FormProvider {...roomsFilterUseForm}>{children}</FormProvider>
  </roomsInfoContext.Provider>
 );
}
