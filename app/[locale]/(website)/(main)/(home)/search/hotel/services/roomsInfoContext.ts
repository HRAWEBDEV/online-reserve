import { OutOfContext } from '@/app/utils/OutOfContext';
import { use, createContext } from 'react';
import { type TRequestData } from '@/app/utils/getDefaultsReuestData';
import {
 type RoomInventory,
 type RoomAccomodationType,
} from '../services/HotelApiActions';

type SelectedRoom = RoomAccomodationType &
 Pick<RoomInventory, 'fName' | 'hoteID' | 'roomTypeID' | 'roomCount'> & {
  count: number;
 };

type Store = {
 requestData: TRequestData;
 isFetchingRooms: boolean;
 selectedRooms: SelectedRoom[];
 rooms: RoomInventory[];
 nights: number;
 checkInDate: Date;
 checkOutDate: Date;
};

type StoreActions = {
 updateSelectedRoom: (
  params:
   | {
      roomPlanInternalID: number;
      type: 'decrease' | 'deleteAll';
     }
   | { type: 'add'; newRoom: Omit<SelectedRoom, 'count'> }
 ) => void;
 deleteSelectedRooms: () => void;
};

const roomsInfoContext = createContext<(Store & StoreActions) | null>(null);

const useRoomsInfoContext = () => {
 const val = use(roomsInfoContext);
 if (!val) throw new OutOfContext();
 return val;
};

export {
 type Store,
 type StoreActions,
 type SelectedRoom,
 roomsInfoContext,
 useRoomsInfoContext,
};
