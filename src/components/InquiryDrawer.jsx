import React, { useState } from 'react';
import { useInquiry } from '../context/InquiryContext';
import { ShoppingBag, X, Trash2, Send, MessageCircle, Building, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const InquiryDrawer = () => {
  const {
    basket,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromBasket,
    updateQuantity,
    updateNote,
    clearBasket,
    totalItemsCount
  } = useInquiry();

  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    generalNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setBuyerInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateWhatsAppMessage = () => {
    let msg = `*Bulk RFQ / Wholesale Inquiry - Kadali Dhaara Naturals*\n\n`;
    if (buyerInfo.name) msg += `*Buyer Name:* ${buyerInfo.name}\n`;
    if (buyerInfo.company) msg += `*Company / Property:* ${buyerInfo.company}\n`;
    if (buyerInfo.phone) msg += `*Contact:* ${buyerInfo.phone}\n`;
    if (buyerInfo.location) msg += `*Location:* ${buyerInfo.location}\n\n`;

    msg += `*Selected Products (${basket.length}):*\n`;
    basket.forEach((item, index) => {
      msg += `\n${index + 1}. *${item.name}* (ID: ${item.id})\n`;
      msg += `   - Target Quantity: ${item.quantity} units\n`;
      msg += `   - Approx Price: ₹${item.price}\n`;
      if (item.dimensions) msg += `   - Dimensions: ${item.dimensions}\n`;
      if (item.customizationNote) msg += `   - Customization: ${item.customizationNote}\n`;
    });

    if (buyerInfo.generalNotes) {
      msg += `\n*Additional Requirements:* ${buyerInfo.generalNotes}\n`;
    }

    msg += `\nPlease provide wholesale quotation, lead times, and customization options.`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppSend = () => {
    const message = generateWhatsAppMessage();
    // WhatsApp contact for Kadali Dhaara Naturals
    window.open(`https://wa.me/916366638040?text=${message}`, '_blank');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Bulk Order RFQ: ${buyerInfo.company || buyerInfo.name || 'Wholesale Inquiry'} (${basket.length} Items)`);
    let body = `Dear Kadali Dhaara Naturals Team,\n\nI would like to request a bulk wholesale quotation for the following handcrafted items:\n\n`;

    if (buyerInfo.name) body += `Buyer Name: ${buyerInfo.name}\n`;
    if (buyerInfo.company) body += `Company / Organization: ${buyerInfo.company}\n`;
    if (buyerInfo.phone) body += `Phone / WhatsApp: ${buyerInfo.phone}\n`;
    if (buyerInfo.location) body += `Delivery Destination: ${buyerInfo.location}\n\n`;

    body += `--- REQUESTED ITEMS ---\n`;
    basket.forEach((item, idx) => {
      body += `${idx + 1}. ${item.name} (Product ID: ${item.id})\n`;
      body += `   - Target Quantity: ${item.quantity} pcs\n`;
      body += `   - Dimensions: ${item.dimensions || 'Standard'}\n`;
      body += `   - Indicative Unit Price: ₹${item.price}\n`;
      if (item.customizationNote) body += `   - Customization / Branding: ${item.customizationNote}\n`;
      body += `\n`;
    });

    if (buyerInfo.generalNotes) {
      body += `Additional Notes:\n${buyerInfo.generalNotes}\n\n`;
    }

    body += `Kindly share your best B2B tier pricing, sample policies, and production lead times.\n\nBest regards,\n${buyerInfo.name || 'Procurement Team'}`;

    window.location.href = `mailto:kadalidhaara@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Floating Inquiry Basket Launcher */}
      <button
        className="floating-rfq-btn"
        onClick={() => setIsDrawerOpen(true)}
        title="View Quote Request Basket"
        aria-label="View Quote Request Basket"
      >
        <ShoppingBag size={22} />
        <span className="rfq-text">Quote Basket</span>
        {totalItemsCount > 0 && <span className="rfq-badge">{totalItemsCount}</span>}
      </button>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`rfq-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={22} className="icon-gold" />
            <div>
              <h3>Wholesale RFQ Basket</h3>
              <p>{totalItemsCount} item{totalItemsCount !== 1 ? 's' : ''} selected for quotation</p>
            </div>
          </div>
          <button className="btn-close-drawer" onClick={() => setIsDrawerOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="drawer-body">
          {basket.length === 0 ? (
            <div className="empty-basket">
              <ShoppingBag size={48} className="empty-icon" />
              <h4>Your Inquiry Basket is Empty</h4>
              <p>Explore our handcrafted catalog and click <strong>"+ Add to RFQ"</strong> on products you would like custom quotes for.</p>
              <button
                className="btn-browse"
                onClick={() => {
                  setIsDrawerOpen(false);
                  window.location.href = '/catalog';
                }}
              >
                Browse Full Catalog &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="basket-items-list">
                {basket.map(item => (
                  <div key={item.id} className="basket-item-card">
                    <img src={`/${item.image}`} alt={item.name} className="basket-item-img" />
                    <div className="basket-item-details">
                      <div className="item-title-row">
                        <h4>{item.name}</h4>
                        <button
                          className="btn-remove-item"
                          onClick={() => removeFromBasket(item.id)}
                          title="Remove from RFQ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="item-meta">
                        <span>₹{item.price}/pc (base)</span>
                        {item.dimensions && <span>• {item.dimensions}</span>}
                      </p>

                      <div className="item-qty-row">
                        <label>Target Qty:</label>
                        <div className="qty-controls">
                          <button onClick={() => updateQuantity(item.id, Math.max(10, item.quantity - 25))}>-25</button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          />
                          <button onClick={() => updateQuantity(item.id, item.quantity + 25)}>+25</button>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Custom size, logo stamping, or color request..."
                        value={item.customizationNote || ''}
                        onChange={(e) => updateNote(item.id, e.target.value)}
                        className="item-note-input"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Buyer Contact Form */}
              <div className="buyer-info-section">
                <h4>Procurement / Buyer Details</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Ananya Sharma"
                      value={buyerInfo.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company / Property Name *</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="e.g. Taj Resorts / EcoLiving Decor"
                      value={buyerInfo.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="buyer@hospitality.com"
                      value={buyerInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={buyerInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Delivery City / Port / Country</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Bangalore / Goa / Export to Dubai"
                      value={buyerInfo.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>General Order Requirements / Target Date</label>
                    <textarea
                      name="generalNotes"
                      rows="2"
                      placeholder="Required delivery timeline, sample requests, or packaging instructions..."
                      value={buyerInfo.generalNotes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {basket.length > 0 && (
          <div className="drawer-footer">
            <div className="footer-actions">
              <button className="btn-whatsapp-rfq" onClick={handleWhatsAppSend}>
                <MessageCircle size={18} />
                <span>Instant WhatsApp Quote</span>
              </button>
              <button className="btn-email-rfq" onClick={handleEmailSend}>
                <Mail size={18} />
                <span>Submit Email RFQ</span>
              </button>
            </div>
            <div className="footer-meta">
              <button className="btn-clear-all" onClick={clearBasket}>Clear Basket</button>
              <span>Direct B2B Pricing • Direct Artisan Sourcing</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InquiryDrawer;
