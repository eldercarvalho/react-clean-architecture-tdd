import { HttpClient } from '@/infra/http-client/http-client';
import axios from 'axios';

export const makeHttpClient = () => {
  const axiosInstance = axios.create();
  return new HttpClient(axiosInstance);
};
