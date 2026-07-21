import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, CheckSquare, AlertTriangle } from 'lucide-react';

export default function Legal({ initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const tabs = [
    { id: 'privacy', name: 'Privacy Policy', icon: ShieldCheck },
    { id: 'terms', name: 'Terms of Service', icon: FileText },
    { id: 'cookies', name: 'Cookie Policy', icon: CheckSquare },
    { id: 'disclaimer', name: 'Disclaimer', icon: AlertTriangle }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return (
          <div className="fade-in">
            <h2>Privacy Policy</h2>
            <p className="legal-date">Last Updated: July 20, 2026</p>
            <p>At HashCraft, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by HashCraft and how we use it.</p>
            
            <h3>1. Zero Server Storage Policy</h3>
            <p>HashCraft operates entirely on the client-side. We do not require account creation, email logging, or registration to use our hashtag generator. Any configurations, history logs, search strings, or saved favorites remain inside your browser's local storage (Local Storage) and are never sent to, read, or stored on our servers.</p>

            <h3>2. Local Storage Usage</h3>
            <p>We use local storage elements to save your search history logs (maximum of 10 items) and your favorited hashtag sets. You can clear this data at any time from your browser settings or by clicking the "Clear" buttons inside the dashboard panel.</p>

            <h3>3. Log Files</h3>
            <p>Like most static websites, our hosting provider may collect standard server logs which include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any information that is personally identifiable and are used solely for infrastructure scaling and security operations.</p>

            <h3>4. Consent</h3>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
          </div>
        );
      case 'terms':
        return (
          <div className="fade-in">
            <h2>Terms & Conditions</h2>
            <p className="legal-date">Last Updated: July 20, 2026</p>
            <p>Welcome to HashCraft. By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
            
            <h3>1. Permitted Use</h3>
            <p>HashCraft is a free hashtag generator tool offered for personal and commercial content planning. You are permitted to generate, copy, and export hashtags for your social channels. You must not use this tool to spam, scrape, or flood social networks, or execute automated script hits that degrade the service quality for other users.</p>

            <h3>2. Intellectual Property</h3>
            <p>The code repository, logo, styles, and blog articles are the intellectual property of HashCraft. You may not replicate, modify, or resell the visual assets or source code of HashCraft without explicit authorization.</p>

            <h3>3. Limitation of Liability</h3>
            <p>HashCraft is provided "as is" without warranty of any kind. We do not guarantee that the tool will be uninterrupted, error-free, or compatible with all social media platform updates. We are not liable for any account actions, penalties, shadowbans, or reach drops you encounter on third-party platforms (such as Instagram or TikTok) following hashtag utilization.</p>
          </div>
        );
      case 'cookies':
        return (
          <div className="fade-in">
            <h2>Cookie Policy</h2>
            <p className="legal-date">Last Updated: July 20, 2026</p>
            <p>This policy details how HashCraft utilizes cookies and local storage state elements to deliver a premium user interface.</p>

            <h3>1. What are Cookies?</h3>
            <p>Cookies are small text files stored by your browser when you visit websites. Unlike traditional apps, HashCraft uses minimal cookies and relies primarily on client-side Local Storage to persist your UI choices.</p>

            <h3>2. Local Storage Variables We Use</h3>
            <ul>
              <li><strong>hashcraft_theme:</strong> Persists your light/dark mode preference so the site loads correctly on subsequent visits.</li>
              <li><strong>hashcraft_favs:</strong> Keeps your saved hashtag packages safe on your hard drive.</li>
              <li><strong>hashcraft_hist:</strong> Records recent keyword parameters so you can quickly re-generate past sets.</li>
            </ul>

            <h3>3. Managing Storage</h3>
            <p>You can choose to disable or selectively wipe local storage items via your web browser configuration. Note that blocking local storage will disable the Favorite and Recent Searches panels in the generator.</p>
          </div>
        );
      case 'disclaimer':
        return (
          <div className="fade-in">
            <h2>Disclaimer</h2>
            <p className="legal-date">Last Updated: July 20, 2026</p>
            <p>The information and suggestions provided by HashCraft are for general content optimization purposes only.</p>

            <h3>1. No Guarantee of Performance</h3>
            <p>Social media algorithms are dynamic, proprietary, and change without public notice. While HashCraft uses general platform guidelines (such as tag ratios, character ceilings, and low/high volume spreads), we do not guarantee specific marketing metrics, traffic increments, engagement percentages, or viral posts. Your organic growth relies on content quality, viewer retention, and overall profile optimization.</p>

            <h3>2. Third-Party Brand Affiliation</h3>
            <p>HashCraft is an independent tool. We are not endorsed, sponsored, affiliated, or officially connected with Instagram, Meta Platforms Inc., ByteDance, TikTok, YouTube, Google LLC, Snapchat, Snap Inc., LinkedIn Corporation, Microsoft, Pinterest, or X Corp. All product and company names are trademarks of their respective owners.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container" style={{ maxWidth: '1024px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gap: '40px'
        }} className="legal-grid">
          
          {/* Side Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="legal-menu">
            {tabs.map(tab => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--accent-color)' : 'transparent',
                    color: isActive ? 'var(--accent-color)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="legal-menu-btn"
                >
                  <TabIcon size={16} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Policy Text Area */}
          <div className="glass-panel" style={{ padding: '40px 48px' }} className="legal-text-panel glass-panel">
            <div className="legal-styled-content">
              {renderContent()}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .legal-styled-content h2 {
          font-size: 2rem;
          font-family: var(--font-display);
          margin-bottom: 8px;
        }
        .legal-date {
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 24px;
          font-weight: 500;
        }
        .legal-styled-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 28px 0 12px 0;
        }
        .legal-styled-content p {
          margin-bottom: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .legal-styled-content ul {
          margin-left: 20px;
          margin-bottom: 20px;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .legal-styled-content li {
          margin-bottom: 8px;
        }
        .legal-styled-content code {
          background-color: var(--bg-secondary);
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          color: var(--accent-color);
        }
        .legal-menu-btn:hover {
          background-color: var(--bg-secondary) !important;
        }
        @media (max-width: 768px) {
          .legal-grid {
            grid-template-columns: 1fr !important;
          }
          .legal-menu {
            flex-direction: row !important;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .legal-menu-btn {
            white-space: nowrap;
          }
          .legal-text-panel {
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
