import React from 'react';
import './ProjectGrid.css';

const projects = [
  { 
    id: 1, 
    title: 'EMY AFRICA AWARDS', 
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
  {
    id: 2,
    title: 'ASHESI END OF YEAR DINNER',
    cover: '/images/gallery/ashesi_end_of_year_party/1.jpg',
    images: [
      '/images/gallery/ashesi_end_of_year_party/007A5745SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9722SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A5225SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A5975SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A5985SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6057SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6087SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6093SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6097SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6242SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/007A6259SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/1.jpg',
      '/images/gallery/ashesi_end_of_year_party/2.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A0237SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A0387SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A0401SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A0426SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9416SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9431SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9455SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9550SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9592SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9616SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9642SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9677SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9683SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9688SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9715SIMPI-2024.jpg',
      '/images/gallery/ashesi_end_of_year_party/3C5A9888SIMPI-2024.jpg'
    ]
  },
  {
    id: 3,
    title: 'UK-GHANA BUSINESS AWARDS',
    cover: '/images/gallery/uk_ghana_business_awards/007A4654SIMPI25.jpg',
    images: [
      '/images/gallery/uk_ghana_business_awards/007A4654SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4675SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4759SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4809SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4847SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4865SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4871SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4906SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4912SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4917SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4970SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A4973SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5007SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5021SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5027SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5042SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5082SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5096SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5135SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5173SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5342SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5365SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5381SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5410SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5422SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5427SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5435SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5467SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5502SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5537SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5587SIMPI25.jpg',
      '/images/gallery/uk_ghana_business_awards/007A5700SIMPI25.jpg'
    ]
  },
  {
    id: 4,
    title: 'FASHION - MAEHYIRA MODE',
    cover: '/images/gallery/fashion_maehyira_mode/007A1596SIMPI26.jpg',
    images: [
      '/images/gallery/fashion_maehyira_mode/007A1512SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1542SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1558SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1568SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1576SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1586SIMPI26-2.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1596SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1608SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1618SIMPI26-5.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1624SIMPI26-2.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1670SIMPI26.jpg',
      '/images/gallery/fashion_maehyira_mode/007A1748SIMPI26-2.jpg'
    ]
  },
  {
    id: 5,
    title: 'THE DZAH FAMILY PORTRAITS',
    cover: '/images/gallery/dzah_family_portraits/whatsapp_cover.jpeg',
    images: [
      '/images/gallery/dzah_family_portraits/whatsapp_cover.jpeg',
      '/images/gallery/dzah_family_portraits/007A5083SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5156SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5344SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5359SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5442SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5538SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5544SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5567SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5571SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5580SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5586SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5595SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5612SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5663SIMPI-2024.jpg',
      '/images/gallery/dzah_family_portraits/007A5728SIMPI-2024.jpg'
    ]
  },
  {
    id: 6,
    title: 'NANA YAW & JOETTE - PRE WEDDING PHOTOSHOOT',
    cover: '/images/gallery/10_000/007A8334SIMPI25.jpg',
    images: [
      '/images/gallery/10_000/007A8196SIMPI25.jpg',
      '/images/gallery/10_000/007A8198SIMPI25.jpg',
      '/images/gallery/10_000/007A8212SIMPI25.jpg',
      '/images/gallery/10_000/007A8227SIMPI25.jpg',
      '/images/gallery/10_000/007A8228SIMPI25.jpg',
      '/images/gallery/10_000/007A8237SIMPI25.jpg',
      '/images/gallery/10_000/007A8239SIMPI25.jpg',
      '/images/gallery/10_000/007A8253SIMPI25.jpg',
      '/images/gallery/10_000/007A8268SIMPI25.jpg',
      '/images/gallery/10_000/007A8272SIMPI25.jpg',
      '/images/gallery/10_000/007A8277SIMPI25.jpg',
      '/images/gallery/10_000/007A8279SIMPI25.jpg',
      '/images/gallery/10_000/007A8282SIMPI25.jpg',
      '/images/gallery/10_000/007A8285SIMPI25.jpg',
      '/images/gallery/10_000/007A8291SIMPI25.jpg',
      '/images/gallery/10_000/007A8294SIMPI25.jpg',
      '/images/gallery/10_000/007A8295SIMPI25.jpg',
      '/images/gallery/10_000/007A8301SIMPI25.jpg',
      '/images/gallery/10_000/007A8307SIMPI25.jpg',
      '/images/gallery/10_000/007A8325SIMPI25.jpg',
      '/images/gallery/10_000/007A8334SIMPI25.jpg',
      '/images/gallery/10_000/007A8336SIMPI25.jpg',
      '/images/gallery/10_000/007A8343SIMPI25.jpg',
      '/images/gallery/10_000/007A8344SIMPI25.jpg',
      '/images/gallery/10_000/007A8345SIMPI25.jpg',
      '/images/gallery/10_000/007A8346SIMPI25.jpg',
      '/images/gallery/10_000/007A8357SIMPI25.jpg',
      '/images/gallery/10_000/007A8366SIMPI25.jpg',
      '/images/gallery/10_000/007A8367SIMPI25.jpg',
      '/images/gallery/10_000/007A8379SIMPI25.jpg',
      '/images/gallery/10_000/007A8394SIMPI25.jpg',
      '/images/gallery/10_000/007A8397SIMPI25.jpg',
      '/images/gallery/10_000/007A8398SIMPI25.jpg',
      '/images/gallery/10_000/007A8402SIMPI25.jpg',
      '/images/gallery/10_000/007A8407SIMPI25.jpg',
      '/images/gallery/10_000/007A8423SIMPI25.jpg',
      '/images/gallery/10_000/007A8446SIMPI25.jpg',
      '/images/gallery/10_000/007A8458SIMPI25.jpg',
      '/images/gallery/10_000/007A8460SIMPI25.jpg',
      '/images/gallery/10_000/007A8462SIMPI25.jpg',
      '/images/gallery/10_000/007A8466SIMPI25.jpg',
      '/images/gallery/10_000/007A8473SIMPI25.jpg',
      '/images/gallery/10_000/007A8475SIMPI25.jpg',
      '/images/gallery/10_000/007A8487SIMPI25.jpg',
      '/images/gallery/10_000/007A8492SIMPI25.jpg',
      '/images/gallery/10_000/007A8496SIMPI25.jpg'
    ]
  }
];

const ProjectGrid = ({ onProjectClick }) => {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">Gallery</h2>
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
                <img 
                  src={project.cover} 
                  alt={project.title} 
                  loading="lazy" 
                  style={project.objectPosition ? { objectPosition: project.objectPosition } : {}}
                />
                <div className="project-hover-overlay"></div>
              </div>
              <h3 className="project-title">{project.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;
