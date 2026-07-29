const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'products.json');
let products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let carCover = products.find(p => p.name && p.name.includes('Car Sheet Cover'));
if (carCover) carCover.price = '1950';

let weddingGift = products.find(p => p.name && p.name.includes('Wedding Return Gifts'));
if (weddingGift) weddingGift.price = '650';

let lunchBagIndex = products.findIndex(p => p.id === 32);
if (lunchBagIndex !== -1) {
  products[lunchBagIndex].name = 'Banana Fibre Value Added with Jute Lunch Bag';
  const fileFolder = {
    id: 322,
    page: 33,
    name: 'Banana Fibre Value Added with Jute File Folder',
    price: '275',
    dimensions: 'Width 21” / Height 14 “',
    category: 'Jute Products',
    image: 'images/page_33_img_2.jpeg',
    originalText: 'Product Name : File Folder \nPrice : 275'
  };
  if (!products.find(p => p.id === 322)) {
    products.splice(lunchBagIndex + 1, 0, fileFolder);
  }
}

let id83 = products.find(p => p.id === 83);
if (id83) id83.name = 'Banana Fibre Sandals VKC Brand';

let id109 = products.find(p => p.id === 109);
if (id109) id109.name = 'Banana Fibre Stylish Hand Bag';

let id111 = products.find(p => p.id === 111);
if (id111) id111.name = 'Banana Fibre Handmade Wall Decor';

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log('Fixed products.json');
