import { useRef, useCallback, useEffect } from 'react';

const useTimer = () => {
 const timerIdsQueue = useRef(new Map<number | string, NodeJS.Timeout>());
 const timeoutId = useRef<null | NodeJS.Timeout>(null);
 const clearTimer = useCallback(() => {
  if (timeoutId.current) {
   clearTimeout(timeoutId.current);
  }
 }, []);

 const startTimer = useCallback(
  (cb: () => void, time?: number) => {
   clearTimer();
   timeoutId.current = setTimeout(() => {
    cb();
   }, time || 500);
  },
  [clearTimer]
 );

 const queueTimer = useCallback(
  ({
   cb,
   id,
   time,
  }: {
   cb: () => void;
   id: number | string;
   time?: number;
  }) => {
   const queueTimeoutId = timerIdsQueue.current.get(id);
   if (queueTimeoutId) {
    clearTimeout(queueTimeoutId);
   }
   timerIdsQueue.current.set(
    id,
    setTimeout(() => cb(), time || 400)
   );
  },
  []
 );

 useEffect(() => {
  return () => {
   if (timeoutId.current) {
    clearTimeout(timeoutId.current);
   }
  };
 }, []);
 return { startTimer, timeoutId, clearTimer, queueTimer };
};

export { useTimer };
