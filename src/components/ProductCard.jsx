import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { Plus, Check, MessageCircle, Eye, Sparkles } from 'lucide-react';

const ProductCard = ({ product, industryContext }) => {
  const { addToBasket, setQuickViewProduct } = useInquiry();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = (e) => {
    e.stopPropagation();
    addToBasket(product, 50);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hi Kadali Dhaara Team,\n\nI would like to inquire about *${product.name}* (ID: ${product.id}).\nPrice: ₹${product.price}\nDimensions: ${product.dimensions || 'Standard'}\n\nPlease share MOQ, volume rates, and lead times.`
    );
    window.open(`https://wa.me/916366638040?text=${text}`, '_blank');
  };

  const openQuickView = () => {
    setQuickViewProduct(product);
  };

  // Craft tag
  const isBark = product.name.toLowerCase().includes('bark') || (product.originalText && product.originalText.toLowerCase().includes('bark'));
  const craftTag = isBark ? 'Banana Bark' : 'Banana Fiber';

  return (
    <div className="product-card" onClick={openQuickView} title="Click to view specifications & bulk tiers">
      <div className="product-image-container">
        <img src={`/${product.image}`} alt={product.name} loading="lazy" />
        
        {/* Badges */}
        <div className="card-top-badges">
          <span className="badge-craft">{craftTag}</span>
          <span className="badge-custom">Customizable</span>
        </div>

        {/* Quick View Hover Action */}
        <div className="quick-view-hover-btn">
          <Eye size={16} /> Quick View
        </div>
      </div>

      <div className="product-info">
        <div className="product-category-row">
          <span className="card-category">{product.category}</span>
          <span className="card-ref">#KD-{String(product.id).padStart(3, '0')}</span>
        </div>

        <h3 className="card-title">{product.name}</h3>

        <div className="card-spec-row">
          <span className="dimensions">{product.dimensions ? `Size: ${product.dimensions}` : 'Custom Sizes Available'}</span>
        </div>

        <div className="card-price-row">
          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">{product.price}</span>
            <span className="unit">/pc</span>
          </div>
          <span className="moq-tag">MOQ: 25 pcs</span>
        </div>

        {industryContext && (
          <p className="industry-context-note">
            <Sparkles size={12} /> Curated for {industryContext.replace('-', ' ')}
          </p>
        )}

        {/* Card Action Buttons */}
        <div className="card-actions-grid" onClick={(e) => e.stopPropagation()}>
          <button
            className={`btn-card-rfq ${isAdded ? 'added' : ''}`}
            onClick={handleAddToBasket}
            title="Add to wholesale RFQ basket"
          >
            {isAdded ? (
              <>
                <Check size={15} /> Added
              </>
            ) : (
              <>
                <Plus size={15} /> Add to RFQ
              </>
            )}
          </button>

          <button
            className="btn-card-wa"
            onClick={handleWhatsApp}
            title="Direct WhatsApp inquiry"
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
