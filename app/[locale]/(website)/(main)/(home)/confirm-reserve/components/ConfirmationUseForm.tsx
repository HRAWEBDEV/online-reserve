'use client';
import { PropsWithChildren } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type ReserveInfoSchema,
 reserveInfoSchema,
 defaultValues,
} from '../info/schema/reserveInfoSchema';
import { useForm, FormProvider } from 'react-hook-form';

export default function ConfirmationUseForm({ children }: PropsWithChildren) {
 const reserveInfoUseForm = useForm<ReserveInfoSchema>({
  resolver: zodResolver(reserveInfoSchema),
  defaultValues,
  mode: 'onChange',
 });
 return <FormProvider {...reserveInfoUseForm}>{children}</FormProvider>;
}
