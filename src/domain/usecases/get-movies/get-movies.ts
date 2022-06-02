import { Failure } from '@/core/errors';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMovieRepository } from '@/domain/repositories';
import { Either } from 'fp-ts/lib/Either';

export class GetMovies {
  constructor(private readonly moviesRepository: IMovieRepository) {}

  async execute(): Promise<Either<Failure, IPaginatedResult<IMovie[]>>> {
    const result = await this.moviesRepository.all();
    return result;
  }
}
