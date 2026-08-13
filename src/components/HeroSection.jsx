import React from 'react';

const HeroSection = ({ title, subtitle, imageClass }) => {
  return (
    <div className={`hero-section ${imageClass}`}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;
