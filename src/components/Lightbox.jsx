import React, { useEffect, useCallback } from 'react';
import './Lightbox.css';

const Lightbox = ({ project, onClose, onNext, onPrev, currentIndex, total }) => {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown]);

  if (!project) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>&times;</button>
      
      <button 
        className="lightbox-nav prev" 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
      >
        &#8249;
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={project.cover} alt={project.title} className="lightbox-image" />
        <div className="lightbox-info">
          <h2 className="lightbox-title">{project.title}</h2>
          <span className="lightbox-counter">{currentIndex + 1} / {total}</span>
        </div>
      </div>

      <button 
        className="lightbox-nav next" 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Lightbox;
