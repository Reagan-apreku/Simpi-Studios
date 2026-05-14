import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, onPageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gallery', id: 'home' },
    { name: 'Bookings', id: 'bookings' },
    { name: 'Prints', id: 'prints' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo" onClick={() => onPageChange('home')}>
          SIMPI STUDIOS
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={currentPage === link.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(link.id);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
          <span className={mobileMenuOpen ? 'open' : ''}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
