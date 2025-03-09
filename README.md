# MovieFlix - Netflix-Style Movie Search App

A responsive movie search application built with React and TypeScript that allows users to search for movies using the MovieDB API. The app features a Netflix-style UI with movie rows, a search function, genre filtering, and detailed movie information.

![MovieFlix App Screenshot](screenshot.png)

## Features

- **Netflix-style UI**: Clean, modern interface inspired by Netflix
- **Movie Search**: Search for movies using the MovieDB API
- **Genre Filtering**: Filter movies by genre
- **Movie Details**: View detailed information about each movie
- **Responsive Design**: Works on desktop and mobile devices
- **Hero Section**: Featured movie showcase on the homepage
- **Movie Rows**: Horizontal scrollable rows of movies by category

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety
- **React Query**: Data fetching and caching
- **Styled Components**: Component-based styling
- **Vitest & React Testing Library**: Testing framework
- **MovieDB API**: Movie data source

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MovieDB API key (get it from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your MovieDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
   (You can copy from `.env.example` and replace with your actual API key)

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Running Tests

To run the tests:

```bash
npm test
# or
yarn test
```

To run tests in watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

To run tests with coverage:

```bash
npm run test:coverage
# or
yarn test:coverage
```

### Test Coverage

The project includes comprehensive test coverage for all major components and services:

- **Component Tests**: Tests for all UI components including Hero, MovieCard, MovieDetails, MovieRow, and SearchBar
- **Service Tests**: Tests for the API service functions that interact with the MovieDB API
- **Utility Tests**: Tests for utility functions like image URL formatting

All tests are currently passing, ensuring the application functions as expected.

## Project Structure

```
movie-app/
├── public/              # Public assets
├── src/
│   ├── assets/          # Images and other static assets
│   ├── components/      # React components
│   │   ├── __tests__/   # Component tests
│   │   └── styles/      # Styled components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .env.example         # Example environment variables
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Additional Features

- **Scroll-aware Header**: The header becomes opaque when scrolling down
- **Error Handling**: Graceful error states for API failures
- **Loading States**: Visual feedback during data loading
- **Placeholder Images**: Fallback for missing movie posters
- **Dynamic Movie Rows**: Movies are categorized by genre on the homepage

## Project Status

- ✅ All features implemented
- ✅ All tests passing
- ✅ Responsive design complete
- ✅ API integration complete

## Future Improvements

- Add user authentication
- Implement watchlist functionality
- Add pagination for search results
- Enhance filtering options (year, rating, etc.)
- Add movie trailers
- Implement dark/light theme toggle
- Add end-to-end tests with Cypress or Playwright

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- Netflix for UI inspiration
