import GavelIcon from '@mui/icons-material/Gavel';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import InfoIcon from '@mui/icons-material/Info';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const websiteMenu = [
 {
  type: 'hotelReservation',
  title: 'رزرو هتل',
  icon: <LocalHotelIcon sx={{ fontSize: '1.8rem' }} />,
 },
 {
  type: 'cancelPolicies',
  title: 'قوانین و مقررات',
  icon: <GavelIcon sx={{ fontSize: '1.8rem' }} />,
 },
 {
  type: 'contactUs',
  title: 'ارتباط با ما',
  icon: <SupportAgentIcon color='error' sx={{ fontSize: '1.8rem' }} />,
 },
 {
  type: 'aboutOnlineReservation',
  title: 'درباره رزرو آنلاین',
  icon: <InfoIcon sx={{ fontSize: '1.8rem' }} />,
 },
] as const;
