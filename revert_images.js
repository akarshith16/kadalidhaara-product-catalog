import fs from 'fs';

const originalData = JSON.parse(fs.readFileSync('src/products.json', 'utf-8'));
const mappedData = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));

const enhancedMap = {
  1: 'images/tray_hotels.png',
  9: 'images/lunchbag_corporate.png',
  20: 'images/yogamat_wellness.png',
  3: 'images/tray_food.png',
  43: 'images/basket_wedding.png'
};

mappedData.forEach(product => {
  if (enhancedMap[product.id]) {
    product.image = enhancedMap[product.id];
  } else {
    // Find original image
    const orig = originalData.find(p => p.id === product.id);
    if (orig) {
      product.image = orig.image;
    }
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(mappedData, null, 2));
console.log('Reverted duplicate images to original images.');
