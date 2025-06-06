'use client';
import { ratePlanModel } from '../../../../search/hotel/utils/ratePlanModel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { useFormContext, Controller } from 'react-hook-form';
import { ReserveInfoSchema } from '../../schema/reserveInfoSchema';
import { type RoomInventory } from '../../services/addRoomsApiActions';
import { useConfirmReserveContext } from '../../services/confirmReserveContext';

const chipStyles = { borderRadius: '0.2rem' };
// const buttonStyles = { paddingInline: '0.5rem', minWidth: 'unset' };

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

 //  function handleChangeGuestNumber(
 //   name: 'adult' | 'child' | 'baby',
 //   action: 'increment' | 'decrement'
 //  ) {
 //   const currentValue =
 //    Number(getValues(`guestInfo.${itemIndex}.${name}Count`)) || 0;
 //   if (currentValue === 0 && action === 'decrement') return;
 //   const newValue = currentValue + (action === 'increment' ? 1 : -1);
 //   setValue(`guestInfo.${itemIndex}.${name}Count`, newValue || '');
 //  }

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
           const guestInfo = getValues('guestInfo');
           for (let i = 0; i <= guestInfo.length - 1; i++) {
            if (guestInfo[i].sameAsReserveInfo) {
             if (i === itemIndex) break;
             setValue(`guestInfo.${i}.sameAsReserveInfo`, false);
             setValue(`guestInfo.${i}.guestFirstName`, '');
             setValue(`guestInfo.${i}.guestLastName`, '');
             setValue(`guestInfo.${i}.guestNationalCode`, '');
             break;
            }
           }
           setValue(`guestInfo.${itemIndex}.guestFirstName`, '');
           setValue(`guestInfo.${itemIndex}.guestLastName`, '');
           setValue(`guestInfo.${itemIndex}.guestNationalCode`, '');
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
    <div className='col-span-full flex gap-4 flex-wrap'>
     <Controller
      control={control}
      name={`guestInfo.${itemIndex}.gender`}
      render={({ field }) => (
       <ToggleButtonGroup
        {...field}
        color='error'
        exclusive
        value={field.value || 'male'}
        onChange={(_, value) => field.onChange(value)}
       >
        <ToggleButton value='male'>مرد</ToggleButton>
        <ToggleButton value='female'>زن</ToggleButton>
       </ToggleButtonGroup>
      )}
     />
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
    {guestInfo?.sameAsReserveInfo ? null : (
     <div className='grid col-span-full grid-cols-2 lg:grid-cols-3 gap-4'>
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
      <TextField
       label={guestInfo?.guestType === 'foreign' ? 'پاسپورت' : 'کدملی'}
       className='col-span-full lg:col-auto'
       size='small'
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
     </div>
    )}
   </div>
  </div>
 );
}
