'use client';
import { useState, ReactNode, useMemo, useCallback } from 'react';
import { type Config, appConfigContext } from './appConfig';
import { useParams } from 'next/navigation';
import { locales } from '@/app/localization/locales';
import { setMode as setStorageMode } from './appConfigStorage';

export default function AppConfigProvider({
 children,
}: {
 children: ReactNode;
}) {
 const { locale: localeParam } = useParams();
 const [mode, setMode] = useState<Config['mode']>('light');
 const [locale, setLocale] = useState<Config['locale']>(() => {
  return localeParam as Config['locale'];
 });
 const localeInfo = locales[locale];

 const changeLocale = useCallback((locale: Config['locale']) => {
  setLocale(locale);
 }, []);

 const changeMode = useCallback((mode: Config['mode']) => {
  setMode(mode);
  setStorageMode(mode);
 }, []);

 const ctxValue = useMemo(
  () => ({
   mode,
   locale,
   localeInfo,
   changeLocale,
   changeMode,
  }),
  [locale, mode, localeInfo, changeLocale, changeMode]
 );

 return (
  <appConfigContext.Provider value={ctxValue}>
   {children}
  </appConfigContext.Provider>
 );
}
