import { OutOfContext } from '@/app/utils/OutOfContext';
import { createContext, useContext } from 'react';
import { type RoomInventory } from '../../../search/hotel/services/HotelApiActions';
import { type RoomInfo } from './addRoomsApiActions';

type Store = {
 selectedRooms: RoomInventory[];
 roomsInfo: RoomInfo[];
 isLoadingRooms: boolean;
 loadingAddRoom: boolean;
 addRoom: (roomInfo: RoomInfo) => Promise<void>;
 removeRoom: (roomInfo: RoomInfo) => void;
};

const confirmReserveContext = createContext<Store | null>(null);

function useConfirmReserveContext() {
 const context = useContext(confirmReserveContext);
 if (!context) throw new OutOfContext();
 return context;
}

export { type Store, confirmReserveContext, useConfirmReserveContext };
