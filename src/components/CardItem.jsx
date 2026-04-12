// CardItem.jsx
import React from 'react';

const tierConfig = {
  GOLD:    {
    barColor: 'linear-gradient(90deg,#78350f,#fcd34d 40%,#b45309 70%,#fcd34d)',
    barGlow: '0 0 12px #fcd34d55',
    badgeBg: 'linear-gradient(135deg,#78350f22,#fcd34d18)',
    badgeColor: '#fcd34d', badgeBorder: '#fcd34d35',
    innerGlow: 'inset 0 1px 0 #fcd34d22',
    statusColor: '#ca8a04',
  },
  ELITE:   {
    barColor: 'linear-gradient(90deg,#3b0764,#e879f9 40%,#6d28d9 70%,#e879f9)',
    barGlow: '0 0 12px #e879f966',
    badgeBg: 'linear-gradient(135deg,#3b076422,#e879f918)',
    badgeColor: '#e879f9', badgeBorder: '#e879f935',
    innerGlow: 'inset 0 1px 0 #e879f922',
    statusColor: '#c084fc',
  },
  LUXURY:  {
    barColor: 'linear-gradient(90deg,#042f2e,#2dd4bf 40%,#0f766e 70%,#2dd4bf)',
    barGlow: '0 0 12px #2dd4bf55',
    badgeBg: 'linear-gradient(135deg,#042f2e22,#2dd4bf18)',
    badgeColor: '#2dd4bf', badgeBorder: '#2dd4bf35',
    innerGlow: 'inset 0 1px 0 #2dd4bf22',
    statusColor: '#2dd4bf',
  },
  PREMIUM: {
    barColor: 'linear-gradient(90deg,#0c1a6b,#60a5fa 40%,#1d4ed8 70%,#93c5fd)',
    barGlow: '0 0 12px #60a5fa55',
    badgeBg: 'linear-gradient(135deg,#0c1a6b22,#60a5fa18)',
    badgeColor: '#60a5fa', badgeBorder: '#60a5fa35',
    innerGlow: 'inset 0 1px 0 #60a5fa22',
    statusColor: '#60a5fa',
  },
};

// Card chip SVG
const Chip = () => (
  <div style={{
    width: 22, height: 17, borderRadius: 3, flexShrink: 0,
    background: 'linear-gradient(135deg,#2a2a2a,#1a1a1a)',
    border: '1px solid #333', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position:'absolute', top:'50%', left:0, right:0, height:1, background:'#333' }} />
    <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, background:'#333' }} />
  </div>
);

// Network logo
const NetworkLogo = ({ type }) => {
  if (type === 'visa') return (
    <svg width="26" height="9" viewBox="0 0 36 12" opacity=".5">
      <text x="0" y="10" fontFamily="serif" fontSize="13" fontWeight="900" fill="#c0c0c0" letterSpacing="1">VISA</text>
    </svg>
  );
  if (type === 'mc') return (
    <svg width="22" height="14" viewBox="0 0 28 18" opacity=".6">
      <circle cx="9" cy="9" r="9" fill="#eb001b" />
      <circle cx="19" cy="9" r="9" fill="#f79e1b" />
      <path d="M14 3.2a9 9 0 0 1 0 11.6A9 9 0 0 1 14 3.2z" fill="#ff5f00" />
    </svg>
  );
  if (type === 'amex') return (
    <svg width="24" height="10" viewBox="0 0 36 12" opacity=".5">
      <text x="0" y="10" fontFamily="sans-serif" fontSize="9" fontWeight="700" fill="#c0c0c0" letterSpacing=".5">AMEX</text>
    </svg>
  );
  return null;
};

