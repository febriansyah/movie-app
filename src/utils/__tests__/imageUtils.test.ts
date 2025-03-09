import { describe, it, expect } from 'vitest';
import { 
  getPosterUrl, 
  getBackdropUrl, 
  PosterSize, 
  BackdropSize, 
  IMAGE_BASE_URL 
} from '../imageUtils';

describe('Image Utility Functions', () => {
  describe('getPosterUrl', () => {
    it('returns the correct URL for a valid path with default size', () => {
      const path = '/test-poster.jpg';
      const expectedUrl = `${IMAGE_BASE_URL}/${PosterSize.MEDIUM}${path}`;
      expect(getPosterUrl(path)).toBe(expectedUrl);
    });

    it('returns the correct URL for a valid path with specified size', () => {
      const path = '/test-poster.jpg';
      const expectedUrl = `${IMAGE_BASE_URL}/${PosterSize.LARGE}${path}`;
      expect(getPosterUrl(path, PosterSize.LARGE)).toBe(expectedUrl);
    });

    it('returns a placeholder URL when path is null', () => {
      expect(getPosterUrl(null)).toContain('placeholder');
    });

    it('returns a placeholder URL when path is undefined', () => {
      expect(getPosterUrl(undefined)).toContain('placeholder');
    });

    it('returns a placeholder URL when path is empty string', () => {
      expect(getPosterUrl('')).toContain('placeholder');
    });
  });

  describe('getBackdropUrl', () => {
    it('returns the correct URL for a valid path with default size', () => {
      const path = '/test-backdrop.jpg';
      const expectedUrl = `${IMAGE_BASE_URL}/${BackdropSize.LARGE}${path}`;
      expect(getBackdropUrl(path)).toBe(expectedUrl);
    });

    it('returns the correct URL for a valid path with specified size', () => {
      const path = '/test-backdrop.jpg';
      const expectedUrl = `${IMAGE_BASE_URL}/${BackdropSize.MEDIUM}${path}`;
      expect(getBackdropUrl(path, BackdropSize.MEDIUM)).toBe(expectedUrl);
    });

    it('returns a placeholder URL when path is null', () => {
      expect(getBackdropUrl(null)).toContain('placeholder');
    });

    it('returns a placeholder URL when path is undefined', () => {
      expect(getBackdropUrl(undefined)).toContain('placeholder');
    });

    it('returns a placeholder URL when path is empty string', () => {
      expect(getBackdropUrl('')).toContain('placeholder');
    });
  });
});
