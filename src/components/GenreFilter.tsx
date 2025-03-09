import React from 'react';
import { Genre } from '../types/movie';
import { FilterContainer, FilterButton } from './styles/StyledComponents';

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
    <FilterContainer>
      <FilterButton 
        active={selectedGenre === null} 
        onClick={() => onSelectGenre(null)}
      >
        All
      </FilterButton>
      {genres.map(genre => (
        <FilterButton 
          key={genre.id} 
          active={selectedGenre === genre.id} 
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default GenreFilter;
