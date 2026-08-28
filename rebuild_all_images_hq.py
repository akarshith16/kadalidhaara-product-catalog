import os
import json
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageOps

def create_luxury_background(width, height, style='wooden_table'):
    """
    Generates a 800x600 4:3 high-end studio/hospitality background.
    """
    arr = np.zeros((height, width, 3), dtype=np.uint8)
    
    if style == 'wooden_table':
        table_y = int(height * 0.64)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(42 + ratio * 36), int(36 + ratio * 28), int(30 + ratio * 20)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(138 - ratio * 42), int(98 - ratio * 32), int(64 - ratio * 26)]
            
    elif style == 'marble_vanity':
        table_y = int(height * 0.60)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(230 - ratio * 18), int(224 - ratio * 18), int(214 - ratio * 16)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(248 - ratio * 25), int(244 - ratio * 25), int(236 - ratio * 24)]
            
    elif style == 'resort_patio':
        table_y = int(height * 0.58)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(70 + ratio * 42), int(92 + ratio * 46), int(72 + ratio * 36)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(200 - ratio * 32), int(190 - ratio * 32), int(172 - ratio * 30)]
            
    elif style == 'corporate_desk':
        table_y = int(height * 0.62)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(32 + ratio * 28), int(30 + ratio * 24), int(34 + ratio * 28)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(85 - ratio * 25), int(78 - ratio * 22), int(70 - ratio * 20)]

    elif style == 'festive_warmth':
        table_y = int(height * 0.62)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(65 + ratio * 38), int(38 + ratio * 24), int(28 + ratio * 14)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(148 - ratio * 32), int(94 - ratio * 24), int(54 - ratio * 18)]

    else: # linen_studio (default clean luxury)
        table_y = int(height * 0.66)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(220 - ratio * 16), int(212 - ratio * 16), int(196 - ratio * 16)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(190 - ratio * 22), int(178 - ratio * 22), int(158 - ratio * 22)]

    bg = Image.fromarray(arr)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=8))
    return bg

def process_product_image(src_path, dest_path, style='wooden_table'):
    """
    Takes the raw original scan image, crops to the product bounds,
    maintains STRICT aspect ratio, sharpens texture, and composites with drop shadow onto background.
    """
    img = Image.open(src_path).convert("RGB")
    np_img = np.array(img)
    h, w, _ = np_img.shape
    
    # 1. Background paper color detection from 4 corner samples
    c1 = np_img[:15, :15].mean(axis=(0,1))
    c2 = np_img[:15, -15:].mean(axis=(0,1))
    c3 = np_img[-15:, :15].mean(axis=(0,1))
    c4 = np_img[-15:, -15:].mean(axis=(0,1))
    bg_color = (c1 + c2 + c3 + c4) / 4.0
    
    # Distance from background paper
    bg_dist = np.sqrt(np.sum((np_img.astype(float) - bg_color)**2, axis=2))
    brightness = np_img.mean(axis=2)
    
    # Mask of product pixels
    product_mask = (bg_dist > 26) & (brightness < 248)
    
    # Find bounding box of the product
    y_indices, x_indices = np.where(product_mask)
    if len(y_indices) > 50 and len(x_indices) > 50:
        ymin, ymax = max(0, y_indices.min() - 8), min(h, y_indices.max() + 8)
        xmin, xmax = max(0, x_indices.min() - 8), min(w, x_indices.max() + 8)
        # Crop to product content
        img = img.crop((xmin, ymin, xmax, ymax))
        product_mask = product_mask[ymin:ymax, xmin:xmax]
        
    crop_w, crop_h = img.size
    
    # 2. Enhance image clarity and contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.18)
    sharpener = ImageEnhance.Sharpness(img)
    img = sharpener.enhance(1.3)
    color_enhancer = ImageEnhance.Color(img)
    img = color_enhancer.enhance(1.08)
    
    # 3. Create smooth alpha mask
    alpha_img = Image.fromarray((product_mask * 255).astype(np.uint8), mode='L')
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # 4. Target canvas: 800 x 600 (4:3 aspect ratio)
    target_w, target_h = 800, 600
    bg = create_luxury_background(target_w, target_h, style)
    
    # 5. STRICT PROPORTIONAL SCALING - NEVER SQUISH OR STRETCH
    scale = min((target_w * 0.74) / crop_w, (target_h * 0.74) / crop_h)
    new_w = max(int(crop_w * scale), 10)
    new_h = max(int(crop_h * scale), 10)
    
    resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    resized_alpha = alpha_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Center product on the background with slight bottom table contact
    pos_x = (target_w - new_w) // 2
    pos_y = (target_h - new_h) // 2 + 10
    
    # 6. Realistic 3D drop shadow
    shadow_mask = resized_alpha.filter(ImageFilter.GaussianBlur(radius=12))
    shadow_np = (np.array(shadow_mask).astype(float) * 0.45).astype(np.uint8)
    shadow_img = Image.fromarray(shadow_np, mode='L')
    
    shadow_bg = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    shadow_black = Image.new("RGBA", (new_w, new_h), (12, 10, 8, 170))
    shadow_bg.paste(shadow_black, (pos_x, pos_y + 14), mask=shadow_img)
    
    bg = bg.convert("RGBA")
    bg.alpha_composite(shadow_bg)
    
    # Paste product
    product_rgba = resized_img.convert("RGBA")
    bg.paste(product_rgba, (pos_x, pos_y), mask=resized_alpha)
    
    final_rgb = bg.convert("RGB")
    final_rgb.save(dest_path, "PNG", quality=95)

def rebuild_all_113_products():
    with open('src/products_mapped.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
        
    bg_styles = ['wooden_table', 'marble_vanity', 'resort_patio', 'linen_studio', 'corporate_desk', 'festive_warmth']
    
    print(f"Starting un-distorted HQ rebuild for all {len(products)} products...")
    
    success_count = 0
    for p in products:
        pid = p['id']
        page = p.get('page', pid + 1)
        src_orig = f"public/images/page_{page}_img_1.jpeg"
        
        # Output filename with guaranteed 4:3 non-stretched canvas
        dest_filename = f"product_{pid}_hq.png"
        dest_path = os.path.join("public", "images", dest_filename)
        
        if not os.path.exists(src_orig):
            # Fallback to current image if page file is named differently
            src_orig = os.path.join("public", p['image'])
            
        if os.path.exists(src_orig):
            # Select background style based on category & industries
            cat = p.get('category', '').lower()
            ind = (p.get('industries') or ['lifestyle'])[0].lower()
            
            if 'hotel' in ind:
                style = 'wooden_table' if (pid % 2 == 0) else 'marble_vanity'
            elif 'wedding' in ind or 'wedding' in cat:
                style = 'festive_warmth'
            elif 'corporate' in ind:
                style = 'corporate_desk'
            elif 'wellness' in ind:
                style = 'resort_patio'
            else:
                style = bg_styles[pid % len(bg_styles)]
                
            process_product_image(src_orig, dest_path, style=style)
            p['image'] = f"images/{dest_filename}"
            success_count += 1
        else:
            print(f"Warning: Could not find source image for ID {pid}")
            
    # Save updated product JSONs
    with open('src/products_mapped.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2)
        
    with open('src/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2)
        
    print(f"\n✓ Successfully rebuilt and enhanced all {success_count} product images with zero stretching!")

if __name__ == "__main__":
    rebuild_all_113_products()
