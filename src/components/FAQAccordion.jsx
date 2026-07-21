import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How does HashCraft generate hashtags?',
      answer: 'HashCraft takes your core keywords and runs them through our platform-optimized tag generator. It uses common prefixes, suffixes, and synonyms, and combines them with essential high-priority platform tags to create a diversified hashtag set (covering high, medium, and low competitiveness).'
    },
    {
      question: 'Why does the number of hashtags change depending on the platform?',
      answer: 'Each social platform\'s algorithm treats hashtags differently. For example, X (Twitter) performs best with 1-3 highly relevant hashtags and has strict character limits. Instagram allows up to 30 and rewards category saturation. TikTok performs best with a small set of short, community tags (4-8). HashCraft applies these best practices automatically.'
    },
    {
      question: 'Is HashCraft completely free to use?',
      answer: 'Yes! HashCraft is 100% free with no registration or subscription required. You can generate, regenerate, copy, favorite, and share as many hashtags as you need.'
    },
    {
      question: 'Does HashCraft store my search history or data on servers?',
      answer: 'No. HashCraft is privacy-first. We do not run any user accounts or backends. Your favorites, search history, and dark mode preferences are stored 100% locally on your computer using browser Local Storage.'
    },
    {
      question: 'How do I use the multi-keyword bulk generator?',
      answer: 'In the generator, you can type multiple keywords separated by commas (e.g. "fitness, yoga, workout"). HashCraft will generate tags for all of these simultaneously and group them cleanly. You can copy them individually, copy all, or download them as a .txt or .csv file.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
      {faqs.map((faq, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              overflow: 'hidden',
              transition: 'all var(--transition-fast)'
            }}
          >
            <button
              onClick={() => toggleFAQ(idx)}
              style={{
                width: '100%',
                padding: '20px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '1.05rem',
                color: isOpen ? 'var(--accent-color)' : 'var(--text-primary)'
              }}
            >
              <span>{faq.question}</span>
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            
            {isOpen && (
              <div 
                style={{
                  padding: '0 24px 20px 24px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}
                className="fade-in"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
