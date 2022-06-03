import { IHttpClient, IHttpClientResponse } from '@/data/protocols';
import { AxiosInstance } from 'axios';

export class HttpClient implements IHttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async get<T>(path: string): Promise<IHttpClientResponse<T>> {
    const response = await this.axiosInstance.get(path);

    return {
      statusCode: response.status,
      data: response.data,
    };
  }
}
