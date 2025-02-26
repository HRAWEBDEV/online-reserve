'use client';
import {
 type RoomsFilterSchema,
 roomsFilterSchema,
 defaultValues,
} from '../../schema/roomsFilterSchema';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RoomsFilters from './RoomsFilters';
import RoomsList from './RoomsList';
import SelectedRoomsList from './SelectedRoomsList';

export default function RoomSection() {
 const filtersUseForm = useForm<RoomsFilterSchema>({
  resolver: zodResolver(roomsFilterSchema),
  defaultValues,
 });
 return (
  <section id='rooms'>
   <FormProvider {...filtersUseForm}>
    <div className='container'>
     <header className='mb-6'>
      <h3 className='font-medium text-xl lg:text-2xl'>اتــــاق ها</h3>
     </header>
     <RoomsFilters />
     <div className='grid gap-4 lg:grid-cols-[1fr_20rem] mb-8'>
      <RoomsList />
      <SelectedRoomsList />
     </div>
    </div>
   </FormProvider>
  </section>
 );
}
