import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));

data.forEach(product => {
  if (product.industries && product.industries.length > 0) {
    const primary = product.industries[0];
    if (primary === 'hotels' || primary === 'interiors') {
      product.image = 'images/tray_hotels.png';
    } else if (primary === 'corporate') {
      product.image = 'images/lunchbag_corporate.png';
    } else if (primary === 'wellness') {
      product.image = 'images/yogamat_wellness.png';
    } else if (primary === 'food') {
      product.image = 'images/tray_food.png';
    } else if (primary === 'weddings' || primary === 'lifestyle') {
      product.image = 'images/basket_wedding.png';
    } else {
      product.image = 'images/tray_hotels.png'; // fallback
    }
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('All remaining product images mapped successfully!');
