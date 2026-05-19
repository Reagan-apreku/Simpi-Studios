import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Contact from './components/Contact';
import About from './components/About';
import Prints from './components/Prints';
import Booking from './components/Booking';
import ProjectGallery from './components/ProjectGallery';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (selectedProject) {
      return (
        <ProjectGallery 
          project={selectedProject} 
          onBack={() => {
            setSelectedProject(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <ProjectGrid onProjectClick={(proj) => {
              setSelectedProject(proj);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />
          </>
        );
      case 'bookings':
        return <Booking />;
      case 'prints':
        return <Prints />;
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
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      <main className="content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
