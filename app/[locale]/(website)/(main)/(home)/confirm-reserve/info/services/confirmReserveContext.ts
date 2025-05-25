import { OutOfContext } from '@/app/utils/OutOfContext';
import { createContext, useContext } from 'react';
import { type RoomInventory } from '../../../../../services/HotelApiActions';
import { type RoomInfo } from './addRoomsApiActions';
import { type ReserveInfoSchema } from '../schema/reserveInfoSchema';

type Store = {
 selectedRooms: RoomInventory[];
 selectedRoomsInfo: RoomInfo[];
 isLoadingRooms: boolean;
 loadingAddRoom: boolean;
 confirmReserveLoading: boolean;
 handleConfirmReserve: (reserveSchema: ReserveInfoSchema) => Promise<void>;
 addRoom: (roomInfo: Omit<RoomInfo, 'count'>) => Promise<void>;
 removeRoom: (id: number, i: number) => void;
};

const confirmReserveContext = createContext<Store | null>(null);

function useConfirmReserveContext() {
 const context = useContext(confirmReserveContext);
 if (!context) throw new OutOfContext();
 return context;
}

export { type Store, confirmReserveContext, useConfirmReserveContext };
