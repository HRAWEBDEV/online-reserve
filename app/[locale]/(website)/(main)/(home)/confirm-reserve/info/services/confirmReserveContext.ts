import { OutOfContext } from '@/app/utils/OutOfContext';
import { createContext, useContext } from 'react';
import { type RoomInventory } from '../../../search/hotel/services/HotelApiActions';
import { type RoomInfo } from './addRoomsApiActions';
import { type ReserveInfoSchema } from '../schema/reserveInfoSchema';

type Store = {
 selectedRooms: RoomInventory[];
 isLoadingRooms: boolean;
 loadingAddRoom: boolean;
 handleConfirmReserve: (reserveSchema: ReserveInfoSchema) => Promise<void>;
 addRoom: (roomInfo: RoomInfo) => Promise<void>;
 removeRoom: (id: number, i: number) => void;
};

const confirmReserveContext = createContext<Store | null>(null);

function useConfirmReserveContext() {
 const context = useContext(confirmReserveContext);
 if (!context) throw new OutOfContext();
 return context;
}

export { type Store, confirmReserveContext, useConfirmReserveContext };
