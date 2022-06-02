import { IPaginatedResult, IMovie } from '@/domain/entities';
import { Either } from 'fp-ts/lib/Either';

export interface IMovieRepository {
  all(): Promise<Either<Error, IPaginatedResult<IMovie[]>>>;
}
