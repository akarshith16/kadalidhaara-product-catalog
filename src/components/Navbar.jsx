import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Kadali Dhaara Naturals</Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <div className="dropdown">
          <button className="dropbtn">Industries</button>
          <div className="dropdown-content">
            <Link to="/industry/hotels">Hotels, Resorts & Homestays</Link>
            <Link to="/industry/corporate">Corporate Gifting</Link>
            <Link to="/industry/weddings">Weddings & Events</Link>
            <Link to="/industry/lifestyle">Lifestyle & Home Decor</Link>
            <Link to="/industry/food">Organic & Premium Food Brands</Link>
            <Link to="/industry/wellness">Ayurveda / Wellness / Yoga</Link>
            <Link to="/industry/interiors">Interior Designers & Decor Studios</Link>
          </div>
        </div>
        <Link to="/bulk-orders">Bulk Orders</Link>
        <Link to="/about">About / Our Story</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </div>
    </nav>
  );
};

export default Navbar;
