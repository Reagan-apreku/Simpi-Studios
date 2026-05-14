import React from 'react';
import './ProjectGrid.css';

const projects = [
  { id: 1, title: 'MAMA EVELYN @ 70', cover: '/images/project-1.png' },
  { id: 2, title: 'GOLDEN HOUR PORTRAITS', cover: '/images/project-2.png' },
  { id: 3, title: 'URBAN FASHION EDITORIAL', cover: '/images/project-3.png' },
  { id: 4, title: 'WEDDING DAY MEMORIES', cover: '/images/project-4.png' },
  { id: 5, title: 'CULTURAL HERITAGE', cover: '/images/project-5.png' },
  { id: 6, title: 'CONTEMPORARY BEAUTY', cover: '/images/project-6.png' },
  { id: 7, title: 'CORPORATE HEADSHOTS', cover: '/images/project-7.png' },
  { id: 8, title: 'FAMILY MOMENTS', cover: '/images/project-8.png' },
];

const ProjectGrid = () => {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">Selected Works</h2>
          <div className="section-underline"></div>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="project-card fade-in" 
            >
              <div className="project-image-container">
                <img src={project.cover} alt={project.title} loading="lazy" />
                <div className="project-hover-overlay"></div>
              </div>
              <h3 className="project-title">{project.title}</h3>
            </div>
          ))}
        </div>
        <div className="view-more-container">
          <button className="view-more-btn">VIEW MORE PROJECTS</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
