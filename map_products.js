import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products.json', 'utf-8'));

// Heuristics for industry mapping
data.forEach(product => {
  product.industries = [];
  const name = product.name.toLowerCase();
  const cat = product.category.toLowerCase();
  
  // Hotels, Resorts & Homestays
  if (name.includes('tray') || name.includes('basket') || name.includes('mat') || name.includes('decor') || cat.includes('baskets') || cat.includes('mats')) {
    product.industries.push('hotels');
  }
  
  // Corporate Gifting
  if (name.includes('lunch') || name.includes('folder') || name.includes('pouch') || name.includes('laptop') || name.includes('purse') || cat.includes('jute')) {
    product.industries.push('corporate');
  }
  
  // Weddings & Events
  if (name.includes('pooja') || name.includes('return gift') || name.includes('gift') || name.includes('basket') || cat.includes('wedding')) {
    product.industries.push('weddings');
  }
  
  // Lifestyle & Home Decor
  if (name.includes('bag') || name.includes('purse') || name.includes('planter') || name.includes('hanger') || cat.includes('decor')) {
    product.industries.push('lifestyle');
  }
  
  // Organic & Premium Food Brands
  if (name.includes('tray') || name.includes('basket') || name.includes('plate') || name.includes('organic')) {
    product.industries.push('food');
  }
  
  // Ayurveda / Wellness / Yoga
  if (name.includes('yoga') || name.includes('mat') || name.includes('sanitary') || name.includes('cap')) {
    product.industries.push('wellness');
  }
  
  // Interior Designers
  if (name.includes('hanger') || name.includes('mat') || name.includes('box') || cat.includes('decor')) {
    product.industries.push('interiors');
  }
  
  // Deduplicate
  product.industries = [...new Set(product.industries)];
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('Mapped products successfully.');
