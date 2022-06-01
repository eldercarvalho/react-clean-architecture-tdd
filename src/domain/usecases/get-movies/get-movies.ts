import { Failure } from '@/core/errors';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMoviesRepository } from '@/domain/repositories';
import { Either } from 'fp-ts/lib/Either';

export class GetMovies {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  async execute(): Promise<Either<Failure, IPaginatedResult<IMovie[]>>> {
    const result = await this.moviesRepository.getMovies();
    return result;
  }
}
