import { vi, expect, test, beforeEach, afterEach } from 'vitest';

const mockFontBuffer = new ArrayBuffer(8);

const mockFetchOk = () =>
  vi.fn().mockResolvedValue({
    ok: true,
    arrayBuffer: () => Promise.resolve(mockFontBuffer),
  });

const mockFetchFail = () =>
  vi.fn().mockResolvedValue({
    ok: false,
    statusText: 'Not Found',
  });

beforeEach(() => {
  vi.resetModules();
  vi.doMock('@vercel/og', () => ({
    ImageResponse: class MockImageResponse extends Response {
      constructor(
        _element: unknown,
        options?: { width?: number; height?: number; headers?: Record<string, string> }
      ) {
        super('fake-png-data', {
          status: 200,
          headers: {
            'Content-Type': 'image/png',
            ...(options?.headers ?? {}),
          },
        });
      }
    },
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.doUnmock('@vercel/og');
});

test('returns 200 and image/png for valid params', async () => {
  vi.stubGlobal('fetch', mockFetchOk());

  const { GET } = await import('@/app/api/og/route');
  const url = 'http://localhost:3000/api/og?title=Test%20Title&subtitle=Test%20Subtitle&date=2026/05/30';
  const response = await GET(new Request(url));

  expect(response.status).toBe(200);
  expect(response.headers.get('Content-Type')).toBe('image/png');
  expect(response.headers.get('Cache-Control')).toContain('public');
});

test('returns 200 with default values when params are omitted', async () => {
  vi.stubGlobal('fetch', mockFetchOk());

  const { GET } = await import('@/app/api/og/route');
  const response = await GET(new Request('http://localhost:3000/api/og'));

  expect(response.status).toBe(200);
});

test('returns 500 when font fetch fails', async () => {
  vi.stubGlobal('fetch', mockFetchFail());

  const { GET } = await import('@/app/api/og/route');
  const response = await GET(new Request('http://localhost:3000/api/og?title=Test'));

  expect(response.status).toBe(500);
});

test('returns 200 even when title exceeds max length', async () => {
  vi.stubGlobal('fetch', mockFetchOk());

  const { GET } = await import('@/app/api/og/route');
  const longTitle = 'あ'.repeat(200);
  const response = await GET(new Request(`http://localhost:3000/api/og?title=${encodeURIComponent(longTitle)}`));

  expect(response.status).toBe(200);
});

test('fontPromise resets after failure so next request can retry', async () => {
  vi.stubGlobal('fetch', mockFetchFail());
  const { GET } = await import('@/app/api/og/route');

  const failResponse = await GET(new Request('http://localhost:3000/api/og'));
  expect(failResponse.status).toBe(500);

  vi.stubGlobal('fetch', mockFetchOk());
  const retryResponse = await GET(new Request('http://localhost:3000/api/og'));
  expect(retryResponse.status).toBe(200);
});
