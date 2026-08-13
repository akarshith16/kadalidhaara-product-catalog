import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import productsData from '../products_mapped.json';

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
  const [products, setProducts] = useState([]);
  
  const config = industryConfig[industryId] || { title: 'Industry', subtitle: '', idealFor: '' };

  useEffect(() => {
    const filtered = productsData.filter(p => p.industries && p.industries.includes(industryId));
    setProducts(filtered);
    document.title = `${config.title} | Kadali Dhaara Naturals`;
  }, [industryId]);

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
      
      <section className="product-grid-section">
        <h2>Curated Collection</h2>
        <div className="product-grid">
          {products.map(product => (
             <ProductCard 
               key={product.id} 
               product={product} 
               industryContext={industryId} 
             />
          ))}
          {products.length === 0 && <p>No products found for this category.</p>}
        </div>
      </section>
    </div>
  );
};

export default IndustryPage;
