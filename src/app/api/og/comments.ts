import fallbackComments from './data/result_comments.json';

let cachedComments: Record<string, string> | null = null;
let lastFetched = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function fetchResultComments(): Promise<Record<string, string>> {
  const now = Date.now();
  if (cachedComments && (now - lastFetched < CACHE_TTL)) {
    return cachedComments;
  }

  try {
    const res = await fetch('https://azik-fairy.solunita.net/data/result_comments.json');
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object') {
        cachedComments = json as Record<string, string>;
        lastFetched = now;
        return cachedComments;
      }
    }
  } catch (error) {
    console.error('Failed to fetch result comments:', error);
  }

  // Fallback to local copy if fetch fails and no cache exists
  return cachedComments || fallbackComments;
}

export function resolveComment(
  comment: string | undefined,
  commentsMap: Record<string, string>
): string | undefined {
  if (!comment) return undefined;

  // Check if it exists in the map
  if (commentsMap[comment]) {
    return commentsMap[comment];
  }

  // Check if it fits the ID pattern (e.g. P1, A2, C5)
  const isIdPattern = /^[A-Z]\d+$/.test(comment);
  if (isIdPattern) {
    // Sensible default fallback comment
    return 'AZIKタイピングで特訓完了！アタシ達と一緒にタイピング極めよ！✨';
  }

  // Otherwise treat as raw message
  return comment;
}
