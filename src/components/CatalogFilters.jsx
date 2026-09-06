import React from 'react';
import { Search, RotateCcw, FileText, Sparkles } from 'lucide-react';

const categories = [
  'All Categories',
  'Baskets & Trays',
  'Mats & Covers',
  'Bags & Handbags',
  'Decor & Utility',
  'Wedding Return Gifts',
  'Jute Products'
];

const materials = [
  'All Materials',
  'Banana Fiber',
  'Banana Bark',
  'Jute Blends'
];

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹300', min: 0, max: 300 },
  { label: '₹300 - ₹750', min: 300, max: 750 },
  { label: '₹750 - ₹1,200', min: 750, max: 1200 },
  { label: '₹1,200+', min: 1200, max: Infinity }
];

const sortOptions = [
  { label: 'Featured / Recommended', value: 'featured' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' }
];

const CatalogFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedMaterial,
  setSelectedMaterial,
  selectedPriceRange,
  setSelectedPriceRange,
  sortBy,
  setSortBy,
  totalResults,
  onReset,
  openLineSheet
}) => {
  const isFiltered =
    searchQuery !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedMaterial !== 'All Materials' ||
    selectedPriceRange.label !== 'All Prices' ||
    sortBy !== 'featured';

  return (
    <div className="catalog-filters-container">
      {/* Top Search, Sort, Line Sheet & Results Row */}
      <div className="filters-top-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search 113 products (e.g. Planter, Bag, Mat, Fruit Tray, Pooja...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="btn-clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>

        <div className="sort-and-results">
          <span className="results-count">
            <strong>{totalResults}</strong> items
          </span>

          <div className="sort-selector">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort products">
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {openLineSheet && (
            <button className="btn-linesheet-compact" onClick={openLineSheet} title="Download or print wholesale PDF line sheet">
              <FileText size={15} />
              <span className="linesheet-btn-text">Line Sheet PDF</span>
            </button>
          )}

          {isFiltered && (
            <button className="btn-reset-filters" onClick={onReset} title="Reset all filters">
              <RotateCcw size={14} /> <span className="reset-btn-text">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="category-pills-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Tags: Material & Price */}
      <div className="secondary-filters-bar">
        <div className="filter-group-inline">
          <span className="filter-label">Material:</span>
          {materials.map(mat => (
            <button
              key={mat}
              className={`tag-btn ${selectedMaterial === mat ? 'active' : ''}`}
              onClick={() => setSelectedMaterial(mat)}
            >
              {mat}
            </button>
          ))}
        </div>

        <div className="filter-group-inline">
          <span className="filter-label">Price:</span>
          {priceRanges.map(pr => (
            <button
              key={pr.label}
              className={`tag-btn ${selectedPriceRange.label === pr.label ? 'active' : ''}`}
              onClick={() => setSelectedPriceRange(pr)}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
