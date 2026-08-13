import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));

data.forEach(product => {
  if (product.id === 1) {
    product.image = 'images/tray_hotels.png';
  } else if (product.id === 9) {
    product.image = 'images/lunchbag_corporate.png';
  } else if (product.id === 20) {
    product.image = 'images/yogamat_wellness.png';
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('Updated product images');
