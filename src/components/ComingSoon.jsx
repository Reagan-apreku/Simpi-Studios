import React from 'react';
import './ComingSoon.css';

const ComingSoon = ({ title }) => {
  return (
    <div className="coming-soon section-padding fade-in">
      <div className="container cs-container">
        <h1 className="cs-title">{title}</h1>
        <p className="cs-subtitle">This page is currently under development</p>
        <div className="cs-divider"></div>
        <p className="cs-message">We're crafting something beautiful. Check back soon.</p>
      </div>
    </div>
  );
};

export default ComingSoon;
