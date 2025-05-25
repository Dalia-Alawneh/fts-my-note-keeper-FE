import { http, HttpResponse } from 'msw';
import { mockNotesResponse } from './data';

export const BASE_URL = 'https://fts-my-note-keeper.onrender.com';
export const handlers = [
  http.get(`${BASE_URL}/notes`, () => {
    return HttpResponse.json({
      notes: mockNotesResponse,
    });
  }),

  http.delete(`${BASE_URL}/notes/:id`, () => {
    return HttpResponse.json(
      {
        message: 'Note deleted successfully',
      },
      { status: 200 },
    );
  }),

  http.put(`${BASE_URL}/notes/:id`, async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json(
      {
        message: 'Note updated successfully',
        note: body,
      },
      { status: 200 },
    );
  }),
];
