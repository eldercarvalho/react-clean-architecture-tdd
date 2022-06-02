import { right, left } from 'fp-ts/lib/Either';
import { instance, mock, when, verify, reset } from 'ts-mockito';
import { ServerFailure } from '@/core/errors';
import { IMovieRepository } from '@/domain/repositories';
import { paginatedResultMock } from '@/domain/mocks';
import { GetMovies } from './get-movies';

const MoviesRespositoryMock = mock<IMovieRepository>();

describe('GetMovies', () => {
  beforeEach(() => {
    reset(MoviesRespositoryMock);
  });

  it('should return [IPaginagedResult] on right if data request is successful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    when(MoviesRespositoryMock.all()).thenResolve(right(paginatedResultMock));

    const result = await usecase.execute();

    expect(result).toStrictEqual(right(paginatedResultMock));
    verify(MoviesRespositoryMock.all()).once();
  });

  it('should return [Failure] on left if data request is unsuccessful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    const failure = new ServerFailure();
    when(MoviesRespositoryMock.all()).thenResolve(left(failure));

    const result = await usecase.execute();

    expect(result).toStrictEqual(left(failure));
    verify(MoviesRespositoryMock.all()).once();
  });
});
