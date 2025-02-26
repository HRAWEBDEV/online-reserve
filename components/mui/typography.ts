import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
 interface TypographyVariants {
  irs: string;
 }
 interface TypographyVariantsOptions {
  irs: string;
 }
}

export const typography: TypographyOptions = {
 irs: 'var(--irs-font)',
 fontFamily: 'inherit',
 fontSize: 14,
};
