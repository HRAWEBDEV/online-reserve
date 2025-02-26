'use client';
import { useEffect } from 'react';
import { axios } from './axiosBaseConfig';
import { getOttToken } from '@/app/utils/auth';

export default function AxiosInterceptor() {
 useEffect(() => {
  const requestInterceptor = axios.interceptors.request.use((config) => {
   config.headers.set('x-token', process.env.NEXT_PUBLIC_X_AUTH);
   config.headers.set('x-ott', getOttToken() || '');
   return config;
  });
  return () => {
   axios.interceptors.request.eject(requestInterceptor);
  };
 }, []);
 return <></>;
}
