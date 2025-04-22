import { axios } from '@/app/services/axios/axiosBaseConfig';
import { type RoomInventory } from '../../../search/hotel/services/HotelApiActions';

const getRoomsInfoKey = 'get-rooms-info';
const getSelectedRoomKey = 'get-selected-room';
const getSelectedRoomApi = '/CRS/OnlineReservation/AccommodationTypeInfo';
const getSelectedRoomsKey = 'get-selected-rooms';
const getSelectedRoomsApi = '/CRS/OnlineReservation/GetAccommodationTypes';

type RoomInfo = {
 roomTypeID: number;
 bedCount: number;
};

const getSelectedRooms = ({
 signal,
 roomInfo,
 ...queries
}: {
 signal: AbortSignal;
 roomInfo: RoomInfo[];
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
const getSelectedRoom = ({
 signal,
 ...queries
}: {
 signal: AbortSignal;
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
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<RoomInventory>(
  `${getSelectedRoomApi}?${searchParams.toString()}`,
  {
   signal,
  }
 );
};

export {
 type RoomInfo,
 type RoomInventory,
 getRoomsInfoKey,
 getSelectedRoomsKey,
 getSelectedRooms,
 getSelectedRoomKey,
 getSelectedRoom,
};
