'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { type HotelInfo } from '@/app/[locale]/(website)/services/HotelApiActions';
import { LatLngTuple, Icon } from 'leaflet';

type Props = {
 open: boolean;
 close: () => void;
 hotelInfo: HotelInfo | null;
};

export default function HotelLocation({ open, close, hotelInfo }: Props) {
 const { isLargeDevice } = useAppMonitorConfig();
 const position = [
  hotelInfo?.latitude || 32,
  hotelInfo?.longitude || 53,
 ] as LatLngTuple;
 const map = (
  <MapContainer
   className='h-full w-full'
   center={position}
   zoom={13}
   scrollWheelZoom={false}
  >
   <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
   />
   <Marker
    position={position}
    icon={
     new Icon({
      iconUrl: '/images/map-marker.png',
      iconSize: [25, 40],
     })
    }
   >
    <Popup>
     A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
   </Marker>
  </MapContainer>
 );
 return (
  <>
   {isLargeDevice ? (
    <section className='hidden lg:block border border-neutral-200 rounded-lg bg-neutral-100 gap-4'>
     {map}
    </section>
   ) : (
    <Drawer
     sx={{
      '& .MuiPaper-root': {
       borderTopLeftRadius: '0.5rem',
       borderTopRightRadius: '0.5rem',
      },
     }}
     open={open}
     anchor='bottom'
     onClose={close}
    >
     <div className='flex gap-3 p-3'>
      <div className='basis-8'></div>
      <h3 className='text-lg font-medium flex-grow text-center'>نقشه</h3>
      <div className='basis-8'>
       <IconButton onClick={close} color='error'>
        <CloseIcon />
       </IconButton>
      </div>
     </div>
     <div className='h-[70vh] overflow-hidden'>{map}</div>
    </Drawer>
   )}
  </>
 );
}
