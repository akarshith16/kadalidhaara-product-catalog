import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { X, Check, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Truck, Layers, Ruler } from 'lucide-react';

const ProductQuickView = () => {
  const { quickViewProduct, setQuickViewProduct, addToBasket } = useInquiry();
  const [qty, setQty] = useState(50);
  const [note, setNote] = useState('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const basePriceNum = parseInt(String(product.price).replace(/[^0-9]/g, '')) || 500;

  // Calculate volume discount tiers
  const tier50 = Math.round(basePriceNum * 0.95);
  const tier100 = Math.round(basePriceNum * 0.88);
  const tier500 = Math.round(basePriceNum * 0.80);

  const handleAdd = () => {
    addToBasket(product, qty, note);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Kadali Dhaara Team,\n\nI am inquiring about *${product.name}* (ID: ${product.id}).\n` +
      `Base Price: ₹${product.price}\n` +
      `Dimensions: ${product.dimensions || 'Standard'}\n` +
      `Target Quantity: ${qty} units\n` +
      (note ? `Customization: ${note}\n` : '') +
      `\nPlease share wholesale rate and availability.`
    );
    window.open(`https://wa.me/916366638040?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-modal" onClick={() => setQuickViewProduct(null)}>
          <X size={24} />
        </button>

        <div className="quick-view-content">
          {/* Image Container with Zoom hint */}
          <div className="quick-view-gallery">
            <div className="main-image-wrapper">
              <img src={`/${product.image}`} alt={product.name} className="quick-view-img" />
              <div className="badge-overlay">
                <span className="craft-pill">Artisan Handmade</span>
                <span className="eco-pill">100% Biodegradable</span>
              </div>
            </div>
            <p className="artisan-provenance">
              <Sparkles size={14} /> Crafted by women artisans of Pulivendula, Andhra Pradesh
            </p>
          </div>

          {/* Details & B2B Procurement Spec */}
          <div className="quick-view-info">
            <div className="category-tag">{product.category}</div>
            <h2>{product.name}</h2>
            <p className="product-id-tag">Item Ref: #KD-{String(product.id).padStart(3, '0')}</p>

            <div className="price-box">
              <div className="price-main">
                <span className="label">Indicative Base Price:</span>
                <span className="val">₹{product.price}</span>
                <span className="unit">/ unit (sample/MOQ)</span>
              </div>
            </div>

            {/* Volume Tier Table */}
            <div className="volume-tier-card">
              <h4>Wholesale Volume Tiers</h4>
              <div className="tier-grid">
                <div className={`tier-col ${qty >= 25 && qty < 100 ? 'active' : ''}`}>
                  <span className="tier-qty">25 - 99 pcs</span>
                  <span className="tier-price">₹{tier50}</span>
                </div>
                <div className={`tier-col ${qty >= 100 && qty < 500 ? 'active' : ''}`}>
                  <span className="tier-qty">100 - 499 pcs</span>
                  <span className="tier-price">₹{tier100}</span>
                  <span className="tier-badge">Popular</span>
                </div>
                <div className={`tier-col ${qty >= 500 ? 'active' : ''}`}>
                  <span className="tier-qty">500+ pcs</span>
                  <span className="tier-price">₹{tier500}</span>
                  <span className="tier-badge">Best Value</span>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="specifications-list">
              <div className="spec-row">
                <span className="spec-label"><Ruler size={16} /> Dimensions:</span>
                <span className="spec-val">{product.dimensions || 'Customizable to specifications'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><Layers size={16} /> Material:</span>
                <span className="spec-val">
                  {product.name.toLowerCase().includes('bark') ? 'Natural Banana Bark (Rustic/Sturdy)' : 'Eco Banana Fiber (Fine Weave)'}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><Truck size={16} /> Lead Time:</span>
                <span className="spec-val">7-14 Days (Sample: 2-3 Days)</span>
              </div>
              <div className="spec-row">
                <span className="spec-label"><ShieldCheck size={16} /> Customization:</span>
                <span className="spec-val">Logo branding, size variations, export packaging</span>
              </div>
            </div>

            {/* Quantity Selector & Customization */}
            <div className="rfq-actions-box">
              <div className="qty-row">
                <label>Target Quantity:</label>
                <div className="qty-picker">
                  <button onClick={() => setQty(Math.max(10, qty - 25))}>-25</button>
                  <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => setQty(qty + 25)}>+25</button>
                </div>
              </div>

              <input
                type="text"
                placeholder="Specific branding or dimension requests (optional)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="modal-note-input"
              />

              <div className="modal-cta-buttons">
                <button
                  className={`btn-add-rfq ${addedAnimation ? 'added' : ''}`}
                  onClick={handleAdd}
                >
                  {addedAnimation ? (
                    <>
                      <Check size={18} /> Added to RFQ Basket
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} /> + Add to Quote Basket
                    </>
                  )}
                </button>

                <button className="btn-direct-wa" onClick={handleDirectWhatsApp}>
                  <MessageCircle size={18} /> Inquire via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
