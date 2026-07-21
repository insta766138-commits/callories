import React from 'react';
import { Target, HeartHandshake, EyeOff, Sparkles, Hash } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Target,
      title: 'Targeted Growth',
      desc: 'We analyze platform specific API guidelines and algorithm research to map tag volumes matching low, medium, and high competition tiers.'
    },
    {
      icon: HeartHandshake,
      title: 'Built for Creators',
      desc: 'Whether you write articles on LinkedIn, film clips on TikTok, or post reels on Instagram, HashCraft delivers compliant configurations.'
    },
    {
      icon: EyeOff,
      title: 'Privacy Centric',
      desc: 'We do not run tracking cookies, server storage databases, or account portals. Your search history and favorites live 100% on your machine.'
    }
  ];

  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
            About HashCraft
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            We design minimalist utility tools for content creators, digital marketers, and small business owners.
          </p>
        </div>

        {/* Brand Mission block */}
        <div className="glass-panel" style={{
          padding: '48px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '64px'
        }} className="about-hero">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)' }}>
              The HashCraft Mission
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Organic visibility on social media is increasingly dictated by search engine optimization (SEO). Packing generic hashtags like <code>#viral</code> or copy-pasting the same list of 30 tags blocks you from reaching new audiences.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              HashCraft was built in 2026 to simplify this process. We give creators a quick, zero-friction workstation to generate compliant, randomized hashtag clouds that respect character counts and platform guidelines.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <img 
              src="/src/assets/about_graphic.png" 
              alt="Creators Workflow Graphic" 
              style={{
                width: '100%',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-lg)',
                objectFit: 'cover'
              }}
            />
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-light) 0%, rgba(168, 85, 247, 0.1) 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px dashed var(--accent-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '8px'
            }}>
              <Hash size={28} style={{ color: 'var(--accent-color)' }} />
              <span style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-display)' }}>
                100% Client-Side Engine
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                No accounts. No databases. Your search records remain secure in local storage.
              </span>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', textAlign: 'center', marginBottom: '40px' }}>
            Our Core Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '24px'
          }} className="pillars-grid">
            {pillars.map((pil, idx) => {
              const IconComponent = pil.icon;
              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{pil.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{pil.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simple CTA */}
        <div className="glass-panel" style={{
          padding: '40px',
          textAlign: 'center',
          background: 'linear-gradient(to right, var(--bg-secondary), var(--bg-tertiary))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <Sparkles size={24} style={{ color: 'var(--accent-color)' }} />
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Explore our Hashtag Generator</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            Ready to structure your metadata files? Input your first keyword inside our generator page.
          </p>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-hero {
            grid-template-columns: 1fr !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
