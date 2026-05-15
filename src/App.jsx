import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Lightbox from './components/Lightbox';
import ComingSoon from './components/ComingSoon';
import Contact from './components/Contact';
import About from './components/About';
import './App.css';

const projects = [
  { id: 1, title: 'MAMA EVELYN ENYIMAYEW @70', cover: '/images/project-1.png' },
  { id: 2, title: 'GOLDEN HOUR PORTRAITS', cover: '/images/project-2.png' },
  { id: 3, title: 'URBAN FASHION EDITORIAL', cover: '/images/project-3.png' },
  { id: 4, title: 'WEDDING DAY MEMORIES', cover: '/images/project-4.png' },
  { id: 5, title: 'CULTURAL HERITAGE', cover: '/images/project-5.png' },
  { id: 6, title: 'CONTEMPORARY BEAUTY', cover: '/images/project-6.png' },
  { id: 7, title: 'CORPORATE HEADSHOTS', cover: '/images/project-7.png' },
  { id: 8, title: 'FAMILY MOMENTS', cover: '/images/project-8.png' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <ProjectGrid />
          </>
        );
      case 'bookings':
        return <ComingSoon title="Bookings" />;
      case 'prints':
        return <ComingSoon title="Prints" />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
