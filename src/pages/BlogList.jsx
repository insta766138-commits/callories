import React, { useState } from 'react';
import { blogPosts } from '../utils/blogData';
import BlogCard from '../components/BlogCard';

export default function BlogList({ onPostClick }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'YouTube', 'TikTok', 'X (Twitter)', 'Instagram', 'Snapchat', 'General'];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="section-padding fade-in" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
            HashCraft Blog
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Stay ahead of algorithm updates. Expert tips, tricks, and strategies on hashtag research and social media organic optimization.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-tertiary)' }}>
            No articles found in this category. Check back soon!
          </div>
        ) : (
          <div className="grid-cards">
            {filteredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
