import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMovieRepository } from '@/domain/repositories';
import { Either } from 'fp-ts/lib/Either';
import { IUsecase } from '@/core';

export interface IGetMovies extends IUsecase<undefined, IPaginatedResult<IMovie[]>> {}

export class GetMovies implements IGetMovies {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(): Promise<Either<Error, IPaginatedResult<IMovie[]>>> {
    const result = await this.movieRepository.all();
    return result;
  }
}
