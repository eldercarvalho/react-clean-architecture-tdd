import { instance, mock, when, verify, reset } from 'ts-mockito';
import { left, right } from 'fp-ts/lib/Either';
import { IHttpService } from '@/data/services';
import { paginatedResultMock } from '@/domain/mocks';
import { ServerFailure } from '@/core/errors';
import { MovieRepository } from './movie-repository';

const HttpServiceMock = mock<IHttpService>();

describe('MovieRepository', () => {
  beforeEach(() => {
    reset(HttpServiceMock);
  });

  describe('all', () => {
    it('should return a PaginatedResult on right if api request is sucessful', async () => {
      const repository = new MovieRepository(instance(HttpServiceMock));
      when(HttpServiceMock.getMovies()).thenResolve(paginatedResultMock);

      const result = await repository.all();

      verify(HttpServiceMock.getMovies()).once();
      expect(result).toEqual(right(paginatedResultMock));
    });

    it('should return a PaginatedResult on right if api request is sucessful', async () => {
      const repository = new MovieRepository(instance(HttpServiceMock));
      when(HttpServiceMock.getMovies()).thenThrow(new Error('Deu pau'));

      const result = await repository.all();

      verify(HttpServiceMock.getMovies()).once();
      expect(result).toEqual(left(new ServerFailure()));
    });
  });
});
