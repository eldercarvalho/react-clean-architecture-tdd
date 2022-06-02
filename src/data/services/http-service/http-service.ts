import { IHttpClient } from '@/data/protocols';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { AppError, NotFoundError, UnauthorizedError } from '@/domain/errors';

export interface IHttpService {
  getMovies(): Promise<IPaginatedResult<IMovie[]>>;
}

export class HttpService implements IHttpService {
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
