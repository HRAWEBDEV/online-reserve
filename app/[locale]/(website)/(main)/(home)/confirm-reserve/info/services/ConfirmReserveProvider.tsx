'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { type Store, confirmReserveContext } from './confirmReserveContext';
import { type RoomInfo } from './addRoomsApiActions';
import { useQuery } from '@tanstack/react-query';
import {
 type RoomInventory,
 getSelectedRoomsKey,
 getSelectedRooms,
 getSelectedRoomAbortController,
 getSelectedRoom,
} from './addRoomsApiActions';
import { useRoomsInfoContext } from './roomsInfoContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function ConfirmReserveProvider({
 children,
}: PropsWithChildren) {
 const router = useRouter();
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const {
  ratePlanType,
  beds,
  requestData,
  roomType,
  checkInDate,
  checkOutDate,
 } = useRoomsInfoContext();
 const [loadingAddRoom, setLoadingAddRoom] = useState(false);
 const [selectedRooms, setSelectedRooms] = useState<RoomInventory[]>([]);
 const [roomsInfo, setRoomInfo] = useState<RoomInfo[]>(() => {
  const roomInfoCount = Math.min(roomType.length, beds.length);
  const roomInfo: RoomInfo[] = [];
  for (let i = 0; i <= roomInfoCount - 1; i++) {
   if (roomType[i] && beds[i]) {
    roomInfo.push({
     roomTypeID: roomType[i],
     bedCount: beds[i],
    });
   }
  }
  return roomInfo;
 });

 const { isLoading, isFetching } = useQuery({
  enabled: !selectedRooms.length,
  queryKey: [getSelectedRoomsKey],
  async queryFn({ signal }) {
   const { data } = await getSelectedRooms({
    signal,
    ratePlanID: ratePlanType,
    startDate: checkInDate.toISOString(),
    endDate: checkOutDate.toISOString(),
    roomInfo: roomsInfo,
    ...requestData,
   });
   setSelectedRooms(data);
   return data;
  },
 });

 const addRoom: Store['addRoom'] = useCallback(
  async (newRoomInfo) => {
   const doesExist = roomsInfo.find(
    (item) =>
     item.bedCount === newRoomInfo.bedCount &&
     item.roomTypeID === newRoomInfo.roomTypeID
   );
   if (doesExist) return;
   setLoadingAddRoom(true);
   try {
    const { data } = await getSelectedRoom({
     ratePlanID: ratePlanType,
     startDate: checkInDate.toISOString(),
     endDate: checkOutDate.toISOString(),
     bedCount: newRoomInfo.bedCount,
     roomTypeID: newRoomInfo.roomTypeID,
     ...requestData,
    });
    setSelectedRooms((pre) => [...pre, data]);
    setRoomInfo((pre) => [...pre, newRoomInfo]);
   } finally {
    setLoadingAddRoom(false);
   }
  },
  [roomsInfo, checkInDate, checkOutDate, ratePlanType, requestData]
 );
 const removeRoom: Store['removeRoom'] = useCallback((newRoomInfo) => {
  setSelectedRooms((pre) =>
   pre.filter(
    (item) =>
     item.roomTypeID !== newRoomInfo.roomTypeID &&
     item.accommodationTypePrice.beds !== newRoomInfo.bedCount
   )
  );
  setRoomInfo((pre) => {
   return pre.filter(
    (item) =>
     item.bedCount !== newRoomInfo.bedCount &&
     item.roomTypeID !== newRoomInfo.roomTypeID
   );
  });
 }, []);

 const ctx: Store = useMemo(
  () => ({
   addRoom,
   removeRoom,
   roomsInfo,
   selectedRooms,
   loadingAddRoom,
   isLoadingRooms: isLoading || isFetching,
  }),
  [
   addRoom,
   removeRoom,
   roomsInfo,
   selectedRooms,
   loadingAddRoom,
   isLoading,
   isFetching,
  ]
 );

 useEffect(() => {
  const newQueries = new URLSearchParams(searchParams.toString());
  newQueries.set('beds', roomsInfo.map((item) => item.bedCount).toString());
  newQueries.set(
   'roomType',
   roomsInfo.map((item) => item.roomTypeID).toString()
  );
  router.replace(`${pathname}?${newQueries.toString()}`, { scroll: false });
 }, [roomsInfo, searchParams, pathname, router]);

 useEffect(() => {
  return () => getSelectedRoomAbortController?.abort();
 }, []);

 return (
  <confirmReserveContext.Provider value={ctx}>
   {children}
  </confirmReserveContext.Provider>
 );
}
