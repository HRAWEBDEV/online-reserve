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

 const {} = useQuery({
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

 const addRoom: Store['addRoom'] = useCallback((newRoomInfo) => {
  setRoomInfo((pre) => {
   const doesExist = pre.find(
    (item) =>
     item.bedCount === newRoomInfo.bedCount &&
     item.roomTypeID === newRoomInfo.roomTypeID
   );
   if (doesExist) return pre;
   return [...pre, { ...newRoomInfo }];
  });
 }, []);
 const removeRoom: Store['removeRoom'] = useCallback((newRoomInfo) => {
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
  }),
  [addRoom, removeRoom, roomsInfo, selectedRooms]
 );

 useEffect(() => {
  const newQueries = new URLSearchParams(searchParams.toString());
  newQueries.set('beds', roomsInfo.map((item) => item.bedCount).toString());
  newQueries.set(
   'roomType',
   roomsInfo.map((item) => item.roomTypeID).toString()
  );
  router.push(`${pathname}?${newQueries.toString()}`);
 }, [roomsInfo, searchParams, pathname, router]);

 return (
  <confirmReserveContext.Provider value={ctx}>
   {children}
  </confirmReserveContext.Provider>
 );
}
