import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/products_mapped.json', 'utf-8'));
let hqIndex = 1;

data.forEach(product => {
  // Only replace if it's an un-enhanced original image (not a .png)
  if (!(product.image.startsWith('images/') && product.image.endsWith('.png'))) {
    if (hqIndex <= 35) {
      product.image = `images/hq_product_${hqIndex}.jpeg`;
      hqIndex++;
    }
  }
});

fs.writeFileSync('src/products_mapped.json', JSON.stringify(data, null, 2));
console.log('Successfully assigned 35 high-quality images.');
