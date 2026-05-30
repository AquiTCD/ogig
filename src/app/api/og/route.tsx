import { ImageResponse } from '@vercel/og';
import { DefaultTemplate } from './templates/default';
import { StrongerADayTemplate } from './templates/stronger-a-day';
import type { OGTemplate } from './types';

export const runtime = 'edge';

const MAX_LENGTHS = { title: 100, subtitle: 80, date: 20 };

const TEMPLATES: Record<string, OGTemplate> = {
  default: DefaultTemplate,
  'stronger-a-day': StrongerADayTemplate,
};

let fontPromise: Promise<ArrayBuffer> | null = null;

function getFontData(origin: string): Promise<ArrayBuffer> {
  if (!fontPromise) {
    fontPromise = fetch(`${origin}/fonts/NotoSansJP-Bold.otf`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch font: ${res.statusText}`);
        return res.arrayBuffer();
      })
      .catch((err) => {
        fontPromise = null;
        throw err;
      });
  }
  return fontPromise;
}

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    const theme = searchParams.get('theme') || 'default';
    const title = (searchParams.get('title') || 'No Title').slice(0, MAX_LENGTHS.title);
    const subtitle = (searchParams.get('subtitle') || 'Sub Title').slice(0, MAX_LENGTHS.subtitle);
    const date = (searchParams.get('date') || 'YYYY/MM/DD').slice(0, MAX_LENGTHS.date);

    const status = searchParams.get('status') || undefined;
    const ranking = searchParams.get('ranking') || undefined;
    const condition = searchParams.get('condition') || undefined;
    const participants = searchParams.get('participants') || undefined;
    const metric = searchParams.get('metric') || undefined;
    const creator = searchParams.get('creator') || undefined;

    const Template = TEMPLATES[theme] ?? TEMPLATES.default;

    let fontData: ArrayBuffer;
    try {
      fontData = await getFontData(origin);
    } catch (fontError) {
      console.error('Font loading error:', fontError);
      return new Response('Font fetch error', { status: 500 });
    }

    return new ImageResponse(
      <Template
        title={title}
        subtitle={subtitle}
        date={date}
        status={status}
        ranking={ranking}
        condition={condition}
        participants={participants}
        metric={metric}
        creator={creator}
      />, {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 700 },
        { name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 900 },
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
