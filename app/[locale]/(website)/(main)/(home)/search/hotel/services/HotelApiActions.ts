import { axios } from '@/app/services/axios/axiosBaseConfig';

const getRoomInventoryKey = 'get-room-inventory';
const getRoomInventoriesApi = '/CRS/OnlineReservation/GetRoomInventories';

type RoomAccomodationType = {
 roomOnlineShowRate: number;
 netRoomRate: number;
 beds: number;
 accomodationRatePlanModel: {
  rateTypePlan: number;
  rateTypeName: string;
  boardID: number;
  ratePlanModel: {
   ratePlanID: number;
   ratePlanTypeName: string;
   noBreakfast: boolean;
   nonRefundable: boolean;
   minNights: number;
   freeChargeMinibar: boolean;
   withLunch: boolean;
   withDinner: boolean;
   limitedMenu: boolean;
  };
 };
};

type RoomInventory = {
 hoteID: number;
 roomTypeID: number;
 fName: string;
 fixBeds: number;
 roomCount: number;
 accommodationTypePrices: RoomAccomodationType[];
};

function getRoomInventory({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 channelID: number;
 providerID: number;
 checkinDate: string;
 checkoutDate: string;
 arzID: number;
 hotelID: number;
}) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<RoomInventory[]>(getRoomInventoriesApi, { signal });
}

export { type RoomInventory, getRoomInventoryKey, getRoomInventory };
