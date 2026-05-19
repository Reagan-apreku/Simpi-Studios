import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let title = 'Simpi Studios | Luxury Photography Portfolio';
    let description = 'Simpi Studios - Capturing timeless moments with refined elegance.';

    if (selectedProject) {
      title = `${selectedProject.title} | Simpi Studios`;
      description = `Explore the beautiful photography portfolio project "${selectedProject.title}" by Simpi Studios. Capturing timeless memories with refined elegance.`;
    } else {
      switch (currentPage) {
        case 'home':
          title = 'Simpi Studios | Fine Art, Fashion & Wedding Photography';
          description = 'Simpi Studios is a premier high-end photography studio specializing in editorial fashion, luxury weddings, fine art portraits, and corporate headshots in Ghana.';
          break;
        case 'bookings':
          title = 'Book Your Photoshoot | Simpi Studios';
          description = 'Reserve your session with Simpi Studios. Book Portrait, Wedding, Corporate, or Fashion photoshoots at our state-of-the-art studio or on-location.';
          break;
        case 'prints':
          title = 'Fine Art Photography Prints Store | Simpi Studios';
          description = 'Purchase limited-edition landscape and nature prints of Ghana\'s stunning vistas including Mount Gemi, Mount Adaklu, and Wli Waterfalls. Framed and ready for your walls.';
          break;
        case 'about':
          title = 'Our Story & Creative Team | Simpi Studios';
          description = 'Meet Dominic Simpi, Reagan Apreku, and the creative visionaries behind Simpi Studios. High-end visual storytelling and photography production team.';
          break;
        case 'contact':
          title = 'Contact Us | Simpi Studios Accra';
          description = 'Get in touch with Simpi Studios. Reach out for custom projects, business inquiries, print orders, or studio bookings in Accra, Ghana.';
          break;
        default:
          break;
      }
    }

    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update Open Graph tags for dynamic sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
  }, [currentPage, selectedProject]);

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
