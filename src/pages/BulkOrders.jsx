import React from 'react';
import HeroSection from '../components/HeroSection';

const BulkOrders = () => {
  return (
    <div className="bulk-orders-page">
      <HeroSection 
        title="Wholesale & Bulk Orders" 
        subtitle="Partner with us for your gifting, hospitality, and retail sourcing needs." 
        imageClass="hero-bulk"
      />
      
      <section className="bulk-info">
        <h2>Customization & Sourcing</h2>
        <div className="bulk-grid">
          <div className="bulk-card">
            <h3>Custom Sizes & Shapes</h3>
            <p>Our artisans can weave trays, baskets, and mats to your exact specifications to fit your hampers, rooms, or retail shelves.</p>
          </div>
          <div className="bulk-card">
            <h3>Corporate Branding</h3>
            <p>Add your company logo or customized tags to our premium jute and banana fibre bags, folders, and pouches.</p>
          </div>
          <div className="bulk-card">
            <h3>Hotel & Resort Sourcing</h3>
            <p>Standardize your room decor and utility items with our sustainable, earthy aesthetic. High volume production available.</p>
          </div>
          <div className="bulk-card">
            <h3>Event Assortments</h3>
            <p>Curated return gifts and hamper baskets for large-scale weddings and events, designed to your theme.</p>
          </div>
        </div>
        
        <div className="cta-section">
          <h2>Ready to order?</h2>
          <p>Contact us with your MOQ and customization requirements.</p>
          <a href="mailto:contact@kadalidhaara.com?subject=Wholesale Enquiry" className="btn-primary">Email Us</a>
        </div>
      </section>
    </div>
  );
};

export default BulkOrders;
