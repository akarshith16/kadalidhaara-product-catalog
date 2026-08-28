import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Gift, 
  Sparkles, 
  Palette, 
  Ruler, 
  ShieldCheck, 
  Truck, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  FileText, 
  Layers 
} from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

const BulkOrders = () => {
  const { setIsDrawerOpen, setLineSheetData } = useInquiry();

  useEffect(() => {
    document.title = 'Wholesale, Bulk Procurement & Custom Gifting | Kadali Dhaara Naturals';
  }, []);

  const openFullLineSheet = () => {
    // Open line sheet
    window.location.href = '/catalog';
  };

  return (
    <div className="bulk-orders-page">
      <HeroSection 
        title="Wholesale Sourcing & Custom B2B Manufacturing" 
        subtitle="End-to-end sustainable supply for luxury resorts, corporate gifting, event agencies, and retail brands." 
        imageClass="hero-bulk"
      />

      {/* Capabilities Overview */}
      <section className="bulk-capabilities-section">
        <div className="section-header-center">
          <h2>Tailored For Modern Hospitality & Gifting Standards</h2>
          <p>We work directly with procurement heads, interior stylists, and brand managers to create bespoke assortments.</p>
        </div>

        <div className="capabilities-grid">
          <div className="capability-card">
            <div className="cap-icon-box"><Ruler size={24} /></div>
            <h3>Custom Sizes & Geometry</h3>
            <p>Need trays to fit specific hotel vanity dimensions or hampers designed around gourmet jars? Our artisans weave to your exact mm specs.</p>
            <span className="cap-benefit">✓ Zero standard mold restrictions</span>
          </div>

          <div className="capability-card">
            <div className="cap-icon-box"><Palette size={24} /></div>
            <h3>Corporate Branding & Laser Tagging</h3>
            <p>Incorporate your company insignia, resort logo, or event monogram through laser-engraved wooden tags, embossed leather patches, or screen-printed jute bands.</p>
            <span className="cap-benefit">✓ High-precision corporate branding</span>
          </div>

          <div className="capability-card">
            <div className="cap-icon-box"><Building2 size={24} /></div>
            <h3>Hospitality Room & Spa Sets</h3>
            <p>Standardized, matching suites of eco-resort amenities: fruit trays, laundry hampers, tissue box covers, room slippers, and bedside catchalls.</p>
            <span className="cap-benefit">✓ Consistent multi-room batches</span>
          </div>

          <div className="capability-card">
            <div className="cap-icon-box"><Gift size={24} /></div>
            <h3>Festive & Wedding Return Gift Hampers</h3>
            <p>Curated festive hampers and wedding favor baskets ready for sweet boxes, pooja essentials, dry fruits, and custom celebration cards.</p>
            <span className="cap-benefit">✓ Scalable from 50 to 5,000+ units</span>
          </div>
        </div>
      </section>

      {/* 4-Step Wholesale Procurement Process */}
      <section className="procurement-process-section">
        <div className="process-container">
          <div className="section-header-center">
            <h2>Our Seamless 4-Step B2B Procurement Process</h2>
            <p>From initial design concept to door-delivered export-sealed consignments.</p>
          </div>

          <div className="process-timeline">
            <div className="process-card">
              <div className="process-num">1</div>
              <h4>Assortment Selection & RFQ</h4>
              <p>Browse our 113 products, add target items to your Quote Basket, or send custom sketch dimensions via WhatsApp or Email.</p>
            </div>

            <div className="process-card">
              <div className="process-num">2</div>
              <h4>Prototyping & Sampling</h4>
              <p>We produce an initial physical sample or branded prototype within 3–5 days for your team’s tactile review and approval.</p>
            </div>

            <div className="process-card">
              <div className="process-num">3</div>
              <h4>Artisan Cluster Batch Weaving</h4>
              <p>Our artisan clusters in Pulivendula weave your consignment with rigorous dimensional checks, tension control, and organic curing.</p>
            </div>

            <div className="process-card">
              <div className="process-num">4</div>
              <h4>Moisture-Sealed Dispatch</h4>
              <p>Items are fumigated, moisture-sealed, and packaged in reinforced export cartons for safe pan-India and international freight.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Volume Benefits */}
      <section className="wholesale-tiers-section">
        <div className="tiers-container">
          <div className="tier-info-box">
            <h2>Wholesale Volume Discounts & Minimums</h2>
            <p>We operate directly at the artisan source, offering unmatched B2B pricing with zero middleman markups.</p>
            
            <ul className="tier-perks-list">
              <li><CheckCircle2 size={18} className="icon-green" /> <strong>Low Trial MOQs:</strong> Starting from just 25 units per SKU for boutique hotels and testing.</li>
              <li><CheckCircle2 size={18} className="icon-green" /> <strong>Tiered Volume Savings:</strong> Up to 20% savings on orders exceeding 200+ units.</li>
              <li><CheckCircle2 size={18} className="icon-green" /> <strong>GST Invoicing & Export Compliance:</strong> Full corporate documentation, HSN codes, and export paperwork provided.</li>
              <li><CheckCircle2 size={18} className="icon-green" /> <strong>Dedicated Account Manager:</strong> Direct WhatsApp support for timeline tracking and sample dispatches.</li>
            </ul>
          </div>

          <div className="sample-kit-box">
            <div className="sample-kit-badge">For Architects & Designers</div>
            <h3>Order a Material & Texture Sample Kit</h3>
            <p>Experience the texture, braid quality, and finish of our banana bark, banana fiber, and jute materials firsthand before placing your volume order.</p>
            <a
              href="https://wa.me/916366638040?text=Hi%20Kadali%20Dhaara%20Team%2C%20I%20would%20like%20to%20request%20a%20Material%20Sample%20Kit%20for%20my%20firm."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sample-kit"
            >
              <MessageCircle size={18} /> Request Sample Kit on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Ready to Order CTA */}
      <section className="bulk-cta-section">
        <div className="bulk-cta-card">
          <h2>Ready to Begin Your Wholesale Inquiry?</h2>
          <p>Contact our B2B desk directly with your product IDs, quantities, and delivery timelines for an itemized commercial quotation within 2 business hours.</p>

          <div className="bulk-cta-actions">
            <a
              href="https://wa.me/916366638040?text=Hi%20Kadali%20Dhaara%20Team%2C%20I%20am%20interested%20in%20discussing%20a%20bulk%20procurement%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-bulk-wa"
            >
              <MessageCircle size={20} /> Chat with B2B Desk (+91 63666 38040)
            </a>

            <a
              href="mailto:kadalidhaara@gmail.com?subject=Bulk Wholesale Inquiry - Kadali Dhaara Naturals"
              className="btn-bulk-email"
            >
              <Mail size={20} /> Email RFQ (kadalidhaara@gmail.com)
            </a>

            <Link to="/catalog" className="btn-bulk-catalog">
              <FileText size={20} /> Browse 113 Products & Add to RFQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkOrders;
