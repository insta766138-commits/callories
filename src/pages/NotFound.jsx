import React from 'react';
import { Home, Compass, AlertCircle } from 'lucide-react';

export default function NotFound({ setCurrentPage }) {
  return (
    <div className="section-padding fade-in" style={{
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="glass-panel" style={{
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          boxShadow: 'var(--shadow-lg)'
        }}>
          {/* Visual Indicator */}
          <div style={{
            position: 'relative',
            display: 'inline-flex'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              backgroundColor: 'var(--accent-light)',
              color: 'var(--accent-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Compass size={40} className="spin-slow" />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              backgroundColor: 'var(--danger-color)',
              color: '#ffffff',
              borderRadius: '50%',
              padding: '4px',
              display: 'flex'
            }}>
              <AlertCircle size={16} />
            </div>
          </div>

          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              fontWeight: 800,
              color: 'var(--accent-color)',
              display: 'block',
              lineHeight: '1'
            }}>
              404
            </span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              display: 'block',
              marginTop: '8px'
            }}>
              #PageNotFound
            </span>
          </div>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.5'
          }}>
            The route you are trying to reach has not been indexed, or the URL address contains a spelling error.
          </p>

          <button
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px' }}
          >
            <Home size={16} /> Return to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spinSlow 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
