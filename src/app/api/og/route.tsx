import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const MAX_LENGTHS = { title: 100, subtitle: 80, date: 20 };

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

    const title = (searchParams.get('title') || 'No Title').slice(0, MAX_LENGTHS.title);
    const subtitle = (searchParams.get('subtitle') || 'Sub Title').slice(0, MAX_LENGTHS.subtitle);
    const date = (searchParams.get('date') || 'YYYY/MM/DD').slice(0, MAX_LENGTHS.date);

    let fontData: ArrayBuffer;
    try {
      fontData = await getFontData(origin);
    } catch (fontError) {
      console.error('Font loading error:', fontError);
      return new Response('Font fetch error', { status: 500 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1200px',
            height: '630px',
            backgroundColor: '#0a0a0c',
            color: '#ffffff',
            fontFamily: 'Noto Sans JP',
            position: 'relative',
            padding: '60px 80px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* Neon gradient accent */}
          <div
            style={{
              position: 'absolute',
              top: '-150px',
              right: '-150px',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(230,0,18,0.2) 0%, rgba(0,0,0,0) 70%)',
              display: 'flex',
            }}
          />

          {/* Dot grid pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(#e60012 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
              opacity: 0.15,
              display: 'flex',
            }}
          />

          {/* Top banner: Badge */}
          <div style={{ display: 'flex', marginBottom: '40px' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e60012',
                  transform: 'skew(-10deg)',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#ffffff',
                  padding: '6px 20px',
                  letterSpacing: '2px',
                }}
              >
                DYNAMIC OGP
              </span>
            </div>
          </div>

          {/* Mission Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 900,
                lineHeight: '1.2',
                color: '#ffffff',
                margin: 0,
                wordBreak: 'break-all',
              }}
            >
              {title}
            </h1>
          </div>

          {/* Bottom Info Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '2px solid rgba(255,255,255,0.1)',
              paddingTop: '30px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Subtitle Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    color: '#e60012',
                    letterSpacing: '1px',
                  }}
                >
                  SUBTITLE
                </span>
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {subtitle}
                </span>
              </div>

              {/* Date Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 900,
                    color: '#8e8e93',
                    letterSpacing: '1px',
                  }}
                >
                  DATE
                </span>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 500,
                    color: '#a0a0ab',
                  }}
                >
                  {date}
                </span>
              </div>
            </div>

            {/* Logo Badge */}
            <div style={{ display: 'flex', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#1c1c1e',
                  border: '2px solid #e60012',
                  transform: 'skew(-10deg)',
                  display: 'flex',
                }}
              />
              <span
                style={{
                  position: 'relative',
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#ffffff',
                  padding: '8px 20px',
                }}
              >
                OGIG
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Noto Sans JP',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
          {
            name: 'Noto Sans JP',
            data: fontData,
            style: 'normal',
            weight: 900,
          },
        ],
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch (error: unknown) {
    console.error('OGP Generation Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate OGP image';
    return new Response(message, { status: 500 });
  }
}
