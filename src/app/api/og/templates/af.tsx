import type { OGParams } from '../types';

const BG_OUTER = '#121214';
const BG_STATS = '#0a0a0c';
const GREEN = '#22c55e';
const GREEN_400 = '#4ade80';
const YELLOW = '#fde047';

function getFairyImage(base: string, ranking?: string): string {
  const r = ranking?.toUpperCase();
  if (r === 'S') return `${base}/images/fairy_perfect.png`;
  if (r === 'A') return `${base}/images/fairy_proud.png`;
  if (r === 'B') return `${base}/images/fairy_happy.png`;
  return `${base}/images/fairy_excited.png`;
}

function getRankColor(ranking?: string): string {
  const r = ranking?.toUpperCase();
  if (r === 'S') return '#FFD700';
  if (r === 'A') return GREEN;
  if (r === 'B') return '#00BFFF';
  if (r === 'C') return '#FF8C00';
  return '#aaaaaa';
}

type RowProps = {
  label: string;
  value: string | undefined;
  valueColor?: string;
};

function Row({ label, value, valueColor = GREEN_400 }: RowProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: '"Press Start 2P"', fontSize: '28px', color: GREEN_400 }}>
        {label}
      </span>
      <span style={{ fontFamily: '"Press Start 2P"', fontSize: '36px', color: valueColor }}>
        {value ?? '—'}
      </span>
    </div>
  );
}

export function AfTemplate({
  title,
  metric,
  capacity,
  condition,
  ranking,
  imageBaseUrl,
  comment,
  training,
}: OGParams) {
  const rankColor = getRankColor(ranking);
  const isTraining = training === 'true';

  // Force excited pose for training, otherwise select by rank
  const fairyImg = imageBaseUrl
    ? (isTraining
      ? `${imageBaseUrl}/images/fairy_excited.png`
      : getFairyImage(imageBaseUrl, ranking))
    : null;

  return (
    <div style={{
      display: 'flex',
      width: '1200px',
      height: '630px',
      backgroundColor: BG_OUTER,
      border: `4px solid ${GREEN}`,
      padding: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: GREEN_400,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        width: '100%',
        height: '100%',
        border: `4px solid ${GREEN}`,
      }}>
        {/* Left: stats & title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          height: '100%',
          boxSizing: 'border-box',
          padding: '36px 32px 36px 40px',
          gap: '24px',
          justifyContent: 'space-between',
        }}>
          {/* Title Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              display: 'flex',
              fontFamily: '"Press Start 2P"',
              fontSize: '64px',
              color: YELLOW,
              letterSpacing: '2px',
            }}>
              AZIK FAIRY
            </div>
            <div style={{
              display: 'flex',
              fontFamily: '"Noto Sans JP"',
              fontSize: '28px',
              color: GREEN_400,
              letterSpacing: '2px',
              fontWeight: 'bold',
            }}>
              AZIKタイピング養成妖精
            </div>
            <div style={{ display: 'flex', height: '4px', backgroundColor: GREEN, marginTop: '8px' }} />
          </div>

          {/* Stats Box or Training Panel */}
          {isTraining ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              backgroundColor: BG_STATS,
              border: `2px solid ${GREEN}`,
              padding: '4px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                border: `2px solid ${GREEN}`,
                padding: '32px',
                gap: '24px',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  fontFamily: '"Press Start 2P"',
                  fontSize: '60px',
                  color: YELLOW,
                  letterSpacing: '2px',
                }}>
                  TRAINING
                </div>
                <div style={{
                  display: 'flex',
                  fontFamily: '"Noto Sans JP"',
                  fontSize: '38px',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                  ただいまAZIKタイピング特訓中！
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              backgroundColor: BG_STATS,
              border: `2px solid ${GREEN}`,
              padding: '4px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                border: `2px solid ${GREEN}`,
                padding: '24px 32px',
                gap: '20px',
                justifyContent: 'center',
              }}>
                {title && <Row label="STAGE:" value={title} valueColor={GREEN_400} />}
                {ranking && ranking !== 'false' && (
                  <Row label="RANK:" value={ranking.toUpperCase()} valueColor={rankColor} />
                )}
                {metric && <Row label="SPEED (WPM):" value={metric} valueColor={YELLOW} />}
                {capacity && <Row label="ACCURACY:" value={`${capacity}%`} valueColor={YELLOW} />}
                {condition && <Row label="AZIK RATIO:" value={`${condition}%`} valueColor="#00BFFF" />}
              </div>
            </div>
          )}
        </div>

        {/* Right: fairy avatar & comment if normal mode */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          height: '100%',
          flexShrink: 0,
          boxSizing: 'border-box',
          padding: '36px 20px 36px 20px',
          borderLeft: `4px solid ${GREEN}`,
          backgroundColor: BG_STATS,
        }}>
          {/* Comment Bubble on top-right in normal mode */}
          {!isTraining && comment && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: BG_OUTER,
              border: `2px solid ${YELLOW}`,
              padding: '4px',
              borderRadius: '4px',
              width: '100%',
              boxSizing: 'border-box',
              marginBottom: '16px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                border: `2px solid ${YELLOW}`,
                padding: '12px 16px',
                height: '120px', // Exactly 3 lines tall container
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                boxSizing: 'border-box',
              }}>
                {comment.split('\n').map((line, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      fontFamily: '"Noto Sans JP"',
                      fontSize: '28px',
                      color: '#ffffff',
                      lineHeight: '1.4',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {fairyImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={fairyImg}
              alt="fairy"
              width={320}
              height={350}
              style={{
                display: 'flex',
                marginTop: 'auto', // Push to the bottom-right
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
