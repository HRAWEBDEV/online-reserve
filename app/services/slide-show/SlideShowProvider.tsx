'use client';
import {
 useState,
 useCallback,
 useMemo,
 PropsWithChildren,
 useEffect,
} from 'react';
import { type Slide, slideShowContext } from './slideShowContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ImageWrapper from '@/components/ImageWrapper';

export default function SlideShowProvider({ children }: PropsWithChildren) {
 const [slides, setSlides] = useState<Slide[]>([]);
 const [swiperProps, setSwiperProps] = useState<SwiperProps>({});
 const [isVisible, setIsVisible] = useState(false);
 const showSlideShow = useCallback(
  ({ slides, swiperProps }: { slides: Slide[]; swiperProps?: SwiperProps }) => {
   setSwiperProps(swiperProps || {});
   setSlides(slides);
   setIsVisible(true);
   document.body.style.overflow = 'hidden';
  },
  []
 );
 const cancelSlideShow = useCallback(() => {
  setSlides([]);
  setIsVisible(false);
  document.body.style.overflow = 'auto';
  setSwiperProps({});
 }, []);

 const ctx = useMemo(
  () => ({
   showSlideShow,
   cancelSlideShow,
  }),
  [showSlideShow, cancelSlideShow]
 );

 useEffect(() => {
  const controller = new AbortController();
  window.addEventListener(
   'keydown',
   (e) => {
    if (e.key === 'Escape') {
     cancelSlideShow();
    }
   },
   {
    signal: controller.signal,
   }
  );
  return () => controller.abort();
 }, [cancelSlideShow]);

 return (
  <slideShowContext.Provider value={ctx}>
   {children}
   {isVisible && (
    <div
     aria-describedby='slide show'
     className='fixed inset-0 bg-black/75 z-[4000]'
    >
     <div className='p-4 flex justify-end items-center'>
      <IconButton onClick={cancelSlideShow} className='!text-white'>
       <CloseIcon fontSize='large' />
      </IconButton>
     </div>
     <div>
      <Swiper
       className='flex-grow w-full [&]:[--swiper-navigation-color:white] [&]:[--swiper-pagination-color:white] [&]:[--swiper-navigation-sides-offset:2rem]'
       slidesPerView={1}
       spaceBetween={14}
       pagination={{
        clickable: true,
       }}
       modules={[Pagination]}
       {...swiperProps}
      >
       {slides.map((item) => (
        <SwiperSlide
         key={item.url}
         className='!h-[75vh] w-full !flex flex-col items-center justify-center pb-8'
        >
         <ImageWrapper
          img={{
           src: item.url,
           className: 'rounded-lg object-contain max-h-[100%]',
          }}
          wrapper={{
           className: 'max-h-[100%]',
          }}
         />
        </SwiperSlide>
       ))}
      </Swiper>
     </div>
    </div>
   )}
  </slideShowContext.Provider>
 );
}
