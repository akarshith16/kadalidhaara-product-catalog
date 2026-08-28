import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Grid, Sparkles, PhoneCall } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { totalItemsCount, setIsDrawerOpen } = useInquiry();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar-wrapper">
      <div className="top-announcement-bar">
        <span>🌿 Direct from Artisans of Pulivendula, AP • 100% Eco-Friendly • Custom B2B & Export Orders</span>
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

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>
            Home
          </Link>

          <Link to="/catalog" onClick={closeMenu} className={`catalog-link-highlight ${location.pathname === '/catalog' ? 'active' : ''}`}>
            <Grid size={15} /> All Products (113)
          </Link>

          <div className="dropdown">
            <button className="dropbtn">
              Industries & Collections ▾
            </button>
            <div className="dropdown-content">
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
        </div>

        <div className="nav-right-actions">
          <button
            className="btn-nav-rfq"
            onClick={() => setIsDrawerOpen(true)}
            title="View Quote Request Basket"
          >
            <ShoppingBag size={18} />
            <span className="nav-rfq-text">Quote Basket</span>
            {totalItemsCount > 0 && <span className="nav-badge-pill">{totalItemsCount}</span>}
          </button>

          <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
