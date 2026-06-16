import { expect, test, vi, beforeEach } from 'vitest';
import fallbackComments from '@/app/api/og/data/result_comments.json';

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

test('resolveComment resolves valid IDs using comments map', async () => {
  const { resolveComment } = await import('@/app/api/og/comments');
  const map = { P1: 'Perfect message', A1: 'A rank message' };
  expect(resolveComment('P1', map)).toBe('Perfect message');
  expect(resolveComment('A1', map)).toBe('A rank message');
});

test('resolveComment falls back to default message for unrecognized IDs', async () => {
  const { resolveComment } = await import('@/app/api/og/comments');
  const map = { P1: 'Perfect message' };
  const resolved = resolveComment('A1', map);
  expect(resolved).toContain('特訓'); // Should contain part of fallback message
});

test('resolveComment treats non-ID comment parameter as raw text', async () => {
  const { resolveComment } = await import('@/app/api/og/comments');
  const map = { P1: 'Perfect message' };
  expect(resolveComment('Custom raw comment message', map)).toBe('Custom raw comment message');
  expect(resolveComment('Hello World', map)).toBe('Hello World');
});

test('resolveComment returns undefined for undefined input', async () => {
  const { resolveComment } = await import('@/app/api/og/comments');
  expect(resolveComment(undefined, {})).toBeUndefined();
});

test('fetchResultComments fetches from remote URL and caches the result', async () => {
  const { fetchResultComments } = await import('@/app/api/og/comments');
  const mockFetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ P1: 'Fetched Perfect message' }),
  });
  global.fetch = mockFetch;

  // First fetch
  const map1 = await fetchResultComments();
  expect(map1.P1).toBe('Fetched Perfect message');
  expect(mockFetch).toHaveBeenCalledTimes(1);

  // Second fetch (should hit cache)
  const map2 = await fetchResultComments();
  expect(map2.P1).toBe('Fetched Perfect message');
  expect(mockFetch).toHaveBeenCalledTimes(1);
});

test('fetchResultComments falls back to local JSON on fetch failure', async () => {
  const { fetchResultComments } = await import('@/app/api/og/comments');
  const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
  global.fetch = mockFetch;

  const map = await fetchResultComments();
  // Should equal fallbackComments since fetch failed
  expect(map).toEqual(fallbackComments);
});
