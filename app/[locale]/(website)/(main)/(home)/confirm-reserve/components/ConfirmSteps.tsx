'use client';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepLabel';
import Step from '@mui/material/Step';

export default function ConfirmSteps() {
 return (
  <div className='container bg-background sticky top-0 z-10'>
   <div className='py-6 w-[min(100%,40rem)] mx-auto'>
    <Stepper>
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
