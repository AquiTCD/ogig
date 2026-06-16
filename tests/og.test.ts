import { vi, expect, test, beforeEach, afterEach } from 'vitest';

const mockFontBuffer = Buffer.from(new Uint8Array(8));

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
  vi.doMock('node:fs/promises', () => ({
    readFile: vi.fn().mockResolvedValue(mockFontBuffer),
  }));
});

afterEach(() => {
  vi.doUnmock('@vercel/og');
  vi.doUnmock('node:fs/promises');
});

test('returns 200 and image/png for valid params', async () => {
  const { GET } = await import('@/app/api/og/route');
  const url = 'http://localhost:3000/api/og?title=Test%20Title&description=Test%20Description&date=2026/05/30';
  const response = await GET(new Request(url));

  expect(response.status).toBe(200);
  expect(response.headers.get('Content-Type')).toBe('image/png');
  expect(response.headers.get('Cache-Control')).toContain('public');
});

test('returns 200 with default values when params are omitted', async () => {
  const { GET } = await import('@/app/api/og/route');
  const response = await GET(new Request('http://localhost:3000/api/og'));

  expect(response.status).toBe(200);
});

test('returns 500 when font read fails', async () => {
  const fs = await import('node:fs/promises');
  vi.mocked(fs.readFile).mockRejectedValue(new Error('ENOENT: no such file or directory'));

  const { GET } = await import('@/app/api/og/route');
  const response = await GET(new Request('http://localhost:3000/api/og?title=Test'));

  expect(response.status).toBe(500);
});

test('returns 200 even when title exceeds max length', async () => {
  const { GET } = await import('@/app/api/og/route');
  const longTitle = 'あ'.repeat(200);
  const response = await GET(new Request(`http://localhost:3000/api/og?title=${encodeURIComponent(longTitle)}`));

  expect(response.status).toBe(200);
});

test('mission-card theme returns 200 without ranking badge', async () => {
  const { GET } = await import('@/app/api/og/route');
  const url = 'http://localhost:3000/api/og?theme=mission-card&title=ミッション&game=GGST&elimination=true&ranking=false&description=ゲーム名&date=2026/06/01 〜 2026/08/31&capacity=20名&owner=テストオーナー';
  const response = await GET(new Request(url));

  expect(response.status).toBe(200);
});

test('mission-card theme returns 200 with ranking badge', async () => {
  const { GET } = await import('@/app/api/og/route');
  const url = 'http://localhost:3000/api/og?theme=mission-card&title=ランキングミッション&game=GGST&elimination=false&ranking=true&description=説明&date=2026/06/01 〜 2026/08/31&capacity=20名';
  const response = await GET(new Request(url));

  expect(response.status).toBe(200);
});

test('af theme returns 200 with all parameters', async () => {
  const { GET } = await import('@/app/api/og/route');
  const url = 'http://localhost:3000/api/og?theme=af&title=羅生門&wpm=320&acc=98.5&azik=87&rank=PERFECT&comment=マジ神タイピングじゃん！';
  const response = await GET(new Request(url));

  expect(response.status).toBe(200);
});

test('unknown theme falls back to default and returns 200', async () => {
  const { GET } = await import('@/app/api/og/route');
  const response = await GET(new Request('http://localhost:3000/api/og?theme=nonexistent&title=Test'));

  expect(response.status).toBe(200);
});

test('font cache resets after failure so next request can retry', async () => {
  const fs = await import('node:fs/promises');
  vi.mocked(fs.readFile)
    .mockRejectedValueOnce(new Error('ENOENT'))
    .mockRejectedValueOnce(new Error('ENOENT'));

  const { GET } = await import('@/app/api/og/route');

  const failResponse = await GET(new Request('http://localhost:3000/api/og'));
  expect(failResponse.status).toBe(500);

  const retryResponse = await GET(new Request('http://localhost:3000/api/og'));
  expect(retryResponse.status).toBe(200);
});
