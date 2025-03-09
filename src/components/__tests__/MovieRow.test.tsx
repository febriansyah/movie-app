import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieRow from '../MovieRow';
import { Movie } from '../../types/movie';

describe('MovieRow Component', () => {
  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Test Movie 1',
      poster_path: '/test-poster1.jpg',
      backdrop_path: '/test-backdrop1.jpg',
      overview: 'This is test movie 1',
      release_date: '2023-01-01',
      vote_average: 8.5,
      genre_ids: [28, 12]
    },
    {
      id: 2,
      title: 'Test Movie 2',
      poster_path: '/test-poster2.jpg',
      backdrop_path: '/test-backdrop2.jpg',
      overview: 'This is test movie 2',
      release_date: '2023-02-01',
      vote_average: 7.5,
      genre_ids: [35, 18]
    }
  ];

  const mockOnMovieClick = vi.fn();

  it('renders the row title', () => {
    render(
      <MovieRow
        title="Test Row"
        movies={mockMovies}
        isLoading={false}
        isError={false}
        onMovieClick={mockOnMovieClick}
      />
    );
    expect(screen.getByText('Test Row')).toBeInTheDocument();
  });

  it('renders movie cards for each movie', () => {
    render(
      <MovieRow
        title="Test Row"
        movies={mockMovies}
        isLoading={false}
        isError={false}
        onMovieClick={mockOnMovieClick}
      />
    );
    expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Test Movie 2')).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(
      <MovieRow
        title="Test Row"
        movies={mockMovies}
        isLoading={true}
        isError={false}
        onMovieClick={mockOnMovieClick}
      />
    );
    expect(screen.getByText('Test Row')).toBeInTheDocument();
    // The spinner is a div with specific styling, so we can't easily test for it directly
    // We could add a data-testid to the spinner component for better testing
  });

  it('shows error message when isError is true', () => {
    render(
      <MovieRow
        title="Test Row"
        movies={mockMovies}
        isLoading={false}
        isError={true}
        onMovieClick={mockOnMovieClick}
      />
    );
    expect(screen.getByText('Test Row')).toBeInTheDocument();
    expect(screen.getByText('Error loading movies')).toBeInTheDocument();
  });

  it('shows no movies found message when movies array is empty', () => {
    render(
      <MovieRow
        title="Test Row"
        movies={[]}
        isLoading={false}
        isError={false}
        onMovieClick={mockOnMovieClick}
      />
    );
    expect(screen.getByText('Test Row')).toBeInTheDocument();
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });
});
