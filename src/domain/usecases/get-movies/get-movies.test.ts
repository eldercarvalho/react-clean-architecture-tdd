import { right, left } from 'fp-ts/lib/Either';
import { instance, mock, when, verify, reset } from 'ts-mockito';
import { ServerFailure } from '@/core/errors';
import { IMoviesRepository } from '@/domain/repositories';
import { paginatedResult } from '@/domain/mocks';
import { GetMovies } from './get-movies';

const MoviesRespositoryMock = mock<IMoviesRepository>();

describe('GetMovies', () => {
  beforeEach(() => {
    reset(MoviesRespositoryMock);
  });

  it('should return [IPaginagedResult] on right if data request is successful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    when(MoviesRespositoryMock.getMovies()).thenResolve(right(paginatedResult));

    const result = await usecase.execute();

    expect(result).toStrictEqual(right(paginatedResult));
    verify(MoviesRespositoryMock.getMovies()).once();
  });

  it('should return [Failure] on left if data request is unsuccessful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    const failure = new ServerFailure();
    when(MoviesRespositoryMock.getMovies()).thenResolve(left(failure));

    const result = await usecase.execute();

    expect(result).toStrictEqual(left(failure));
    verify(MoviesRespositoryMock.getMovies()).once();
  });
});
