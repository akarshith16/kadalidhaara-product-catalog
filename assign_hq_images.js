import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));
const NUM_HQ_IMAGES = 35;
let hqIndex = 1;

data.forEach(product => {
  product.image = `images/hq_product_${hqIndex}.jpeg`;
  hqIndex++;
  if (hqIndex > NUM_HQ_IMAGES) {
    hqIndex = 1;
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('Successfully assigned high-quality images to all products.');
