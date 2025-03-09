import React from 'react';
import { MovieDetails as MovieDetailsType, Genre } from '../types/movie';
import { 
  ModalOverlay, 
  ModalContent, 
  ModalCloseButton, 
  MovieDetailsBanner, 
  MovieDetailsContent,
  MovieDetailsTitle,
  MovieDetailsInfo,
  MovieDetailsOverview,
  GenreTag,
  Spinner,
  ErrorContainer
} from './styles/StyledComponents';
import { getBackdropUrl, BackdropSize } from '../utils/imageUtils';

interface MovieDetailsProps {
  movie: MovieDetailsType | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ 
  movie, 
  isLoading, 
  isError, 
  onClose 
}) => {
  if (isLoading) {
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClick={onClose}>✕</ModalCloseButton>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
            <Spinner />
          </div>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (isError || !movie) {
    return (
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton onClick={onClose}>✕</ModalCloseButton>
          <ErrorContainer>Error loading movie details</ErrorContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, BackdropSize.ORIGINAL);

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>✕</ModalCloseButton>
        
        <MovieDetailsBanner style={{ backgroundImage: `url(${backdropUrl})` }} />
        
        <MovieDetailsContent>
          <MovieDetailsTitle>{movie.title} ({releaseYear})</MovieDetailsTitle>
          
          <MovieDetailsInfo>
            <div>Rating: {movie.vote_average.toFixed(1)}/10</div>
            {movie.runtime && <div>{formatRuntime(movie.runtime)}</div>}
            <div>
              {movie.genres.map((genre: Genre) => (
                <GenreTag key={genre.id}>{genre.name}</GenreTag>
              ))}
            </div>
          </MovieDetailsInfo>
          
          {movie.tagline && (
            <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>
              "{movie.tagline}"
            </p>
          )}
          
          <h3>Overview</h3>
          <MovieDetailsOverview>{movie.overview}</MovieDetailsOverview>
          
          <div>
            <h3>Details</h3>
            <p>Status: {movie.status}</p>
            {movie.budget > 0 && <p>Budget: ${movie.budget.toLocaleString()}</p>}
            {movie.revenue > 0 && <p>Revenue: ${movie.revenue.toLocaleString()}</p>}
            {movie.homepage && (
              <p>
                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                  Official Website
                </a>
              </p>
            )}
          </div>
        </MovieDetailsContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieDetails;
