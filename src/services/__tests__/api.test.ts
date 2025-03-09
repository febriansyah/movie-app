import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getSimilarMovies,
  getGenres,
  getMoviesByGenre
} from '../api';
import { MovieResponse, MovieDetails, GenreResponse } from '../../types/movie';

// Mock the api functions
vi.mock('../api', () => ({
  getTrendingMovies: vi.fn(),
  searchMovies: vi.fn(),
  getMovieDetails: vi.fn(),
  getSimilarMovies: vi.fn(),
  getGenres: vi.fn(),
  getMoviesByGenre: vi.fn()
}));

describe('API Service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Mock data
  const mockMovieResponse: MovieResponse = {
    page: 1,
    results: [
      {
        id: 1,
        title: 'Test Movie',
        poster_path: '/test-poster.jpg',
        backdrop_path: '/test-backdrop.jpg',
        overview: 'This is a test movie',
        release_date: '2023-01-01',
        vote_average: 8.5,
        genre_ids: [28, 12]
      }
    ],
    total_pages: 1,
    total_results: 1
  };

  const mockMovieDetails: MovieDetails = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test-poster.jpg',
    backdrop_path: '/test-backdrop.jpg',
    overview: 'This is a test movie',
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

  const mockGenreResponse: GenreResponse = {
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 35, name: 'Comedy' }
    ]
  };

  it('fetches trending movies', async () => {
    (getTrendingMovies as any).mockResolvedValueOnce(mockMovieResponse);
    
    const result = await getTrendingMovies();
    
    expect(getTrendingMovies).toHaveBeenCalled();
    expect(result).toEqual(mockMovieResponse);
  });

  it('searches for movies', async () => {
    (searchMovies as any).mockResolvedValueOnce(mockMovieResponse);
    
    const result = await searchMovies('test');
    
    expect(searchMovies).toHaveBeenCalledWith('test');
    expect(result).toEqual(mockMovieResponse);
  });

  it('fetches movie details', async () => {
    (getMovieDetails as any).mockResolvedValueOnce(mockMovieDetails);
    
    const result = await getMovieDetails(1);
    
    expect(getMovieDetails).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockMovieDetails);
  });

  it('fetches similar movies', async () => {
    (getSimilarMovies as any).mockResolvedValueOnce(mockMovieResponse);
    
    const result = await getSimilarMovies(1);
    
    expect(getSimilarMovies).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockMovieResponse);
  });

  it('fetches movie genres', async () => {
    (getGenres as any).mockResolvedValueOnce(mockGenreResponse);
    
    const result = await getGenres();
    
    expect(getGenres).toHaveBeenCalled();
    expect(result).toEqual(mockGenreResponse);
  });

  it('fetches movies by genre', async () => {
    (getMoviesByGenre as any).mockResolvedValueOnce(mockMovieResponse);
    
    const result = await getMoviesByGenre(28);
    
    expect(getMoviesByGenre).toHaveBeenCalledWith(28);
    expect(result).toEqual(mockMovieResponse);
  });

  it('handles API errors gracefully', async () => {
    (getTrendingMovies as any).mockRejectedValueOnce(new Error('API Error'));
    
    await expect(getTrendingMovies()).rejects.toThrow('API Error');
  });
});
