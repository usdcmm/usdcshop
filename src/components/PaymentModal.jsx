import React, { useState, useEffect, useRef } from 'react';

const UPI_ID = "Yaswant12@fam";
const TIMER_SECONDS = 895; // ~14:55

const PaymentModal = ({ isOpen, onClose, card }) => {
  const [txnId, setTxnId] = useState('');
  const [copied, setCopied] = useState(false);
  const [secs, setSecs] = useState(TIMER_SECONDS);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) { clearInterval(intervalRef.current); return; }
    setTxnId('');
    setSecs(TIMER_SECONDS);
    intervalRef.current = setInterval(() => {
      setSecs(s => {
        if (s <= 1) { clearInterval(intervalRef.current); onClose(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isOpen]);

  if (!isOpen || !card) return null;

  const mins = Math.floor(secs / 60);
  const sec  = String(secs % 60).padStart(2, '0');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${UPI_ID}%26am=${card.price}`;

  const copyUpi = () => {
    navigator.clipboard?.writeText(UPI_ID).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSubmit = () => {
    if (!txnId.trim()) return;
    alert(`Payment submitted! TXN: ${txnId}`);
    onClose();
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,.85)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div style={{
        background: '#111', border: '1px solid #1e1e1e',
        borderRadius: '22px 22px 0 0',
        padding: '20px 18px 36px',
        width: '100%', maxWidth: 420,
        position: 'relative', textAlign: 'center',
        animation: 'slideUp .25s ease',
      }}>
        {/* Drag pill */}
        <div style={{ width: 36, height: 4, background: '#2a2a2a', borderRadius: 2, margin: '0 auto 18px' }} />

        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 18, right: 18,
          background: '#1a1a1a', border: '1px solid #222',
          color: '#888', width: 28, height: 28, borderRadius: '50%',
          fontSize: 14, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>✕</button>

        {/* Timer */}
        <div style={{
          display: 'inline-block', background: '#dc262620',
          border: '1px solid #dc262640', color: '#ef4444',
          fontSize: 10, fontWeight: 700, padding: '3px 10px',
          borderRadius: 6, marginBottom: 14, letterSpacing: .5,
        }}>⏱ {mins}:{sec}</div>

        <h2 style={{ fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: .5, marginBottom: 16 }}>
          Visa Signature Secure Payment
        </h2>

        {/* QR */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 14, marginBottom: 14, display: 'flex', justifyContent: 'center' }}>
          <img src={qrUrl} alt="QR Code" style={{ width: 160, height: 160 }} />
        </div>

        {/* Amount */}
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 36, fontWeight: 700, marginBottom: 14 }}>
          ₹{card.price}
        </div>

        {/* UPI ID row */}
        <div style={{
          background: '#0a0a0a', border: '1px solid #1c1c1c',
          borderRadius: 10, padding: '10px 14px', marginBottom: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 12, color: '#aaa', fontFamily: 'monospace' }}>{UPI_ID}</span>
          <span onClick={copyUpi} style={{
            fontSize: 10, fontWeight: 700, color: '#22c55e',
            border: '1px solid #22c55e40', padding: '3px 8px',
            borderRadius: 5, background: '#22c55e10', cursor: 'pointer',
          }}>{copied ? 'COPIED!' : 'COPY'}</span>
        </div>

        {/* TXN Input */}
        <input
          value={txnId}
          onChange={e => setTxnId(e.target.value)}
          placeholder="ENTER TRANSACTION ID"
          style={{
            width: '100%', background: '#0a0a0a',
            border: `1px solid ${txnId ? '#1e1e1e' : '#1e1e1e'}`,
            borderRadius: 10, padding: '13px 14px',
            color: '#fff', fontSize: 13,
            fontFamily: "'Space Grotesk', sans-serif",
            textAlign: 'center', letterSpacing: 1,
            marginBottom: 12, outline: 'none',
          }}
          onFocus={e => e.target.style.borderColor = '#dc2626'}
          onBlur={e => e.target.style.borderColor = '#1e1e1e'}
        />

        <button onClick={handleSubmit} style={{
          width: '100%', background: '#dc2626', border: 'none',
          borderRadius: 11, padding: 14,
          fontSize: 14, fontWeight: 800, color: '#fff',
          cursor: 'pointer', letterSpacing: .5,
          fontFamily: "'Space Grotesk', sans-serif",
          textTransform: 'uppercase',
        }}>SUBMIT PAYMENT</button>
      </div>
    </div>
  );
};

export default PaymentModal;