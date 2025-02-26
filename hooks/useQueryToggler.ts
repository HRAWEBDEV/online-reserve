import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export function useQueryToggler(queryName: string) {
 const router = useRouter();
 const searchParams = useSearchParams();
 const pathname = usePathname();

 const queryValue = searchParams.get(queryName);
 const isQueryTrue = queryValue === 'true';

 const handleToggle = useCallback(
  (newValue?: boolean) => {
   if (newValue === undefined) {
    newValue = !isQueryTrue;
   }
   const queries = new URLSearchParams(searchParams);
   if (newValue) {
    queries.set(queryName, 'true');
   } else {
    queries.delete(queryName, 'true');
   }
   const newPath = `${pathname}?${queries.toString()}`;
   if (newValue) {
    router.push(newPath, { scroll: false });
   } else {
    router.replace(newPath, { scroll: false });
   }
  },
  [isQueryTrue, pathname, queryName, router, searchParams]
 );

 return {
  handleToggle,
  queryValue,
  isQueryTrue,
 };
}
