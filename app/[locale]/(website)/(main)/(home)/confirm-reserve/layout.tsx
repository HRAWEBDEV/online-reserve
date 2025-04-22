import { PropsWithChildren } from 'react';
import ConfirmSteps from './components/ConfirmSteps';
import ConfirmationUseForm from './components/ConfirmationUseForm';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div>
   <ConfirmationUseForm>
    <ConfirmSteps />
    {children}
   </ConfirmationUseForm>
  </div>
 );
}
