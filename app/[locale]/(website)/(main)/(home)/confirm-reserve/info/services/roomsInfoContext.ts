import { OutOfContext } from '@/app/utils/OutOfContext';
import { use, createContext } from 'react';
import { type TRequestData } from '@/app/utils/getDefaultsReuestData';

type Store = {
 requestData: TRequestData;
 checkInDate: Date;
 checkOutDate: Date;
 beds: number[];
 roomType: number[];
 ratePlanType: number;
};

const roomsInfoContext = createContext<Store | null>(null);

const useRoomsInfoContext = () => {
 const val = use(roomsInfoContext);
 if (!val) throw new OutOfContext();
 return val;
};

export { type Store, roomsInfoContext, useRoomsInfoContext };
