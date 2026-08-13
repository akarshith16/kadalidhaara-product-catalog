import React from 'react';
import HeroSection from '../components/HeroSection';

const Contact = () => {
  return (
    <div className="contact-page">
      <HeroSection 
        title="Get in Touch" 
        subtitle="We'd love to hear from you." 
        imageClass="hero-contact"
      />
      
      <section className="contact-content">
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p>For wholesale enquiries, custom orders, or general questions:</p>
          <p><strong>Email:</strong> <a href="mailto:contact@kadalidhaara.com">contact@kadalidhaara.com</a></p>
          <p><strong>Location:</strong> Pulivendula, Andhra Pradesh, India</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
