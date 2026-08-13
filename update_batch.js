import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));

const updates = {
  2: 'images/basket_hotel.png',
  4: 'images/poojakuda_wedding.png',
  5: 'images/fridgecover_wellness.png',
  6: 'images/basket2_hotel.png',
  8: 'images/decor_lifestyle.png',
  10: 'images/decor2_lifestyle.png'
};

data.forEach(product => {
  if (updates[product.id]) {
    product.image = updates[product.id];
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('Batch images mapped successfully!');
