import React, { useState, useEffect } from 'react';
import { cards } from './data';
import CardItem from './components/CardItem';
import PaymentModal from './components/PaymentModal';

const App = () => {
  const [modalData, setModalData] = useState({ isOpen: false, card: null });

  const openPayment = (card) => setModalData({ isOpen: true, card });
  const closePayment = () => setModalData({ isOpen: false, card: null });

  return (
    <div style={{ minHeight: '100vh', background: '#080808', fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: '#0c0c0c', borderBottom: '1px solid #161616',
        padding: '13px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: 2, color: '#fff' }}>
          SHADOW<span style={{ color: '#dc2626' }}>CARDS</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          border: '1px solid #14532d55', background: '#052e1644',
          padding: '4px 10px', borderRadius: 20,
          fontSize: 9, fontWeight: 700, color: '#22c55e', letterSpacing: 1,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
          SECURE SERVER
        </div>
      </div>

      {/* Live activity bar */}
      <div style={{
        margin: '9px 12px 4px',
        background: '#0f0f0f', border: '1px solid #181818',
        borderRadius: 10, padding: '8px 12px',
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11.5, color: '#777',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
        <span><strong style={{ color: '#fff' }}>Gaurav:</strong> working card mil gaya 🔥</span>
      </div>

      {/* Card Grid — 2 columns on mobile */}
      <div style={{
        padding: '8px 12px 100px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 9,
      }}>
        {cards.map(card => (
          <CardItem key={card.id} card={card} onBuy={openPayment} />
        ))}
      </div>

      <PaymentModal
        isOpen={modalData.isOpen}
        onClose={closePayment}
        card={modalData.card}
      />
    </div>
  );
};

export default App;