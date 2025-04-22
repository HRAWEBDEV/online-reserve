import { axios } from '@/app/services/axios/axiosBaseConfig';
import { type TRowWithInternalID } from '@/utils/getGridInternalID';

const getRoomInventoryKey = 'get-room-inventory';
const getRoomInventoriesApi = '/CRS/OnlineReservation/GetRoomInventories';

const getRoomDailyPriceKey = 'get-room-daily-price';
const getRoomDailyPriceApi = '/CRS/OnlineReservation/GetMonthyInventory';

const getRatePlanTypesKey = 'get-rate-plan-types';
const getRatePlanTypesApi = '/CRS/OnlineReservation/GetRatePlans';

type RatePlanType = {
 fName: string;
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

type RoomAccomodationType = {
 roomOnlineShowRate: number;
 netRoomRate: number;
 beds: number;
 dailyPrices: {
  price: number;
  date: string;
 }[];
 accommodationRatePlanModel: {
  ratePlanID: number;
  rateTypePlan: number;
  rateTypeName: string;
  boardID: number;
  ratePlanModel: RatePlanType;
 };
} & TRowWithInternalID;

type RoomInventory = {
 hoteID: number;
 roomTypeID: number;
 fName: string;
 fixBeds: number;
 roomCount: number;
 accommodationTypePrices: RoomAccomodationType[];
 accommodationTypePrice: RoomAccomodationType;
} & TRowWithInternalID;

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
 person: string;
 noBreakfast: string;
 fullBoard: string;
 refundable: string;
 ratePlanID: null | string;
}) {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val) searchParams.set(key, String(val));
 });
 return axios.get<RoomInventory[]>(
  `${getRoomInventoriesApi}?${searchParams.toString()}`,
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
 return axios.get<RoomDailyPrice[]>(
  `${getRoomDailyPriceApi}?${searchParams.toString()}`,
  {
   signal,
  }
 );
}

const getRatePlanTypes = ({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 channelID: number;
 hotelID: number;
 providerID: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<RatePlanType[]>(
  `${getRatePlanTypesApi}?${searchParams.toString()}`,
  {
   signal,
  }
 );
};

export {
 type RatePlanType,
 type RoomInventory,
 type RoomDailyPrice,
 type RoomAccomodationType,
 getRoomInventoryKey,
 getRoomInventory,
 getRoomDailyPriceKey,
 getRoomPriceDaily,
 getRatePlanTypesKey,
 getRatePlanTypes,
};
