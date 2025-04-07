'use client';
import Modal from '@mui/material/Dialog';
import ModalContent from '@mui/material/DialogContent';
import ModalTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
 isOpen: boolean;
 onToggle: () => void;
};

export default function RoomsModal({ isOpen, onToggle }: Props) {
 return (
  <Modal open={isOpen} onClose={() => onToggle()} fullWidth maxWidth='lg'>
   <ModalTitle>
    <div className='flex justify-between gap-4 items-center'>
     <span className='text-lg'>اتاق‌ها</span>
     <IconButton color='error' onClick={() => onToggle()}>
      <CloseIcon />
     </IconButton>
    </div>
   </ModalTitle>
   <ModalContent dividers>
    <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-1 relative'></section>
   </ModalContent>
  </Modal>
 );
}
