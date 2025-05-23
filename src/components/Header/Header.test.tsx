import { render, screen } from '@testing-library/react';
import Header from './Header.tsx';

describe('Header render', () => {
  it('Should render header logo correctly', () => {
    render(<Header />)
    expect(screen.getByAltText('Note Keeper')).toBeInTheDocument();
  });

  it('Should render header title correctly', () => {
    render(<Header />);
    expect(screen.getByText('My Note Keeper')).toBeInTheDocument();
  });
})