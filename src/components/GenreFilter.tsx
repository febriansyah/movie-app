import React from 'react';
import { Genre } from '../types/movie';

interface GenreFilterProps {
  genres: Genre[] | undefined;
  selectedGenre: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  selectedGenre, 
  onSelectGenre 
}) => {
  if (!genres || genres.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 my-4">
      <button 
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedGenre === null ? 'bg-primary text-white' : 'bg-overlay text-text-secondary hover:bg-overlay/80'}`}
        onClick={() => onSelectGenre(null)}
      >
        All
      </button>
      {genres.map(genre => (
        <button 
          key={genre.id} 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedGenre === genre.id ? 'bg-primary text-white' : 'bg-overlay text-text-secondary hover:bg-overlay/80'}`}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
