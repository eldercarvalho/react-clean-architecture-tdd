import { MovieRepository } from '@/data/repositories';
import { HttpService } from '@/data/services';
import { GetMovies } from '@/domain/usecases';
import { HttpClient } from '@/infra/http-client/http-client';
import { Home } from '@/presentation/pages/Home';
import axios from 'axios';

export const makeHomePage = () => {
  const axiosInstance = axios.create();
  const httpClient = new HttpClient(axiosInstance);
  const httpService = new HttpService(httpClient);
  const movieRepository = new MovieRepository(httpService);
  const getMovies = new GetMovies(movieRepository);

  return <Home getMovies={getMovies} />;
};
