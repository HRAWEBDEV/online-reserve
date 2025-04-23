'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { type Store, confirmReserveContext } from './confirmReserveContext';
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

 // selectedRooms info
 const selectedRoomsInfo = useMemo(() => {
  return selectedRooms.reduce(
   (acc, cur) => {
    const roomInfo = acc.find(
     (item) =>
      item.roomTypeID === cur.roomTypeID &&
      item.bedCount === cur.accommodationTypePrice.beds
    );
    if (roomInfo) {
     roomInfo.count = roomInfo.count + 1;
    } else {
     acc.push({
      roomTypeID: cur.roomTypeID,
      bedCount: cur.accommodationTypePrice.beds,
      count: 1,
     });
    }
    return acc;
   },
   [] as {
    roomTypeID: number;
    bedCount: number;
    count: number;
   }[]
  );
 }, [selectedRooms]);
 console.log(selectedRoomsInfo);

 const { isLoading, isFetching } = useQuery({
  enabled: !selectedRooms.length,
  queryKey: [getSelectedRoomsKey],
  async queryFn({ signal }) {
   function getRoomInfo() {
    const roomInfoCount = Math.min(roomType.length, beds.length);
    const roomInfo = [];
    for (let i = 0; i <= roomInfoCount - 1; i++) {
     if (roomType[i] && beds[i]) {
      roomInfo.push({
       roomTypeID: roomType[i],
       bedCount: beds[i],
      });
     }
    }
    return roomInfo;
   }
   const { data } = await getSelectedRooms({
    signal,
    ratePlanID: ratePlanType,
    startDate: checkInDate.toISOString(),
    endDate: checkOutDate.toISOString(),
    roomInfo: getRoomInfo(),
    ...requestData,
   });
   setSelectedRooms(data);
   return data;
  },
 });

 const addRoom: Store['addRoom'] = useCallback(
  async (newRoomInfo) => {
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
   } finally {
    setLoadingAddRoom(false);
   }
  },
  [checkInDate, checkOutDate, ratePlanType, requestData]
 );

 const removeRoom: Store['removeRoom'] = useCallback((id) => {
  setSelectedRooms((pre) => pre.filter((item) => item.internalID !== id));
 }, []);

 const handleConfirmReserve: Store['handleConfirmReserve'] =
  useCallback(async () => {}, []);

 const ctx: Store = useMemo(
  () => ({
   addRoom,
   removeRoom,
   selectedRooms,
   loadingAddRoom,
   handleConfirmReserve,
   isLoadingRooms: isLoading || isFetching,
  }),
  [
   addRoom,
   removeRoom,
   selectedRooms,
   loadingAddRoom,
   isLoading,
   isFetching,
   handleConfirmReserve,
  ]
 );

 useEffect(() => {
  const newQueries = new URLSearchParams(searchParams.toString());
  const queriesInfo: {
   beds: number[];
   roomTypes: number[];
  } = {
   beds: [],
   roomTypes: [],
  };
  selectedRooms.forEach((room) => {
   queriesInfo.beds.push(room.accommodationTypePrice.beds);
   queriesInfo.roomTypes.push(room.roomTypeID);
  });
  newQueries.set('beds', queriesInfo.beds.toString());
  newQueries.set('roomType', queriesInfo.roomTypes.toString());
  router.replace(`${pathname}?${newQueries.toString()}`, { scroll: false });
 }, [selectedRooms, searchParams, pathname, router]);

 useEffect(() => {
  return () => getSelectedRoomAbortController?.abort();
 }, []);

 return (
  <confirmReserveContext.Provider value={ctx}>
   {children}
  </confirmReserveContext.Provider>
 );
}
