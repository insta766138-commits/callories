import React from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Award } from 'lucide-react';
import { blogPosts } from '../utils/blogData';

export default function BlogPost({ post, onBack, onPostClick }) {
  if (!post) return null;

  // Find related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.category === 'General'))
    .slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Article link copied to clipboard!');
  };

  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        {/* Back navigation */}
        <button 
          onClick={onBack} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-tertiary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            marginBottom: '32px'
          }}
          className="btn-text"
        >
          <ArrowLeft size={16} /> Back to Blog List
        </button>

        {/* Article Meta */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <span className="badge">{post.category}</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {post.date}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '2.75rem',
          lineHeight: '1.2',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          marginBottom: '24px'
        }}>
          {post.title}
        </h1>

        {/* Author / Share Strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          borderTop: '1px solid var(--border-color)',
          padding: '16px 0',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-color)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}>
              HC
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>HashCraft Editorial</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Social Algorithms Specialist</span>
            </div>
          </div>
          <button 
            onClick={handleShare}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem' }}
          >
            <Share2 size={14} /> Share Link
          </button>
        </div>

        {/* Gradient Visual Header */}
        <div style={{
          height: '320px',
          background: post.gradient,
          borderRadius: '16px',
          marginBottom: '40px',
          boxShadow: 'var(--shadow-md)'
        }} />

        {/* Article Body Content */}
        <div 
          className="blog-content"
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <div style={{
            marginTop: '64px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '48px'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '24px' }}>
              Recommended Reading
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
            }} className="related-grid">
              {relatedPosts.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onPostClick(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover-card"
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-color)' }}>
                    {p.category}
                  </span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                    {p.title}
                  </h4>
                  <span className="btn-text" style={{ fontSize: '0.85rem', marginTop: 'auto' }}>
                    Read Article &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
      {/* Blog specific styling fixes */}
      <style>{`
        .blog-content p {
          margin-bottom: 24px;
        }
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 32px 0 16px 0;
          color: var(--text-primary);
        }
        .blog-content ul {
          margin-left: 24px;
          margin-bottom: 24px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content code {
          background-color: var(--bg-secondary);
          color: var(--accent-color);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.95em;
        }
        @media (max-width: 576px) {
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
