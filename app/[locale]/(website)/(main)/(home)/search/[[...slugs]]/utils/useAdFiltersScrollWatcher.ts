import { useEffect, RefObject } from 'react';
import { useAppMonitorConfig } from '@/app/services/app-monitor/appMonitor';

export function useAdFiltersScrollWatcher({
 formContainterRef,
 formWrapperRef,
 topPadding = 0,
}: {
 formContainterRef: RefObject<HTMLElement | null>;
 formWrapperRef: RefObject<HTMLElement | null>;
 topPadding?: number;
}) {
 const { isLargeDevice } = useAppMonitorConfig();

 useEffect(() => {
  if (!isLargeDevice) return;
  let scrollDirection: 'up' | 'down' = 'up';
  let topOffset = 0;
  let scrollOffset = window.scrollY;
  let timeoutid: NodeJS.Timeout | null = null;
  function scrollWatcher() {
   console.log('scroll watcher');
   if (timeoutid) {
    clearTimeout(timeoutid);
   }
   timeoutid = setTimeout(() => {
    if (!formContainterRef?.current || !formWrapperRef?.current) return;
    const windowScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const containerHeight = formContainterRef.current.offsetHeight;
    scrollDirection = windowScroll > scrollOffset ? 'down' : 'up';
    if (scrollDirection == 'up') {
     if (topOffset <= 0) {
      topOffset += scrollOffset - windowScroll;
     } else {
      topOffset = 16 + topPadding;
     }
    } else if (scrollDirection == 'down') {
     if (topOffset > windowHeight - containerHeight) {
      topOffset += scrollOffset - windowScroll;
     } else if (containerHeight > windowHeight) {
      topOffset = windowHeight - 16 - containerHeight;
     }
    }
    scrollOffset = windowScroll;
    formContainterRef.current.style.top = topOffset + 'px';
   });
  }
  window.addEventListener('scroll', scrollWatcher);
  return () => window.removeEventListener('scroll', scrollWatcher);
 }, [formContainterRef, formWrapperRef, isLargeDevice, topPadding]);
}
