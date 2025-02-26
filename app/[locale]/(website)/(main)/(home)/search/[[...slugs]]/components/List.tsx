'use client';
import { useState, useEffect } from 'react';
import ListQuickFilters from './ListQuickFilters';
import AdvancesFilters from './AdvancesFilters';
import { useQueryToggler } from '@/hooks/useQueryToggler';
import { type ListViewOptions } from '../utils/listViewOptions';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';
import Hotels from './Hotels';

export default function List() {
 const { isXlargeDevice } = useAppMonitorConfig();
 const [listViewMode, setListViewMode] = useState<ListViewOptions>('grid');
 const { handleToggle, isQueryTrue } = useQueryToggler('open-search-advanced');

 useEffect(() => {
  if (isXlargeDevice) return;
  setListViewMode('grid');
 }, [isXlargeDevice]);

 return (
  <section>
   <ListQuickFilters
    listViewMode={listViewMode}
    setListViewMode={setListViewMode}
   />
   <div className='container lg:grid lg:gap-4 lg:grid-cols-[16rem_1fr]'>
    <AdvancesFilters
     showAdvancedSearch={isQueryTrue}
     toggleAdvancedSearch={handleToggle}
    />
    <Hotels listViewMode={listViewMode} />
   </div>
  </section>
 );
}
