import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Leaf, Users, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'Our Story & Artisan Heritage | Kadali Dhaara Naturals';
  }, []);

  return (
    <div className="about-page">
      <HeroSection 
        title="Artisan Heritage & Sustainable Craft" 
        subtitle="Transforming post-harvest agricultural banana waste into export-grade luxury utility." 
        imageClass="hero-about"
      />

      {/* Mission Spotlight */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="spotlight-text-block">
            <span className="craft-tagline">
              <Sparkles size={14} /> Born in Pulivendula, Andhra Pradesh
            </span>
            <h2>Weaving a Greener Tomorrow, One Fiber at a Time</h2>
            <p>
              In rural Andhra Pradesh, after farmers harvest nutrient-rich bananas, massive pseudo-stems were traditionally discarded or burned as agricultural waste. 
            </p>
            <p>
              <strong>Kadali Dhaara Naturals</strong> was founded to transform this agricultural byproduct into a thriving engine of rural craft, creating exquisite, long-lasting utility items for luxury resorts, boutique homes, and conscious global brands.
            </p>

            <div className="impact-highlights-grid">
              <div className="impact-box">
                <Leaf size={24} className="impact-icon" />
                <span className="impact-num">100%</span>
                <span className="impact-lbl">Plant-Based & Biodegradable</span>
              </div>
              <div className="impact-box">
                <Users size={24} className="impact-icon" />
                <span className="impact-num">300+</span>
                <span className="impact-lbl">Women Artisans Empowered</span>
              </div>
              <div className="impact-box">
                <ShieldCheck size={24} className="impact-icon" />
                <span className="impact-num">0%</span>
                <span className="impact-lbl">Harmful Chemicals or Dyes</span>
              </div>
            </div>
          </div>

          <div className="spotlight-image-showcase">
            <div className="showcase-img-card primary-img">
              <img src="/images/tray_hotels.png" alt="Artisan Basketry" />
              <div className="img-caption">Export-Grade Hospitality Line</div>
            </div>
            <div className="showcase-img-card secondary-img">
              <img src="/images/decor_lifestyle.png" alt="Handcrafted Fiber Weave" />
              <div className="img-caption">Fine Handwoven Texture</div>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Journey Process */}
      <section className="craft-journey-section">
        <div className="section-header-center">
          <h2>The Journey: From Farm to Fine Living</h2>
          <p>How raw banana plant stems become sustainable luxury masterpieces.</p>
        </div>

        <div className="journey-steps-grid">
          <div className="journey-step-card">
            <div className="step-badge">01</div>
            <h3>Post-Harvest Sourcing</h3>
            <p>We source harvested banana tree stems directly from local farmers in Kadapa and Pulivendula, providing farmers supplementary income for agricultural residue.</p>
          </div>

          <div className="journey-step-card">
            <div className="step-badge">02</div>
            <h3>Natural Fiber Extraction</h3>
            <p>The stems are hand-stripped into durable bark layers and fine silky fibers. They are naturally sun-dried and conditioned with zero toxic chemicals.</p>
          </div>

          <div className="journey-step-card">
            <div className="step-badge">03</div>
            <h3>Master Artisan Weaving</h3>
            <p>Trained master craftswomen braid, loop, and knot the strands into structured baskets, durable dining mats, cushioned sandals, and luxury home accents.</p>
          </div>

          <div className="journey-step-card">
            <div className="step-badge">04</div>
            <h3>Finishing & Quality Check</h3>
            <p>Each product undergoes meticulous trimming, shape validation, and moisture-controlled curing to meet hospitality and international export standards.</p>
          </div>
        </div>
      </section>

      {/* Material Education Section */}
      <section className="materials-guide-section">
        <div className="materials-container">
          <div className="materials-header">
            <h2>Understanding Our Natural Materials</h2>
            <p>Each natural material brings distinct physical characteristics and aesthetic textures.</p>
          </div>

          <div className="materials-grid">
            <div className="material-card">
              <div className="material-img-wrapper">
                <img src="/images/basket_hotel.png" alt="Banana Bark Product" />
                <span className="material-pill">Banana Bark</span>
              </div>
              <div className="material-info">
                <h3>Banana Bark (The Outer Layer)</h3>
                <p>Thick, sturdy, and rich in natural earth tones. Characterized by broad ribbon weaves and exceptional tensile strength.</p>
                <ul className="material-features">
                  <li><CheckCircle2 size={16} /> Best for: Laundry hampers, planters, structural storage baskets.</li>
                  <li><CheckCircle2 size={16} /> Aesthetic: Earthy, warm brown, organic rustic look.</li>
                  <li><CheckCircle2 size={16} /> Durability: Heavy-duty and water-resilient with proper drying.</li>
                </ul>
              </div>
            </div>

            <div className="material-card">
              <div className="material-img-wrapper">
                <img src="/images/lunchbag_corporate.png" alt="Banana Fiber Product" />
                <span className="material-pill">Banana Fiber</span>
              </div>
              <div className="material-info">
                <h3>Banana Fiber (The Inner Core)</h3>
                <p>Fine, silky, highly pliable, and breathable. Woven tightly on handlooms or hand-braided for refined personal accessories.</p>
                <ul className="material-features">
                  <li><CheckCircle2 size={16} /> Best for: Dining table runners, yoga mats, laptop bags, spa sandals.</li>
                  <li><CheckCircle2 size={16} /> Aesthetic: Smooth, golden-cream, refined silk-like luster.</li>
                  <li><CheckCircle2 size={16} /> Durability: Lightweight, skin-friendly, and naturally breathable.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-card">
          <h2>Ready to Explore Our 113 Handcrafted Creations?</h2>
          <p>Browse our complete catalog or request custom line sheets for your hospitality, corporate, or interior design project.</p>
          <div className="cta-buttons-row">
            <Link to="/catalog" className="btn-cta-primary">
              Browse Full Catalog (113 Items) &rarr;
            </Link>
            <Link to="/bulk-orders" className="btn-cta-secondary">
              Wholesale & Custom Sourcing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
