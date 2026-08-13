import React from 'react';
import HeroSection from '../components/HeroSection';

const About = () => {
  return (
    <div className="about-page">
      <HeroSection 
        title="Our Story" 
        subtitle="From agricultural waste to premium handcrafted utility." 
        imageClass="hero-about"
      />
      
      <section className="about-content">
        <div className="about-text">
          <h2>Rooted in Pulivendula</h2>
          <p>Kadali Dhaara Naturals is a handcrafted banana fibre and banana bark products brand hailing from Pulivendula, Andhra Pradesh. We take immense pride in our artisan roots, empowering local communities through skill and sustainable craftsmanship.</p>
          
          <h2>Sustainability at Our Core</h2>
          <p>We transform agricultural waste—banana bark and fibre—into beautiful, export-ready utility and decor pieces. Every product we create is eco-friendly, biodegradable, and built with immense respect for nature.</p>
          
          <h2>Premium B2B Focus</h2>
          <p>While our craft is traditional, our finish is premium. We cater specifically to the exacting standards of hotels, corporate gifting companies, event planners, and interior designers who seek natural aesthetics without compromising on quality.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
