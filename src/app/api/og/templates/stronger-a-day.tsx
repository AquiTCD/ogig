import type { OGParams } from '../types';

export function StrongerADayTemplate({
  title,
  subtitle,
  date,
  status = 'active',
  ranking = 'false',
  condition = 'none',
  participants = '1 / ∞',
  metric = '参加のみ',
  creator = 'オーナー',
}: OGParams) {
  const isUpcoming = status === 'upcoming';
  const isEnded = status === 'ended';

  // Determine card background color based on status
  const cardBg = isUpcoming ? '#ecb0ac' : '#F2F0E5'; // action-light vs paper-dark

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
        padding: '30px 40px',
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
          left: '80px',
          width: '2px',
          backgroundColor: '#ecb0ac',
          opacity: 0.5,
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
          opacity: 0.25,
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

      {/* Top Bar: Branding */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px',
          paddingLeft: '60px', // Shift to avoid overlap with red line
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 900, color: '#6F6E69', letterSpacing: '2px' }}>
            MISSION CARD PREVIEW
          </span>
        </div>

        {/* logo_b.svg */}
        <svg viewBox="0 0 5315 1418" style={{ width: '120px', height: '32px', fill: '#100F0F' }}>
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

      {/* Main Mission Card - Centered, Large size for X (Twitter) visibility */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '1060px',
          height: '420px',
          backgroundColor: cardBg,
          border: '8px solid #100F0F',
          alignSelf: 'center',
          boxShadow: '10px 10px 0px #100F0F',
          padding: '30px 45px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Card Header: Badges & Participants */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Status Badge */}
            <div
              style={{
                display: 'flex',
                backgroundColor: isUpcoming ? '#85b5ba' : isEnded ? '#6F6E69' : '#879a39',
                padding: '4px 10px',
                borderRadius: '4px',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                {isUpcoming ? '開催前' : isEnded ? '終了済み' : '開催中'}
              </span>
            </div>

            {/* Ranking Badge */}
            {ranking === 'true' && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#ad8300',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                  🏆 ランキング
                </span>
              </div>
            )}

            {/* Condition Badge */}
            {condition !== 'none' && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#5e405f',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                  {condition === 'invite' ? '🔑 招待制' : '✔ 承認制'}
                </span>
              </div>
            )}
          </div>

          {/* Participants Count */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', fontWeight: 900, color: '#100F0F' }}>
              👥 {participants}
            </span>
          </div>
        </div>

        {/* Card Date (Black pill style) */}
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#100F0F',
              padding: '6px 14px',
              borderRadius: '4px',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '16px', color: '#FFFFFF' }}>🗓</span>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', letterSpacing: '1px' }}>
              {date}
            </span>
          </div>
        </div>

        {/* Card Title (Huge & visible) */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
          <h2
            style={{
              fontSize: '44px',
              fontWeight: 900,
              color: '#100F0F',
              margin: 0,
              lineHeight: '1.25',
              wordBreak: 'break-all',
            }}
          >
            {title}
          </h2>
          {/* Card Description */}
          {subtitle && (
            <p
              style={{
                fontSize: '20px',
                color: '#6F6E69',
                margin: '10px 0 0 0',
                fontWeight: 500,
                lineHeight: '1.4',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                width: '900px',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Card Footer: Metric & Creator */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: '12px',
          }}
        >
          {/* Metric Badge */}
          <div
            style={{
              display: 'flex',
              border: '2.5px solid #100F0F',
              backgroundColor: '#FFFFFF',
              padding: '4px 12px',
              borderRadius: '4px',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '14px' }}>📊</span>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#100F0F' }}>
              {metric}
            </span>
          </div>

          {/* Creator text */}
          {creator && (
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#100F0F' }}>
              by @{creator}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
