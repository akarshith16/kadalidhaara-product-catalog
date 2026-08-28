import React from 'react';
import { useInquiry } from '../context/InquiryContext';
import { X, Printer, Download, Sparkles, Phone, Mail, Globe } from 'lucide-react';

const LineSheetModal = () => {
  const { lineSheetData, setLineSheetData } = useInquiry();

  if (!lineSheetData) return null;

  const { title, subtitle, products } = lineSheetData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="linesheet-modal-overlay" onClick={() => setLineSheetData(null)}>
      <div className="linesheet-modal" onClick={(e) => e.stopPropagation()}>
        <div className="linesheet-header-bar">
          <div>
            <h3>Digital Line Sheet & Lookbook</h3>
            <p>Print or save as PDF for procurement and board presentations</p>
          </div>
          <div className="linesheet-actions">
            <button className="btn-print" onClick={handlePrint}>
              <Printer size={18} /> Print / Save PDF
            </button>
            <button className="btn-close-linesheet" onClick={() => setLineSheetData(null)}>
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div className="printable-linesheet">
          <div className="linesheet-doc-header">
            <div className="brand-block">
              <h1>Kadali Dhaara Naturals</h1>
              <p className="brand-tagline">Premium Handcrafted Banana Fibre & Bark Products</p>
              <p className="provenance-note">Artisan Made in Pulivendula, Andhra Pradesh, India</p>
            </div>
            <div className="collection-block">
              <h2>{title} Line Sheet</h2>
              <p>{subtitle || 'Official B2B Wholesale Specification & Pricing Sheet'}</p>
              <p className="doc-date">Catalog Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            </div>
          </div>

          <div className="linesheet-grid">
            {products.map(product => (
              <div key={product.id} className="linesheet-item">
                <div className="linesheet-img-box">
                  <img src={`/${product.image}`} alt={product.name} />
                </div>
                <div className="linesheet-item-info">
                  <span className="item-ref">Ref #KD-{String(product.id).padStart(3, '0')}</span>
                  <h4>{product.name}</h4>
                  <div className="specs-table">
                    <div className="spec-item">
                      <strong>Category:</strong> {product.category}
                    </div>
                    {product.dimensions && (
                      <div className="spec-item">
                        <strong>Size:</strong> {product.dimensions}
                      </div>
                    )}
                    <div className="spec-item price-spec">
                      <strong>Base Rate:</strong> ₹{product.price}/pc
                    </div>
                    <div className="spec-item">
                      <strong>MOQ:</strong> 25 units
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="linesheet-doc-footer">
            <div className="footer-col">
              <h4>Customization & Branding</h4>
              <p>Custom dimensions, logo tagging, embossing, gift box packing, and export documentation available.</p>
            </div>
            <div className="footer-col contact-col">
              <h4>Direct Inquiries</h4>
              <p><Mail size={14} /> kadalidhaara@gmail.com</p>
              <p><Phone size={14} /> +91 63666 38040</p>
              <p><Globe size={14} /> www.kadalidhaara.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineSheetModal;
