import { OutOfContext } from '@/app/utils/OutOfContext';
import { use, createContext } from 'react';
import { type TRequestData } from '@/app/utils/getDefaultsReuestData';
import {
 RoomInventory,
 RoomAccomodationType,
} from '../../../search/hotel/services/HotelApiActions';

type SelectedRoom = RoomAccomodationType &
 Pick<RoomInventory, 'fName' | 'hoteID' | 'roomTypeID' | 'roomCount'> & {
  count: number;
 };

type Store = {
 requestData: TRequestData;
 checkInDate: Date;
 checkOutDate: Date;
 nights: number;
};

const roomsInfoContext = createContext<Store | null>(null);

const useRoomsInfoContext = () => {
 const val = use(roomsInfoContext);
 if (!val) throw new OutOfContext();
 return val;
};

export { type Store, type SelectedRoom, roomsInfoContext, useRoomsInfoContext };
