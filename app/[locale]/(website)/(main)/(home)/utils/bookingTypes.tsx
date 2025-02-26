import HotelIcon from '@mui/icons-material/Hotel';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AttractionsIcon from '@mui/icons-material/Attractions';

export const bookingTypes = [
 {
  type: 'hotels',
  title: 'هتل ها',
  icon: <HotelIcon />,
 },
 {
  type: 'flights',
  title: 'پروازها',
  icon: <FlightTakeoffIcon />,
 },
 {
  type: 'attractions',
  title: 'جاذبه‌ها',
  icon: <AttractionsIcon />,
 },
] as const;
