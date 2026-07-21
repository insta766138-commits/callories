import React, { useState } from 'react';
import TrendingTicker from '../components/TrendingTicker';
import FAQAccordion from '../components/FAQAccordion';
import { 
  ArrowRight, Search, Hash, ShieldCheck, Zap, 
  Award, TrendingUp, Sparkles
} from 'lucide-react';
import { 
  YoutubeIcon, TiktokIcon, TwitterIcon, InstagramIcon, 
  SnapchatIcon, FacebookIcon, LinkedinIcon, PinterestIcon 
} from '../components/SocialIcons';

export default function Home({ setCurrentPage, setGeneratorParams }) {
  const [heroKeywords, setHeroKeywords] = useState('');
  const [heroPlatform, setHeroPlatform] = useState('instagram');

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (heroKeywords.trim()) {
      setGeneratorParams({
        keywords: heroKeywords.trim(),
        platform: heroPlatform
      });
      setCurrentPage('tool');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTickerTagClick = (tag) => {
    setGeneratorParams({
      keywords: tag.toLowerCase(),
      platform: 'instagram'
    });
    setCurrentPage('tool');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const platforms = [
    { icon: YoutubeIcon, name: 'YouTube', desc: '5-15 tags. Broad, niche, and YouTube-specific video routing.', color: '#FF0000', hoverClass: 'brand-hover-youtube' },
    { icon: TiktokIcon, name: 'TikTok', desc: '4-8 tags. Short, community-centric tags to rank on For You feeds.', color: '#00f2fe', hoverClass: 'brand-hover-tiktok' },
    { icon: TwitterIcon, name: 'X (Twitter)', desc: '1-3 tags max. Laser-focused hashtags keeping character counts low.', color: '#1DA1F2', hoverClass: 'brand-hover-twitter' },
    { icon: InstagramIcon, name: 'Instagram', desc: '15-30 tags. Deep ladder saturation to rank across competition tiers.', color: '#E1306C', hoverClass: 'brand-hover-instagram' },
    { icon: SnapchatIcon, name: 'Snapchat', desc: '3-5 tags. Playful, location-based, and discovery spotlight tags.', color: '#FFFC00', hoverClass: 'brand-hover-snapchat' },
    { icon: FacebookIcon, name: 'Facebook', desc: '2-5 tags. Broad categories focused on organic share reach.', color: '#1877F2', hoverClass: 'brand-hover-facebook' },
    { icon: LinkedinIcon, name: 'LinkedIn', desc: '3-5 tags. Professional, industry, and network-growth keywords.', color: '#0A66C2', hoverClass: 'brand-hover-linkedin' },
    { icon: PinterestIcon, name: 'Pinterest', desc: '10-20 tags. Heavy search SEO descriptive tags for boards.', color: '#BD081C', hoverClass: 'brand-hover-pinterest' }
  ];

  return (
    <div className="fade-in">
      
      {/* 1. Hero Section */}
      <header className="section-padding" style={{
        background: 'radial-gradient(circle at 80% 20%, var(--accent-light) 0%, transparent 40%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Hero text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="badge" style={{ alignSelf: 'flex-start' }}>
              <Sparkles size={12} style={{ marginRight: '6px' }} /> Powered by Social Algorithms
            </div>
            
            <h1 style={{
              fontSize: '3.5rem',
              lineHeight: '1.15',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-1.5px',
              fontWeight: 800
            }} className="hero-title">
              Craft the Perfect <span className="gradient-text">Hashtags</span> for Every Platform.
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6'
            }}>
              Generate platform-optimized hashtags instantly. Satisfy character limits, target low-competition niches, and skyrocket your organic reach across major networks.
            </p>

            {/* Quick Generator Box */}
            <form onSubmit={handleHeroSubmit} className="glass-panel" style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ display: 'flex', gap: '8px' }} className="hero-form-inputs">
                <div style={{ position: 'relative', flexGrow: 1 }}>
                  <Search size={18} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '14px',
                    color: 'var(--text-tertiary)'
                  }} />
                  <input
                    type="text"
                    required
                    placeholder="Enter keyword (e.g. food, tech)"
                    value={heroKeywords}
                    onChange={(e) => setHeroKeywords(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 42px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-primary)',
                      fontSize: '0.95rem'
                    }}
                  />
                </div>
                <select
                  value={heroPlatform}
                  onChange={(e) => setHeroPlatform(e.target.value)}
                  style={{
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">X (Twitter)</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="pinterest">Pinterest</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Generate Hashtags <ArrowRight size={16} />
              </button>
            </form>
          </div>

          {/* Hero Visual Mockup */}
          <div style={{ display: 'flex', justifyContent: 'center' }} className="hero-visual">
            <div className="glass-panel" style={{
              padding: '24px',
              width: '100%',
              maxWidth: '480px',
              boxShadow: 'var(--shadow-lg)',
              transform: 'rotate(1deg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Fake UI */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginLeft: '12px', fontWeight: 600 }}>instagram_optimiser.config</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['SocialMedia', 'DigitalMarketing', 'ContentCreator', 'SEO2026', 'BrandingTips', 'Startups', 'GraphicDesign', 'Innovation', 'GrowthHacking'].map((tag, idx) => (
                  <span key={idx} style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    backgroundColor: idx % 3 === 0 ? 'var(--accent-light)' : 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    color: idx % 3 === 0 ? 'var(--accent-color)' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <span>⚡ Platform Optimised: 15-30 tags</span>
                <span>📋 Ready to Copy</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. Trending Ticker */}
      <div style={{ padding: '24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '12px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-tertiary)', fontWeight: 700 }}>
          ⚡ Trending Now
        </div>
        <TrendingTicker onTagClick={handleTickerTagClick} />
      </div>

      {/* 3. How It Works Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              How It Works in 3 Simple Steps
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Generate highly categorized, platform-safe tags without running complex scripts or registrations.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '32px'
          }} className="how-it-works-grid">
            
            {/* Step 1 */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Input Keywords</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Enter one or more terms representing your video or picture. Separate multiple concepts with commas for bulk output.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Select Platform</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Choose from 8 social networks. Our system automatically applies rules targeting specific character and post counts.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-primary)' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.25rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Export & Copy</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Click chips to copy individual tags, use "Copy All" for the entire set, or export to CSV / TXT for content planners.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Platform Showcase Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Optimized for Every Network
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Different networks, different guidelines. HashCraft knows exactly what each algorithm wants.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }} className="platform-grid">
            {platforms.map((plat, idx) => {
              const IconComponent = plat.icon;
              return (
                <div
                  key={idx}
                  className="hover-card"
                  style={{
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setGeneratorParams({ keywords: 'trending', platform: plat.name.toLowerCase().replace(/ \(.+\)/, '') });
                    setCurrentPage('tool');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className={plat.hoverClass} style={{
                    color: 'var(--text-tertiary)',
                    transition: 'color var(--transition-fast)'
                  }}>
                    <IconComponent size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{plat.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{plat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Stats / Review Section */}
      <section className="section-padding" style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '32px',
            textAlign: 'center'
          }} className="stats-grid">
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', fontFamily: 'var(--font-display)' }}>10M+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Hashtags Curated</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', fontFamily: 'var(--font-display)' }}>150K+</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Monthly Users</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', fontFamily: 'var(--font-display)' }}>4.9/5</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Creator Satisfaction</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-color)', fontFamily: 'var(--font-display)' }}>100%</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Privacy Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              Quick answers about platform rules, storage, and hashtag generation.
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="section-padding" style={{
        background: 'linear-gradient(135deg, var(--accent-color) 0%, #7c3aed 100%)',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'white' }}>
            Ready to Craft Your Next Viral Campaign?
          </h2>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', color: 'rgba(255,255,255,0.85)' }}>
            Stop guessing hashtag allocations. Generate perfectly optimized, platform-compliant tag sets in seconds.
          </p>
          <button
            onClick={() => {
              setCurrentPage('tool');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-secondary"
            style={{
              backgroundColor: 'white',
              color: 'var(--accent-color)',
              border: 'none',
              padding: '14px 28px',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            Start Generating Free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-visual {
            display: none !important;
          }
          .hero-title {
            font-size: 2.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .how-it-works-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-form-inputs {
            flex-direction: column !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
