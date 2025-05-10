'use client';
import {
 useState,
 useRef,
 ImgHTMLAttributes,
 DetailedHTMLProps,
 HTMLProps,
} from 'react';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
 img: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
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
 const [isLoading, setIsLoading] = useState(true);
 const [isError, setIsError] = useState(false);
 const imageRef = useRef<HTMLImageElement>(null);

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
        fontSize: '5rem',
       }}
      />
     </div>
    )}
    <img
     ref={(ref) => {
      if (ref) {
       imageRef.current = ref;
       imageRef.current.src = src || '';
       setIsLoading(false);
      }
     }}
     alt={alt}
     {...imgProps}
     onError={() => setIsError(true)}
    />
   </div>
  </div>
 );
}
