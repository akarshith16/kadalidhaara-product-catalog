import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import CatalogFilters from '../components/CatalogFilters';
import { useInquiry } from '../context/InquiryContext';
import productsData from '../products_mapped.json';
import { FileText, Sparkles } from 'lucide-react';

const industryConfig = {
  'hotels': {
    title: 'Hotels, Resorts & Homestays',
    subtitle: 'Elevate your guest experience with premium natural utility and decor pieces.',
    idealFor: 'Guest rooms, dining, housekeeping, and room styling.'
  },
  'corporate': {
    title: 'Corporate Gifting',
    subtitle: 'Sustainable, elegant gifting solutions for employees and executives.',
    idealFor: 'Employee kits, festive gifts, onboarding kits, and executive gifting.'
  },
  'weddings': {
    title: 'Weddings & Events',
    subtitle: 'Handcrafted gifting and decor for premium events and celebrations.',
    idealFor: 'Wedding return gifts, gift baskets, pooja setups, and hampers.'
  },
  'lifestyle': {
    title: 'Lifestyle & Home Decor',
    subtitle: 'Natural, aesthetic pieces for retail and home.',
    idealFor: 'Retail-friendly lifestyle products, home decor, and daily utility.'
  },
  'food': {
    title: 'Organic & Premium Food Brands',
    subtitle: 'Artisanal display and packaging solutions for gourmet brands.',
    idealFor: 'Gourmet stores, bakeries, premium food hampers, and eco-conscious brands.'
  },
  'wellness': {
    title: 'Ayurveda / Wellness / Yoga',
    subtitle: 'Eco-accessories for a calm, natural wellness environment.',
    idealFor: 'Yoga studios, retreats, and wellness brands.'
  },
  'interiors': {
    title: 'Interior Designers & Decor Studios',
    subtitle: 'Warm, premium styling items for hospitality and boutique projects.',
    idealFor: 'Residential projects, hospitality, and boutique interiors.'
  }
};

const IndustryPage = () => {
  const { industryId } = useParams();
  const { setLineSheetData } = useInquiry();

  const config = industryConfig[industryId] || { title: 'Industry Collection', subtitle: '', idealFor: '' };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'All Prices', min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    document.title = `${config.title} | Kadali Dhaara Naturals`;
  }, [industryId, config.title]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedMaterial('All Materials');
    setSelectedPriceRange({ label: 'All Prices', min: 0, max: Infinity });
    setSortBy('featured');
  };

  const industryProducts = useMemo(() => {
    return productsData.filter(p => p.industries && p.industries.includes(industryId));
  }, [industryId]);

  const filteredProducts = useMemo(() => {
    let result = [...industryProducts];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.dimensions && p.dimensions.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Material filter
    if (selectedMaterial !== 'All Materials') {
      if (selectedMaterial === 'Banana Bark') {
        result = result.filter(p => p.name.toLowerCase().includes('bark') || (p.originalText && p.originalText.toLowerCase().includes('bark')));
      } else if (selectedMaterial === 'Jute Blends') {
        result = result.filter(p => p.name.toLowerCase().includes('jute') || p.category === 'Jute Products');
      } else if (selectedMaterial === 'Banana Fiber') {
        result = result.filter(p => !p.name.toLowerCase().includes('bark') && !p.name.toLowerCase().includes('jute'));
      }
    }

    // Price range
    result = result.filter(p => {
      const priceNum = parseInt(String(p.price).replace(/[^0-9]/g, '')) || 0;
      return priceNum >= selectedPriceRange.min && priceNum <= selectedPriceRange.max;
    });

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => (parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0) - (parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (parseInt(String(b.price).replace(/[^0-9]/g, '')) || 0) - (parseInt(String(a.price).replace(/[^0-9]/g, '')) || 0));
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [industryProducts, searchQuery, selectedCategory, selectedMaterial, selectedPriceRange, sortBy]);

  const openLineSheet = () => {
    setLineSheetData({
      title: config.title,
      subtitle: `Curated assortment for ${config.title.toLowerCase()} (${filteredProducts.length} items)`,
      products: filteredProducts
    });
  };

  return (
    <div className="industry-page">
      <HeroSection 
        title={config.title} 
        subtitle={config.subtitle} 
        imageClass={`hero-${industryId}`}
      />
      
      <section className="industry-info">
        <div className="ideal-for">
          <h3>Ideal For</h3>
          <p>{config.idealFor}</p>
        </div>
        <div className="customization-note">
          <h3>Customization for Bulk Orders</h3>
          <p>We offer customized sizes, shapes, and combinations tailored specifically for {config.title.toLowerCase()}. Contact us with your requirements.</p>
        </div>
      </section>

      <div className="industry-content-container">
        {/* Action banner */}
        <div className="catalog-action-banner">
          <div className="banner-text">
            <Sparkles size={18} className="icon-gold" />
            <span>Procurement Buyer? Download or print the full <strong>{config.title}</strong> wholesale line sheet.</span>
          </div>
          <button className="btn-linesheet-trigger" onClick={openLineSheet}>
            <FileText size={16} /> View & Print Line Sheet ({filteredProducts.length} items)
          </button>
        </div>

        {/* Filter Toolbar */}
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
        />
        
        {/* Product Grid */}
        <section className="product-grid-section">
          <div className="product-grid">
            {filteredProducts.map(product => (
               <ProductCard 
                 key={product.id} 
                 product={product} 
                 industryContext={industryId} 
               />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="no-results-box">
              <h3>No products found for your filter criteria in this collection</h3>
              <button className="btn-reset-large" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default IndustryPage;
