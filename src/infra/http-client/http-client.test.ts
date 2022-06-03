import { faker } from '@faker-js/faker';
import { IHttpClient, IHttpClientResponse } from '@/data/protocols';
import { AxiosInstance, AxiosResponse } from 'axios';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';

const AxiosMock = mock<AxiosInstance>();

class HttpClient implements IHttpClient {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  async get<T>(path: string): Promise<IHttpClientResponse<T>> {
    const response = await this.axiosInstance.get(path);

    return {
      statusCode: response.status,
      data: response.data,
    };
  }
}

describe('HttpClient', () => {
  const path = faker.internet.url();
  const axiosResponse = {
    status: faker.datatype.number(),
    data: {},
  } as AxiosResponse;

  beforeEach(() => {
    reset(AxiosMock);
  });

  describe('get', () => {
    it('should call axios.get with correct path', async () => {
      const httpClient = new HttpClient(instance(AxiosMock));
      when(AxiosMock.get(anything())).thenResolve(anything());

      await httpClient.get(path);

      verify(AxiosMock.get(path)).once();
    });

    it('should return correct IHttpResponse', async () => {
      const httpClient = new HttpClient(instance(AxiosMock));
      when(AxiosMock.get(anything())).thenResolve(axiosResponse);

      const response = await httpClient.get(path);

      expect(response).toEqual({
        statusCode: axiosResponse.status,
        data: axiosResponse.data,
      });
    });
  });
});
