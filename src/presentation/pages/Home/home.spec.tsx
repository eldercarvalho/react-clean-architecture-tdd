import { render, screen, waitFor } from '@testing-library/react';
import { instance, mock, verify, when } from 'ts-mockito';
import { IUsecase } from '@/core';
import { IMovie, IPaginatedResult } from '@/domain/entities';
import { paginatedResultMock } from '@/domain/mocks';
import { right } from 'fp-ts/Either';
import { Home } from './home';

const MockGetMovies = mock<IUsecase<never, IPaginatedResult<IMovie[]>>>();

describe('HomePage', () => {
  test('show grid of movies after fetching movies', async () => {
    when(MockGetMovies.execute()).thenResolve(right(paginatedResultMock));
    render(<Home getMovies={instance(MockGetMovies)} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    verify(MockGetMovies.execute()).once();

    await waitFor(() =>
      expect(screen.getAllByRole('article')).toHaveLength(paginatedResultMock.results.length),
    );
  });
});
