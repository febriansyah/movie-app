import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from '../MovieCard';
import { Movie } from '../../types/movie';

describe('MovieCard Component', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    overview: 'This is a test movie',
    release_date: '2023-01-01',
    vote_average: 8.5,
    genre_ids: [28, 12]
  };

  const mockOnClick = vi.fn();

  it('renders the movie title', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders the movie poster with correct src', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);
    const posterImage = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(posterImage).toBeInTheDocument();
    expect(posterImage.src).toContain('https://image.tmdb.org/t/p/w500/test-poster.jpg');
  });

  it('uses placeholder image when poster_path is not available', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: '' };
    render(<MovieCard movie={movieWithoutPoster} onClick={mockOnClick} />);
    const posterImage = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(posterImage.src).toContain('placeholder');
  });

  it('calls onClick handler when clicked', () => {
    render(<MovieCard movie={mockMovie} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Test Movie'));
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });
});
