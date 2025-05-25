import { axios } from '@/app/services/axios/axiosBaseConfig';
import { type RoomInventory } from '../../../../../services/HotelApiActions';
import { type LockGuestInfo } from '../../../../../services/confirmReserveApiActions';

const getRoomsInfoKey = 'get-rooms-info';
const getSelectedRoomKey = 'get-selected-room';
const getSelectedRoomApi = '/CRS/OnlineReservation/AccommodationTypeInfo';
const getSelectedRoomsKey = 'get-selected-rooms';
const getSelectedRoomsApi = '/CRS/OnlineReservation/GetAccommodationTypes';
const lockReserveKey = 'lock-reserve';
const lockReserveApi = '/CRS/OnlineReservation/LockBook';

type LockResult = {
 lockBookID: number;
 trackingCode: string;
 totalPrice: number;
 arzID: number;
};
type LockRoomInfo = {
 roomTypeID: number;
 adult: number;
 child: number;
 baby: number;
 earlyCheckin: boolean;
 lateCheckout: boolean;
 extraBed: number;
 isForeigner: boolean;
 guestLockModel: LockGuestInfo;
};
type RoomInfo = {
 roomTypeID: number;
 bedCount: number;
 count: number;
};

const getSelectedRooms = ({
 roomInfo,
 signal,
 ...queries
}: {
 signal: AbortSignal;
 roomInfo: Omit<RoomInfo, 'count'>[];
 channelID: number;
 hotelID: number;
 providerID: number;
 arzID: number;
 startDate: string;
 endDate: string;
 ratePlanID: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.post<RoomInventory[]>(
  `${getSelectedRoomsApi}?${searchParams.toString()}`,
  roomInfo,
  {
   signal,
  }
 );
};
let getSelectedRoomAbortController: AbortController | null = null;
const getSelectedRoom = ({
 ...queries
}: {
 channelID: number;
 hotelID: number;
 providerID: number;
 arzID: number;
 startDate: string;
 endDate: string;
 ratePlanID: number;
 bedCount: number;
 roomTypeID: number;
}) => {
 getSelectedRoomAbortController?.abort();
 getSelectedRoomAbortController = new AbortController();
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<RoomInventory>(
  `${getSelectedRoomApi}?${searchParams.toString()}`,
  {
   signal: getSelectedRoomAbortController.signal,
  }
 );
};

const lockReserve = ({
 lockInfo,
 ...queries
}: {
 lockInfo: LockRoomInfo[];
 channelID: number;
 providerID: number;
 arrivelDate: string;
 depatureDate: string;
 contactNo: string;
 hotelID: number;
 arzID: number;
 ratePlanID: number;
 rateTypeID: number;
 firstName: string;
 lastName: string;
 email: string;
 nationalCode: string;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.post<LockResult>(
  `${lockReserveApi}?${searchParams.toString()}`,
  lockInfo
 );
};

export {
 type RoomInfo,
 type RoomInventory,
 type LockRoomInfo,
 type LockGuestInfo,
 type LockResult,
 getRoomsInfoKey,
 getSelectedRoomsKey,
 getSelectedRooms,
 getSelectedRoomKey,
 getSelectedRoom,
 getSelectedRoomAbortController,
 lockReserveKey,
 lockReserve,
};
