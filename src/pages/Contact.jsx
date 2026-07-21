import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Share2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    platform: 'Instagram',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log('Mock Contact Form Submission:', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        platform: 'Instagram',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
            Contact Support
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have a question about our generation logic, an algorithm update report, or a business suggestion? Drop us a line.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '48px',
          maxWidth: '960px',
          margin: '0 auto'
        }} className="contact-grid">
          
          {/* LEFT: Contact Form */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }} className="scale-in">
                <CheckCircle2 size={48} style={{ color: 'var(--success-color)' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Message Received!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '320px' }}>
                  Thank you for reaching out. The HashCraft support team will review your ticket and reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }} className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }} className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-subj">Subject</label>
                    <select
                      id="contact-subj"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Business Partnership">Partnership</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-plat">Primary Platform</label>
                    <select
                      id="contact-plat"
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      className="form-control"
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="YouTube">YouTube</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Other">Other / All</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="contact-msg">Message</label>
                  <textarea
                    id="contact-msg"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="How can we help you?"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Contact Information Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Contact Info</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Feel free to contact us directly or connect through our social channels.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={16} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>EMAIL</span>
                    <a href="mailto:support@hashcraft.io" style={{ fontSize: '0.9rem', fontWeight: 600 }} className="footer-link">
                      support@hashcraft.io
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MessageSquare size={16} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>COMMUNITY</span>
                    <a href="#" style={{ fontSize: '0.9rem', fontWeight: 600 }} className="footer-link">
                      Discord Channel
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-light)',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Share2 size={16} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>SOCIALS</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>@HashCraftApp</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', backgroundColor: 'var(--bg-secondary)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Response Time</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                We typically respond within 24 hours during business days. Thank you for patience!
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
