import React from 'react';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';
import { 
  MovieRow as StyledMovieRow, 
  MovieRowTitle, 
  MovieCarousel, 
  CarouselItem,
  Spinner,
  ErrorContainer
} from './styles/StyledComponents';

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
      <StyledMovieRow>
        <MovieRowTitle>{title}</MovieRowTitle>
        <Spinner />
      </StyledMovieRow>
    );
  }

  if (isError) {
    return (
      <StyledMovieRow>
        <MovieRowTitle>{title}</MovieRowTitle>
        <ErrorContainer>Error loading movies</ErrorContainer>
      </StyledMovieRow>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <StyledMovieRow>
        <MovieRowTitle>{title}</MovieRowTitle>
        <ErrorContainer>No movies found</ErrorContainer>
      </StyledMovieRow>
    );
  }

  return (
    <StyledMovieRow>
      <MovieRowTitle>{title}</MovieRowTitle>
      <MovieCarousel>
        {movies.map(movie => (
          <CarouselItem key={movie.id}>
            <MovieCard movie={movie} onClick={onMovieClick} />
          </CarouselItem>
        ))}
      </MovieCarousel>
    </StyledMovieRow>
  );
};

export default MovieRow;
