import fs from 'fs';

const nameMap = {
  1: "Artisanal Heritage Fruit Tray",
  2: "Classic Cylindrical Storage Basket",
  3: "Grand Round Woven Fruit Tray",
  4: "Traditional Temple Pooja Kuda",
  5: "Protective Woven Refrigerator Cover",
  6: "Handcrafted Deep Storage Basket",
  7: "Natural Woven Sun Cap",
  8: "Handcrafted Botanical Wall Hanging",
  9: "Artisan Insulated Lunch Tote",
  10: "Bohemian Woven Mandala Decor",
  11: "Multipurpose Hanging Wall Caddy",
  12: "Elegance Woven Shoulder Handbag",
  13: "Artisanal Oval Silhouette Handbag",
  14: "Heritage Weave Day Handbag",
  15: "Eco-Luxury Executive Laptop Bag",
  16: "Handcrafted Mobile Phone Pouch",
  17: "Structured Square Tote Handbag",
  18: "Boho Round Crossbody Bag",
  19: "Contemporary Xolo Shoulder Bag",
  20: "Natural Handwoven Meditation Yoga Mat",
  21: "Twisted Edge Serving Tray",
  22: "Breathable Woven Car Seat Cushion Cover",
  23: "Rectangle Artisan Serving Platter",
  24: "V-Tapered Woven Gift Basket",
  25: "Rustic Weave Utility Basket",
  26: "Deep Market Basket with Sturdy Handles",
  27: "Artisanal Envelope Hand Purse",
  28: "Luxury Resort Tall Laundry Hamper",
  29: "Natural Bark Tea Coaster Set",
  30: "Fine Weave Table Linen Mat",
  31: "Dual-Tone Reversible Woven Tote",
  32: "Jute-Accented Eco Lunch Bag",
  322: "Jute-Accented Executive Document Folder",
  33: "Earthy Textured Dining Table Runner",
  34: "Jute-Blended Utility Tote",
  35: "Artisanal Wall Medallion Accents",
  36: "Slim Woven Pencil & Cosmetic Pouch",
  37: "Festive Wedding Return Gift Basket",
  38: "Circular Handwoven Vanity Bag",
  39: "Modern Structured Tap Shoulder Bag",
  40: "Seashell-Embellished Decorative Mat",
  41: "Organic Biodegradable Dining Eco Plates",
  42: "Handwoven Keepsake Photo Frame Mat",
  43: "Traditional Bridal Return Gift Hamper",
  44: "Embellished Festive Favor Caddy",
  45: "Heritage Wedding Keepsake Box",
  46: "Royal Celebration Favor Basket",
  47: "Intricate Bark Ceremony Gift Hamper",
  48: "Classic Festive Return Gift Basket",
  49: "Modern Square Woven Handbag",
  50: "Festive Celebration Gift Box",
  51: "Biodegradable Eco-Sanitary Natural Pads",
  52: "Hand-Painted Artisan Floral Mat",
  53: "Hand-Painted Folk Art Display Mat",
  54: "Artisan Woven Casual Handbag",
  55: "Minimalist Everyday Market Bag",
  56: "Contemporary Chic Day Tote",
  57: "Bohemian Woven Floral Wall Accent",
  58: "Festive Return Gift Wall Medallion",
  59: "Grand Wedding Return Gift Hamper",
  60: "Artisanal Showcase Decorative Figurine",
  61: "Celebration Return Gift Keepsake",
  62: "Handcrafted Heritage Showcase Figurine",
  63: "Sculptural Folk Art Showcase Decor",
  64: "Artisanal Peacock Showcase Figurine",
  65: "Handcrafted Natural Woven Sun Hat",
  66: "Resort Luxury Handwoven Floor Rug",
  67: "Eco-Living Woven Area Mat",
  68: "Everyday Sustainable Lunch Bag",
  69: "Artisanal Sunburst Wall Hanging",
  70: "Deluxe Woven Master Bed Runner",
  71: "Classic Market Woven Shopping Tote",
  72: "Spacious Grocery Shopping Bag",
  73: "Contemporary Bohemian Shoulder Bag",
  74: "Natural Textured Floor & Bench Mat",
  75: "Geometric Pattern Woven Floor Mat",
  76: "Printed Jute Market Shopping Bag",
  77: "Traditional Temple Ritual Pooja Broom",
  78: "Royal Temple Floral Pooja Basket",
  79: "Boutique Stylish Handbag with Braided Handles",
  80: "Designer Woven Evening Handbag",
  81: "Artisanal Woven Planter Pot",
  82: "Ergonomic Eco-Resort Spa Slippers",
  83: "Comfort-Fit Natural Fiber Slippers",
  84: "Rustic Weave Storage & Gift Basket",
  85: "Intricate Spiral Dining Placemat",
  86: "Textured Fibre Accent Cushion Cover",
  87: "Natural Handwoven Roll-up Window Blinds",
  88: "Heavy-Duty Hand-Twisted Fibre Rope",
  89: "Insulated Water Dispenser Can Sleeve",
  90: "Eco Water Bottle Carrier Bag",
  91: "Luxury Resort Poolside Shopping Tote",
  92: "Single-Use Eco Guest Spa Sandals",
  93: "Woven Handbag with Genuine Leather Straps",
  94: "Rectangular Woven Storage Organizer Box",
  95: "Traditional Festive Ceremony Garlands",
  96: "Golden Wedding Jute Gift Bag",
  97: "Classic Wedding Favor Jute Bag",
  98: "Handcrafted Basket with Natural Bamboo Handle",
  99: "Non-Woven Festive Celebration Favor Bag",
  100: "Indoor Botanical Planter Pot",
  101: "Planter Basket with Integrated Growbag",
  102: "Handwoven Jewellery & Trinket Box",
  103: "Handcrafted Natural Fibre Sun Visor Cap",
  104: "Ergonomic Natural Fibre Desk Mouse Pad",
  105: "Artisan Bread Basket with Teak Base",
  106: "Foldable Contemporary Shopping Bag",
  107: "Countertop Cutlery & Spoon Holder",
  108: "Artisanal Tourist Travel Wallet Clutch",
  109: "Urban Chic Everyday Handbag",
  110: "Accordion Expandable Woven Wall Hanger",
  111: "Handcrafted Mandala Wall Art Decor",
  112: "Classic Round Multipurpose Woven Basket"
};

// Update products_mapped.json
const mappedPath = 'src/products_mapped.json';
const mappedProducts = JSON.parse(fs.readFileSync(mappedPath, 'utf-8'));
let countMapped = 0;

mappedProducts.forEach(product => {
  if (nameMap[product.id]) {
    product.name = nameMap[product.id];
    countMapped++;
  }
});

fs.writeFileSync(mappedPath, JSON.stringify(mappedProducts, null, 2));
console.log(`Updated ${countMapped} product names in ${mappedPath}`);

// Update products.json if present
const productsPath = 'src/products.json';
if (fs.existsSync(productsPath)) {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
  let countProducts = 0;
  products.forEach(product => {
    if (nameMap[product.id]) {
      product.name = nameMap[product.id];
      countProducts++;
    }
  });
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  console.log(`Updated ${countProducts} product names in ${productsPath}`);
}
