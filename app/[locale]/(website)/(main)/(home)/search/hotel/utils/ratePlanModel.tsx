import { ReactElement } from 'react';
import { type RoomAccomodationType } from '../services/HotelApiActions';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';

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
 icon: ReactElement | null;
}[] = [
 { type: 'noBreakfast', name: 'بدون صبحانه', icon: null },
 { type: 'nonRefundable', name: 'غیرقابل استرداد', icon: null },
 {
  type: 'freeChargeMinibar',
  name: 'مینی بار مجانی',
  icon: <CoffeeMakerIcon />,
 },
 { type: 'withDinner', name: 'همراه با شام', icon: <DinnerDiningIcon /> },
 { type: 'withLunch', name: 'همراه با نهار', icon: <KebabDiningIcon /> },
 { type: 'limitedMenu', name: 'منوی محدود', icon: null },
];
