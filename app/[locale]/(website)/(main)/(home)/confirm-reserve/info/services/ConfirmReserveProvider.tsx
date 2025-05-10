'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { type Store, confirmReserveContext } from './confirmReserveContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
 type RoomInventory,
 type RoomInfo,
 type LockRoomInfo,
 getSelectedRoomsKey,
 getSelectedRooms,
 getSelectedRoomAbortController,
 getSelectedRoom,
 lockReserve,
 LockResult,
} from './addRoomsApiActions';
import { useRoomsInfoContext } from './roomsInfoContext';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { type ReserveInfoSchema } from '../schema/reserveInfoSchema';
import { useFormContext } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { AxiosResponse } from 'axios';

export default function ConfirmReserveProvider({
 children,
}: PropsWithChildren) {
 const snackbar = useSnackbar();
 const { getValues } = useFormContext<ReserveInfoSchema>();
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
  return selectedRooms.reduce((acc, cur) => {
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
  }, [] as RoomInfo[]);
 }, [selectedRooms]);
 //
 const { mutate, isPending } = useMutation({
  onSuccess(res: AxiosResponse<LockResult>) {
   router.push(
    `/confirm-reserve/payment?lockBookID=${res.data.lockBookID}&arzID=${res.data.arzID}&trackingCode=${res.data.trackingCode}`
   );
  },
  onError() {
   snackbar.enqueueSnackbar({
    message: 'خطایی رخ داده است، لطفا مجددا تلاش کنید',
    variant: 'error',
   });
  },
  mutationFn(data: ReserveInfoSchema) {
   const roomInfo: (LockRoomInfo & { rateTypeID: number })[] = [];
   selectedRooms.forEach((item, i) => {
    const accRatePlan = item.accommodationTypePrice.accommodationRatePlanModel;
    const schemaInfo = data.guestInfo[i];
    const guestNationalCode = schemaInfo.sameAsReserveInfo
     ? data.reserveNationalCode
     : schemaInfo.guestNationalCode;
    roomInfo.push({
     adult: item.accommodationTypePrice.beds,
     baby: 0,
     child: 0,
     extraBed: 0,
     isForeigner: schemaInfo.guestType === 'foreign',
     earlyCheckin: schemaInfo.halfCheckin,
     lateCheckout: schemaInfo.halfCheckout,
     roomTypeID: accRatePlan.rateTypeID,
     rateTypeID: accRatePlan.rateTypeID,
     guestLockModel: {
      firstName: schemaInfo.sameAsReserveInfo
       ? data.reserveFirstName
       : schemaInfo.guestFirstName,
      lastName: schemaInfo.sameAsReserveInfo
       ? data.reserveLastName
       : schemaInfo.guestLastName,
      nationalCode:
       schemaInfo.guestType === 'normal' ? guestNationalCode : null,
      passport: schemaInfo.guestType === 'foreign' ? guestNationalCode : null,
      genderID: schemaInfo.gender === 'female' ? 2 : 1,
     },
    });
   });
   return lockReserve({
    channelID: requestData.channelID,
    providerID: requestData.providerID,
    arrivelDate: checkInDate.toISOString(),
    depatureDate: checkOutDate.toISOString(),
    hotelID: requestData.hotelID,
    arzID: requestData.arzID,
    rateTypeID: roomInfo[0].rateTypeID,
    ratePlanID: ratePlanType,
    contactNo: data.reservePhoneNumber,
    lockInfo: roomInfo,
    firstName: data.reserveFirstName,
    lastName: data.reserveLastName,
    email: data.reserveEmail,
    nationalCode: data.reserveNationalCode,
   });
  },
 });

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

 const removeRoom: Store['removeRoom'] = useCallback(
  (id) => {
   const guestInfo = getValues('guestInfo');
   guestInfo.pop();
   setSelectedRooms((pre) => pre.filter((item) => item.internalID !== id));
  },
  [getValues]
 );

 const handleConfirmReserve: Store['handleConfirmReserve'] = useCallback(
  async (data) => {
   mutate(data);
  },
  [mutate]
 );

 const ctx: Store = useMemo(
  () => ({
   addRoom,
   removeRoom,
   selectedRooms,
   selectedRoomsInfo,
   loadingAddRoom,
   handleConfirmReserve,
   confirmReserveLoading: isPending,
   isLoadingRooms: isLoading || isFetching,
  }),
  [
   addRoom,
   removeRoom,
   selectedRooms,
   loadingAddRoom,
   isLoading,
   isFetching,
   selectedRoomsInfo,
   handleConfirmReserve,
   isPending,
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
