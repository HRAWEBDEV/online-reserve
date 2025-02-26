import { Dispatch, SetStateAction } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Tooltip from '@mui/material/Tooltip';
import { ListViewOptions } from '../utils/listViewOptions';

const filterLableStyles = {
 '& .MuiFormControlLabel-label': {
  fontSize: '0.75rem',
 },
};

type Props = {
 listViewMode: ListViewOptions;
 setListViewMode: Dispatch<SetStateAction<ListViewOptions>>;
};

export default function ListQuickFilters({
 listViewMode,
 setListViewMode,
}: Props) {
 const getActiveModeColor = (isActive: boolean): 'error' | 'default' => {
  return isActive ? 'error' : 'default';
 };

 return (
  <form className='container text mb-4'>
   <div className='flex gap-4 justify-between items-center flex-wrap'>
    <div className='flex gap-2 items-center font-medium'>
     <span className='hidden md:inline-block'>فیلتر نمایش : </span>
     <RadioGroup
      className='gap-4 text-neutral-400'
      row
      name='filter'
      value={'one'}
      sx={{
       '& .MuiButtonBase-root': { padding: 0 },
       '& .MuiFormControlLabel-root': {
        margin: 0,
       },
       '& .MuiFormControlLabel-label': {
        fontWeight: 300,
       },
       '& .PrivateSwitchBase-input': {
        height: 0,
        width: 0,
       },
       '& .PrivateSwitchBase-input~*': {
        display: 'none',
       },
       '& .Mui-checked~*': {
        fontWeight: 400,
        color: (theme) => theme.palette.error.main,
       },
      }}
     >
      <FormControlLabel
       sx={filterLableStyles}
       label='پیشفرض'
       control={<Radio value={'one'} />}
      />
      <FormControlLabel
       sx={filterLableStyles}
       label='کمترین قیمت'
       control={<Radio value={'two'} />}
      />
      <FormControlLabel
       sx={filterLableStyles}
       label='بیشترین قیمت'
       control={<Radio value={'three'} />}
      />
      <FormControlLabel
       sx={filterLableStyles}
       label='بالاترین امتیاز'
       control={<Radio value={'four'} />}
      />
     </RadioGroup>
    </div>
    <div className='font-medium flex items-center max-xl:hidden'>
     <span className='pe-2'>حالت نمایش : </span>

     <Tooltip title='نمایش لیستی'>
      <IconButton
       onClick={() => setListViewMode('list')}
       color={getActiveModeColor(listViewMode === 'list')}
      >
       <ViewListIcon fontSize='medium' />
      </IconButton>
     </Tooltip>
     <Tooltip title='نمایش چندتایی'>
      <IconButton
       onClick={() => setListViewMode('grid')}
       color={getActiveModeColor(listViewMode === 'grid')}
      >
       <ViewModuleIcon fontSize='medium' />
      </IconButton>
     </Tooltip>
    </div>
   </div>
  </form>
 );
}
