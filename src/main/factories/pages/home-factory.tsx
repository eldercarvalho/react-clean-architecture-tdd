import { Home } from '@/presentation/pages/Home';
import { makeGetMovies } from '../domain/usecases/get-movies-factory';

export const makeHome = () => {
  const getMovies = makeGetMovies();

  return <Home getMovies={getMovies} />;
};
