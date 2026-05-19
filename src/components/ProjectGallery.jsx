import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './ProjectGallery.css';

const ProjectGallery = ({ project, onBack }) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const images = project.images || [project.cover];

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleClose = () => {
    setLightboxIndex(-1);
  };

  const handleKeyDown = useCallback((e) => {
    if (lightboxIndex === -1) return;
    if (e.key === 'Escape') handleClose();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  }, [lightboxIndex, handleNext, handlePrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    if (lightboxIndex !== -1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [lightboxIndex, handleKeyDown]);

  return (
    <section className="project-gallery-page fade-in">
      <div className="container">
        
        {/* Gallery Header */}
        <div className="gallery-header-nav">
          <button className="gallery-back-btn" onClick={onBack}>
            ← RETURN TO PORTFOLIO
          </button>
          <div className="gallery-title-wrapper">
            <h1 className="gallery-main-title">{project.title}</h1>
            <p className="gallery-meta">EVENT COVERAGE & ARTISTIC CAPTURES</p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="gallery-card fade-in"
              onClick={() => setLightboxIndex(index)}
            >
              <div className="gallery-image-wrapper">
                <img src={img} alt={`${project.title} - ${index + 1}`} loading="lazy" />
                <div className="gallery-hover-overlay">
                  <span>EXPAND IMAGE</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== -1 && createPortal(
          <div className="gallery-lightbox" onClick={handleClose}>
            <button className="lightbox-close-btn" onClick={handleClose}>&times;</button>
            
            <button className="lightbox-arrow prev" onClick={handlePrev}>
              &#8249;
            </button>

            <div className="lightbox-main-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={images[lightboxIndex]} 
                alt={`${project.title} view`} 
                className="lightbox-view-img" 
              />
              <div className="lightbox-caption">
                <h3>{project.title}</h3>
                <span>{lightboxIndex + 1} / {images.length}</span>
              </div>
            </div>

            <button className="lightbox-arrow next" onClick={handleNext}>
              &#8250;
            </button>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};

export default ProjectGallery;
