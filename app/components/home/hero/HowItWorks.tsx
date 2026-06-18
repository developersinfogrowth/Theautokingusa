'use client';

import { STEPS } from '@/app/components/home.constants';

/**
 * HowItWorks
 * 4-step numbered process with bg.jpg background matching screenshot
 */
export function HowItWorks() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600&display=swap');

        /* ── Section ── */
        .how-it-works-section {
          position: relative;
          padding: 50px 24px 58px;
          background-image: url('/images/bg.jpg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        }

        /* Overlay to ensure text readability */
        .how-it-works-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(200, 195, 183, 0.45);
          pointer-events: none;
          z-index: 0;
        }

        .how-it-works-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .how-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .how-title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .how-line {
          height: 2px;
          background: #555;
          flex: 1;
          max-width: 200px;
        }

        .how-title {
          font-family: 'Barlow Condensed', 'Oswald', sans-serif;
          font-size: clamp(18px, 3vw, 28px);
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #111;
          text-transform: uppercase;
          white-space: nowrap;
          margin: 0;
        }

        .how-title .red {
          color: #c0392b;
        }

        .how-dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 8px;
        }

        .how-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #888;
        }

        /* ── Steps Grid ── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }

        /* Step card */
        .step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        /* Connector dotted arrow between steps */
        .step-connector {
          position: absolute;
          top: 50px;
          left: calc(50% + 36px);
          width: calc(100% - 72px);
          height: 2px;
          background-image: repeating-linear-gradient(
            to right,
            #999 0px,
            #999 4px,
            transparent 4px,
            transparent 8px
          );
          z-index: 0;
        }

        .step-connector::after {
          content: '';
          position: absolute;
          right: -6px;
          top: -3px;
          width: 0;
          height: 0;
          border-left: 6px solid #999;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
        }

        /* Number badge */
        .step-number {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,243,238,0.95) 100%);
          border: 3px solid #c0392b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 28px;
          font-weight: 900;
          color: #c0392b;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        /* Icon inside number */
        .step-icon {
          font-size: 28px;
          color: #444;
        }

        /* Step title */
        .step-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #111;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }

        /* Step description */
        .step-desc {
          font-family: 'Barlow', sans-serif;
          font-size: 12.5px;
          color: #444;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 20px;
          }
          .step-connector {
            display: none;
          }
          .how-line { max-width: 80px; }
        }

        @media (max-width: 540px) {
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .how-it-works-section {
            padding: 36px 16px 44px;
          }
          .how-line { max-width: 40px; }
          .how-title { font-size: 17px; }
          .step-number {
            width: 56px;
            height: 56px;
            font-size: 24px;
          }
        }

        @media (min-width: 1200px) {
          .how-line { max-width: 260px; }
        }
      `}</style>

      <section className="how-it-works-section">
        <div className="how-it-works-inner">

          {/* Header */}
          <div className="how-header">
            <div className="how-title-row">
              <div className="how-line" />
              <h2 className="how-title">
                — HOW IT <span className="red">WORKS</span> —
              </h2>
              <div className="how-line" />
            </div>
            <div className="how-dots">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* Steps */}
          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <div key={step.n} className="step-card">
                {/* Dotted connector arrow (desktop only, between steps) */}
                {i < STEPS.length - 1 && (
                  <div className="step-connector" />
                )}

                {/* Number badge with icon */}
                <div className="step-number">
                  {step.n}
                </div>

                {/* Icon below number */}
                <i className={`ti ${step.icon} step-icon`} aria-hidden="true" />

                {/* Title */}
                <h3 className="step-title">{step.title}</h3>

                {/* Description */}
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}