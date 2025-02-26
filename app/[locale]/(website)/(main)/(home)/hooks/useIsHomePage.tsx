import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function useIsHomePage() {
 const pathname = usePathname();
 const checkIsHomePage = useCallback(() => {
  return pathname.split('/').length === 2;
 }, [pathname]);
 const [isHomePage, setIsHomePage] = useState(() => checkIsHomePage());

 useEffect(() => {
  setIsHomePage(checkIsHomePage());
 }, [checkIsHomePage]);
 return isHomePage;
}
