import { OutOfContext } from '@/app/utils/OutOfContext';
import { use, createContext } from 'react';
import { type TRequestData } from '@/app/utils/getDefaultsReuestData';
import {
 type RoomInventory,
 type RoomAccomodationType,
 type RatePlanType,
} from '../../../../../services/HotelApiActions';

type SelectedRoom = RoomAccomodationType &
 Pick<RoomInventory, 'fName' | 'hoteID' | 'roomTypeID' | 'roomCount'> & {
  count: number;
 };

type Store = {
 requestData: TRequestData;
 isFetchingRooms: boolean;
 isErrorRooms: boolean;
 selectedRooms: SelectedRoom[];
 rooms: RoomInventory[];
 ratePlanTypes: RatePlanType[];
 isFetchingRatePlanTypes: boolean;
 isRatePlanTypesError: boolean;
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

export { type Store, type SelectedRoom, roomsInfoContext, useRoomsInfoContext };
