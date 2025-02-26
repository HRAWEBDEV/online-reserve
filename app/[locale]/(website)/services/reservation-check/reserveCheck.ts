'use client';
import { createContext, use } from 'react';
import { OutOfContext } from '@/app/utils/OutOfContext';

type TStore = {
 reserveCheckIsVisible: boolean;
};
type TStoreAction = {
 showReserveCheck: (show: boolean) => void;
};

const reserveCheckContext = createContext<(TStore & TStoreAction) | null>(null);

function useReserveCheckContext(): TStore & TStoreAction {
 const value = use(reserveCheckContext);
 if (!value) throw new OutOfContext();
 return value;
}

export {
 type TStore,
 type TStoreAction,
 reserveCheckContext,
 useReserveCheckContext,
};
