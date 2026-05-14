import React, { useState, useEffect } from 'react';
import './Hero.css';

const images = [
  '/images/hero/1.jpg',
  '/images/hero/2.jpg',
  '/images/hero/3.jpg',
  '/images/hero/4.jpg',
  '/images/hero/5.jpg',
  '/images/hero/6.jpg',
  '/images/hero/7.jpg',
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="hero-overlay"></div>
        </div>
      ))}
      <div className="hero-content container">
        <h1 className="hero-title fade-in">TIMELESS MOMENTS</h1>
        <p className="hero-subtitle fade-in">Capturing elegance through a refined lens</p>
      </div>
    </section>
  );
};

export default Hero;
