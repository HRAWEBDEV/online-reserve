'use client';
import { PropsWithChildren } from 'react';
import { confirmReserveContext } from './confirmReserveContext';

export default function ConfirmReserveProvider({
 children,
}: PropsWithChildren) {
 return (
  <confirmReserveContext.Provider value={null}>
   {children}
  </confirmReserveContext.Provider>
 );
}
