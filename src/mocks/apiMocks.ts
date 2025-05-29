import { http, HttpResponse } from 'msw';
import { mockNotesResponse } from './data';
import type { NoteRequestPayload } from '@/types';

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

  http.post(`${BASE_URL}/notes/`, async ({ request }) => {
    const body = (await request.json()) as NoteRequestPayload;

    return HttpResponse.json(
      {
        message: 'Note added successfully',
        note: {
          ...body,
          _id: '2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      { status: 201 },
    );
  }),
];
