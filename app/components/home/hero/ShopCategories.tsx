'use client';

import { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────
type Category = {
  title: string;
  desc: string;
  href: string;
  image: string;
  cta: string;
  iconEmoji: string;
};

// ── Data ───────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  {
    title: 'USED ENGINES',
    desc: 'Low mileage, high performance engines. Tested and inspected.',
    href: '/used-engine',
    image: '/images/engine.jpg',
    cta: 'Explore Engines',
    iconEmoji: '🔧',
  },
  {
    title: 'USED TRANSMISSIONS',
    desc: 'Quality transmissions for car, truck, and SUV. Ready to ship.',
    href: '/used-transmission',
    image: '/images/transmission.jpg',
    cta: 'Explore Transmissions',
    iconEmoji: '⚙️',
  },
  {
    title: 'COMMERCIAL VEHICLES',
    desc: 'Dependable used trucks and commercial vehicles for sale.',
    href: '/commercial-vehicles',
    image: '/images/commercial.jpg',
    cta: 'Explore Commercial',
    iconEmoji: '🚚',
  },
];

// ── Card ───────────────────────────────────────────────────────────
function CategoryCard({ cat }: { cat: Category }) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={cat.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: '6px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.30)'
          : '0 2px 12px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        cursor: 'pointer',
      }}
    >
      {/* ── Full-bleed Product Image (no padding, fills card width) ── */}
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        overflow: 'hidden',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {!imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={cat.image}
            alt={cat.title}
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
        ) : (
          <span style={{ fontSize: '80px', lineHeight: 1 }}>{cat.iconEmoji}</span>
        )}
      </div>

      {/* ── White text body below image ── */}
      <div style={{
        background: '#ffffff',
        padding: '16px 18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
      }}>
        {/* Title */}
        <h3 style={{
          margin: 0,
          fontSize: '15px',
          fontWeight: '900',
          color: '#111111',
          fontFamily: "'Barlow Condensed', 'Oswald', 'Arial Narrow', sans-serif",
          letterSpacing: '0.08em',
          lineHeight: 1.15,
          textTransform: 'uppercase',
        }}>
          {cat.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: 0,
          fontSize: '12.5px',
          color: '#444444',
          lineHeight: 1.55,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          flex: 1,
        }}>
          {cat.desc}
        </p>

        {/* CTA */}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          color: '#c0392b',
          fontSize: '13px',
          fontWeight: '700',
          fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
          letterSpacing: '0.04em',
          textDecoration: 'none',
          marginTop: '4px',
          textTransform: 'none',
        }}>
          {cat.cta} <span style={{ fontSize: '15px', lineHeight: 1 }}>→</span>
        </span>
      </div>
    </a>
  );
}

// ── Named export ───────────────────────────────────────────────────
export function ShopCategories() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Oswald:wght@600;700&family=Barlow:wght@400;600&display=swap');

        /* ── Section ── */
        .shop-section {
          position: relative;
          padding: 50px 24px 58px;
          background-image: url('/images/bg.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Overlay — matches the grungy muted tone from screenshot 2 */
        .shop-section::before {
          content: '';
          position: absolute;
          inset: 0;
         background: rgba(200, 195, 183, 0.25);
          pointer-events: none;
          z-index: 0;
        }

        .shop-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .shop-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .shop-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .shop-line {
          height: 2px;
          background: #555;
          flex: 1;
          max-width: 200px;
        }

        .shop-title {
          font-family: 'Barlow Condensed', 'Oswald', sans-serif;
          font-size: clamp(18px, 3vw, 28px);
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #111;
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0;
        }

        .shop-title .red {
          color: #c0392b;
        }

        .shop-subtitle {
          font-family: 'Barlow', sans-serif;
          font-size: 13.5px;
          color: #444;
          font-weight: 400;
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── Grid ── */
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          width: 100%;
        }

        /* Tablet: 2 cols */
        @media (max-width: 860px) {
          .shop-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .shop-line { max-width: 80px; }
        }

        /* Mobile: 1 col */
        @media (max-width: 540px) {
          .shop-grid {
            grid-template-columns: 1fr;
          }
          .shop-section {
            padding: 34px 14px 42px;
          }
          .shop-line { max-width: 40px; }
          .shop-title { font-size: 17px; }
        }

        /* XL: wider lines */
        @media (min-width: 1200px) {
          .shop-line { max-width: 260px; }
        }
      `}</style>

      <section className="shop-section">
        <div className="shop-inner">

          {/* Header */}
          <div className="shop-header">
            <div className="shop-title-row">
              <div className="shop-line" />
              <h2 className="shop-title">
                — SHOP BY <span className="red">CATEGORY</span> —
              </h2>
              <div className="shop-line" />
            </div>
            <p className="shop-subtitle">
              Find the perfect engine or transmission for your vehicle.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="shop-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.href} cat={cat} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default ShopCategories;
