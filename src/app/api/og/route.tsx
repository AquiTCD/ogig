import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DefaultTemplate } from './templates/default';
import { MissionCardTemplate } from './templates/mission-card';
import { AfTemplate } from './templates/af';
import { parseAfParams, parseMissionCardParams } from './params';
import type { OGTemplate } from './types';
import { fetchResultComments, resolveComment } from './comments';


const MAX_LENGTHS = { title: 100, description: 80, date: 20 };

const TEMPLATES: Record<string, OGTemplate> = {
  default: DefaultTemplate,
  'mission-card': MissionCardTemplate,
  af: AfTemplate,
};

function createFontReader(relativePath: string): () => Promise<ArrayBuffer> {
  let cache: Promise<ArrayBuffer> | null = null;
  return () => {
    if (!cache) {
      cache = readFile(join(process.cwd(), relativePath))
        .then(buf => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer)
        .catch(err => { cache = null; throw err; });
    }
    return cache;
  };
}

const getNotoFont = createFontReader('public/fonts/NotoSansJP-Bold.otf');
const getPressStartFont = createFontReader('public/fonts/PressStart2P.ttf');

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    const theme = searchParams.get('theme') || 'default';
    const title = (searchParams.get('title') || 'No Title').slice(0, MAX_LENGTHS.title);
    const description = (searchParams.get('description') || 'Description').slice(0, MAX_LENGTHS.description);
    const date = (searchParams.get('date') || 'YYYY/MM/DD').slice(0, MAX_LENGTHS.date);

    const themeParams = theme === 'af'
      ? parseAfParams(searchParams)
      : theme === 'mission-card'
      ? parseMissionCardParams(searchParams)
      : {};

    if (theme === 'af' && 'comment' in themeParams && themeParams.comment) {
      const commentsMap = await fetchResultComments();
      themeParams.comment = resolveComment(themeParams.comment, commentsMap);
    }

    const Template = TEMPLATES[theme] ?? TEMPLATES.default;

    let fontData: ArrayBuffer;
    let pressStartData: ArrayBuffer;
    try {
      [fontData, pressStartData] = await Promise.all([
        getNotoFont(),
        getPressStartFont(),
      ]);
    } catch (fontError) {
      console.error('Font loading error:', fontError);
      return new Response('Font fetch error', { status: 500 });
    }

    return new ImageResponse(
      <Template
        title={title}
        description={description}
        date={date}
        {...themeParams}
        imageBaseUrl={origin}
      />, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 700 },
        { name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 900 },
        { name: 'Press Start 2P', data: pressStartData, style: 'normal', weight: 400 },
      ],
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error: unknown) {
    console.error('OGP Generation Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate OGP image';
    return new Response(message, { status: 500 });
  }
}
