'use client';
import { useCallback, useMemo, PropsWithChildren } from 'react';
import { navigationContext } from './navigation';
import { useQueryToggler } from '@/hooks/useQueryToggler';

export default function NavigationProvider({ children }: PropsWithChildren) {
 const { isQueryTrue: navbarIsVisible, handleToggle } = useQueryToggler(
  'show-website-navigation'
 );
 const showNavbar = useCallback(
  (show: boolean) => {
   handleToggle(show);
  },
  [handleToggle]
 );

 const toggleNavbar = useCallback(() => {
  handleToggle();
 }, [handleToggle]);

 const ctx = useMemo(
  () => ({
   headerIsVisible: true,
   navbarIsVisible,
   showNavbar,
   toggleNavbar,
  }),
  [navbarIsVisible, showNavbar, toggleNavbar]
 );

 return (
  <navigationContext.Provider value={ctx}>
   {children}
  </navigationContext.Provider>
 );
}
