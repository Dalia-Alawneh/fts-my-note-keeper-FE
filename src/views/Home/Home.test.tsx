import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';
import { server } from '@/mocks/server';
import { http } from 'msw';
import { BASE_URL } from '@/mocks/apiMocks';

describe('Home page with MSW', () => {
  it('Should renders notes from mocked API', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });
  });

  it('should filter notes by search input', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Note 1')).toBeInTheDocument();
      expect(screen.getByText('Note 2')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, 'Note 2');

    expect(screen.queryByText('Note 1')).not.toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });

  it('should show error alert on API failure', async () => {
    server.use(
      http.get(`${BASE_URL}/notes`, () => {
        return new Response(null, { status: 500 });
      }),
    );

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
