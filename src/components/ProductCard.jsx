import React from 'react';

const ProductCard = ({ product, industryContext }) => {
  // Construct mailto link
  const subject = encodeURIComponent(`Enquiry for ${product.name}`);
  const body = encodeURIComponent(`Hi Kadali Dhaara Naturals team,\n\nI am interested in bulk ordering the following product for my business:\n\nProduct Name: ${product.name}\nDimensions: ${product.dimensions}\nPrice: ${product.price}\n\nCould you please share more details regarding customization, MOQ, and shipping?\n\nThank you.`);
  const mailtoLink = `mailto:contact@kadalidhaara.com?subject=${subject}&body=${body}`;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={`/${product.image}`} alt={product.name} loading="lazy" />
        <div className="product-badge">Customizable for bulk orders</div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="dimensions">Size: {product.dimensions}</p>
        <p className="price">₹{product.price}</p>
        
        {industryContext && (
          <p className="industry-context-note">
            Perfect for {industryContext.replace('-', ' ')}
          </p>
        )}
        
        <a href={mailtoLink} className="btn-enquire">
          ENQUIRE NOW
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
