import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll, vi } from 'vitest';
import { setupWorker } from 'msw/browser';

const worker = setupWorker();
beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

vi.mock('@mui/icons-material', async () => {
  return {
    CalendarMonth: () => <div data-testid='mock-icon' />,
  };
});
