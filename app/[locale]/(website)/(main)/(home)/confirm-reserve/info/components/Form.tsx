'use client';
import GuestInfo from './guest-info/GuestInfo';
import ReserveInfo from './ReserveInfo';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ConfirmReserveProvider from '../services/ConfirmReserveProvider';
import {
 type ReserveInfoSchema,
 reserveInfoSchema,
 defaultValues,
} from '../schema/reserveInfoSchema';

export default function Form() {
 const reserveInfoUseForm = useForm<ReserveInfoSchema>({
  resolver: zodResolver(reserveInfoSchema),
  defaultValues,
  mode: 'onChange',
 });
 return (
  <section className='container flex flex-col md:flex-row gap-4 mb-10'>
   <ConfirmReserveProvider>
    <FormProvider {...reserveInfoUseForm}>
     <GuestInfo />
     <ReserveInfo />
    </FormProvider>
   </ConfirmReserveProvider>
  </section>
 );
}
