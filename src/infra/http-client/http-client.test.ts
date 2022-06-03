import { faker } from '@faker-js/faker';
import { AxiosInstance, AxiosResponse } from 'axios';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { HttpClient } from './http-client';

const AxiosMock = mock<AxiosInstance>();

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
