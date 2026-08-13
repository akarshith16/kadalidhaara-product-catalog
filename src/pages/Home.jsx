import React from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';

const Home = () => {
  const industries = [
    { title: "Hotels, Resorts & Homestays", path: "/industry/hotels" },
    { title: "Corporate Gifting", path: "/industry/corporate" },
    { title: "Weddings & Events", path: "/industry/weddings" },
    { title: "Lifestyle & Home Decor", path: "/industry/lifestyle" },
    { title: "Organic & Premium Food Brands", path: "/industry/food" },
    { title: "Ayurveda / Wellness / Yoga", path: "/industry/wellness" },
    { title: "Interior Designers", path: "/industry/interiors" }
  ];

  return (
    <div className="home-page">
      <HeroSection 
        title="Premium Handcrafted Banana Fibre Products" 
        subtitle="Sustainable, export-ready, and fully customizable for bulk, hospitality, and gifting." 
        imageClass="hero-home"
      />
      
      <section className="explore-industries">
        <h2>Explore By Industry</h2>
        <div className="industry-grid">
          {industries.map((ind, idx) => (
            <Link to={ind.path} key={idx} className="industry-card">
              <h3>{ind.title}</h3>
              <p>View Collection &rarr;</p>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="why-choose-us">
        <h2>Why Kadali Dhaara Naturals?</h2>
        <div className="features">
          <div className="feature">
            <h3>Handcrafted Authenticity</h3>
            <p>Directly from the artisans of Pulivendula, Andhra Pradesh.</p>
          </div>
          <div className="feature">
            <h3>Fully Customizable</h3>
            <p>Adapt sizes, assortments, and branding for bulk B2B orders.</p>
          </div>
          <div className="feature">
            <h3>Eco-Friendly & Sustainable</h3>
            <p>Made from agricultural banana waste, completely biodegradable.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
