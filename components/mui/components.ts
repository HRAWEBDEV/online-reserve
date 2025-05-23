import { Components } from '@mui/material/styles/components';
import { Theme } from '@mui/material/styles/createTheme';
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const components: Components<Omit<Theme, 'components'>> = {
 MuiTextField: {
  styleOverrides: {
   root: {
    '& .MuiInputBase-root': {
     fontSize: 'inherit',
     fontFamily: 'inherit',
     fontWeight: 'inherit',
    },
   },
  },
 },
 MuiAutocomplete: {
  styleOverrides: {
   paper: {
    fontSize: 'inherit',
    color: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiInputLabel: {
  styleOverrides: {
   root: {
    fontSize: 'inherit',
   },
  },
 },
 MuiIconButton: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiDateCalendar: {
  defaultProps: {
   dayOfWeekFormatter(date) {
    const dateParts = new Intl.DateTimeFormat('fa', {
     dateStyle: 'full',
    }).formatToParts(date);
    const weekday = dateParts.find((item) => item.type === 'weekday');
    return weekday?.value.slice(0, 1) || '';
   },
  },
 },
 MuiBadge: {
  styleOverrides: {
   badge: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
   },
  },
 },
 MuiInputBase: {
  styleOverrides: {
   input: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiFormControlLabel: {
  styleOverrides: {
   label: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiBreadcrumbs: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
   separator: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiChip: {
  styleOverrides: {
   label: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiTab: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiTooltip: {
  styleOverrides: {
   tooltip: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'normal',
   },
  },
 },
 MuiButtonBase: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontWeight: 'normal',
    fontSize: 'inherit',
   },
  },
 },
 MuiButton: {
  styleOverrides: {
   root: {
    fontFamily: 'inherit',
    fontWeight: 'normal',
    fontSize: 'inherit',
   },
  },
 },
};
