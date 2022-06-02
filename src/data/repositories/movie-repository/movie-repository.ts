import { Failure, ServerFailure } from '@/core/errors';
import { IHttpService } from '@/data/services';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMovieRepository } from '@/domain/repositories';
import { Either, left, right } from 'fp-ts/lib/Either';

export class MovieRepository implements IMovieRepository {
  private readonly path = '/movies/popular';

  constructor(private readonly httpService: IHttpService) {}
  async all(): Promise<Either<Failure, IPaginatedResult<IMovie[]>>> {
    try {
      const result = await this.httpService.getMovies();
      return right(result);
    } catch (e) {
      return left(new ServerFailure());
    }
  }
}
