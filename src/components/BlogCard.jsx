import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ post, onClick }) {
  return (
    <article 
      className="hover-card"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer'
      }}
    >
      {/* Visual Header */}
      <div style={{
        height: '160px',
        background: post.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        color: '#ffffff',
        position: 'relative'
      }}>
        <span style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '4px 10px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(8px)',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.5px'
        }}>
          {post.category}
        </span>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          textAlign: 'center',
          color: '#ffffff',
          lineHeight: '1.3',
          fontFamily: 'var(--font-display)',
          textShadow: '0 2px 4px rgba(0,0,0,0.15)'
        }}>
          {post.title}
        </h3>
      </div>

      {/* Content */}
      <div style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '12px'
      }}>
        {/* Meta Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            {post.readTime}
          </span>
        </div>

        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-secondary)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.5',
          flexGrow: 1
        }}>
          {post.excerpt}
        </p>

        <span className="btn-text" style={{ fontSize: '0.9rem', marginTop: '8px' }}>
          Read Full Article <ArrowRight size={14} />
        </span>
      </div>
    </article>
  );
}
