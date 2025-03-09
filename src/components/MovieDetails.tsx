import React from 'react';
import { MovieDetails as MovieDetailsType, Genre } from '../types/movie';
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
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000]" onClick={onClose}>
        <div 
          className="bg-secondary rounded-lg w-[90%] max-w-[900px] max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-2.5 right-2.5 bg-overlay border-none text-text-primary text-2xl w-10 h-10 rounded-full flex justify-center items-center z-10"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000]" onClick={onClose}>
        <div 
          className="bg-secondary rounded-lg w-[90%] max-w-[900px] max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-2.5 right-2.5 bg-overlay border-none text-text-primary text-2xl w-10 h-10 rounded-full flex justify-center items-center z-10"
            onClick={onClose}
          >
            ✕
          </button>
          <div className="text-center p-6 bg-overlay rounded-md text-text-secondary m-4">
            Error loading movie details
          </div>
        </div>
      </div>
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
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-[1000]" onClick={onClose}>
      <div 
        className="bg-secondary rounded-lg w-[90%] max-w-[900px] max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-2.5 right-2.5 bg-overlay border-none text-text-primary text-2xl w-10 h-10 rounded-full flex justify-center items-center z-10"
          onClick={onClose}
        >
          ✕
        </button>
        
        <div 
          className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backdropUrl})` }} 
        />
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{movie.title} ({releaseYear})</h1>
          
          <div className="flex flex-wrap gap-4 mb-6 text-text-secondary">
            <div>Rating: {movie.vote_average.toFixed(1)}/10</div>
            {movie.runtime && <div>{formatRuntime(movie.runtime)}</div>}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: Genre) => (
                <span 
                  key={genre.id}
                  className="inline-block bg-overlay px-2 py-1 rounded text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
          
          {movie.tagline && (
            <p className="italic mb-5 text-text-secondary">
              "{movie.tagline}"
            </p>
          )}
          
          <h3 className="text-xl font-bold mb-2">Overview</h3>
          <p className="mb-6 leading-relaxed text-text-secondary">{movie.overview}</p>
          
          <div className="border-t border-overlay pt-4">
            <h3 className="text-xl font-bold mb-2">Details</h3>
            <p className="mb-2">Status: {movie.status}</p>
            {movie.budget > 0 && <p className="mb-2">Budget: ${movie.budget.toLocaleString()}</p>}
            {movie.revenue > 0 && <p className="mb-2">Revenue: ${movie.revenue.toLocaleString()}</p>}
            {movie.homepage && (
              <p>
                <a 
                  href={movie.homepage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Official Website
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
