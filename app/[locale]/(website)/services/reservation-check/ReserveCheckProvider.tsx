'use client';
import { PropsWithChildren, useMemo, useCallback } from 'react';
import { reserveCheckContext } from './reserveCheck';
import { useQueryToggler } from '@/hooks/useQueryToggler';

export default function ReserveCheckProvider({ children }: PropsWithChildren) {
 const { isQueryTrue: reserveCheckIsVisible, handleToggle } =
  useQueryToggler('show-reserve-check');

 const showReserveCheck = useCallback(
  (show: boolean) => {
   handleToggle(show);
  },
  [handleToggle]
 );

 const ctx = useMemo(
  () => ({
   reserveCheckIsVisible,
   showReserveCheck,
  }),
  [reserveCheckIsVisible, showReserveCheck]
 );
 return (
  <reserveCheckContext.Provider value={ctx}>
   {children}
  </reserveCheckContext.Provider>
 );
}
