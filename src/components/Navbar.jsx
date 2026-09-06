import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Grid, Sparkles, PhoneCall, ChevronDown } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isIndustryOpenMobile, setIsIndustryOpenMobile] = useState(false);
  const { totalItemsCount, setIsDrawerOpen } = useInquiry();
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setIsIndustryOpenMobile(false);
  }, [location.pathname]);

  const closeMenu = () => {
    setIsOpen(false);
    setIsIndustryOpenMobile(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="top-announcement-bar">
        <span className="announcement-text">🌿 Direct from Artisans of Pulivendula, AP • 100% Eco-Friendly • Custom B2B & Export Orders</span>
        <a href="https://wa.me/916366638040" target="_blank" rel="noopener noreferrer" className="top-wa-link">
          <PhoneCall size={12} /> WhatsApp B2B Desk: +91 63666 38040
        </a>
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/" onClick={closeMenu}>
            <span className="brand-primary">Kadali Dhaara</span>
            <span className="brand-sub">Naturals</span>
          </Link>
        </div>

        {/* Mobile Backdrop */}
        {isOpen && <div className="nav-mobile-backdrop" onClick={closeMenu} />}

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <div>
              <span className="brand-primary">Kadali Dhaara</span>
              <span className="brand-sub">Naturals</span>
            </div>
            <button className="btn-close-mobile-nav" onClick={closeMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>

          <Link to="/catalog" onClick={closeMenu} className={`catalog-link-highlight ${location.pathname === '/catalog' ? 'active' : ''}`}>
            <Grid size={15} /> All Products (113)
          </Link>

          <div className="dropdown">
            <button 
              className="dropbtn" 
              onClick={() => setIsIndustryOpenMobile(!isIndustryOpenMobile)}
              aria-expanded={isIndustryOpenMobile}
            >
              Industries & Collections <ChevronDown size={14} className={`chevron-icon ${isIndustryOpenMobile ? 'rotated' : ''}`} />
            </button>
            <div className={`dropdown-content ${isIndustryOpenMobile ? 'mobile-expanded' : ''}`}>
              <Link to="/industry/hotels" onClick={closeMenu}>Hotels, Resorts & Homestays</Link>
              <Link to="/industry/corporate" onClick={closeMenu}>Corporate Gifting</Link>
              <Link to="/industry/weddings" onClick={closeMenu}>Weddings & Events</Link>
              <Link to="/industry/lifestyle" onClick={closeMenu}>Lifestyle & Home Decor</Link>
              <Link to="/industry/food" onClick={closeMenu}>Organic & Premium Food Brands</Link>
              <Link to="/industry/wellness" onClick={closeMenu}>Ayurveda / Wellness / Yoga</Link>
              <Link to="/industry/interiors" onClick={closeMenu}>Interior Designers & Decor Studios</Link>
            </div>
          </div>

          <Link to="/bulk-orders" onClick={closeMenu} className={location.pathname === '/bulk-orders' ? 'active' : ''}>
            Bulk Orders
          </Link>

          <Link to="/about" onClick={closeMenu} className={location.pathname === '/about' ? 'active' : ''}>
            Our Story
          </Link>

          <Link to="/contact" onClick={closeMenu} className={location.pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>

          {/* Mobile Bottom Quick Contact */}
          <div className="mobile-nav-footer">
            <a href="https://wa.me/916366638040" target="_blank" rel="noopener noreferrer" className="btn-mobile-wa">
              <PhoneCall size={16} /> WhatsApp Inquiry Desk
            </a>
          </div>
        </div>

        <div className="nav-right-actions">
          <button
            className="btn-nav-rfq"
            onClick={() => setIsDrawerOpen(true)}
            title="View Quote Request Basket"
            aria-label="View Quote Request Basket"
          >
            <ShoppingBag size={18} />
            <span className="nav-rfq-text">Quote Basket</span>
            {totalItemsCount > 0 && <span className="nav-badge-pill">{totalItemsCount}</span>}
          </button>

          <button 
            className="menu-icon-btn" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
