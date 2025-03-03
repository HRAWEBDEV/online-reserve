import { OutOfContext } from '@/app/utils/OutOfContext';
import { use, createContext } from 'react';
import { type TRequestData } from '@/app/utils/getDefaultsReuestData';
import { type RoomInventory } from '../services/HotelApiActions';

type Store = {
 requestData: TRequestData;
 isFetchingRooms: boolean;
 rooms: RoomInventory[];
 nights: number;
 checkInDate: Date;
 checkOutDate: Date;
};

const roomsInfoContext = createContext<Store | null>(null);

const useRoomsInfoContext = () => {
 const val = use(roomsInfoContext);
 if (!val) throw new OutOfContext();
 return val;
};

export { type Store, roomsInfoContext, useRoomsInfoContext };
