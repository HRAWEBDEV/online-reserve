'use client';
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
} from '../services/HotelApiActions';
import { PropsWithChildren, useMemo } from 'react';
import { type Store, roomsInfoContext } from './roomsInfoContext';
import * as dataFns from 'date-fns';

export default function RoomsInfoProvider({
 requestData,
 children,
}: PropsWithChildren & {
 requestData: Store['requestData'];
}) {
 //
 const searchParams = useSearchParams();
 //
 const roomsFilterUseForm = useForm<RoomsFilterSchema>({
  defaultValues: {
   ...defaultValues,
   fromDate: new Date(searchParams.get('checkinDate') as string),
   untilDate: new Date(searchParams.get('checkoutDate') as string),
  },
  resolver: zodResolver(roomsFilterSchema),
 });
 const { watch } = roomsFilterUseForm;
 const checkInDate = watch('fromDate');
 const checkOutDate = watch('untilDate');
 const nights = dataFns.differenceInDays(checkOutDate, checkInDate);
 //
 const { data: rooms = [], isFetching } = useQuery({
  queryKey: [
   getRoomInventoryKey,
   checkInDate.toISOString(),
   checkOutDate.toISOString(),
  ],
  async queryFn({ signal }) {
   if (!checkInDate || !checkOutDate) return [];
   const res = await getRoomInventory({
    signal,
    checkinDate: checkInDate.toISOString(),
    checkoutDate: checkOutDate.toISOString(),
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
    isFetchingRooms: isFetching,
    nights,
    checkInDate,
    checkOutDate,
   } as Store),
  [requestData, isFetching, rooms, nights, checkInDate, checkOutDate]
 );

 return (
  <roomsInfoContext.Provider value={ctx}>
   <FormProvider {...roomsFilterUseForm}>{children}</FormProvider>
  </roomsInfoContext.Provider>
 );
}
