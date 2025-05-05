'use client';
import { useState } from 'react';
import { HTMLProps } from 'react';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
 img: HTMLProps<HTMLImageElement>;
 wrapper?: HTMLProps<HTMLDivElement>;
 showLoading?: boolean;
 showError?: boolean;
 showPlaceholder?: boolean;
};

export default function ImageWrapper({
 img: { src, alt, ...imgProps },
 wrapper,
 showLoading = true,
 showError = true,
 showPlaceholder = true,
}: Props) {
 const [isLoading, setIsLoading] = useState(false);
 const [isError, setIsError] = useState(false);

 return (
  <div {...(wrapper || {})}>
   <div className='h-full w-full relative'>
    {showLoading && isLoading && (
     <div className='absolute inset-0 z-[3] bg-neutral-200 flex items-center justify-center'>
      <CircularProgress color='error' />
     </div>
    )}
    {((showError && isError) || (showPlaceholder && !src)) && (
     <div className='absolute inset-0 z-[2] bg-neutral-200 flex items-center justify-center text-neutral-600'>
      <HideImageOutlinedIcon
       sx={{
        fontSize: '6rem',
       }}
      />
     </div>
    )}
    <img
     src={src}
     alt={alt}
     {...imgProps}
     onLoad={() => setIsLoading(true)}
     onError={() => setIsError(true)}
    />
   </div>
  </div>
 );
}
