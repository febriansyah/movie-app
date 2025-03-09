import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Movie, MovieDetails as MovieDetailsType } from './types/movie';
import { useTrendingMovies, useSearchMovies, useMovieDetails, useGenres, useMoviesByGenre } from './hooks/useMovies';
import GlobalStyles from './components/styles/GlobalStyles';
import {
  Container,
  Header,
  Logo,
  Main,
  Footer,
  MovieGrid,
  LoadingContainer,
  ErrorContainer,
  Spinner
} from './components/styles/StyledComponents';
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
      <GlobalStyles />
      <Header className={isHeaderScrolled ? 'scrolled' : ''}>
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Logo onClick={() => { setSearchQuery(''); setSelectedGenreId(null); }}>MovieFlix</Logo>
          <SearchBar onSearch={handleSearch} />
        </Container>
      </Header>

      <Main>
        {/* Hero Section */}
        {!searchQuery && !selectedGenreId && trendingMovies?.results && trendingMovies.results.length > 0 && (
          <Hero movie={trendingMovies.results[0]} onDetailsClick={handleMovieClick} />
        )}

        <Container>
          {/* Genre Filter */}
          <GenreFilter 
            genres={genres?.genres} 
            selectedGenre={selectedGenreId} 
            onSelectGenre={handleGenreSelect} 
          />

          {/* Movie Grid Title */}
          <h2 style={{ margin: '20px 0' }}>
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedGenreId
              ? `${genres?.genres.find(g => g.id === selectedGenreId)?.name} Movies`
              : 'Trending Movies'}
          </h2>

          {/* Loading State */}
          {isLoading && (
            <LoadingContainer>
              <Spinner />
            </LoadingContainer>
          )}

          {/* Error State */}
          {isError && (
            <ErrorContainer>
              <p>Oops! Something went wrong. Please try again later.</p>
            </ErrorContainer>
          )}

          {/* No Results */}
          {!isLoading && !isError && (!displayMovies || displayMovies.length === 0) && (
            <ErrorContainer>
              <p>No movies found. Try a different search or filter.</p>
            </ErrorContainer>
          )}

          {/* Movie Grid */}
          {!isLoading && !isError && displayMovies && displayMovies.length > 0 && (
            <MovieGrid>
              {displayMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </MovieGrid>
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
        </Container>
      </Main>

      <Footer>
        <Container>
          <p>© {new Date().getFullYear()} MovieFlix. Powered by The Movie Database API.</p>
        </Container>
      </Footer>

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
