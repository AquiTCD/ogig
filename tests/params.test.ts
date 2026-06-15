import { expect, test } from 'vitest';
import { parseAfParams, parseMissionCardParams } from '@/app/api/og/params';

test('parseAfParams extracts all af-specific keys', () => {
  const sp = new URLSearchParams('wpm=321&acc=98.5&azik=85&rank=PERFECT&comment=すごい！&training=false');
  expect(parseAfParams(sp)).toEqual({
    wpm: '321',
    acc: '98.5',
    azik: '85',
    rank: 'PERFECT',
    comment: 'すごい！',
    training: 'false',
  });
});

test('parseAfParams returns undefined for missing optional keys', () => {
  const sp = new URLSearchParams('wpm=300');
  const result = parseAfParams(sp);
  expect(result.wpm).toBe('300');
  expect(result.acc).toBeUndefined();
  expect(result.azik).toBeUndefined();
  expect(result.rank).toBeUndefined();
  expect(result.comment).toBeUndefined();
  expect(result.training).toBeUndefined();
});

test('parseMissionCardParams extracts all mission-card-specific keys', () => {
  const sp = new URLSearchParams('ranking=true&elimination=false&condition=invite&capacity=20名&metric=対戦本数 累計&game=GGST&owner=アキ');
  expect(parseMissionCardParams(sp)).toEqual({
    ranking: 'true',
    elimination: 'false',
    condition: 'invite',
    capacity: '20名',
    metric: '対戦本数 累計',
    game: 'GGST',
    owner: 'アキ',
  });
});

test('parseMissionCardParams returns undefined for missing optional keys', () => {
  const sp = new URLSearchParams('ranking=true');
  const result = parseMissionCardParams(sp);
  expect(result.ranking).toBe('true');
  expect(result.owner).toBeUndefined();
  expect(result.game).toBeUndefined();
});

test('parseAfParams does not bleed mission-card keys', () => {
  const sp = new URLSearchParams('metric=300&capacity=20名&condition=none&ranking=true&wpm=321');
  const result = parseAfParams(sp);
  expect(result.wpm).toBe('321');
  expect((result as Record<string, unknown>).metric).toBeUndefined();
  expect((result as Record<string, unknown>).capacity).toBeUndefined();
});

test('parseMissionCardParams does not bleed af keys', () => {
  const sp = new URLSearchParams('wpm=321&acc=98.5&azik=85&rank=PERFECT&ranking=true');
  const result = parseMissionCardParams(sp);
  expect(result.ranking).toBe('true');
  expect((result as Record<string, unknown>).wpm).toBeUndefined();
  expect((result as Record<string, unknown>).rank).toBeUndefined();
});
