import { IHttpClient } from '@/data/protocols';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { AppError, NotFoundError, UnauthorizedError } from '@/domain/errors';
import { paginatedResultMock } from '@/domain/mocks';
import { anything, instance, mock, reset, verify, when } from 'ts-mockito';
import { IHttpService } from './http-service';

const HttpClientMock = mock<IHttpClient>();

class HttpService implements IHttpService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getMovies(): Promise<IPaginatedResult<IMovie[]>> {
    const response = await this.httpClient.get<IPaginatedResult<IMovie[]>>('/movie/popular');

    switch (response.statusCode) {
      case 200:
        return response.data;
      case 401:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError();
      default:
        throw new AppError();
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

      await expect(httpService.getMovies()).rejects.toThrow(new UnauthorizedError());
    });

    it('should throw a UnauthorizedError if request status code is 404', async () => {
      const httpService = new HttpService(instance(HttpClientMock));
      when(HttpClientMock.get<IPaginatedResult<IMovie[]>>(anything())).thenResolve({
        statusCode: 404,
        data: {} as IPaginatedResult<IMovie[]>,
      });

      await expect(httpService.getMovies()).rejects.toThrow(new NotFoundError());
    });

    it('should throw a AppError if request status code is 500 or other', async () => {
      const httpService = new HttpService(instance(HttpClientMock));
      when(HttpClientMock.get<IPaginatedResult<IMovie[]>>(anything())).thenResolve({
        statusCode: 500,
        data: {} as IPaginatedResult<IMovie[]>,
      });

      await expect(httpService.getMovies()).rejects.toThrow(new AppError());
    });
  });
});
