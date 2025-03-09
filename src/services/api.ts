import axios from 'axios';
import { MovieResponse, MovieDetails, GenreResponse } from '../types/movie';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  params: {
    language: 'en-US',
  },
});

// Get trending movies
export const getTrendingMovies = async (): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>('/trending/movie/week');
  return response.data;
};

// Search for movies
export const searchMovies = async (query: string): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>('/search/movie', {
    params: { query },
  });
  return response.data;
};

// Get movie details
export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`);
  return response.data;
};

// Get similar movies
export const getSimilarMovies = async (id: number): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>(`/movie/${id}/similar`);
  return response.data;
};

// Get movie genres
export const getGenres = async (): Promise<GenreResponse> => {
  const response = await api.get<GenreResponse>('/genre/movie/list');
  return response.data;
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>('/discover/movie', {
    params: { with_genres: genreId },
  });
  return response.data;
};

export default api;
