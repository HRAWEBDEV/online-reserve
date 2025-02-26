import { axios } from '@/app/services/axios/axiosBaseConfig';

const getHotelTokenApi = '/CRS/Public/GetHotelToken';

function getHotelToken({ signal }: { signal: AbortSignal }) {
 return axios.get<{ ott: string }>(`${getHotelTokenApi}?hotelID=${1}`, {
  signal,
 });
}

export { getHotelToken };
