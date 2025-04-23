'use client';
import { ratePlanModel } from '../../../../search/hotel/utils/ratePlanModel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { useFormContext, Controller } from 'react-hook-form';
import { ReserveInfoSchema } from '../../schema/reserveInfoSchema';
import { type RoomInventory } from '../../services/addRoomsApiActions';
import { useConfirmReserveContext } from '../../services/confirmReserveContext';

const chipStyles = { borderRadius: '0.2rem' };
const buttonStyles = { paddingInline: '0.5rem', minWidth: 'unset' };

type Props = {
 itemIndex: number;
 room: RoomInventory;
};

export default function SelectedRoom({ itemIndex, room }: Props) {
 const {
  control,
  register,
  setValue,
  getValues,
  formState: { errors },
  watch,
 } = useFormContext<ReserveInfoSchema>();
 const { removeRoom, selectedRooms } = useConfirmReserveContext();

 const [guestsInfo, reserveFirstName, reserveLastName, reserveNationalCode] =
  watch([
   'guestInfo',
   'reserveFirstName',
   'reserveLastName',
   'reserveNationalCode',
  ]);
 const guestInfo = guestsInfo[itemIndex];

 function handleChangeGuestNumber(
  name: 'adult' | 'child' | 'baby',
  action: 'increment' | 'decrement'
 ) {
  const currentValue =
   Number(getValues(`guestInfo.${itemIndex}.${name}Count`)) || 0;
  if (currentValue === 0 && action === 'decrement') return;
  const newValue = currentValue + (action === 'increment' ? 1 : -1);
  setValue(`guestInfo.${itemIndex}.${name}Count`, newValue || '');
 }

 function handleRemoveRoom() {
  removeRoom(room.internalID!, itemIndex);
 }

 return (
  <div className='mb-4'>
   <div className='flex gap-2 items-center mb-4'>
    <p>
     <span className='text-neutral-600'>اتاق {1}: </span>
     <span className='font-medium text-[0.9rem]'>{room.fName}</span>
    </p>
    <div className='bg-neutral-600 h-[1px] flex-grow'></div>
    <IconButton
     color='error'
     onClick={handleRemoveRoom}
     disabled={selectedRooms.length < 2}
    >
     <DeleteOutlinedIcon />
    </IconButton>
   </div>
   <div className=' grid grid-cols-2 gap-4 mb-6'>
    <div>
     <div className='flex items-center gap-1 text-neutral-600 font-medium'>
      <PersonOutlineOutlinedIcon />
      <span>تعداد: </span>
      <span>{room.accommodationTypePrice.beds} نفر</span>
     </div>
    </div>
    <div className='col-span-full flex flex-wrap gap-2'>
     {ratePlanModel
      .filter(
       (item) =>
        room.accommodationTypePrice.accommodationRatePlanModel.ratePlanModel[
         item.type
        ]
      )
      .map((item) => (
       <Chip
        sx={chipStyles}
        key={item.type}
        label={item.name}
        icon={item.icon || undefined}
       />
      ))}
    </div>
    <div className='col-span-full flex flex-wrap'>
     <Controller
      control={control}
      name={`guestInfo.${itemIndex}.sameAsReserveInfo`}
      render={({ field }) => (
       <FormControlLabel
        label='نام رزرو کننده با سرپرست اتاق یکی می‌باشد'
        control={
         <Checkbox
          {...field}
          checked={field.value || false}
          value={field.value || false}
          onChange={(_, newValue) => {
           if (newValue) {
            guestsInfo.forEach((guest, i) => {
             if (guest.sameAsReserveInfo) {
              setValue(`guestInfo.${i}.guestFirstName`, '');
              setValue(`guestInfo.${i}.guestLastName`, '');
              setValue(`guestInfo.${i}.guestNationalCode`, '');
             }
            });
           }
           field.onChange(newValue);
          }}
         />
        }
       />
      )}
     />
     <Controller
      control={control}
      name={`guestInfo.${itemIndex}.halfCheckin`}
      render={({ field }) => (
       <FormControlLabel
        label='نیم شارژ ورود'
        control={
         <Checkbox
          {...field}
          checked={field.value || false}
          value={field.value || false}
         />
        }
       />
      )}
     />
     <Controller
      control={control}
      name={`guestInfo.${itemIndex}.halfCheckout`}
      render={({ field }) => (
       <FormControlLabel
        label='نیم شارژ خروج'
        control={
         <Checkbox
          {...field}
          checked={field.value || false}
          value={field.value || false}
         />
        }
       />
      )}
     />
    </div>
    <div className='col-span-full'>
     <Controller
      control={control}
      name={`guestInfo.${itemIndex}.guestType`}
      render={({ field }) => (
       <ToggleButtonGroup
        {...field}
        color='error'
        exclusive
        value={field.value || 'normal'}
        onChange={(_, value) => field.onChange(value)}
       >
        <ToggleButton value='normal'>مهمان داخلی</ToggleButton>
        <ToggleButton value='foreign'>مهمان خارجی</ToggleButton>
       </ToggleButtonGroup>
      )}
     />
    </div>
    <div className='grid col-span-full lg:col-auto grid-cols-2 gap-4'>
     <TextField
      label='نام'
      size='small'
      {...(() => {
       const rg = register(`guestInfo.${itemIndex}.guestFirstName`);
       if (!!guestInfo?.sameAsReserveInfo) {
        return { ...rg, value: reserveFirstName || '' };
       } else {
        return { ...rg };
       }
      })()}
      disabled={!!guestInfo?.sameAsReserveInfo}
      error={
       !guestInfo?.sameAsReserveInfo &&
       !!errors?.guestInfo?.[itemIndex]?.guestFirstName
      }
      helperText={
       guestInfo?.sameAsReserveInfo
        ? ''
        : errors?.guestInfo?.[itemIndex]?.guestFirstName?.message || ''
      }
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
      required={!guestInfo?.sameAsReserveInfo}
     />
     <TextField
      label='نام خانوادگی'
      size='small'
      {...(() => {
       const rg = register(`guestInfo.${itemIndex}.guestLastName`);
       if (!!guestInfo?.sameAsReserveInfo) {
        return { ...rg, value: reserveLastName || '' };
       } else {
        return { ...rg };
       }
      })()}
      disabled={!!guestInfo?.sameAsReserveInfo}
      error={
       !guestInfo?.sameAsReserveInfo &&
       !!errors?.guestInfo?.[itemIndex]?.guestLastName
      }
      helperText={
       guestInfo?.sameAsReserveInfo
        ? ''
        : errors?.guestInfo?.[itemIndex]?.guestLastName?.message || ''
      }
      slotProps={{
       inputLabel: {
        shrink: true,
       },
      }}
      required={!guestInfo?.sameAsReserveInfo}
     />
    </div>
    <TextField
     label='کدملی'
     size='small'
     className='col-span-full lg:col-auto'
     {...(() => {
      const rg = register(`guestInfo.${itemIndex}.guestNationalCode`);
      if (!!guestInfo?.sameAsReserveInfo) {
       return { ...rg, value: reserveNationalCode || '' };
      } else {
       return { ...rg };
      }
     })()}
     disabled={!!guestInfo?.sameAsReserveInfo}
     error={
      !guestInfo?.sameAsReserveInfo &&
      !!errors?.guestInfo?.[itemIndex]?.guestNationalCode
     }
     helperText={
      guestInfo?.sameAsReserveInfo
       ? ''
       : errors?.guestInfo?.[itemIndex]?.guestNationalCode?.message || ''
     }
     slotProps={{
      inputLabel: {
       shrink: true,
      },
     }}
     required={!guestInfo?.sameAsReserveInfo}
    />
    <div className='col-span-full flex gap-6 bg-neutral-100 p-3 justify-center rounded-lg  lg:flex-row flex-col flex-wrap'>
     <div className='grid grid-cols-[max-content_1fr_max-content] lg:grid-cols-[max-content_5rem_max-content] items-center'>
      <Button
       sx={buttonStyles}
       color='error'
       variant='outlined'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('adult', 'decrement')}
      >
       <RemoveIcon />
      </Button>
      <TextField
       fullWidth
       label='بزرگسال'
       size='small'
       className='!bg-background'
       slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
       {...register(`guestInfo.${itemIndex}.adultCount`)}
      />
      <Button
       sx={buttonStyles}
       variant='outlined'
       color='success'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('adult', 'increment')}
      >
       <AddIcon />
      </Button>
     </div>
     <div className='grid grid-cols-[max-content_1fr_max-content] lg:grid-cols-[max-content_5rem_max-content] items-center'>
      <Button
       sx={buttonStyles}
       color='error'
       variant='outlined'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('baby', 'decrement')}
      >
       <RemoveIcon />
      </Button>
      <TextField
       fullWidth
       label='کودک'
       size='small'
       className='!bg-background'
       slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
       {...register(`guestInfo.${itemIndex}.babyCount`)}
      />
      <Button
       sx={buttonStyles}
       color='success'
       variant='outlined'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('baby', 'increment')}
      >
       <AddIcon />
      </Button>
     </div>
     <div className='grid grid-cols-[max-content_1fr_max-content] lg:grid-cols-[max-content_5rem_max-content] items-center'>
      <Button
       sx={buttonStyles}
       color='error'
       variant='outlined'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('child', 'decrement')}
      >
       <RemoveIcon />
      </Button>
      <TextField
       fullWidth
       label='نوزاد'
       size='small'
       className='!bg-background'
       slotProps={{ input: { readOnly: true }, inputLabel: { shrink: true } }}
       {...register(`guestInfo.${itemIndex}.childCount`)}
      />
      <Button
       sx={buttonStyles}
       color='success'
       variant='outlined'
       className='!bg-background'
       onClick={() => handleChangeGuestNumber('child', 'increment')}
      >
       <AddIcon />
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}
