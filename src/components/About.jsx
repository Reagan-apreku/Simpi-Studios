import React from 'react';
import './About.css';

const About = () => {
  const team = [
    { name: 'SIMPI', role: 'FOUNDER & LEAD PHOTOGRAPHER', image: '/images/hero/1.jpg' },
    { name: 'AMA ASARE', role: 'CREATIVE DIRECTOR', image: '/images/hero/2.jpg' },
    { name: 'KOFI BOAKYE', role: 'POST-PRODUCTION HEAD', image: '/images/hero/3.jpg' },
  ];

  const clients = [
    'VOGUE GHANA', 'GLITZ AFRICA', 'MERCEDES-BENZ', 'MTN GHANA', 
    'STANBIC BANK', 'KEMPINSKI HOTEL', 'ACCESS BANK', 'DSTV'
  ];

  return (
    <section className="about-page fade-in">
      <div className="container">
        {/* Studio Section */}
        <div className="about-studio">
          <div className="about-text-content">
            <h1 className="about-title">Our Story</h1>
            <div className="about-description">
              <p>Founded on the principles of timeless elegance and refined storytelling, Simpi Studios has become a sanctuary for high-end photography in Accra and beyond.</p>
              <p>We believe that every moment possesses a unique soul. Our mission is to capture that essence through a lens of sophisticated simplicity, creating visual legacies that transcend generations.</p>
              <p>From editorial fashion to intimate portraits and grand celebrations, we approach every project with the same level of meticulous detail and artistic passion.</p>
            </div>
          </div>
          <div className="about-image-main">
            <img src="/images/hero/4.jpg" alt="Simpi Studios Creative Space" />
          </div>
        </div>

        {/* Team Section */}
        <div className="about-team">
          <h2 className="section-title-small">THE TEAM</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clients Section */}
        <div className="about-clients">
          <h2 className="section-title-small">SELECTED CLIENTS</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-item">
                <span>{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
