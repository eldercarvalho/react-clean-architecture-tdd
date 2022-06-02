import { IMovie, IPaginatedResult } from '@/domain/entities';
import { IMovieRepository } from '@/domain/repositories';
import { Either } from 'fp-ts/lib/Either';

export class GetMovies {
  constructor(private readonly movieRepository: IMovieRepository) {}

  async execute(): Promise<Either<Error, IPaginatedResult<IMovie[]>>> {
    const result = await this.movieRepository.all();
    return result;
  }
}