const CardItem = ({ card, onBuy }) => {
  const isSoldOut = card.status === 'SOLD OUT';
  const tier = tierConfig[card.type?.toUpperCase()] || tierConfig.GOLD;
  const tierLabel = card.type?.charAt(0).toUpperCase() + card.type?.slice(1).toLowerCase();

  return (
    <div style={{
      position: 'relative', borderRadius: 16, padding: '13px 12px 12px',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      background: '#0c0c0c', border: '1px solid #222',
      boxShadow: tier.innerGlow,
      opacity: isSoldOut ? 0.38 : 1,
      filter: isSoldOut ? 'grayscale(0.7)' : 'none',
      fontFamily: "'Space Grotesk', sans-serif",
    }}>

      {/* Glowing tier bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: tier.barColor, boxShadow: tier.barGlow,
        borderRadius: '16px 16px 0 0',
      }} />

      {/* Badge + Status */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', margin:'6px 0 11px' }}>
        <span style={{
          fontSize: 8, fontWeight: 700, letterSpacing: 1.8, padding: '3px 7px',
          borderRadius: 4, textTransform: 'uppercase',
          background: tier.badgeBg, color: tier.badgeColor,
          border: `1px solid ${tier.badgeBorder}`,
        }}>{tierLabel}</span>
        <span style={{
          fontSize: 8, fontWeight: 700, letterSpacing: .5,
          color: isSoldOut ? '#2a2a2a' : tier.statusColor,
        }}>
          {card.status}
        </span>
      </div>

      {/* Chip + Network */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 8 }}>
        <Chip />
        <div style={{ opacity: .55 }}>
          <NetworkLogo type={card.network || 'visa'} />
        </div>
      </div>

      {/* Name + Number */}
      <div style={{ fontSize: 9, fontWeight: 600, color: '#444', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 3 }}>
        {card.name}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, color: '#d4d4d4', letterSpacing: 2, marginBottom: 11 }}>
        {card.number}
      </div>

      {/* Limit / Expiry */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5,
        background: '#080808', border: '1px solid #141414',
        borderRadius: 9, padding: '7px 9px', marginBottom: 11,
      }}>
        <div>
          <div style={{ fontSize: 7.5, color: '#333', textTransform:'uppercase', letterSpacing: 1.2, marginBottom: 3 }}>Limit</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: isSoldOut ? '#bbb' : '#4ade80', fontFamily: "'DM Mono', monospace" }}>
            {card.limit}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 7.5, color: '#333', textTransform:'uppercase', letterSpacing: 1.2, marginBottom: 3 }}>Expiry</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#bbb', fontFamily: "'DM Mono', monospace" }}>
            {card.expiry}
          </div>
        </div>
      </div>

      {/* Gradient divider */}
      <div style={{
        height: 1, marginBottom: 11,
        background: 'linear-gradient(90deg,transparent,#1e1e1e 30%,#1e1e1e 70%,transparent)',
      }} />

      {/* Price + Button */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div style={{ fontSize: 7.5, color: '#333', textTransform:'uppercase', letterSpacing: 1.2, marginBottom: 2 }}>Price</div>
          <div style={{ fontFamily:"'Rajdhani', sans-serif", fontSize: 21, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: .5 }}>
            ₹{card.price}
          </div>
        </div>

        {isSoldOut ? (
          <button style={{
            background: '#111', color: '#2a2a2a',
            border: '1px solid #1a1a1a', borderRadius: 8,
            padding: '7px 10px', fontSize: 10, fontWeight: 700,
            cursor: 'not-allowed', textTransform: 'uppercase', letterSpacing: 1,
          }}>N/A</button>
        ) : (
          <button
            onClick={() => onBuy(card)}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.93)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            style={{
              position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg,#fff 0%,#e5e5e5 100%)',
              color: '#000', border: 'none', borderRadius: 8,
              padding: '7px 14px', fontSize: 10, fontWeight: 800,
              letterSpacing: 1.5, cursor: 'pointer', textTransform: 'uppercase',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 1px 0 #ffffff44 inset',
              transition: 'transform .12s',
            }}
          >BUY</button>
        )}
      </div>
    </div>
  );
};

export default CardItem;
