// App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { cards } from './data';
import CardItem from './components/CardItem';
import PaymentModal from './components/PaymentModal';

// ─── 30 Random Names ───────────────────────────────────────────────
const NAMES = [
  'Aman', 'Neon', 'Vikram', 'Rahul', 'Arjun', 'Priya', 'Riya', 'Dev',
  'Sahil', 'Kabir', 'Rohan', 'Ankit', 'Harsh', 'Yash', 'Nikhil',
  'Siddharth', 'Ayaan', 'Zaid', 'Kiran', 'Mohit', 'Gaurav', 'Tushar',
  'Varun', 'Shubham', 'Deepak', 'Raj', 'Aditya', 'Sumit', 'Kunal', 'Faiz',
];

// ─── 20 Live Activity Messages ─────────────────────────────────────
const LIVE_MSGS = [
  n => `${n}: bhai ye card legit hai kya? 👀`,
  n => `${n}: working card mil gaya 🔥`,
  n => `${n}: Elite card order kiya, delivery kab? ⚡`,
  n => `${n}: bhai limit kitni hai luxury ka? 💳`,
  n => `${n}: payment ho gayi, wait kr rha hu 🙏`,
  n => `${n}: CVV bhi milega kya? 😭`,
  n => `${n}: Amex Platinum secured bhai 🤑`,
  n => `${n}: ye site trusted hai? first time hu 🤔`,
  n => `${n}: Gold le lu ya Elite? suggest karo`,
  n => `${n}: bhai restock kab hoga? 😤`,
  n => `${n}: Luxury card use kiya, smooth tha 💎`,
  n => `${n}: ₹2500 worth tha yaar, maza aa gaya`,
  n => `${n}: 2 left bola tha, abhi bhi hai? 👁️`,
  n => `${n}: admin bhai DM karo urgent 🔥`,
  n => `${n}: naya stock kab aayega? roz check kr rha 😅`,
  n => `${n}: UPI se payment accept hoti hai? ✅`,
  n => `${n}: Premium sold out ho gaya, next batch?`,
  n => `${n}: card declined nahi hua, legit hai 🫡`,
  n => `${n}: dosto ko bhi refer kiya, best site 🙌`,
  n => `${n}: Visa Signature is 🔥 bhai, recommend!`,
];

// ─── Purchase Toast Messages ───────────────────────────────────────
const CARD_NAMES = [
  'Amex Platinum', 'Visa Signature', 'HDFC Regalia',
  'ICICI Sapphiro', 'SBI Elite', 'Axis Magnus',
];
const PURCHASE_MSGS = [
  (n, c) => `Successfully secured ${c}`,
  (n, c) => `${c} checkout complete ✅`,
  (n, c) => `just grabbed ${c} 🔥`,
  (n, c) => `payment done for ${c}`,
  (n, c) => `${c} — confirmed! 💳`,
];

const AVATAR_COLORS = [
  { bg: '#dc262620', border: '#dc262640', color: '#dc2626' },
  { bg: '#7c3aed20', border: '#7c3aed40', color: '#a78bfa' },
  { bg: '#0f766e20', border: '#0f766e40', color: '#2dd4bf' },
  { bg: '#d9770620', border: '#d9770640', color: '#fb923c' },
  { bg: '#05796320', border: '#05796340', color: '#34d399' },
  { bg: '#1d4ed820', border: '#1d4ed840', color: '#60a5fa' },
];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];

// ─── Live Bar Component ────────────────────────────────────────────
const LiveBar = () => {
  const [msg, setMsg] = useState({ name: 'Gaurav', text: 'working card mil gaya 🔥' });
  const [visible, setVisible] = useState(true);
  const idxRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        const name = rand(NAMES);
        const text = LIVE_MSGS[idxRef.current % LIVE_MSGS.length](name)
          .replace(`${name}: `, '');
        idxRef.current++;
        setMsg({ name, text });
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      margin: '9px 12px 4px',
      background: '#0f0f0f', border: '1px solid #181818',
      borderRadius: 10, padding: '9px 12px',
      display: 'flex', alignItems: 'center', gap: 8,
      overflow: 'hidden', minHeight: 38,
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: '#22c55e', flexShrink: 0,
      }} />
      <span style={{
        fontSize: 11.5, color: '#777',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity .3s ease, transform .3s ease',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>
        <strong style={{ color: '#fff' }}>{msg.name}:</strong> {msg.text}
      </span>
    </div>
  );
};

// ─── Purchase Toast Component ──────────────────────────────────────
const PurchaseToast = ({ toast }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 50);
    const t2 = setTimeout(() => setShow(false), 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      background: '#0f0f0f',
      border: '1px solid #1a1a1a',
      borderLeft: '3px solid #dc2626',
      borderRadius: 10, padding: '10px 12px',
      display: 'flex', alignItems: 'center', gap: 10,
      transform: show ? 'translateY(0)' : 'translateY(80px)',
      opacity: show ? 1 : 0,
      transition: 'transform .35s cubic-bezier(.34,1.56,.64,1), opacity .35s ease',
    }}>
      <div style={{
        width: 33, height: 33, borderRadius: '50%',
        background: toast.col.bg, border: `1px solid ${toast.col.border}`,
        color: toast.col.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, flexShrink: 0,
      }}>
        {toast.name[0]}
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 1 }}>
          {toast.name} just purchased
        </div>
        <div style={{ fontSize: 10, color: '#555' }}>{toast.msg}</div>
      </div>
    </div>
  );
};

// ─── Toast Manager ─────────────────────────────────────────────────
const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = () => {
    const name = rand(NAMES);
    const cardName = rand(CARD_NAMES);
    const msg = rand(PURCHASE_MSGS)(name, cardName);
    const col = rand(AVATAR_COLORS);
    const id = Date.now();

    setToasts(prev => [...prev.slice(-1), { id, name, msg, col }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5200);
  };

  useEffect(() => {
    const t1 = setTimeout(() => {
      addToast();
      const schedule = () => {
        const delay = 5000 + Math.random() * 7000; // 5–12s random
        setTimeout(() => { addToast(); schedule(); }, delay);
      };
      schedule();
    }, 2000);
    return () => clearTimeout(t1);
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 14, left: 12, right: 12,
      zIndex: 50, display: 'flex', flexDirection: 'column', gap: 8,
      pointerEvents: 'none',
    }}>
      {toasts.map(t => <PurchaseToast key={t.id} toast={t} />)}
    </div>
  );
};

// ─── Main App ──────────────────────────────────────────────────────
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
          USDC<span style={{ color: '#dc2626' }}>CARDS</span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          border: '1px solid #14532d55', background: '#052e1644',
          padding: '4px 10px', borderRadius: 20,
          fontSize: 9, fontWeight: 700, color: '#22c55e', letterSpacing: 1,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          SECURE SERVER
        </div>
      </div>

      {/* Live ticker */}
      <LiveBar />

      {/* Cards */}
      <div style={{ padding: '8px 12px 110px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        {cards.map(card => (
          <CardItem key={card.id} card={card} onBuy={openPayment} />
        ))}
      </div>

      <PaymentModal isOpen={modalData.isOpen} onClose={closePayment} card={modalData.card} />
      <ToastManager />
    </div>
  );
};

export default App;