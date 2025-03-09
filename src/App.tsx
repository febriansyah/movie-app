import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Movie, MovieDetails as MovieDetailsType } from './types/movie';
import { useTrendingMovies, useSearchMovies, useMovieDetails, useGenres, useMoviesByGenre } from './hooks/useMovies';
import MovieCard from './components/MovieCard';
import MovieRow from './components/MovieRow';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';
import GenreFilter from './components/GenreFilter';
import Hero from './components/Hero';

// Create a client
const queryClient = new QueryClient();

function MovieApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  // Fetch data using React Query
  const { data: trendingMovies, isLoading: isTrendingLoading, isError: isTrendingError } = useTrendingMovies();
  const { data: searchResults, isLoading: isSearchLoading, isError: isSearchError } = useSearchMovies(searchQuery);
  const { data: movieDetails, isLoading: isDetailsLoading, isError: isDetailsError } = useMovieDetails(selectedMovieId);
  const { data: genres } = useGenres();
  const { data: genreMovies, isLoading: isGenreLoading, isError: isGenreError } = useMoviesByGenre(selectedGenreId);

  // Handle scroll event for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle movie selection
  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.id);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedGenreId(null);
  };

  // Handle genre selection
  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenreId(genreId);
    setSearchQuery('');
  };

  // Close movie details modal
  const handleCloseDetails = () => {
    setSelectedMovieId(null);
  };

  // Determine which movies to display
  const displayMovies = searchQuery
    ? searchResults?.results
    : selectedGenreId
    ? genreMovies?.results
    : trendingMovies?.results;

  // Loading state
  const isLoading = isTrendingLoading || (searchQuery && isSearchLoading) || (selectedGenreId && isGenreLoading);

  // Error state
  const isError = isTrendingError || (searchQuery && isSearchError) || (selectedGenreId && isGenreError);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isHeaderScrolled ? 'bg-background shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-5 py-4 flex justify-between items-center w-full">
          <h1 
            className="text-2xl font-bold text-primary cursor-pointer" 
            onClick={() => { setSearchQuery(''); setSelectedGenreId(null); }}
          >
            MovieFlix
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="pt-16 min-h-screen bg-background text-text-primary">
        {/* Hero Section */}
        {!searchQuery && !selectedGenreId && trendingMovies?.results && trendingMovies.results.length > 0 && (
          <Hero movie={trendingMovies.results[0]} onDetailsClick={handleMovieClick} />
        )}

        <div className="max-w-[1400px] mx-auto px-5">
          {/* Genre Filter */}
          <GenreFilter 
            genres={genres?.genres} 
            selectedGenre={selectedGenreId} 
            onSelectGenre={handleGenreSelect} 
          />

          {/* Movie Grid Title */}
          <h2 className="text-2xl font-bold my-5">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedGenreId
              ? `${genres?.genres.find(g => g.id === selectedGenreId)?.name} Movies`
              : 'Trending Movies'}
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center p-6 bg-overlay rounded-md text-text-secondary my-4">
              <p>Oops! Something went wrong. Please try again later.</p>
            </div>
          )}

          {/* No Results */}
          {!isLoading && !isError && (!displayMovies || displayMovies.length === 0) && (
            <div className="text-center p-6 bg-overlay rounded-md text-text-secondary my-4">
              <p>No movies found. Try a different search or filter.</p>
            </div>
          )}

          {/* Movie Grid */}
          {!isLoading && !isError && displayMovies && displayMovies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6">
              {displayMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </div>
          )}

          {/* Movie Rows (only shown on home page) */}
          {!searchQuery && !selectedGenreId && (
            <>
              {trendingMovies?.results && trendingMovies.results.length > 0 && (
                <MovieRow
                  title="Popular This Week"
                  movies={trendingMovies.results.slice(1, 11)}
                  isLoading={isTrendingLoading}
                  isError={isTrendingError}
                  onMovieClick={handleMovieClick}
                />
              )}

              {genres?.genres && genres.genres.slice(0, 3).map(genre => (
                <MovieRow
                  key={genre.id}
                  title={`${genre.name} Movies`}
                  movies={trendingMovies?.results.filter(movie => movie.genre_ids.includes(genre.id))}
                  isLoading={isTrendingLoading}
                  isError={isTrendingError}
                  onMovieClick={handleMovieClick}
                />
              ))}
            </>
          )}
        </div>
      </main>

      <footer className="bg-secondary py-6 mt-10">
        <div className="max-w-[1400px] mx-auto px-5 text-center text-text-secondary">
          <p>© {new Date().getFullYear()} MovieFlix. Powered by The Movie Database API.</p>
        </div>
      </footer>

      {/* Movie Details Modal */}
      {selectedMovieId && (
        <MovieDetails
          movie={movieDetails as MovieDetailsType}
          isLoading={isDetailsLoading}
          isError={isDetailsError}
          onClose={handleCloseDetails}
        />
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MovieApp />
    </QueryClientProvider>
  );
}

export default App;
