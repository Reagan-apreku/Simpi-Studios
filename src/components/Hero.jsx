import React, { useState, useEffect } from 'react';
import './Hero.css';

const images = [
  '/images/hero/optimized-007A0621SIMPI25.jpg',
  '/images/hero/optimized-007A1455SIMPI-2024.jpg',
  '/images/hero/optimized-007A5057SIMPI25.jpg',
  '/images/hero/optimized-007A5083SIMPI25.jpg',
  '/images/hero/optimized-007A7648SIMPI-2025.jpg',
  '/images/hero/optimized-3C5A9456SIMPI-2024.jpg',
  '/images/hero/optimized-3C5A9557SIMPI-2024.jpg',
  '/images/hero/optimized-3C5A9592SIMPI-2024.jpg',
  '/images/hero/optimized-3C5A9683SIMPI-2024.jpg',
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
