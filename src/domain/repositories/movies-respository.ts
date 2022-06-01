import { Failure } from '@/core/errors';
import { IPaginatedResult, IMovie } from '@/domain/entities';
import { Either } from 'fp-ts/lib/Either';

export interface IMoviesRepository {
  getMovies(): Promise<Either<Failure, IPaginatedResult<IMovie[]>>>;
}
