import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://fts-my-note-keeper.onrender.com';
export const handlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json({
      _id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      title: 'test',
      content: 'test test',
      color: '#D3D3D3',
    });
  }),
];
