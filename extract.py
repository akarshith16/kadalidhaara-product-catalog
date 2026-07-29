import fitz # PyMuPDF
import json
import os
import re

pdf_path = r"C:\Users\akars\OneDrive\Desktop\KadaliDhaara product list.pdf"
output_dir = r"public\images"
os.makedirs(output_dir, exist_ok=True)

products = []

try:
    doc = fitz.open(pdf_path)
    for i in range(len(doc)):
        page = doc[i]
        text = page.get_text()
        
        # Extract images
        image_list = page.get_images(full=True)
        img_paths = []
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_filename = f"page_{i+1}_img_{img_index+1}.{image_ext}"
            img_path = os.path.join(output_dir, img_filename)
            with open(img_path, "wb") as f:
                f.write(image_bytes)
            img_paths.append(img_filename)
            
        products.append({
            "page": i + 1,
            "text": text.strip(),
            "images": img_paths
        })

    with open("raw_products.json", "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
        
    print(f"Extracted {len(products)} pages.")
except Exception as e:
    print(f"Error: {e}")
