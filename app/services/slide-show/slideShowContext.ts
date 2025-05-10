import { useContext, createContext } from 'react';
import { OutOfContext } from '@/app/utils/OutOfContext';

type Slide = {
 url: string;
};
type Store = {
 showSlideShow: ({ slides }: { slides: Slide[] }) => void;
 cancelSlideShow: () => void;
};

const slideShowContext = createContext<Store | null>(null);

function useSlideShowContext() {
 const val = useContext(slideShowContext);
 if (!val) throw new OutOfContext();
 return val;
}

export { type Store, type Slide, slideShowContext, useSlideShowContext };
