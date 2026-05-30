import type { OGParams } from '../types';

export function StrongerADayTemplate({ title, subtitle, date }: OGParams) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#FFFCF0', // Flexoki paper
        color: '#100F0F', // Flexoki ink-dark
        fontFamily: 'Noto Sans JP',
        position: 'relative',
        padding: '60px 80px 60px 160px', // Shift content to the right of the red margin line
        boxSizing: 'border-box',
        overflow: 'hidden',
        border: '12px solid #100F0F', // Heavy border
      }}
    >
      {/* Notebook red vertical margin line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '120px',
          width: '2px',
          backgroundColor: '#ecb0ac', // Flexoki action-light (coral-light)
          opacity: 0.8,
          display: 'flex',
        }}
      />

      {/* Notebook ruled horizontal lines (background) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '120px 0 100px 0',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
        <div style={{ width: '100%', height: '1.5px', backgroundColor: '#E6E4D9' }} />
      </div>

      {/* Top badge: MISSION (No rounded corners, heavy border) */}
      <div style={{ display: 'flex', marginBottom: '30px', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', display: 'flex' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#e28883', // Flexoki action (coral)
              border: '3px solid #100F0F',
              display: 'flex',
            }}
          />
          <span
            style={{
              position: 'relative',
              fontSize: '18px',
              fontWeight: 900,
              color: '#100F0F',
              padding: '6px 20px',
              letterSpacing: '2px',
            }}
          >
            MISSION
          </span>
        </div>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#6F6E69', // Flexoki ink
            letterSpacing: '2px',
          }}
        >
          STRONGER A DAY
        </span>
      </div>

      {/* Title */}
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
            fontSize: '60px',
            fontWeight: 900,
            lineHeight: '1.35',
            color: '#100F0F',
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
          borderTop: '4px solid #100F0F',
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
                color: '#e28883', // Flexoki action (coral)
                letterSpacing: '1px',
              }}
            >
              GAME
            </span>
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#100F0F' }}>
              {subtitle}
            </span>
          </div>

          {/* Date Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '16px',
                fontWeight: 900,
                color: '#6F6E69', // Flexoki ink
                letterSpacing: '1px',
              }}
            >
              PERIOD
            </span>
            <span style={{ fontSize: '22px', fontWeight: 500, color: '#6F6E69' }}>
              {date}
            </span>
          </div>
        </div>

        {/* Logo Badge (SVG Vector from logo_b.svg) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg viewBox="0 0 5315 1418" style={{ width: '180px', height: '48px', fill: '#100F0F' }}>
            <g transform="matrix(1,0,0,1,118.11,0)">
              <path d="M0,1299.21L1181.1,1299.21L1181.1,909.449L389.764,909.449L389.764,708.661L1181.1,708.661L1181.1,318.898L389.764,318.898L389.764,118.11L0,118.11L0,1299.21Z" />
            </g>
            <g transform="matrix(1,0,0,1,2722.44,-1299.21)">
              <path d="M1181.1,2598.43L1181.1,1417.32L909.449,1417.32L909.449,2208.66L0,2208.66L0,2598.43L1181.1,2598.43ZM265.748,1417.32L-5.906,1417.32L-5.906,2025.59L265.748,2025.59L265.748,1417.32ZM726.378,1417.32L454.724,1417.32L454.724,2025.59L726.378,2025.59L726.378,1417.32Z" />
            </g>
            <g transform="matrix(1,0,0,1,2722.44,-1299.21)">
              <path d="M2480.32,2598.43L2480.32,1417.32L1299.21,1417.32L1299.21,1688.98L2090.55,1688.98L2090.55,1872.05L1299.21,1872.05L1299.21,2143.7L2090.55,2143.7L2090.55,2326.77L1299.21,2326.77L1299.21,2598.43L2480.32,2598.43Z" />
            </g>
            <g transform="matrix(1,0,0,1,118.11,0)">
              <path d="M1688.98,513.78L1688.98,118.11L1299.21,118.11L1299.21,1299.21L1688.98,1299.21L1688.98,903.543L2480.32,903.543L2480.32,513.78L1688.98,513.78Z" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
