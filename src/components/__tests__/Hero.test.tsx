import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from '../Hero';
import { Movie } from '../../types/movie';

describe('Hero Component', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Hero Movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    overview: 'This is a test movie overview for the hero section. It provides information about the featured movie.',
    release_date: '2023-01-01',
    vote_average: 8.5,
    genre_ids: [28, 12]
  };

  const mockOnDetailsClick = vi.fn();

  it('renders the movie title', () => {
    render(<Hero movie={mockMovie} onDetailsClick={mockOnDetailsClick} />);
    expect(screen.getByText('Test Hero Movie')).toBeInTheDocument();
  });

  it('renders the movie overview', () => {
    render(<Hero movie={mockMovie} onDetailsClick={mockOnDetailsClick} />);
    expect(screen.getByText(/This is a test movie overview/)).toBeInTheDocument();
  });

  it('truncates long overviews', () => {
    const longOverviewMovie = {
      ...mockMovie,
      overview: 'A'.repeat(300) // Create a very long overview
    };
    
    render(<Hero movie={longOverviewMovie} onDetailsClick={mockOnDetailsClick} />);
    // Should be truncated to 200 characters + '...'
    expect(screen.getByText(/A{200}\.{3}/)).toBeInTheDocument();
  });

  it('calls onDetailsClick when More Info button is clicked', () => {
    render(<Hero movie={mockMovie} onDetailsClick={mockOnDetailsClick} />);
    
    const moreInfoButton = screen.getByText('More Info');
    fireEvent.click(moreInfoButton);
    
    expect(mockOnDetailsClick).toHaveBeenCalledWith(mockMovie);
  });

  it('calls onDetailsClick when Details button is clicked', () => {
    render(<Hero movie={mockMovie} onDetailsClick={mockOnDetailsClick} />);
    
    const detailsButton = screen.getByText('Details');
    fireEvent.click(detailsButton);
    
    expect(mockOnDetailsClick).toHaveBeenCalledWith(mockMovie);
  });

  it('renders with a background image', () => {
    render(<Hero movie={mockMovie} onDetailsClick={mockOnDetailsClick} />);
    
    const heroSection = screen.getByText('Test Hero Movie').closest('div');
    // Check if the element has a style attribute that includes the backdrop path
    expect(heroSection?.parentElement?.getAttribute('style')).toContain('test-backdrop.jpg');
  });
});
