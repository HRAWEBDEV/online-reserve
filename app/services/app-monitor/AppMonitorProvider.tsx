'use client';
import { useMemo, PropsWithChildren } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material/styles';
import { appMonitor } from './appMonitor';

export default function AppMonitorProvider({ children }: PropsWithChildren) {
 const isLargeDevice = useMediaQuery((theme: Theme) =>
  theme.breakpoints.up('lg')
 );
 const isXlargeDevice = useMediaQuery((theme: Theme) =>
  theme.breakpoints.up('xl')
 );
 const isTouchDevice = useMediaQuery('(hover: none)');

 const value = useMemo(
  () => ({
   isLargeDevice,
   isXlargeDevice,
   isTouchDevice,
  }),
  [isLargeDevice, isXlargeDevice, isTouchDevice]
 );

 return <appMonitor.Provider value={value}>{children}</appMonitor.Provider>;
}
