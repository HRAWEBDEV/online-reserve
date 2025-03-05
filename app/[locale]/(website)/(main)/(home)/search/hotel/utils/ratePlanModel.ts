import { type RoomAccomodationType } from '../services/HotelApiActions';

export const ratePlanModel: {
 type: keyof Pick<
  RoomAccomodationType['accommodationRatePlanModel']['ratePlanModel'],
  | 'noBreakfast'
  | 'nonRefundable'
  | 'withDinner'
  | 'withLunch'
  | 'limitedMenu'
  | 'freeChargeMinibar'
 >;
 name: string;
}[] = [
 { type: 'noBreakfast', name: 'بدون صبحانه' },
 { type: 'nonRefundable', name: 'غیرقابل استرداد' },
 { type: 'freeChargeMinibar', name: 'مینی بار مجانی' },
 { type: 'withDinner', name: 'با شام' },
 { type: 'withLunch', name: 'با نهار' },
 { type: 'limitedMenu', name: 'منوی محدود' },
];
