import React from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { Grid, Sparkles, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';

const Home = () => {
  const industries = [
    { title: "Hotels, Resorts & Homestays", path: "/industry/hotels", image: "/images/hotels_1_enhanced.png" },
    { title: "Corporate Gifting", path: "/industry/corporate", image: "/images/lunchbag_corporate.png" },
    { title: "Weddings & Events", path: "/industry/weddings", image: "/images/weddings_99_enhanced.png" },
    { title: "Lifestyle & Home Decor", path: "/industry/lifestyle", image: "/images/lifestyle_101_enhanced.png" },
    { title: "Organic & Premium Food Brands", path: "/industry/food", image: "/images/hotels_105_enhanced.png" },
    { title: "Ayurveda / Wellness / Yoga", path: "/industry/wellness", image: "/images/yogamat_wellness.png" },
    { title: "Interior Designers & Studios", path: "/industry/interiors", image: "/images/lifestyle_110_enhanced.png" }
  ];

  return (
    <div className="home-page">
      <HeroSection 
        title="Premium Handcrafted Banana Fibre & Bark Creations" 
        subtitle="Sustainable, export-ready, and fully customizable for bulk, hospitality, and gifting." 
        imageClass="hero-home"
      />

      {/* Full Catalog Spotlight Banner */}
      <section className="catalog-spotlight-section">
        <div className="spotlight-card">
          <div className="spotlight-text">
            <div className="spotlight-badge">
              <Sparkles size={14} /> 113 Master Catalog Products
            </div>
            <h2>Looking for the Complete Collection?</h2>
            <p>Explore our entire handcrafted range across Baskets, Mats, Handbags, Planters, Room Utilities, and Wedding Favors with live filtering and instant RFQ quoting.</p>
          </div>
          <div className="spotlight-action">
            <Link to="/catalog" className="btn-primary-spotlight">
              <Grid size={18} /> Browse Full Catalog (113 Items) &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      <section className="explore-industries">
        <div className="section-header-center">
          <h2>Curated Industry Collections</h2>
          <p>Hand-selected product lines engineered for specific hospitality, corporate, and retail needs.</p>
        </div>
        <div className="industry-grid">
          {industries.map((ind, idx) => (
            <Link to={ind.path} key={idx} className="industry-card" style={{ backgroundImage: `url(${ind.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.48)', zIndex: 1 }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ color: 'white' }}>{ind.title}</h3>
                <p style={{ color: 'white' }}>View Collection &rarr;</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="why-choose-us">
        <div className="section-header-center">
          <h2>Why Partner with Kadali Dhaara?</h2>
          <p>Empowering rural craftswomen while delivering export-grade natural utility products.</p>
        </div>
        <div className="features">
          <div className="feature">
            <ShieldCheck size={36} className="feature-icon" />
            <h3>Handcrafted Authenticity</h3>
            <p>Directly from skilled craftswomen of Pulivendula, Andhra Pradesh, using zero-chemical processing.</p>
          </div>
          <div className="feature">
            <RefreshCw size={36} className="feature-icon" />
            <h3>Fully Customizable for B2B</h3>
            <p>Custom dimensions, laser/leather branding, custom gift packing, and tiered volume wholesale rates.</p>
          </div>
          <div className="feature">
            <Truck size={36} className="feature-icon" />
            <h3>Export-Ready Logistics</h3>
            <p>Treated, fumigated, and moisture-sealed for dependable international and domestic bulk delivery.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
