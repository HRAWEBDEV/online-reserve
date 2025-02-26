import { createContext, use } from 'react';
import { OutOfContext } from '@/app/utils/OutOfContext';

type Store = {
 isLargeDevice: boolean;
 isXlargeDevice: boolean;
 isTouchDevice: boolean;
};

const appMonitor = createContext<Store | null>(null);

function useAppMonitorConfig(): Store {
 const value = use(appMonitor);
 if (!value) throw new OutOfContext();
 return value;
}

export { type Store, appMonitor, useAppMonitorConfig };
