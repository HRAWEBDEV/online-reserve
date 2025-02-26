import colors from 'tailwindcss/colors';
import { type DefaultColors } from 'tailwindcss/types/generated/colors';
import {} from '@mui/material/styles';

declare module '@mui/material/styles' {
 interface Palette
  extends Omit<
   DefaultColors,
   'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'
  > {
  contrastThreshold: number;
 }
 interface PaletteOptions
  extends Omit<
   DefaultColors,
   'lightBlue' | 'warmGray' | 'trueGray' | 'coolGray' | 'blueGray'
  > {
  divider?: string;
 }
}

export const pallete = {
 primary: {
  light: 'hsl(var(--primary-light))',
  main: 'hsl(var(--primary))',
  dark: 'hsl(var(--primary-dark))',
  contrastText: 'hsl(var(--primary-foreground))',
 },
 secondary: {
  light: 'hsl(var(--accent-light))',
  main: 'hsl(var(--accent))',
  dark: 'hsl(var(--accent-dark))',
  contrastText: 'hsl(var(--accent-foreground))',
 },
 text: {
  primary: 'hsl(var(--foreground))',
 },
 ...colors,
};
