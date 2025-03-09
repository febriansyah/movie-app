import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders the search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText('Search for movies...')).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search for movies...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Avengers' } });
    expect(input.value).toBe('Avengers');
  });

  it('calls onSearch when form is submitted', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search for movies...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Avengers' } });
    
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('Avengers');
  });

  it('does not call onSearch when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText('Search for movies...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '' } });
    
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
