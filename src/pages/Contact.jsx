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
          <p><strong>Email:</strong> <a href="mailto:kadalidhaara@gmail.com">kadalidhaara@gmail.com</a></p>
          <p><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/916366638040" target="_blank" rel="noopener noreferrer">+91 63666 38040</a></p>
          <p><strong>Location:</strong> Pulivendula, Andhra Pradesh, India</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
