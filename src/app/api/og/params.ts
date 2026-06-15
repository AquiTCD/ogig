export function parseAfParams(searchParams: URLSearchParams) {
  return {
    wpm: searchParams.get('wpm') || undefined,
    acc: searchParams.get('acc') || undefined,
    azik: searchParams.get('azik') || undefined,
    rank: searchParams.get('rank') || undefined,
    comment: searchParams.get('comment') || undefined,
    training: searchParams.get('training') || undefined,
  };
}

export function parseMissionCardParams(searchParams: URLSearchParams) {
  return {
    ranking: searchParams.get('ranking') || undefined,
    elimination: searchParams.get('elimination') || undefined,
    condition: searchParams.get('condition') || undefined,
    capacity: searchParams.get('capacity') || undefined,
    metric: searchParams.get('metric') || undefined,
    game: searchParams.get('game') || undefined,
    owner: searchParams.get('owner') || undefined,
  };
}
