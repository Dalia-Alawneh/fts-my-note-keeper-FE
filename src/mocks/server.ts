import { setupServer } from 'msw/node';
import { handlers } from './apiMocks';

export const server = setupServer(...handlers);
