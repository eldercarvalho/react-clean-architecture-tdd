import { IMovie } from '@/domain/entities';
import { IGetMovies } from '@/domain/usecases';
import { isRight } from 'fp-ts/lib/Either';
import React, { useEffect, useState } from 'react';

type HomeProps = {
  getMovies: IGetMovies; // eslint-disable-line
};

const Home = ({ getMovies }: HomeProps) => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMoviesWrapper = async () => {
      setIsLoading(true);
      const eitherResult = await getMovies.execute();
      setIsLoading(false);

      if (isRight(eitherResult)) {
        setMovies(eitherResult.right.results);
      }
    };

    getMoviesWrapper();
  }, []);

  return (
    <div className="wrapper">
      {isLoading ? (
        <div role="progressbar">Loading</div>
      ) : (
        movies.map((movie) => (
          <div key={movie.id} role="article">
            <h2>{movie.original_title}</h2>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
