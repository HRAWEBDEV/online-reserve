import axios from 'axios';

const axiosBaseConfig = axios.create({
 baseURL: process.env.NEXT_PUBLIC_ONLINE_RESERVE_API_URI,
});

export { axiosBaseConfig as axios };
