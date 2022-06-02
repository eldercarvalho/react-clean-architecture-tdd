import { IMovie, IPaginatedResult } from '@/domain/entities';

export interface IHttpService {
  getMovies(): Promise<IPaginatedResult<IMovie[]>>;
}
