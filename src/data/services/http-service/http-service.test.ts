import { IHttpClient } from '@/data/protocols';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { paginatedResultMock } from '@/domain/mocks';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { IHttpService } from './http-service';

const HttpClientMock = mock<IHttpClient>();

class HttpService implements IHttpService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getMovies(): Promise<IPaginatedResult<IMovie[]>> {
    const response = await this.httpClient.get<IPaginatedResult<IMovie[]>>('/movie/popular');

    switch (response.statusCode) {
      case 401:
        throw new Error();
      case 404:
        throw new Error();
      default:
        return response.data;
    }
  }
}

describe('HttpService', () => {
  beforeEach(() => {
    reset(HttpClientMock);
  });

  describe('getMovies', () => {
    it('should return a PaginatedResult if request is successful', async () => {
      const expectedResponse = {
        statusCode: 200,
        data: paginatedResultMock,
      };
      const httpService = new HttpService(instance(HttpClientMock));
      when(HttpClientMock.get<IPaginatedResult<IMovie[]>>(anything())).thenResolve(
        expectedResponse,
      );

      const response = await httpService.getMovies();

      verify(HttpClientMock.get('/movie/popular')).once();
      expect(response).toEqual(expectedResponse.data);
    });

    it('should throw a UnauthorizedError if request status code is 401', async () => {
      const httpService = new HttpService(instance(HttpClientMock));
      when(HttpClientMock.get<IPaginatedResult<IMovie[]>>(anything())).thenResolve({
        statusCode: 401,
        data: {} as IPaginatedResult<IMovie[]>,
      });

      await expect(httpService.getMovies()).rejects.toThrow(new Error());
    });

    it('should throw a UnauthorizedError if request status code is 404', async () => {
      const httpService = new HttpService(instance(HttpClientMock));
      when(HttpClientMock.get<IPaginatedResult<IMovie[]>>(anything())).thenResolve({
        statusCode: 404,
        data: {} as IPaginatedResult<IMovie[]>,
      });

      await expect(httpService.getMovies()).rejects.toThrow(new Error());
    });
  });
});
