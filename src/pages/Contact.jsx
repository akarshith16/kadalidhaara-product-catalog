import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact B2B Desk & Artisan Hub | Kadali Dhaara Naturals';
  }, []);

  return (
    <div className="contact-page">
      <HeroSection 
        title="Connect with Our Artisan Desk" 
        subtitle="Direct access for bulk procurement, custom handicraft development, and export inquiries." 
        imageClass="hero-contact"
      />

      <section className="contact-main-section">
        <div className="contact-grid-container">
          
          {/* Direct Communication Cards */}
          <div className="contact-info-cards">
            
            <div className="contact-channel-card highlight-channel">
              <div className="channel-icon-box wa-bg">
                <MessageSquare size={24} />
              </div>
              <div className="channel-text">
                <h3>WhatsApp Direct B2B Desk</h3>
                <p>Instant quoting, catalog inquiries, and sample tracking.</p>
                <a 
                  href="https://wa.me/916366638040?text=Hi%20Kadali%20Dhaara%20Team%2C%20I%20would%20like%20to%20connect%20with%20your%20B2B%20Desk." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="channel-action-btn wa-btn"
                >
                  Chat: +91 63666 38040 &rarr;
                </a>
              </div>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon-box email-bg">
                <Mail size={24} />
              </div>
              <div className="channel-text">
                <h3>Official Commercial Email</h3>
                <p>Send formal RFPs, vendor onboarding tenders, and purchase orders.</p>
                <a href="mailto:kadalidhaara@gmail.com" className="channel-action-btn email-btn">
                  kadalidhaara@gmail.com &rarr;
                </a>
              </div>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon-box location-bg">
                <MapPin size={24} />
              </div>
              <div className="channel-text">
                <h3>Artisan Production Facility</h3>
                <p>Pulivendula, Kadapa District, Andhra Pradesh, India - 516390</p>
                <span className="channel-note">Pan-India Freight & Global Air/Sea Export</span>
              </div>
            </div>

            <div className="contact-channel-card">
              <div className="channel-icon-box hours-bg">
                <Clock size={24} />
              </div>
              <div className="channel-text">
                <h3>Business & Support Hours</h3>
                <p>Monday – Saturday: 9:00 AM – 7:30 PM IST</p>
                <span className="channel-note">Response time: Within 2 hours for commercial inquiries</span>
              </div>
            </div>

          </div>

          {/* Sourcing Assistant Card */}
          <div className="contact-assistant-box">
            <span className="assistant-badge">Wholesale Support</span>
            <h2>How Can We Assist Your Sourcing?</h2>
            <p>Whether you're furnishing a 150-room luxury resort or curating 500 bespoke wedding return hampers, our team in Pulivendula is here to deliver.</p>

            <ul className="assistant-perks-list">
              <li><ShieldCheck size={18} /> <strong>Custom Samples:</strong> Express courier delivery within 3-5 days.</li>
              <li><ShieldCheck size={18} /> <strong>Branding:</strong> Custom laser-engraved wooden tags & logo stamping.</li>
              <li><ShieldCheck size={18} /> <strong>Wholesale Line Sheets:</strong> Instant downloadable product line sheets with MOQ & tier pricing.</li>
            </ul>

            <div className="assistant-action-row">
              <Link to="/catalog" className="btn-assistant-catalog">
                Explore Full 113-Product Catalog
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
