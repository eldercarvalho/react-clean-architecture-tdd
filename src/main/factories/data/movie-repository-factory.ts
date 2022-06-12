import { MovieRepository } from '@/data/repositories';
import { makeHttpService } from './http-service-factory';

export const makeMovieRepository = () => {
  const httpService = makeHttpService();
  return new MovieRepository(httpService);
};
