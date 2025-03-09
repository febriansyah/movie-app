import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieDetails from '../MovieDetails';
import { MovieDetails as MovieDetailsType } from '../../types/movie';

describe('MovieDetails Component', () => {
  const mockMovieDetails: MovieDetailsType = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    overview: 'This is a test movie overview',
    release_date: '2023-01-01',
    vote_average: 8.5,
    genre_ids: [28, 12],
    genres: [{ id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }],
    runtime: 120,
    tagline: 'Test tagline',
    status: 'Released',
    budget: 1000000,
    revenue: 5000000,
    homepage: 'https://test-movie.com'
  };

  const mockOnClose = vi.fn();

  it('renders loading spinner when isLoading is true', () => {
    render(
      <MovieDetails 
        movie={undefined} 
        isLoading={true} 
        isError={false} 
        onClose={mockOnClose} 
      />
    );
    
    // Find the spinner by its class name instead of role
    const spinnerElement = document.querySelector('.sc-bCjwNj');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('renders error message when isError is true', () => {
    render(
      <MovieDetails 
        movie={undefined} 
        isLoading={false} 
        isError={true} 
        onClose={mockOnClose} 
      />
    );
    
    expect(screen.getByText('Error loading movie details')).toBeInTheDocument();
  });

  it('renders error message when movie is undefined', () => {
    render(
      <MovieDetails 
        movie={undefined} 
        isLoading={false} 
        isError={false} 
        onClose={mockOnClose} 
      />
    );
    
    expect(screen.getByText('Error loading movie details')).toBeInTheDocument();
  });

  it('renders movie details correctly', () => {
    render(
      <MovieDetails 
        movie={mockMovieDetails} 
        isLoading={false} 
        isError={false} 
        onClose={mockOnClose} 
      />
    );
    
    expect(screen.getByText('Test Movie (2023)')).toBeInTheDocument();
    expect(screen.getByText('Rating: 8.5/10')).toBeInTheDocument();
    expect(screen.getByText('2h 0m')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('"Test tagline"')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument();
    expect(screen.getByText('Status: Released')).toBeInTheDocument();
    expect(screen.getByText('Budget: $1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Revenue: $5,000,000')).toBeInTheDocument();
    expect(screen.getByText('Official Website')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <MovieDetails 
        movie={mockMovieDetails} 
        isLoading={false} 
        isError={false} 
        onClose={mockOnClose} 
      />
    );
    
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside the modal', () => {
    render(
      <MovieDetails 
        movie={mockMovieDetails} 
        isLoading={false} 
        isError={false} 
        onClose={mockOnClose} 
      />
    );
    
    // The modal overlay is the parent element
    const modalOverlay = screen.getByText('Test Movie (2023)').parentElement?.parentElement?.parentElement;
    if (modalOverlay) {
      fireEvent.click(modalOverlay);
      expect(mockOnClose).toHaveBeenCalled();
    }
  });
});
