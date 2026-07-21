import React, { useState } from 'react';
import { Hash, Send } from 'lucide-react';
import { 
  YoutubeIcon, TiktokIcon, TwitterIcon, InstagramIcon, 
  SnapchatIcon, FacebookIcon, LinkedinIcon, PinterestIcon 
} from './SocialIcons';

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNav = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const platforms = [
    { icon: YoutubeIcon, color: '#FF0000', hoverClass: 'brand-hover-youtube', label: 'YouTube' },
    { icon: TiktokIcon, color: '#00f2fe', hoverClass: 'brand-hover-tiktok', label: 'TikTok' },
    { icon: TwitterIcon, color: '#1DA1F2', hoverClass: 'brand-hover-twitter', label: 'X (Twitter)' },
    { icon: InstagramIcon, color: '#E1306C', hoverClass: 'brand-hover-instagram', label: 'Instagram' },
    { icon: SnapchatIcon, color: '#FFFC00', hoverClass: 'brand-hover-snapchat', label: 'Snapchat' },
    { icon: FacebookIcon, color: '#1877F2', hoverClass: 'brand-hover-facebook', label: 'Facebook' },
    { icon: LinkedinIcon, color: '#0A66C2', hoverClass: 'brand-hover-linkedin', label: 'LinkedIn' },
    { icon: PinterestIcon, color: '#BD081C', hoverClass: 'brand-hover-pinterest', label: 'Pinterest' }
  ];

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '80px 0 32px 0',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr 1fr 1fr',
          gap: '40px',
          marginBottom: '64px'
        }} className="footer-grid">
          
          {/* Column 1: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => handleNav('home')}>
              <div style={{
                background: 'linear-gradient(135deg, var(--accent-color) 0%, #a855f7 100%)',
                color: 'white',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Hash size={18} strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--text-primary)'
              }}>
                Hash<span style={{ color: 'var(--accent-color)' }}>Craft</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
              Maximize your organic discoverability across major social platforms. HashCraft helps you curate, optimize, and organize high-performing hashtags tailored to each specific network.
            </p>
            
            {/* Platform Hover List */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              {platforms.map((plat, idx) => {
                const IconComponent = plat.icon;
                return (
                  <button
                    key={idx}
                    className={`plat-icon-btn ${plat.hoverClass}`}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all var(--transition-fast)'
                    }}
                    title={plat.label}
                    onClick={() => handleNav('tool')}
                  >
                    <IconComponent size={16} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <button onClick={() => handleNav('home')} style={{ textAlign: 'left' }} className="footer-link">Home</button>
              <button onClick={() => handleNav('tool')} style={{ textAlign: 'left' }} className="footer-link">Hashtag Generator</button>
              <button onClick={() => handleNav('blog')} style={{ textAlign: 'left' }} className="footer-link">Blog Articles</button>
              <button onClick={() => handleNav('about')} style={{ textAlign: 'left' }} className="footer-link">About Us</button>
              <button onClick={() => handleNav('contact')} style={{ textAlign: 'left' }} className="footer-link">Contact Support</button>
            </div>
          </div>

          {/* Column 3: Legal Pages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Legal Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
              <button onClick={() => handleNav('legal-privacy')} style={{ textAlign: 'left' }} className="footer-link">Privacy Policy</button>
              <button onClick={() => handleNav('legal-terms')} style={{ textAlign: 'left' }} className="footer-link">Terms & Conditions</button>
              <button onClick={() => handleNav('legal-cookies')} style={{ textAlign: 'left' }} className="footer-link">Cookie Policy</button>
              <button onClick={() => handleNav('legal-disclaimer')} style={{ textAlign: 'left' }} className="footer-link">Disclaimer</button>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', letterSpacing: '0.5px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Stay Updated
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              Get our monthly digest on social media updates, algorithm shifts, and hashtag optimization tips.
            </p>
            <form onSubmit={handleSubscribe} style={{ position: 'relative' }}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  bottom: '6px',
                  width: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--accent-color)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <span style={{ fontSize: '0.8rem', color: 'var(--success-color)', fontWeight: 500 }} className="fade-in">
                ✓ Success! Check your inbox.
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingMinutes: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-tertiary)', paddingTop: '24px' }} className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} HashCraft. Built for creators. All rights reserved.</span>
          <span style={{ display: 'flex', gap: '16px' }}>
            <span>No account required</span>
            <span>&bull;</span>
            <span>100% Free Tool</span>
          </span>
        </div>
      </div>

      <style>{`
        .footer-link {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--accent-color);
        }
        .plat-icon-btn:hover {
          background-color: var(--bg-tertiary) !important;
          border-color: currentColor !important;
          transform: scale(1.05);
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
