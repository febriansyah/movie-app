import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onMovieClick: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ 
  title, 
  movies, 
  isLoading, 
  isError, 
  onMovieClick 
}) => {
  if (isLoading) {
    return (
      <div className="my-10">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-10">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="text-center p-6 bg-overlay rounded-md text-text-secondary">
          Error loading movies
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="my-10">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="text-center p-6 bg-overlay rounded-md text-text-secondary">
          No movies found
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="flex overflow-x-auto pb-2.5 pt-2.5 scroll-smooth">
        {movies.map(movie => (
          <div key={movie.id} className="flex-none w-[200px] mr-4">
            <MovieCard movie={movie} onClick={onMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
