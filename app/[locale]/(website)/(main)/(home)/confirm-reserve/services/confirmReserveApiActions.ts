import { axios } from '@/app/services/axios/axiosBaseConfig';
import { type RoomInventory } from '../info/services/addRoomsApiActions';

type LockGuestInfo = {
 firstName: string;
 lastName: string;
 nationalCode: string | null;
 passport: string | null;
 genderID: number;
};

type LockInfo = {
 id: number;
 arzID: number;
 hotelID: number;
 channelID: number;
 providerID: number;
 firstName: string;
 lastName: string;
 email: string | null;
 contactNo: string | null;
 arrivelDateTimeOffset: string;
 departureDateTimeOffset: string;
 totalPrice: number;
 trackingCode: string;
};

type LockInfoResult = {
 rooms: RoomInventory[];
 guestInfo: LockGuestInfo[];
 lockInfo: LockInfo;
};

const getLockInfoKey = 'get-lock-info';
const getLockInfoApi = '/CRS/OnlineReservation/getLockInformation';
//
const getPaymentUrlKey = 'get-payment-url';
const getPaymentUrlApi = '/CRS/payment/GetGatewayURL';
//
const verifyPaymentKey = 'verify-payment';
const verifyPaymentApi = '/CRS/payment/VerifyPayment';
//
const bookRoomKey = 'book-room';
const bookRoomApi = '/CRS/OnlineReservation/Book';
//
const getVoucherKey = 'get-voucher';
const getVoucherApi = '/CRS/OnlineReservation/GetVoucher';
//

const getLockInfo = ({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 trackingCode: string;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get<LockInfoResult>(
  `${getLockInfoApi}?${searchParams.toString()}`,
  {
   signal,
  }
 );
};
//
const getPaymentUrl = ({
 gateWayInfo,
 ...queries
}: {
 gateWayInfo: {
  callback_url: string;
  description: string;
  amount: number;
  mobile?: string;
  email?: string;
 };
 iSB: boolean;
 hotelID: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  if (val) {
   searchParams.set(key, String(val));
  }
 });
 return axios.post(
  `${getPaymentUrlApi}?${searchParams.toString()}`,
  gateWayInfo
 );
};
//
const verifyPayment = ({
 signal,
 gateWayInfo,
 ...queries
}: {
 signal: AbortSignal;
 gateWayInfo: {
  amount: number;
  authority: string;
 };
 iSB: boolean;
 hotelID: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.post(
  `${verifyPaymentApi}?${searchParams.toString()}`,
  gateWayInfo,
  {
   signal,
  }
 );
};
//
const bookRoom = ({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 hotelID: number;
 providerID: number;
 lockBookID: number;
 arzID: number;
 payRefNo: string;
 payRefDate: string;
 sValue: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get(`${bookRoomApi}?${searchParams.toString()}`, {
  signal,
 });
};
//
const getVoucher = ({
 signal,
 ...queries
}: {
 signal: AbortSignal;
 reserveID: number;
 channelID: number;
 hotelID: number;
}) => {
 const searchParams = new URLSearchParams();
 Object.entries(queries).forEach(([key, val]) => {
  searchParams.set(key, String(val));
 });
 return axios.get(`${getVoucherApi}?${searchParams.toString()}`, { signal });
};

export {
 type LockInfoResult,
 type LockGuestInfo,
 getLockInfo,
 getLockInfoKey,
 getPaymentUrlKey,
 getPaymentUrl,
 verifyPaymentKey,
 verifyPayment,
 bookRoomKey,
 bookRoom,
 getVoucherKey,
 getVoucher,
};
