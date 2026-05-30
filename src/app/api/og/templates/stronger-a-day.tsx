import type { OGParams } from '../types';

export function StrongerADayTemplate({ title, subtitle, date }: OGParams) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        fontFamily: 'Noto Sans JP',
        position: 'relative',
        padding: '60px 80px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Glow accent top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-200px',
          right: '-100px',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(0,0,0,0) 65%)',
          display: 'flex',
        }}
      />

      {/* Glow accent bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(0,0,0,0) 65%)',
          display: 'flex',
        }}
      />

      {/* Subtle grid lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }}
      />

      {/* Top badge: MISSION */}
      <div style={{ display: 'flex', marginBottom: '36px', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', display: 'flex' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#22d3ee',
              transform: 'skew(-10deg)',
              display: 'flex',
            }}
          />
          <span
            style={{
              position: 'relative',
              fontSize: '18px',
              fontWeight: 900,
              color: '#0f172a',
              padding: '5px 18px',
              letterSpacing: '3px',
            }}
          >
            MISSION
          </span>
        </div>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#475569',
            letterSpacing: '2px',
          }}
        >
          STRONGER A DAY
        </span>
      </div>

      {/* Mission Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <h1
          style={{
            fontSize: '62px',
            fontWeight: 900,
            lineHeight: '1.25',
            color: '#f1f5f9',
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
          borderTop: '1px solid rgba(34,211,238,0.2)',
          paddingTop: '28px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Game label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 900,
                color: '#22d3ee',
                letterSpacing: '2px',
              }}
            >
              GAME
            </span>
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#e2e8f0' }}>
              {subtitle}
            </span>
          </div>

          {/* Period label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 900,
                color: '#64748b',
                letterSpacing: '2px',
              }}
            >
              PERIOD
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#94a3b8' }}>
              {date}
            </span>
          </div>
        </div>

        {/* Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div style={{ display: 'flex', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#1e293b',
                border: '1px solid rgba(34,211,238,0.4)',
                transform: 'skew(-10deg)',
                display: 'flex',
              }}
            />
            <span
              style={{
                position: 'relative',
                fontSize: '16px',
                fontWeight: 900,
                color: '#22d3ee',
                padding: '6px 16px',
                letterSpacing: '1px',
              }}
            >
              OGIG
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
