import './style.css';
import productsData from './products.json';

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const categoryFilters = document.getElementById('category-filters');

  // Extract unique categories
  const categories = ['All', ...new Set(productsData.map(p => p.category))];

  // Render Filter Buttons
  categories.forEach(category => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${category === 'All' ? 'active' : ''}`;
    btn.textContent = category;
    btn.dataset.category = category;
    btn.addEventListener('click', () => filterProducts(category, btn));
    categoryFilters.appendChild(btn);
  });

  // Render all products initially
  renderProducts(productsData);

  function filterProducts(category, activeBtn) {
    // Update active class
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');

    if (category === 'All') {
      renderProducts(productsData);
    } else {
      const filtered = productsData.filter(p => p.category === category);
      renderProducts(filtered);
    }
  }

  function renderProducts(products) {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      const imgSrc = product.image ? `/${product.image}` : '/vite.svg'; // Placeholder if no image
      const productTitle = product.name;
      
      const emailSubject = encodeURIComponent(`Inquiry for ${productTitle}`);
      const emailBody = encodeURIComponent(`Hi Kadali Dhaara Naturals,\n\nI am interested in bulk ordering the following product:\n\nProduct Name: ${productTitle}\nProduct Category: ${product.category}\nDimensions: ${product.dimensions}\n\nPlease let me know the bulk pricing and availability.\n\nThank you.`);
      const mailtoLink = `mailto:kadalidhaara@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      card.innerHTML = `
        <img src="${imgSrc}" alt="${productTitle}" class="product-image" loading="lazy">
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${productTitle}</h3>
          ${product.dimensions ? `<p class="product-dimensions">${product.dimensions}</p>` : ''}
          <a href="${mailtoLink}" class="btn btn-enquire">Enquire Now</a>
        </div>
      `;

      productGrid.appendChild(card);
    });
  }
});
