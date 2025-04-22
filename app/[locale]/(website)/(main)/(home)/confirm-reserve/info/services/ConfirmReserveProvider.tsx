'use client';
import { useState, useMemo, useCallback } from 'react';
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

export default function ConfirmReserveProvider({
 children,
}: PropsWithChildren) {
 const {
  ratePlanType,
  beds,
  requestData,
  roomType,
  checkInDate,
  checkOutDate,
 } = useRoomsInfoContext();
 const [selectedRooms] = useState<RoomInventory[]>([]);
 const [roomsInfo] = useState<RoomInfo[]>(() => {
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
   return data;
  },
 });

 const addRoom: Store['addRoom'] = useCallback(() => {}, []);
 const removeRoom: Store['removeRoom'] = useCallback(() => {}, []);

 const ctx: Store = useMemo(
  () => ({
   addRoom,
   removeRoom,
   roomsInfo,
   selectedRooms,
  }),
  [addRoom, removeRoom, roomsInfo, selectedRooms]
 );

 return (
  <confirmReserveContext.Provider value={ctx}>
   {children}
  </confirmReserveContext.Provider>
 );
}
