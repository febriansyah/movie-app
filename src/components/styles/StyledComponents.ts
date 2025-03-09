import styled from 'styled-components';

// Layout components
export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  transition: background-color 0.3s ease;

  &.scrolled {
    background-color: var(--background);
  }
`;

export const Logo = styled.div`
  color: var(--primary);
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

export const Main = styled.main`
  padding-top: 70px;
`;

export const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  color: var(--text-secondary);
  margin-top: 50px;
`;

// Movie components
export const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const MovieCard = styled.div`
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
  }
`;

export const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const MovieTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MovieRow = styled.div`
  margin: 40px 0;
`;

export const MovieRowTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

export const MovieCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }
`;

export const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  margin-right: 16px;
`;

// Search components
export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: var(--overlay);
  color: var(--text-primary);
  font-size: 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.2rem;
`;

// Modal components
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: var(--secondary);
  border-radius: 8px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--overlay);
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const MovieDetailsBanner = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(20, 20, 20, 1) 100%);
  }
`;

export const MovieDetailsContent = styled.div`
  padding: 20px;
`;

export const MovieDetailsTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const MovieDetailsInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const MovieDetailsOverview = styled.p`
  margin-bottom: 20px;
  color: var(--text-secondary);
`;

export const GenreTag = styled.span`
  background-color: var(--primary);
  color: var(--text-primary);
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
`;

// Filter components
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? 'var(--primary)' : 'var(--overlay)'};
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--primary);
  }
`;

// Loading and error components
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px;
  color: var(--text-secondary);
`;

export const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Hero section
export const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  background-size: cover;
  background-position: center;
  margin-bottom: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

export const HeroContent = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50px;
  max-width: 600px;
  
  @media (max-width: 768px) {
    left: 20px;
    bottom: 50px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroOverview = styled.p`
  font-size: 1.2rem;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const HeroButton = styled.button`
  background-color: var(--primary);
  color: var(--text-primary);
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 16px;
  display: inline-flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
  
  &:hover {
    background-color: #c30710;
  }
`;

export const HeroSecondaryButton = styled(HeroButton)`
  background-color: rgba(109, 109, 110, 0.7);
  
  &:hover {
    background-color: rgba(109, 109, 110, 0.9);
  }
`;
