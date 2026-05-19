import React from 'react';
import './ProjectGrid.css';

const projects = [
  { 
    id: 1, 
    title: 'EMY AWARDS 2022', 
    cover: '/images/gallery/emy_awards_2022/IMG_6599SIMPI22.jpg',
    images: [
      '/images/gallery/emy_awards_2022/IMG_6394SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6436SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6439SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6443SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6530SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6599SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6607SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6610SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6619SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6620SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6624SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6630SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6639SIMPI22.jpg',
      '/images/gallery/emy_awards_2022/IMG_6681SIMPI22.jpg'
    ]
  },
  { id: 2, title: 'GOLDEN HOUR PORTRAITS', cover: '/images/project-2.png' },
  { id: 3, title: 'URBAN FASHION EDITORIAL', cover: '/images/project-3.png' },
  { id: 4, title: 'WEDDING DAY MEMORIES', cover: '/images/project-4.png' },
  { id: 5, title: 'CULTURAL HERITAGE', cover: '/images/project-5.png' },
  { id: 6, title: 'CONTEMPORARY BEAUTY', cover: '/images/project-6.png' },
  { id: 7, title: 'CORPORATE HEADSHOTS', cover: '/images/bookings/007A8767SIMPI25.jpg' },
  { id: 8, title: 'FAMILY MOMENTS', cover: '/images/project-8.png' },
];

const ProjectGrid = ({ onProjectClick }) => {
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
              onClick={() => onProjectClick && onProjectClick(project)}
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
