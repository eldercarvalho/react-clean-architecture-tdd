import { HttpService } from '@/data/services';
import { makeHttpClient } from '../infra/http-client-factory';

export const makeHttpService = () => {
  const httpClient = makeHttpClient();
  return new HttpService(httpClient);
};
