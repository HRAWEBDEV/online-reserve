'use client';
import { PropsWithChildren, useMemo } from 'react';
import { type Store, roomsInfoContext } from './roomsInfoContext';
import { useSearchParams } from 'next/navigation';

export default function RoomsInfoProvider({
 children,
 ...props
}: PropsWithChildren &
 Pick<Store, 'requestData' | 'checkInDate' | 'checkOutDate' | 'ratePlanType'>) {
 const searchParams = useSearchParams();
 const ctx = useMemo(
  () =>
   ({
    ...props,
    beds: searchParams.get('beds')?.split(',').map(Number) || [],
    roomType: searchParams.get('roomType')?.split(',').map(Number) || [],
   } as Store),
  [props, searchParams]
 );
 return (
  <roomsInfoContext.Provider value={ctx}>{children}</roomsInfoContext.Provider>
 );
}
