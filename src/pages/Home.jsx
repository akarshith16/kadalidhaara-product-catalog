import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CatalogFilters from '../components/CatalogFilters';
import { useInquiry } from '../context/InquiryContext';
import allProductsData from '../products_mapped.json';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, ShieldCheck, Truck, RefreshCw, Grid } from 'lucide-react';

const Home = () => {
  const { setLineSheetData } = useInquiry();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'All Prices', min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    document.title = 'Kadali Dhaara Naturals | Handcrafted Banana Fibre & Bark Master Catalog (113 Items)';
  }, []);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedMaterial('All Materials');
    setSelectedPriceRange({ label: 'All Prices', min: 0, max: Infinity });
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    let result = [...allProductsData];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.dimensions && p.dimensions.toLowerCase().includes(q)) ||
        (p.originalText && p.originalText.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Material filter
    if (selectedMaterial !== 'All Materials') {
      if (selectedMaterial === 'Banana Bark') {
        result = result.filter(p =>
          p.name.toLowerCase().includes('bark') ||
          (p.originalText && p.originalText.toLowerCase().includes('bark'))
        );
      } else if (selectedMaterial === 'Jute Blends') {
        result = result.filter(p =>
          p.name.toLowerCase().includes('jute') ||
          p.category === 'Jute Products' ||
          (p.originalText && p.originalText.toLowerCase().includes('jute'))
        );
      } else if (selectedMaterial === 'Banana Fiber') {
        result = result.filter(p =>
          !p.name.toLowerCase().includes('bark') &&
          !p.name.toLowerCase().includes('jute')
        );
      }
    }

    // Price range
    result = result.filter(p => {
      const priceNum = parseInt(String(p.price).replace(/[^0-9]/g, '')) || 0;
      return priceNum >= selectedPriceRange.min && priceNum <= selectedPriceRange.max;
    });

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => {
        const pa = parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0;
        const pb = parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0;
        return pa - pb;
      });
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => {
        const pa = parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0;
        const pb = parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0;
        return pb - pa;
      });
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMaterial, selectedPriceRange, sortBy]);

  const openLineSheet = () => {
    setLineSheetData({
      title: selectedCategory !== 'All Categories' ? selectedCategory : 'Full Wholesale Collection',
      subtitle: `Curated assortment of ${filteredProducts.length} handcrafted products`,
      products: filteredProducts
    });
  };

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
      {/* Sleek Compact Header Strip: Immediate Context & Direct Product Access */}
      <section className="home-header-strip">
        <div className="home-strip-content">
          <div className="strip-badge-row">
            <span className="strip-badge">
              <Sparkles size={13} /> 113 Artisan Handcrafted Creations • Pulivendula, AP
            </span>
            <span className="strip-badge-sub">100% Eco-Friendly • Custom B2B & Export Ready</span>
          </div>
          <h1>Handcrafted Banana Fibre & Bark Master Catalog</h1>
          <p className="strip-desc">
            Explore our complete handcrafted collection across Baskets, Mats, Planters, Bags, and Room Utilities with live B2B wholesale quoting.
          </p>

          {/* Quick Sector Shortcut Jump Links */}
          <div className="sector-jump-pills">
            <span className="jump-label">Explore by Sector:</span>
            {industries.map((ind, idx) => (
              <Link to={ind.path} key={idx} className="jump-pill">
                {ind.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Artisan Product Catalog Section (Direct on First Page) */}
      <section className="home-catalog-section" id="products-catalog">
        <div className="catalog-content-container">
          {/* Search, Filter Pills, Sort & Line Sheet Toolbar */}
          <CatalogFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMaterial={selectedMaterial}
            setSelectedMaterial={setSelectedMaterial}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            totalResults={filteredProducts.length}
            onReset={handleReset}
            openLineSheet={openLineSheet}
          />

          {/* Product Grid - Immediate Visibility */}
          <div className="catalog-grid-section">
            {filteredProducts.length === 0 ? (
              <div className="no-results-box">
                <h3>No products match your active filters</h3>
                <p>Try resetting the search terms or selecting a different material/category.</p>
                <button className="btn-reset-large" onClick={handleReset}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Curated Sector / Industry Collections */}
      <section className="explore-industries">
        <div className="section-header-center">
          <div className="catalog-section-badge">
            <Grid size={14} /> Tailored Sector Solutions
          </div>
          <h2>Curated Industry Collections</h2>
          <p>Hand-selected product lines engineered for specific hospitality, corporate, and retail needs.</p>
        </div>
        <div className="industry-grid">
          {industries.map((ind, idx) => (
            <Link to={ind.path} key={idx} className="industry-card" style={{ backgroundImage: `url(${ind.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)', zIndex: 1 }}></div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ color: 'white' }}>{ind.title}</h3>
                <p style={{ color: '#f1cf8c' }}>View Collection &rarr;</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Brand & B2B Values */}
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
