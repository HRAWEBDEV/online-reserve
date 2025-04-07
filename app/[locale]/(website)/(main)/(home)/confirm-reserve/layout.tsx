import { PropsWithChildren } from 'react';
import ConfirmSteps from './components/ConfirmSteps';

export default function layout({ children }: PropsWithChildren) {
 return (
  <div>
   <ConfirmSteps />
   {children}
  </div>
 );
}
