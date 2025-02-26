'use client';
import { ReactNode, useMemo } from 'react';
import { useAppConfig } from '@/app/services/app-config/appConfig';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { breakpoints } from './breakpoints';
import { typography } from './typography';
import { pallete } from './pallete';
import { components } from './components';
import {
 faIR as datePickerFaIR,
 enUS as datePickerEnUs,
} from '@mui/x-date-pickers/locales';
import { faIR, enUS } from '@mui/material/locale';

const getMuiActiveLocale = {
 fa: [datePickerFaIR, faIR, faIR],
 en: [datePickerEnUs, enUS, enUS],
};

export default function MuiTheme({ children }: { children: ReactNode }) {
 const { localeInfo, mode } = useAppConfig();
 const muiTheme = useMemo(
  () =>
   createTheme(
    {
     spacing: (factor: number) => `${0.25 * factor}rem`,
     direction: localeInfo.dir,
     breakpoints,
     typography,
     components,
     palette: { mode, ...pallete },
    },
    ...getMuiActiveLocale[localeInfo.langAlias]
   ),
  [localeInfo.dir, mode, localeInfo.langAlias]
 );
 return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
