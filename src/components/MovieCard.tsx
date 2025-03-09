import React from 'react';
import { Movie } from '../types/movie';
import { MovieCard as StyledMovieCard, MoviePoster, MovieTitle } from './styles/StyledComponents';
import { getPosterUrl, PosterSize } from '../utils/imageUtils';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imageUrl = getPosterUrl(movie.poster_path, PosterSize.LARGE);

  return (
    <StyledMovieCard onClick={() => onClick(movie)}>
      <MoviePoster src={imageUrl} alt={movie.title} />
      <MovieTitle>{movie.title}</MovieTitle>
    </StyledMovieCard>
  );
};

export default MovieCard;
