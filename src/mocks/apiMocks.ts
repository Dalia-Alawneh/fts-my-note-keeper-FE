import { http, HttpResponse } from 'msw';
import { mockNotesResponse } from './data';

export const BASE_URL = 'https://fts-my-note-keeper.onrender.com';
export const handlers = [
  http.get(`${BASE_URL}/notes`, () => {
    return HttpResponse.json({
      notes: mockNotesResponse,
    });
  }),
];
