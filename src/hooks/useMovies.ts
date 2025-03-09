import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getSimilarMovies,
  getGenres,
  getMoviesByGenre,
} from '../services/api';

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['trendingMovies'],
    queryFn: getTrendingMovies,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
};

export const useMovieDetails = (id: number | null) => {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });
};

export const useSimilarMovies = (id: number | null) => {
  return useQuery({
    queryKey: ['similarMovies', id],
    queryFn: () => getSimilarMovies(id!),
    enabled: !!id,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};

export const useMoviesByGenre = (genreId: number | null) => {
  return useQuery({
    queryKey: ['moviesByGenre', genreId],
    queryFn: () => getMoviesByGenre(genreId!),
    enabled: !!genreId,
  });
};
