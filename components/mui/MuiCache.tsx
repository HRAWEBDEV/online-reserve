'use client';
import { ReactNode, useMemo } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useAppConfig } from '@/app/services/app-config/appConfig';

const cacheOptions = {
 rtl: {
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
 },
 ltr: {
  key: 'mui',
 },
};

export default function MuiCache({ children }: { children: ReactNode }) {
 const { localeInfo } = useAppConfig();
 const activeCache = useMemo(
  () => createCache(cacheOptions[localeInfo.dir]),
  [localeInfo.dir]
 );
 return <CacheProvider value={activeCache}>{children}</CacheProvider>;
}
