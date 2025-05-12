import { useContext, createContext } from 'react';
import { OutOfContext } from '@/app/utils/OutOfContext';
import { type SwiperProps } from 'swiper/react';

type Slide = {
 url: string;
};
type Store = {
 showSlideShow: ({
  slides,
  swiperProps,
 }: {
  slides: Slide[];
  swiperProps?: SwiperProps;
 }) => void;
 cancelSlideShow: () => void;
};

const slideShowContext = createContext<Store | null>(null);

function useSlideShowContext() {
 const val = useContext(slideShowContext);
 if (!val) throw new OutOfContext();
 return val;
}

export { type Store, type Slide, slideShowContext, useSlideShowContext };
