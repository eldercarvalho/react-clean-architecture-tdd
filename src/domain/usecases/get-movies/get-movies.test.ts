import { right, left } from 'fp-ts/lib/Either';
import { instance, mock, when, verify, reset } from 'ts-mockito';
import { IMovieRepository } from '@/domain/repositories';
import { paginatedResultMock } from '@/domain/mocks';
import { AppError } from '@/domain/errors';
import { GetMovies } from './get-movies';

const MoviesRespositoryMock = mock<IMovieRepository>();

describe('GetMovies', () => {
  beforeEach(() => {
    reset(MoviesRespositoryMock);
  });

  it('should return IPaginagedResult on right if data request is successful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    when(MoviesRespositoryMock.all()).thenResolve(right(paginatedResultMock));

    const result = await usecase.execute();

    expect(result).toStrictEqual(right(paginatedResultMock));
    verify(MoviesRespositoryMock.all()).once();
  });

  it('should return an Error on left if data request is unsuccessful', async () => {
    const usecase = new GetMovies(instance(MoviesRespositoryMock));
    const error = new AppError();
    when(MoviesRespositoryMock.all()).thenResolve(left(error));

    const result = await usecase.execute();

    expect(result).toStrictEqual(left(error));
    verify(MoviesRespositoryMock.all()).once();
  });
});
