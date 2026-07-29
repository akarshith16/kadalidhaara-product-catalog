import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('raw_products.json', 'utf8'));
const products = [];
let idCounter = 1;

for (const page of rawData) {
  const text = page.text;
  
  if (!text || text.trim() === '') continue;
  
  // Extract name: Looking for patterns like "1. Product Name" or "Product Name :"
  let nameMatch = text.match(/^\d+\.\s*(.+?)\n/m) || text.match(/Product Name\s*[:-]\s*(.+?)\n/mi);
  let name = nameMatch ? nameMatch[1].trim() : "Unknown Product";
  
  // Extract price: Looking for "Price : 550" or similar
  let priceMatch = text.match(/Price\s*[:-]\s*(.+)/i);
  let price = priceMatch ? priceMatch[1].trim() : "TBA";
  
  // Extract dimensions: Looking for "Dimension : ..." or "Size :"
  let dimMatch = text.match(/Dimension\s*[:-]\s*(.+?)\n/i) || text.match(/Size\s*[:-]\s*(.+?)\n/i);
  let dimensions = dimMatch ? dimMatch[1].trim() : "";

  // Some text blocks have multiple products or messy formats. Let's do basic cleanup.
  name = name.replace(/(\r\n|\n|\r)/gm, " ");
  price = price.replace(/(\r\n|\n|\r)/gm, " ");
  
  if (name === "Unknown Product" && page.page === 1) {
    continue; // Skip title page
  }
  
  // Try to use the first image extracted from the page. If none, use a placeholder.
  let imagePath = page.images.length > 0 ? `images/${page.images[0]}` : null;
  
  // Attempt to categorize based on keywords
  let category = "Decor & Utility";
  const lowerName = name.toLowerCase();
  if (lowerName.includes("basket") || lowerName.includes("tray") || lowerName.includes("pot") || lowerName.includes("planter")) category = "Baskets & Trays";
  else if (lowerName.includes("bag") || lowerName.includes("purse") || lowerName.includes("handbag")) category = "Bags & Handbags";
  else if (lowerName.includes("mat") || lowerName.includes("cover")) category = "Mats & Covers";
  else if (lowerName.includes("wedding") || lowerName.includes("gift")) category = "Wedding Return Gifts";
  else if (lowerName.includes("jute")) category = "Jute Products";

  products.push({
    id: idCounter++,
    page: page.page,
    name: name,
    price: price,
    dimensions: dimensions,
    category: category,
    image: imagePath,
    originalText: text // Keep for debugging if needed
  });
}

fs.writeFileSync('src/products.json', JSON.stringify(products, null, 2));
console.log(`Parsed ${products.length} products.`);
