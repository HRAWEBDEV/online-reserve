import { PropsWithChildren } from 'react';
import AxiosInterceptor from '@/app/services/axios/AxiosInterceptor';
import AuthInterceptor from '@/app/services/auth/AuthInterceptor';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NavigationProvider from '../services/navigation/NavProvider';
import ReserveCheckProvider from '../services/reservation-check/ReserveCheckProvider';

export default function layout({ children }: PropsWithChildren) {
 return (
  <NavigationProvider>
   <ReserveCheckProvider>
    <AxiosInterceptor />
    <AuthInterceptor />
    <Header />
    {children}
    <Footer />
   </ReserveCheckProvider>
  </NavigationProvider>
 );
}
