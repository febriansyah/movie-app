/**
 * Utility functions for handling image URLs from the MovieDB API
 */

/**
 * Base URL for MovieDB images
 */
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

/**
 * Available image sizes for posters
 */
export enum PosterSize {
  SMALL = 'w185',
  MEDIUM = 'w342',
  LARGE = 'w500',
  ORIGINAL = 'original'
}

/**
 * Available image sizes for backdrops
 */
export enum BackdropSize {
  SMALL = 'w300',
  MEDIUM = 'w780',
  LARGE = 'w1280',
  ORIGINAL = 'original'
}

/**
 * Get the full image URL for a poster
 * @param path The poster path from the MovieDB API
 * @param size The size of the poster
 * @returns The full image URL or a placeholder if path is empty
 */
export const getPosterUrl = (path: string | null | undefined, size: PosterSize = PosterSize.MEDIUM): string => {
  if (!path) {
    return 'https://via.placeholder.com/342x513?text=No+Image+Available';
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Get the full image URL for a backdrop
 * @param path The backdrop path from the MovieDB API
 * @param size The size of the backdrop
 * @returns The full image URL or a placeholder if path is empty
 */
export const getBackdropUrl = (path: string | null | undefined, size: BackdropSize = BackdropSize.LARGE): string => {
  if (!path) {
    return 'https://via.placeholder.com/1280x720?text=No+Image+Available';
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
