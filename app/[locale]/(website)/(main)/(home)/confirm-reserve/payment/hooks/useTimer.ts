import { useState, useEffect, useCallback } from 'react';

interface TimerState {
 minutes: number;
 seconds: number;
 isRunning: boolean;
}

interface UseTimerReturn extends TimerState {
 startTimer: () => void;
 pauseTimer: () => void;
 resetTimer: () => void;
}

export function useTimer(initialSeconds: number): UseTimerReturn {
 const [timerState, setTimerState] = useState<TimerState>({
  minutes: Math.floor(initialSeconds / 60),
  seconds: initialSeconds % 60,
  isRunning: false,
 });

 const updateTimer = useCallback(() => {
  setTimerState((prev) => {
   if (prev.minutes === 0 && prev.seconds === 0) {
    return { ...prev, isRunning: false };
   }

   let newSeconds = prev.seconds - 1;
   let newMinutes = prev.minutes;

   if (newSeconds < 0) {
    newMinutes -= 1;
    newSeconds = 59;
   }

   return {
    minutes: newMinutes,
    seconds: newSeconds,
    isRunning: true,
   };
  });
 }, []);

 useEffect(() => {
  let intervalId: NodeJS.Timeout;
  if (timerState.isRunning) {
   intervalId = setInterval(updateTimer, 1000);
  }
  return () => {
   if (intervalId) {
    clearInterval(intervalId);
   }
  };
 }, [timerState.isRunning, updateTimer]);

 const startTimer = useCallback(() => {
  setTimerState((prev) => ({ ...prev, isRunning: true }));
 }, []);

 const pauseTimer = useCallback(() => {
  setTimerState((prev) => ({ ...prev, isRunning: false }));
 }, []);

 const resetTimer = useCallback(() => {
  setTimerState({
   minutes: Math.floor(initialSeconds / 60),
   seconds: initialSeconds % 60,
   isRunning: false,
  });
 }, [initialSeconds]);

 return {
  ...timerState,
  startTimer,
  pauseTimer,
  resetTimer,
 };
}
