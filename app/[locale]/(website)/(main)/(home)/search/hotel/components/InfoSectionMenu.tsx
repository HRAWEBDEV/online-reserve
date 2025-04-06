'use client';
import { useState } from 'react';
import { infoSectionMenu } from '../utils/infoSectionMenu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';

export default function InfoSectionMenu() {
 const [selectedTab, setSelectedTab] =
  useState<(typeof infoSectionMenu)[number]['type']>('overview');

 return (
  <section className='mb-8'>
   <div className='container bg-neutral-100 px-0 max-lg:text-[0.8rem] rounded-lg'>
    <Tabs
     textColor='secondary'
     indicatorColor='secondary'
     value={selectedTab}
     onChange={(_, newValue) => setSelectedTab(newValue)}
     sx={{
      '& .MuiTab-root': {
       flexGrow: 1,
       paddingBlock: '1.5rem',
       paddingInline: '0.3rem',
       maxWidth: 'unset',
       flexBasis: 0,
      },
     }}
    >
     {infoSectionMenu.map((section) => (
      <Tab
       LinkComponent={Link}
       href={section.href}
       sx={{
        fontWeight: 'bold',
        fontSize: 'inherit',
       }}
       key={section.type}
       label={section.title}
       value={section.type}
      />
     ))}
    </Tabs>
   </div>
  </section>
 );
}
