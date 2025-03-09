import React from 'react';
import { Movie } from '../types/movie';
import { getPosterUrl, PosterSize } from '../utils/imageUtils';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const imageUrl = getPosterUrl(movie.poster_path, PosterSize.LARGE);

  return (
    <div 
      className="relative rounded overflow-hidden transition-transform duration-300 cursor-pointer hover:scale-105 hover:z-10"
      onClick={() => onClick(movie)}
    >
      <img 
        className="w-full h-auto object-cover" 
        src={imageUrl} 
        alt={movie.title} 
      />
      <h3 className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent text-base whitespace-nowrap overflow-hidden text-ellipsis">
        {movie.title}
      </h3>
    </div>
  );
};

export default MovieCard;
