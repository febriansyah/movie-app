import React from 'react';
import { Movie } from '../types/movie';
import { getBackdropUrl, BackdropSize } from '../utils/imageUtils';

interface HeroProps {
  movie: Movie;
  onDetailsClick: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onDetailsClick }) => {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, BackdropSize.ORIGINAL);

  return (
    <section 
      className="relative h-[80vh] w-full bg-cover bg-center bg-no-repeat" 
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg text-text-secondary mb-6">
          {movie.overview.length > 200
            ? `${movie.overview.substring(0, 200)}...`
            : movie.overview}
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onDetailsClick(movie)}
            className="flex items-center gap-2 bg-primary hover:bg-opacity-80 text-white px-6 py-2 rounded transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            More Info
          </button>
          <button 
            onClick={() => onDetailsClick(movie)}
            className="flex items-center gap-2 bg-overlay hover:bg-opacity-80 text-white px-6 py-2 rounded transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V7L16 12L11 17Z" fill="currentColor" />
            </svg>
            Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
