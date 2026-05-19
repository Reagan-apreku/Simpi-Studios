import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <img src="/images/logos/Simpi 3-02.png" alt="Simpi Studios" className="footer-logo-img" />
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
            <li><a href="https://www.instagram.com/simpi_studios?igsh=MWsxanYzM3F2bzI0ZQ==" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Pinterest</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <p>Email: simpidominic@gmail.com</p>
          <p>Phone: +233 20 766 9921</p>
          <p>Location: NTHC Estate, Adjringanor, Accra</p>
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
