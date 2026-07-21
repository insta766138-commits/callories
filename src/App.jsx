import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import GeneratorPage from './pages/GeneratorPage';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [generatorParams, setGeneratorParams] = useState({ keywords: '', platform: 'instagram' });

  // Init theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('hashcraft_theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
      } else if (savedTheme === 'light') {
        setDarkMode(false);
      } else {
        // System preference default
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
      }
    } catch (e) {
      console.error("Local storage theme load failed", e);
    }
  }, []);

  // Sync theme changes to HTML element class list
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('hashcraft_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('hashcraft_theme', 'light');
    }
  }, [darkMode]);

  // Routing render function
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setGeneratorParams={setGeneratorParams} 
          />
        );
      case 'tool':
        return (
          <GeneratorPage 
            generatorParams={generatorParams} 
          />
        );
      case 'blog':
        return (
          <BlogList 
            onPostClick={(post) => {
              setSelectedPost(post);
              setCurrentPage('blog-post');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        );
      case 'blog-post':
        return (
          <BlogPost 
            post={selectedPost} 
            onBack={() => setCurrentPage('blog')} 
            onPostClick={(post) => setSelectedPost(post)} 
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      
      // Legal routes
      case 'legal-privacy':
        return <Legal initialTab="privacy" />;
      case 'legal-terms':
        return <Legal initialTab="terms" />;
      case 'legal-cookies':
        return <Legal initialTab="cookies" />;
      case 'legal-disclaimer':
        return <Legal initialTab="disclaimer" />;

      default:
        return <NotFound setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      transition: 'background-color var(--transition-normal), color var(--transition-normal)'
    }}>
      {/* Header Navigation */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* Main Content Area */}
      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>

      {/* Footer Content */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
