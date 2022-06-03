import { IHttpClient, IHttpClientResponse } from '@/data/protocols';
import { AxiosInstance } from 'axios';

export class HttpClient implements IHttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {
    this.axiosInstance.defaults.baseURL = 'https://api.themoviedb.org/3';
    this.axiosInstance.defaults.params = {
      api_key: 'a188c505472d557d08c1cc8bc7c0ea10',
    };
  }

  async get<T>(path: string): Promise<IHttpClientResponse<T>> {
    const response = await this.axiosInstance.get(path);

    return {
      statusCode: response.status,
      data: response.data,
    };
  }
}
