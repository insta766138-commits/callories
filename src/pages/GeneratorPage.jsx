import React from 'react';
import HashtagGenerator from '../components/HashtagGenerator';
import { Sparkles } from 'lucide-react';

export default function GeneratorPage({ generatorParams }) {
  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div className="badge">
            <Sparkles size={12} style={{ marginRight: '6px' }} /> Pro Hashtag Workstation
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            letterSpacing: '-1px'
          }}>
            Hashtag Generator Studio
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px'
          }}>
            Type keywords, select your platform, and watch our algorithm generate rules-compliant hashtags ready for your post.
          </p>
        </div>

        {/* The Generator Component */}
        <HashtagGenerator 
          initialKeywords={generatorParams?.keywords || ''} 
          initialPlatform={generatorParams?.platform || 'instagram'} 
        />
        
      </div>
    </div>
  );
}
