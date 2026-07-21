import React, { useState, useEffect } from 'react';
import { 
  generateHashtags, platformRules 
} from '../utils/generatorLogic';
import { categorySuggestions } from '../utils/trendingData';
import { 
  Copy, RefreshCw, Heart, Share2, Download, Info, Check, Trash2, Clock
} from 'lucide-react';
import { 
  YoutubeIcon, TiktokIcon, TwitterIcon, InstagramIcon, 
  SnapchatIcon, FacebookIcon, LinkedinIcon, PinterestIcon 
} from './SocialIcons';

export default function HashtagGenerator({ initialKeywords = '', initialPlatform = 'instagram' }) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [platform, setPlatform] = useState(initialPlatform);
  const [generatedTags, setGeneratedTags] = useState([]);
  const [copiedTagIdx, setCopiedTagIdx] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Tech');

  // Load favorites & history from localStorage on mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem('hashcraft_favs');
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
      
      const storedHist = localStorage.getItem('hashcraft_hist');
      if (storedHist) setHistory(JSON.parse(storedHist));
    } catch (e) {
      console.error("Local storage load failed", e);
    }
  }, []);

  // Sync favorites to localStorage
  const saveFavoritesToLocalStorage = (newFavs) => {
    setFavorites(newFavs);
    localStorage.setItem('hashcraft_favs', JSON.stringify(newFavs));
  };

  // Sync history to localStorage
  const saveHistoryToLocalStorage = (newHist) => {
    setHistory(newHist);
    localStorage.setItem('hashcraft_hist', JSON.stringify(newHist));
  };

  // Helper to get platform icon component
  const getPlatformIcon = (platKey, size = 18) => {
    switch (platKey) {
      case 'youtube': return <YoutubeIcon size={size} />;
      case 'tiktok': return <TiktokIcon size={size} />;
      case 'twitter': return <TwitterIcon size={size} />;
      case 'instagram': return <InstagramIcon size={size} />;
      case 'snapchat': return <SnapchatIcon size={size} />;
      case 'facebook': return <FacebookIcon size={size} />;
      case 'linkedin': return <LinkedinIcon size={size} />;
      case 'pinterest': return <PinterestIcon size={size} />;
      default: return <InstagramIcon size={size} />;
    }
  };

  // Handle Tag Generation
  const handleGenerate = (randomize = false) => {
    if (!keywords.trim()) return;

    const tags = generateHashtags(keywords, platform, randomize);
    setGeneratedTags(tags);

    // Save search combination to history
    const historyItem = {
      id: Date.now(),
      keywords: keywords.trim(),
      platform,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Filter duplicates and append
    const updatedHist = [
      historyItem,
      ...history.filter(h => h.keywords.toLowerCase() !== keywords.trim().toLowerCase() || h.platform !== platform)
    ].slice(0, 10); // limit to 10 entries

    saveHistoryToLocalStorage(updatedHist);
  };

  // Check URL query parameters on mount (for shared links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kwParam = params.get('keywords');
    const platParam = params.get('platform');
    
    if (kwParam) {
      setKeywords(kwParam);
      if (platParam && platformRules[platParam]) {
        setPlatform(platParam);
      }
      // Generate immediately if query params exist
      const tags = generateHashtags(kwParam, platParam || 'instagram', false);
      setGeneratedTags(tags);
    }
  }, []);

  // Individual copy handler
  const handleCopyIndividual = (tag, idx) => {
    navigator.clipboard.writeText(`#${tag}`);
    setCopiedTagIdx(idx);
    setTimeout(() => setCopiedTagIdx(null), 1500);
  };

  // Copy All handler
  const handleCopyAll = () => {
    if (generatedTags.length === 0) return;
    const allTagsString = generatedTags.map(t => `#${t}`).join(' ');
    navigator.clipboard.writeText(allTagsString);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Share handler
  const handleShare = () => {
    if (!keywords.trim()) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?keywords=${encodeURIComponent(keywords.trim())}&platform=${platform}`;
    navigator.clipboard.writeText(shareUrl);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  // Add to Favorites
  const handleSaveFavorite = () => {
    if (generatedTags.length === 0) return;
    const favoriteItem = {
      id: Date.now(),
      keywords: keywords.trim(),
      platform,
      tags: generatedTags
    };
    
    // Check if already in favorites
    const isDuplicate = favorites.some(fav => 
      fav.tags.join(',') === generatedTags.join(',')
    );

    if (isDuplicate) return;

    const updatedFavs = [favoriteItem, ...favorites];
    saveFavoritesToLocalStorage(updatedFavs);
  };

  // Load a Saved Favorite
  const handleLoadFavorite = (fav) => {
    setKeywords(fav.keywords);
    setPlatform(fav.platform);
    setGeneratedTags(fav.tags);
  };

  // Delete a Favorite
  const handleDeleteFavorite = (id, e) => {
    e.stopPropagation();
    const updatedFavs = favorites.filter(fav => fav.id !== id);
    saveFavoritesToLocalStorage(updatedFavs);
  };

  // Load a History item
  const handleLoadHistory = (hist) => {
    setKeywords(hist.keywords);
    setPlatform(hist.platform);
    // Auto generate
    const tags = generateHashtags(hist.keywords, hist.platform, false);
    setGeneratedTags(tags);
  };

  // Clear all history
  const handleClearHistory = () => {
    saveHistoryToLocalStorage([]);
  };

  // Export Tags as CSV or TXT
  const handleExport = (format) => {
    if (generatedTags.length === 0) return;
    
    let content = '';
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    if (format === 'txt') {
      content = generatedTags.map(t => `#${t}`).join(' ');
    } else if (format === 'csv') {
      mimeType = 'text/csv';
      fileExtension = 'csv';
      content = "Hashtag\n" + generatedTags.map(t => `#${t}`).join("\n");
    }

    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `hashcraft-${platform}-tags.${fileExtension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick select trending category tag
  const handleCategoryTagClick = (tag) => {
    // If keywords input is empty, replace it. Otherwise append.
    if (!keywords.trim()) {
      setKeywords(tag.toLowerCase());
    } else {
      // Avoid duplicates
      const kwList = keywords.split(',').map(k => k.trim().toLowerCase());
      if (!kwList.includes(tag.toLowerCase())) {
        setKeywords(`${keywords}, ${tag.toLowerCase()}`);
      }
    }
  };

  // Meters computation
  const allTagsText = generatedTags.map(t => `#${t}`).join(' ');
  const charCount = allTagsText.length;
  const tagCount = generatedTags.length;
  
  // Platform settings rules
  const currentRules = platformRules[platform] || platformRules.instagram;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '32px'
    }} className="generator-grid">
      
      {/* LEFT: Generator Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Main Interface Block */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          
          {/* Keyword Input */}
          <div className="form-group">
            <label className="form-label" htmlFor="kw-input">
              Enter Keywords
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                id="kw-input"
                type="text"
                placeholder="e.g. fitness, gym, workout motivation"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="form-control"
                style={{ fontSize: '1.05rem', padding: '14px 18px' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerate(false);
                }}
              />
              <button
                onClick={() => handleGenerate(false)}
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap', padding: '0 28px' }}
              >
                Generate
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '6px' }}>
              Tip: Separate keywords with commas for bulk hashtag generation.
            </p>
          </div>

          {/* Platform Selector Tabs */}
          <div style={{ margin: '32px 0 20px 0' }}>
            <label className="form-label" style={{ marginBottom: '12px' }}>
              Select Social Platform
            </label>
            <div style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--border-color)'
            }} className="platform-tabs">
              {Object.keys(platformRules).map(key => {
                const isSelected = platform === key;
                const config = platformRules[key];
                return (
                  <button
                    key={key}
                    onClick={() => setPlatform(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-color)' : 'transparent',
                      color: isSelected ? 'var(--accent-color)' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      transition: 'all var(--transition-fast)'
                    }}
                    className={`plat-tab-btn brand-hover-${key}`}
                  >
                    {getPlatformIcon(key, 16)}
                    {config.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Info Tooltip Alert */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '14px 18px',
            borderRadius: '10px',
            marginBottom: '24px'
          }}>
            <Info size={18} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <strong>{currentRules.name} Rule:</strong> {currentRules.recommendation}
            </div>
          </div>

          {/* Output Display */}
          {generatedTags.length > 0 && (
            <div className="fade-in" style={{
              marginTop: '32px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '32px'
            }}>
              
              {/* Output Actions Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>Generated Hashtags</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                    Click individual tags to copy.
                  </span>
                </div>
                
                {/* Actions group */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={handleCopyAll}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                  >
                    {copiedAll ? <Check size={14} style={{ color: 'var(--success-color)' }} /> : <Copy size={14} />}
                    {copiedAll ? 'Copied All!' : 'Copy All'}
                  </button>
                  <button 
                    onClick={() => handleGenerate(true)}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                    title="Generate alternative variation"
                  >
                    <RefreshCw size={14} />
                    Regenerate
                  </button>
                  <button 
                    onClick={handleSaveFavorite}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                    title="Save to favorites"
                  >
                    <Heart size={14} style={{ color: 'var(--danger-color)' }} />
                    Save
                  </button>
                  <button 
                    onClick={handleShare}
                    className="btn btn-secondary"
                    style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                    title="Copy shareable generator URL"
                  >
                    {shareSuccess ? <Check size={14} style={{ color: 'var(--success-color)' }} /> : <Share2 size={14} />}
                    {shareSuccess ? 'URL Copied!' : 'Share'}
                  </button>

                  {/* Export dropdown */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      onClick={() => handleExport('txt')}
                      className="btn btn-secondary"
                      style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                      title="Download as TXT"
                    >
                      <Download size={14} />
                      .TXT
                    </button>
                    <button 
                      onClick={() => handleExport('csv')}
                      className="btn btn-secondary"
                      style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                      title="Download as CSV"
                    >
                      <Download size={14} />
                      .CSV
                    </button>
                  </div>
                </div>
              </div>

              {/* Tag Chip Layout */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                padding: '20px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                {generatedTags.map((tag, idx) => {
                  const isCopied = copiedTagIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCopyIndividual(tag, idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '9999px',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: isCopied ? 'var(--success-color)' : 'var(--text-secondary)',
                        borderColor: isCopied ? 'var(--success-color)' : 'var(--border-color)',
                        transition: 'all var(--transition-fast)'
                      }}
                      className="tag-chip-btn"
                    >
                      <span>#{tag}</span>
                      {isCopied ? <Check size={12} /> : <Copy size={12} style={{ opacity: 0.5 }} />}
                    </button>
                  );
                })}
              </div>

              {/* Counters (Count meter and Character meter) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                fontSize: '0.875rem'
              }} className="meters-grid">
                
                {/* Tag Limit Meter */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Tag Count</span>
                    <span style={{ fontWeight: 600 }}>{tagCount} / {currentRules.maxTags} tags</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: 'var(--accent-color)',
                      width: `${(tagCount / currentRules.maxTags) * 100}%`,
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>

                {/* Character Limit Meter */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Character Count</span>
                    <span style={{ fontWeight: 600 }}>{charCount} chars</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: charCount > 240 ? 'var(--danger-color)' : 'var(--accent-color)',
                      width: `${Math.min((charCount / 280) * 100, 100)}%`,
                      borderRadius: '9999px',
                      transition: 'width 0.3s ease, background-color 0.3s ease'
                    }} />
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Trending Suggestions Grid */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Trending Suggestions</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Click tags from curated niches to build up your keyword selection automatically.
          </p>
          
          {/* Categories select row */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '20px'
          }}>
            {Object.keys(categorySuggestions).map(catName => {
              const isSelected = activeCategory === catName;
              return (
                <button
                  key={catName}
                  onClick={() => setActiveCategory(catName)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: isSelected ? 'var(--accent-color)' : 'var(--bg-tertiary)',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {catName}
                </button>
              );
            })}
          </div>

          {/* Curated list */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categorySuggestions[activeCategory].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleCategoryTagClick(tag)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
                className="curated-tag-btn"
              >
                +#{tag}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: History and Favorites */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Saved Favorites Panel */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={16} style={{ color: 'var(--danger-color)' }} />
            Saved Favorites
          </h3>

          {favorites.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
              color: 'var(--text-tertiary)',
              fontSize: '0.9rem'
            }}>
              No favorites saved yet. Generate tags and click "Save" to keep them here.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {favorites.map(fav => (
                <div
                  key={fav.id}
                  onClick={() => handleLoadFavorite(fav)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                  className="fav-card"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getPlatformIcon(fav.platform, 14)}
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {fav.platform}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteFavorite(fav.id, e)}
                      style={{ color: 'var(--text-tertiary)', padding: '2px' }}
                      className="trash-btn"
                      title="Delete favorite"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {fav.keywords}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {fav.tags.map(t => `#${t}`).join(' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Search History Panel */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} />
              Recent Searches
            </h3>
            {history.length > 0 && (
              <button 
                onClick={handleClearHistory}
                style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}
              >
                Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
              color: 'var(--text-tertiary)',
              fontSize: '0.9rem'
            }}>
              Search history is empty.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {history.map(hist => (
                <div
                  key={hist.id}
                  onClick={() => handleLoadHistory(hist)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                  className="hist-card"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <span style={{ fontWeight: 600, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {hist.keywords}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {getPlatformIcon(hist.platform, 10)}
                      {platformRules[hist.platform]?.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', flexShrink: 0 }}>
                    {hist.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        .tag-chip-btn:hover {
          background-color: var(--bg-tertiary) !important;
          border-color: var(--text-tertiary) !important;
          transform: translateY(-1px);
        }
        .curated-tag-btn:hover {
          background-color: var(--bg-tertiary) !important;
          border-color: var(--accent-color) !important;
          color: var(--accent-color) !important;
        }
        .fav-card:hover, .hist-card:hover {
          border-color: var(--accent-color) !important;
          background-color: var(--bg-tertiary) !important;
        }
        .trash-btn:hover {
          color: var(--danger-color) !important;
        }
        @media (max-width: 992px) {
          .generator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
