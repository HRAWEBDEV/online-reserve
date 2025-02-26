'use client';
import { PropsWithChildren, useMemo } from 'react';
import { useAppConfig } from '@/app/services/app-config/appConfig';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalaliV3';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const getLocalAdapter = {
 en: AdapterDateFns,
 fa: AdapterDateFnsJalali,
};

export default function MuiLocalization({ children }: PropsWithChildren) {
 const { localeInfo } = useAppConfig();
 const activeAdapter = useMemo(
  () => getLocalAdapter[localeInfo.langAlias],
  [localeInfo.langAlias]
 ) as typeof AdapterDateFns;
 return (
  <LocalizationProvider dateAdapter={activeAdapter}>
   {children}
  </LocalizationProvider>
 );
}
