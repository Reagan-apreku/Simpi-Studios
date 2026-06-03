import React from 'react';
import './About.css';

const About = () => {
  const team = [
    { 
      name: 'Dominic Simpi', 
      role: 'Founder & Lead Creative', 
      image: '/images/team/dominic_simpi.jpg',
      objectPosition: 'center 15%'
    },
    { 
      name: 'Reagan Apreku', 
      role: 'Photographer & Head of Tech', 
      image: '/images/team/reagan_apreku.jpeg'
    },
    { 
      name: 'Eugenia Duodua', 
      role: 'Videographer & Head of Marketing', 
      image: '/images/team/eugenia.jpg',
      objectPosition: 'center 35%' 
    },
    { 
      name: 'Nicholas Kwofie', 
      role: 'Photographer & Studio Manager', 
      image: '/images/team/nicholas.jpg' 
    },
  ];

  const clients = [
    { name: 'Ashesi University', logo: '/images/logos/1770310526903-Ashesi_Logo.png' },
    { name: 'UKGCC', logo: '/images/logos/UKGCC-Logo.png' },
    { name: 'VBCI', logo: '/images/logos/transparent-vbci-logo.png' },
    { name: 'ACI', logo: '/images/logos/aci_new.png' },
    { name: 'UNESCO', logo: '/images/logos/Logo_UNESCO_2021.svg.png' },
    { name: 'Client Logo', logo: '/images/logos/images.jpeg' },
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
              <p>From portraits and events to corporate projects, we approach every project with the same level of meticulous detail and artistic passion.</p>
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
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    style={member.objectPosition ? { objectPosition: member.objectPosition } : {}}
                  />
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
          <h2 className="section-title-small">CLIENTELE</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div key={index} className="client-item">
                <img src={client.logo} alt={client.name} className="client-logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
