import React, { useState, useMemo, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CatalogFilters from '../components/CatalogFilters';
import { useInquiry } from '../context/InquiryContext';
import allProductsData from '../products_mapped.json';
import { FileText, Sparkles } from 'lucide-react';

const Catalog = () => {
  const { setLineSheetData } = useInquiry();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedMaterial, setSelectedMaterial] = useState('All Materials');
  const [selectedPriceRange, setSelectedPriceRange] = useState({ label: 'All Prices', min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    document.title = 'Full Product Catalog (113 Items) | Kadali Dhaara Naturals';
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

  return (
    <div className="catalog-master-page">
      <HeroSection
        title="Complete Artisan Product Collection"
        subtitle="113 Sustainable, Export-Ready Handcrafted Banana Fiber & Bark Creations"
        imageClass="hero-home"
      />

      <div className="catalog-content-container">
        {/* Line Sheet Bar */}
        <div className="catalog-action-banner">
          <div className="banner-text">
            <Sparkles size={18} className="icon-gold" />
            <span>Procurement Buyer or Interior Stylist? Generate a ready-to-share PDF wholesale line sheet for your board.</span>
          </div>
          <button className="btn-linesheet-trigger" onClick={openLineSheet}>
            <FileText size={16} /> View & Print Line Sheet ({filteredProducts.length} items)
          </button>
        </div>

        {/* Filters */}
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
        <section className="catalog-grid-section">
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
        </section>
      </div>
    </div>
  );
};

export default Catalog;
