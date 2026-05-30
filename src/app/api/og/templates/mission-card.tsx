import type { OGParams } from '../types';

// Inline Phosphor Icons SVG definitions to avoid Satori/Edge context errors
const UsersThreeIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z" />
  </svg>
);

const TrophyIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z" />
  </svg>
);

const KeyIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M216.57,39.43A80,80,0,0,0,83.91,120.78L28.69,176A15.86,15.86,0,0,0,24,187.31V216a16,16,0,0,0,16,16H72a8,8,0,0,0,8-8V208H96a8,8,0,0,0,8-8V184h16a8,8,0,0,0,5.66-2.34l9.56-9.57A79.73,79.73,0,0,0,160,176h.1A80,80,0,0,0,216.57,39.43ZM180,92a16,16,0,1,1,16-16A16,16,0,0,1,180,92Z" />
  </svg>
);

const CheckCircleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
  </svg>
);

const CalendarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M208,28H188V24a12,12,0,0,0-24,0v4H92V24a12,12,0,0,0-24,0v4H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28ZM68,52a12,12,0,0,0,24,0h72a12,12,0,0,0,24,0h16V76H52V52ZM52,204V100H204V204Zm60-80v56a12,12,0,0,1-24,0V143.32a12,12,0,0,1-9.37-22l16-8A12,12,0,0,1,112,124Zm61.49,33.88L163.9,168H168a12,12,0,0,1,0,24H136a12,12,0,0,1-8.71-20.25L155.45,142a4,4,0,0,0,.55-2,4,4,0,0,0-7.47-2,12,12,0,0,1-20.78-12A28,28,0,0,1,180,140a27.77,27.77,0,0,1-5.64,16.86A10.63,10.63,0,0,1,173.49,157.88Z" />
  </svg>
);

const ChartBarIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M224,196h-4V40a12,12,0,0,0-12-12H152a12,12,0,0,0-12,12V76H96A12,12,0,0,0,84,88v36H48a12,12,0,0,0-12,12v60H32a12,12,0,0,0,0,24H224a12,12,0,0,0,0-24ZM164,52h32V196H164Zm-56,48h32v96H108ZM60,148H84v48H60Z" />
  </svg>
);

const XCircleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 256 256" fill={color}>
    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
  </svg>
);

const getTitleFontSize = (titleText: string) => {
  const len = titleText.length;
  if (len > 35) return '44px';
  if (len > 25) return '52px';
  if (len > 15) return '60px';
  return '68px';
};

export function MissionCardTemplate({
  title,
  description,
  date,
  ranking = 'false',
  condition = 'none',
  capacity = '制限なし',
  metric = '参加のみ',
  game,
  elimination = 'false',
  owner,
}: OGParams) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#FFFCF0',
        color: '#100F0F',
        fontFamily: 'Noto Sans JP',
        position: 'relative',
        padding: '40px 50px 40px 180px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        border: '8px solid #100F0F',
      }}
    >
      {/* Horizontal ruled lines (notebook motif) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(to bottom, transparent 39px, #DAD8CE 39px, #DAD8CE 40px)',
          backgroundSize: '100% 40px',
          opacity: 0.35,
          display: 'flex',
        }}
      />

      {/* Notebook red vertical margin line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '140px',
          width: '3px',
          backgroundColor: '#e28883',
          opacity: 0.6,
          display: 'flex',
        }}
      />

      {/* Row 1: Header (Logo, Ranking & Elimination Badges) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg viewBox="0 0 5315 1418" style={{ width: '150px', height: '40px', fill: '#100F0F' }}>
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

          <span style={{ fontSize: '30px', fontWeight: 900, color: '#100F0F', letterSpacing: '0.5px', position: 'relative', top: '-3px' }}>
            ミッション
          </span>

          {ranking === 'true' && (
            <div
              style={{
                display: 'flex',
                backgroundColor: '#AD8301',
                padding: '6px 14px',
                borderRadius: '6px',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <TrophyIcon size={22} color="#FFFFFF" />
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                ランキング
              </span>
            </div>
          )}

          {elimination === 'true' && (
            <div
              style={{
                display: 'flex',
                backgroundColor: '#BC5215',
                padding: '6px 14px',
                borderRadius: '6px',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <XCircleIcon size={22} color="#FFFFFF" />
              <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                脱落あり
              </span>
            </div>
          )}
        </div>

        {/* Condition Badge */}
        {condition !== 'none' && (
          <div
            style={{
              display: 'flex',
              backgroundColor: '#5E409D',
              padding: '6px 14px',
              borderRadius: '6px',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {condition === 'invite' ? (
              <KeyIcon size={22} color="#FFFFFF" />
            ) : (
              <CheckCircleIcon size={22} color="#FFFFFF" />
            )}
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.5px' }}>
              {condition === 'invite' ? '招待制' : '承認制'}
            </span>
          </div>
        )}
      </div>

      {/* Row 2: Period & Capacity */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: '#100F0F',
            padding: '8px 16px',
            borderRadius: '4px',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CalendarIcon size={26} color="#FFFFFF" />
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.5px' }}>
            {date}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UsersThreeIcon size={32} color="#100F0F" />
          <span style={{ fontSize: '28px', fontWeight: 900, color: '#100F0F' }}>
            定員 {capacity}
          </span>
        </div>
      </div>

      {/* Heavy divider */}
      <div
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#100F0F',
          marginBottom: '24px',
          display: 'flex',
        }}
      />

      {/* Main Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        {game && (
          <span
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#100F0F',
              letterSpacing: '1.5px',
              marginBottom: '12px',
            }}
          >
            {game.toUpperCase()}
          </span>
        )}

        <h1
          style={{
            fontSize: getTitleFontSize(title),
            fontWeight: 900,
            lineHeight: '1.25',
            color: '#100F0F',
            margin: 0,
            wordBreak: 'break-all',
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              fontSize: '32px',
              color: '#6F6E69',
              margin: '12px 0 0 0',
              fontWeight: 500,
              lineHeight: '1.35',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '4px solid #100F0F',
          paddingTop: '20px',
        }}
      >
        {/* Metric Badge */}
        <div
          style={{
            display: 'flex',
            border: '3px solid #100F0F',
            backgroundColor: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '4px',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ChartBarIcon size={26} color="#100F0F" />
          <span style={{ fontSize: '26px', fontWeight: 900, color: '#100F0F' }}>
            {metric}
          </span>
        </div>

        {/* Owner */}
        {owner && (
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#6F6E69' }}>
            主催: {owner}
          </span>
        )}
      </div>
    </div>
  );
}
