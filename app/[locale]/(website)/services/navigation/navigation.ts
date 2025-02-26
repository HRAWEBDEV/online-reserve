import { createContext, use } from 'react';
import { OutOfContext } from '@/app/utils/OutOfContext';

type TStore = {
 headerIsVisible: boolean;
 navbarIsVisible: boolean;
};
type TStoreAction = {
 showNavbar: (show: boolean) => void;
 toggleNavbar: () => void;
};

const navigationContext = createContext<(TStore & TStoreAction) | null>(null);

function useNavigationContext(): TStore & TStoreAction {
 const value = use(navigationContext);
 if (!value) throw new OutOfContext();
 return value;
}

export {
 type TStore,
 type TStoreAction,
 navigationContext,
 useNavigationContext,
};
