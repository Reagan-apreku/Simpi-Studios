import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <h2 className="footer-logo">SIMPI STUDIOS</h2>
          <p className="footer-tagline">Capturing moments, creating memories</p>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li>Portrait Photography</li>
            <li>Wedding Photography</li>
            <li>Corporate Events</li>
            <li>Fashion Editorial</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Connect</h3>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <p>Email: info@simpistudios.com</p>
          <p>Phone: +233 XX XXX XXXX</p>
          <p>Location: Accra, Ghana</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Simpi Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
