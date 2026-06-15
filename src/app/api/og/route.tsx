import { ImageResponse } from '@vercel/og';
import { DefaultTemplate } from './templates/default';
import { MissionCardTemplate } from './templates/mission-card';
import { AfTemplate } from './templates/af';
import { parseAfParams, parseMissionCardParams } from './params';
import type { OGTemplate } from './types';

export const runtime = 'edge';

const MAX_LENGTHS = { title: 100, description: 80, date: 20 };

const TEMPLATES: Record<string, OGTemplate> = {
  default: DefaultTemplate,
  'mission-card': MissionCardTemplate,
  af: AfTemplate,
};

function createFontLoader(path: string): (origin: string) => Promise<ArrayBuffer> {
  let cache: Promise<ArrayBuffer> | null = null;
  return (origin: string) => {
    if (!cache) {
      cache = fetch(`${origin}${path}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch font: ${res.statusText}`);
          return res.arrayBuffer();
        })
        .catch((err) => {
          cache = null;
          throw err;
        });
    }
    return cache;
  };
}

const getNotoFont = createFontLoader('/fonts/NotoSansJP-Bold.otf');
const getPressStartFont = createFontLoader('/fonts/PressStart2P.ttf');

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

    const Template = TEMPLATES[theme] ?? TEMPLATES.default;

    let fontData: ArrayBuffer;
    let pressStartData: ArrayBuffer;
    try {
      [fontData, pressStartData] = await Promise.all([
        getNotoFont(origin),
        getPressStartFont(origin),
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
