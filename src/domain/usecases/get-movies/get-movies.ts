import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMovieRepository } from '@/domain/repositories';
import { Either } from 'fp-ts/lib/Either';
import { IUsecase } from '@/core';

export class GetMovies implements IUsecase<never, IPaginatedResult<IMovie[]>> {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(): Promise<Either<Error, IPaginatedResult<IMovie[]>>> {
    const result = await this.movieRepository.all();
    return result;
  }
}
