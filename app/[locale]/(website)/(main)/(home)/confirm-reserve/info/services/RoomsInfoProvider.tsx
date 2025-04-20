'use client';
import { PropsWithChildren, useMemo } from 'react';
import { type Store, roomsInfoContext } from './roomsInfoContext';
import * as dataFns from 'date-fns';

export default function RoomsInfoProvider({
 children,
 ...props
}: PropsWithChildren & Omit<Store, 'nights'>) {
 const nights = dataFns.differenceInDays(props.checkOutDate, props.checkInDate);
 const ctx = useMemo(() => ({ ...props, nights }), [props, nights]);
 return (
  <roomsInfoContext.Provider value={ctx}>{children}</roomsInfoContext.Provider>
 );
}
