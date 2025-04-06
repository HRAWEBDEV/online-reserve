'use client';
import { PropsWithChildren, useMemo, useState, useCallback } from 'react';
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
import {
 type Store,
 type StoreActions,
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
 const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([]);
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
 const checkInDate = watch('fromDate');
 const checkOutDate = watch('untilDate');
 const nights = dataFns.differenceInDays(checkOutDate, checkInDate);
 //
 const updateSelectedRoom: StoreActions['updateSelectedRoom'] = useCallback(
  (params) => {
   if (params.type === 'add') {
    setSelectedRooms((pre) => {
     if (!params.newRoom.roomCount) return pre;
     const foundRoom = pre.find(
      (item) => item.internalID === params.newRoom.internalID
     );
     if (!foundRoom) return [...pre, { ...params.newRoom, count: 1 }];
     const newCount = foundRoom.count + 1;
     if (newCount > params.newRoom.roomCount) return pre;
     return pre.map((item) => {
      if (item.internalID === foundRoom.internalID) {
       return {
        ...item,
        count: item.count + 1,
       };
      }
      return item;
     });
    });
   }
   if (params.type === 'decrease') {
    setSelectedRooms((pre) => {
     const foundRoom = pre.find(
      (item) => item.internalID === params.roomPlanInternalID
     );
     if (!foundRoom) return pre;
     const newCount = foundRoom.count - 1;
     if (!newCount)
      return pre.filter(
       (item) => item.internalID !== params.roomPlanInternalID
      );
     return pre.map((item) => {
      if (item.internalID === foundRoom.internalID) {
       return {
        ...item,
        count: item.count - 1,
       };
      }
      return item;
     });
    });
   }
   if (params.type === 'deleteAll') {
    setSelectedRooms((pre) => {
     return pre.filter((item) => item.internalID !== params.roomPlanInternalID);
    });
   }
  },
  []
 );
 const deleteSelectedRooms: StoreActions['deleteSelectedRooms'] =
  useCallback(() => {
   setSelectedRooms([]);
  }, []);
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
    selectedRooms,
    checkInDate,
    checkOutDate,
    updateSelectedRoom,
    deleteSelectedRooms,
   } as Store & StoreActions),
  [
   requestData,
   selectedRooms,
   isFetching,
   rooms,
   nights,
   checkInDate,
   checkOutDate,
   updateSelectedRoom,
   deleteSelectedRooms,
  ]
 );

 return (
  <roomsInfoContext.Provider value={ctx}>
   <FormProvider {...roomsFilterUseForm}>{children}</FormProvider>
  </roomsInfoContext.Provider>
 );
}
