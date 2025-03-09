import React from 'react';
import { Movie } from '../types/movie';
import { 
  HeroSection, 
  HeroContent, 
  HeroTitle, 
  HeroOverview, 
  HeroButton,
  HeroSecondaryButton
} from './styles/StyledComponents';
import { getBackdropUrl, BackdropSize } from '../utils/imageUtils';

interface HeroProps {
  movie: Movie;
  onDetailsClick: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onDetailsClick }) => {
  const backdropUrl = getBackdropUrl(movie.backdrop_path, BackdropSize.ORIGINAL);

  return (
    <HeroSection style={{ backgroundImage: `url(${backdropUrl})` }}>
      <HeroContent>
        <HeroTitle>{movie.title}</HeroTitle>
        <HeroOverview>
          {movie.overview.length > 200
            ? `${movie.overview.substring(0, 200)}...`
            : movie.overview}
        </HeroOverview>
        <div>
          <HeroButton onClick={() => onDetailsClick(movie)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
            More Info
          </HeroButton>
          <HeroSecondaryButton onClick={() => onDetailsClick(movie)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V7L16 12L11 17Z" fill="currentColor" />
            </svg>
            Details
          </HeroSecondaryButton>
        </div>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
