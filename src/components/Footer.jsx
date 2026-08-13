import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Kadali Dhaara Naturals</h3>
          <p>Handcrafted banana fibre products from Pulivendula, Andhra Pradesh. Sustainable, authentic, and eco-friendly.</p>
          <p>Email: contact@kadalidhaara.com</p>
        </div>
        <div className="footer-section">
          <h4>Industries</h4>
          <ul>
            <li><Link to="/industry/hotels">Hotels, Resorts & Homestays</Link></li>
            <li><Link to="/industry/corporate">Corporate Gifting</Link></li>
            <li><Link to="/industry/weddings">Weddings & Events</Link></li>
            <li><Link to="/industry/lifestyle">Lifestyle & Home Decor</Link></li>
            <li><Link to="/industry/food">Organic & Premium Food Brands</Link></li>
            <li><Link to="/industry/wellness">Ayurveda / Wellness / Yoga</Link></li>
            <li><Link to="/industry/interiors">Interior Designers</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/bulk-orders">Bulk Orders</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kadali Dhaara Naturals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
