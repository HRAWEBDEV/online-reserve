'use client';
import { ReactNode, FC } from 'react';
import { SnackbarProvider } from 'notistack';

type TProps = { children: ReactNode };

const ToastrProvider: FC<TProps> = ({ children }) => {
 return (
  <SnackbarProvider
   autoHideDuration={2000}
   anchorOrigin={{
    vertical: 'top',
    horizontal: 'center',
   }}
   hideIconVariant
   preventDuplicate={true}
   maxSnack={8}
   style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
   }}
  >
   {children}
  </SnackbarProvider>
 );
};

export default ToastrProvider;
