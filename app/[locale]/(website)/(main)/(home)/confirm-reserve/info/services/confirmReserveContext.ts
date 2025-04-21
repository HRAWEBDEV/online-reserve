import { OutOfContext } from '@/app/utils/OutOfContext';
import { createContext, useContext } from 'react';

type Store = {
 test: string;
};

const confirmReserveContext = createContext<Store | null>(null);

function useConfirmReserveContext() {
 const context = useContext(confirmReserveContext);
 if (!context) throw new OutOfContext();
 return context;
}

export { type Store, confirmReserveContext, useConfirmReserveContext };
