import React from 'react';
import { trendingTickerTags } from '../utils/trendingData';
import { Flame } from 'lucide-react';

export default function TrendingTicker({ onTagClick }) {
  // Double the list to make the infinite loop layout complete
  const items = [...trendingTickerTags, ...trendingTickerTags];

  return (
    <div style={{
      borderTop: '1px solid var(--border-color)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-secondary)',
      padding: '16px 0',
      width: '100%',
      position: 'relative'
    }}>
      <div className="ticker-container" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          background: 'linear-gradient(to right, var(--bg-secondary) 20%, transparent 100%)',
          width: '80px',
          zIndex: 2,
          pointerEvents: 'none'
        }} />
        
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          background: 'linear-gradient(to left, var(--bg-secondary) 20%, transparent 100%)',
          width: '80px',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        <div className="ticker-track">
          {items.map((tag, idx) => (
            <div
              key={idx}
              className="ticker-item"
              onClick={() => onTagClick(tag)}
            >
              <Flame size={15} style={{ color: 'var(--accent-color)' }} />
              <span>#{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
