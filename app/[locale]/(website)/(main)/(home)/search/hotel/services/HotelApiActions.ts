import { axios } from '@/app/services/axios/axiosBaseConfig';

const getRoomInventoryKey = 'get-room-inventory';
const getRoomInventoriesApi = '/CRS/OnlineReservation/GetRoomInventories';

const getRoomDailyPriceKey = 'get-room-daily-price';
const getRoomDailyPriceApi = '/CRS/OnlineReservation/GetMonthyInventory';

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

type RoomDailyPrice = {
 date: string;
 roomOnlineShowRate: number;
 netRoomRate: number;
 stopSell: boolean;
 cta: boolean;
 ctd: boolean;
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
 return axios.get<RoomInventory[]>(
  `${getRoomInventoriesApi}${searchParams.toString()}`,
  { signal }
 );
}

function getRoomPriceDaily({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 channelID: number;
 hotelID: number;
 providerID: number;
 startDate: string;
 endDate: string;
 roomTypeID: number;
 ratePlanID: number;
 arzID: number;
 beds: number;
}) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<RoomDailyPrice>(
  `${getRoomDailyPriceApi}${searchParams.toString()}`,
  {
   signal,
  }
 );
}

export {
 type RoomInventory,
 type RoomDailyPrice,
 getRoomInventoryKey,
 getRoomInventory,
 getRoomDailyPriceKey,
 getRoomPriceDaily,
};
