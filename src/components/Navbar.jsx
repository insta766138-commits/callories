import React, { useState } from 'react';
import { Hash, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, darkMode, setDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Tool', id: 'tool' },
    { name: 'Blog', id: 'blog' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="glass-panel" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        zIndex: 1000,
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-color) 0%, #a855f7 100%)',
              color: 'white',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Hash size={20} strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              color: 'var(--text-primary)'
            }}>
              Hash<span style={{ color: 'var(--accent-color)' }}>Craft</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <div style={{ display: 'flex', gap: '24px' }}>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    color: currentPage === link.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '8px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  className="nav-link-btn"
                >
                  {link.name}
                  {currentPage === link.id && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--accent-color)',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color var(--transition-fast)',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => handleNavClick('tool')}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
              >
                Generate Free
              </button>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div style={{ display: 'none', alignItems: 'center', gap: '12px' }} className="mobile-nav-trigger">
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '8px',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent page content overlap */}
      <div className="nav-spacer" />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--bg-primary)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '24px',
          borderTop: '1px solid var(--border-color)'
        }} className="mobile-drawer fade-in">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  textAlign: 'left',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-color)',
                  color: currentPage === link.id ? 'var(--accent-color)' : 'var(--text-primary)'
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick('tool')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'auto', padding: '14px' }}
          >
            Start Generating
          </button>
        </div>
      )}

      {/* Injecting CSS media query since we use vanilla styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-nav-trigger {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
