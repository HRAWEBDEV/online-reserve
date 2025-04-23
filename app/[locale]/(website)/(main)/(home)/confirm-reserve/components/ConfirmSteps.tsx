'use client';
import { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
import { usePathname } from 'next/navigation';

export default function ConfirmSteps() {
 const pathname = usePathname();
 const [activeStep, setActiveStep] = useState(0);

 useEffect(() => {
  if (pathname.includes('info')) setActiveStep(0);
  if (pathname.includes('payment')) setActiveStep(1);
 }, [pathname]);

 return (
  <div className='container bg-background sticky top-0 z-10'>
   <div className='py-6 w-[min(100%,40rem)] mx-auto'>
    <Stepper activeStep={activeStep}>
     <Step completed={false}>
      <StepButton>ورود اطلاعات</StepButton>
     </Step>
     <Step completed={false}>
      <StepButton>پرداخت</StepButton>
     </Step>
     <Step completed={false}>
      <StepButton>واچر</StepButton>
     </Step>
    </Stepper>
   </div>
  </div>
 );
}
