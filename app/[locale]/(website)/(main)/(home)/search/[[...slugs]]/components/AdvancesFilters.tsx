import { useRef } from 'react';
import Button from '@mui/material/Button';
import TuneIcon from '@mui/icons-material/Tune';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import { useAdFiltersScrollWatcher } from '../utils/useAdFiltersScrollWatcher';
import { alpha } from '@mui/material/styles';

type TProps = {
 showAdvancedSearch: boolean;
 toggleAdvancedSearch: (open: boolean) => void;
};

const accordionsDefaultStyles = {
 boxShadow: 'none',
 '& .MuiAccordionSummary-content': {
  marginBlock: '0.8rem',
 },
 '& .MuiButtonBase-root': {
  minHeight: 'unset',
  paddingInline: 0,
 },
 '& .MuiAccordionDetails-root': {
  padding: 0,
 },
};

const formControlSyles = {
 '& .MuiFormControlLabel-label': {
  fontSize: '0.75rem',
 },
};

export default function AdvancesFilters({
 toggleAdvancedSearch,
 showAdvancedSearch,
}: TProps) {
 const formContainterRef = useRef<HTMLFormElement>(null);
 const formWrapperRef = useRef<HTMLDivElement>(null);
 useAdFiltersScrollWatcher({ formContainterRef, formWrapperRef });
 const filtersContent = () => {
  return (
   <div>
    <div className='py-4 border-b'>
     <TextField
      size='small'
      fullWidth
      placeholder='جستجوی نام هتل'
      type='search'
      className='[&_::placeholder]:text-sm'
      InputProps={{
       endAdornment: (
        <InputAdornment position='end' className='-me-1'>
         <SearchIcon />
        </InputAdornment>
       ),
      }}
     />
    </div>
    <div className='py-2 border-b'>
     <Accordion defaultExpanded sx={accordionsDefaultStyles}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
       <p className='font-medium'>قیمت</p>
      </AccordionSummary>
      <AccordionDetails>
       <div className='flex gap-2 items-center mb-2'>
        <TextField size='small' />
        <span> - </span>
        <TextField size='small' />
       </div>
       <div>
        <Slider value={[15, 80]} valueLabelDisplay='auto' disableSwap />
       </div>
      </AccordionDetails>
     </Accordion>
    </div>
    <div className='py-2 border-b'>
     <Accordion defaultExpanded sx={accordionsDefaultStyles}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
       <p className='font-medium'>ستاره هتل</p>
      </AccordionSummary>
      <AccordionDetails>
       <div className='grid ps-2'>
        {Array.from({ length: 5 }, (_, i) => i + 1)
         .reverse()
         .map((i) => (
          <div key={i} className='flex  items-center'>
           <FormControlLabel
            sx={formControlSyles}
            label={`ستاره ${i}`}
            control={<Checkbox color='warning' />}
           />
           <div>
            {Array.from({ length: i }, (_, i) => i).map((i) => (
             <StarIcon fontSize='small' key={i} color='warning' />
            ))}
           </div>
          </div>
         ))}
       </div>
      </AccordionDetails>
     </Accordion>
    </div>
    <div className='py-2 border-b'>
     <Accordion defaultExpanded sx={accordionsDefaultStyles}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
       <p className='font-medium'>تعداد تخت</p>
      </AccordionSummary>
      <AccordionDetails>
       <div className='grid ps-2'>
        <FormControlLabel
         sx={formControlSyles}
         label='1 تخته'
         control={<Checkbox color='success' />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='2 تخته'
         control={<Checkbox color='success' />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='3 تخته'
         control={<Checkbox color='success' />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='4 تخته'
         control={<Checkbox color='success' />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='5 تخته و بیشتر'
         control={<Checkbox color='success' />}
        />
       </div>
      </AccordionDetails>
     </Accordion>
    </div>
    <div className='py-2 border-b'>
     <Accordion defaultExpanded sx={accordionsDefaultStyles}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
       <p className='font-medium'>امکانات هتل</p>
      </AccordionSummary>
      <AccordionDetails>
       <div className='mt-4 mb-2'>
        <TextField
         size='small'
         fullWidth
         placeholder='جستجوی امکانات هتل'
         type='search'
         className='[&_::placeholder]:text-sm'
         InputProps={{
          endAdornment: (
           <InputAdornment position='end' className='-me-1'>
            <SearchIcon />
           </InputAdornment>
          ),
         }}
        />
       </div>
       <div className='grid ps-2'>
        <FormControlLabel
         sx={formControlSyles}
         label='لابی'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='پذیرش ۲۴ ساعته'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='آسانسور'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='صندوق امانات'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='امکان شارژ وسایل اکتریکی'
         control={<Checkbox />}
        />
       </div>
      </AccordionDetails>
     </Accordion>
    </div>
    <div className='py-2'>
     <Accordion defaultExpanded sx={accordionsDefaultStyles}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
       <p className='font-medium'>آفرها</p>
      </AccordionSummary>
      <AccordionDetails>
       <div className='grid ps-2'>
        <FormControlLabel
         sx={formControlSyles}
         label='پکیج شب رایگان'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='نیم شارژ ورود رایگان'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='کنسلی رایگان'
         control={<Checkbox />}
        />
        <FormControlLabel
         sx={formControlSyles}
         label='تخفیف رستوران'
         control={<Checkbox />}
        />
       </div>
      </AccordionDetails>
     </Accordion>
    </div>
   </div>
  );
 };

 return (
  <>
   <div className='flex justify-center items-center fixed bottom-8 end-0 start-0 z-[2] lg:hidden'>
    <Button
     variant='outlined'
     color='error'
     sx={{
      backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
      minWidth: '10rem',
     }}
     onClick={() => toggleAdvancedSearch(true)}
    >
     <div className='flex gap-4'>
      <Badge color='error' badgeContent={4}>
       <TuneIcon />
      </Badge>
      <span>فیلترها</span>
     </div>
    </Button>
   </div>
   <aside ref={formWrapperRef} className='hidden lg:block'>
    <form
     ref={formContainterRef}
     className='border border-neutral-300 rounded-lg p-1 px-4 sticky'
    >
     {filtersContent()}
    </form>
   </aside>
   <Drawer
    className='lg:hidden'
    onClose={() => toggleAdvancedSearch(false)}
    open={showAdvancedSearch}
    sx={{
     '& .MuiPaper-root': {
      height: '100%',
     },
    }}
    anchor='bottom'
   >
    <div className='flex gap-3 container py-2 items-center sticky top-0 z-[2] bg-white border-b border-neutral-300'>
     <div className='basis-32 flex justify-start'>
      <IconButton onClick={() => toggleAdvancedSearch(false)}>
       <ArrowForwardIcon />
      </IconButton>
     </div>
     <h2 className='text-center flex-grow font-medium text-base'>فیلترها</h2>
     <div className='flex justify-end basis-32'>
      <Button color='error'>
       <div className='flex items-center gap-1 text-xs'>
        <DeleteIcon />
        <span>حذف فیلترها</span>
       </div>
      </Button>
     </div>
    </div>
    <div className='container flex-grow'>{filtersContent()}</div>
    <div className='flex py-4 items-center justify-center border-t border-neutral-300 bg-white sticky bottom-0'>
     <Button
      variant='contained'
      color='error'
      sx={{
       minWidth: '10rem',
      }}
     >
      <div className='flex gap-4'>
       <Badge badgeContent={4} color='error'>
        <TuneIcon />
       </Badge>
       <span>اعمال فیلتر ها</span>
      </div>
     </Button>
    </div>
   </Drawer>
  </>
 );
}
