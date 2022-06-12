import { GetMovies } from '@/domain/usecases';
import { makeMovieRepository } from '../../data/movie-repository-factory';

export const makeGetMovies = () => {
  const movieRepository = makeMovieRepository();
  return new GetMovies(movieRepository);
};
