import os
import json
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

def create_contextual_background(width, height, style='wooden_table'):
    """
    Creates a studio-quality background tailored to product category & industry.
    Styles:
    - 'wooden_table': warm teak/oak surface with soft ambient studio blur
    - 'marble_vanity': light polished marble vanity with soft shadow drop
    - 'resort_patio': natural stone patio with subtle green garden mood
    - 'suite_desk': mahogany desk / console table setting
    - 'linen_studio': warm natural linen studio backdrop with soft sunlight
    - 'festive_warmth': warm golden/amber backdrop for wedding & festive gifts
    """
    arr = np.zeros((height, width, 3), dtype=np.uint8)
    
    if style == 'wooden_table':
        table_y = int(height * 0.62)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(42 + ratio * 38), int(36 + ratio * 30), int(30 + ratio * 22)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(135 - ratio * 45), int(95 - ratio * 35), int(60 - ratio * 28)]
            
    elif style == 'marble_vanity':
        table_y = int(height * 0.58)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(228 - ratio * 22), int(222 - ratio * 22), int(212 - ratio * 20)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(248 - ratio * 30), int(245 - ratio * 30), int(238 - ratio * 28)]
            
    elif style == 'resort_patio':
        table_y = int(height * 0.55)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(65 + ratio * 45), int(85 + ratio * 50), int(68 + ratio * 40)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(195 - ratio * 35), int(185 - ratio * 35), int(168 - ratio * 32)]
            
    elif style == 'suite_desk':
        table_y = int(height * 0.60)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(35 + ratio * 25), int(28 + ratio * 20), int(24 + ratio * 18)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(95 - ratio * 30), int(62 - ratio * 22), int(42 - ratio * 18)]
            
    elif style == 'festive_warmth':
        table_y = int(height * 0.60)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(60 + ratio * 40), int(35 + ratio * 25), int(25 + ratio * 15)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(145 - ratio * 35), int(90 - ratio * 25), int(50 - ratio * 20)]

    else: # linen_studio
        table_y = int(height * 0.65)
        for y in range(table_y):
            ratio = y / table_y
            arr[y, :] = [int(215 - ratio * 15), int(205 - ratio * 15), int(188 - ratio * 15)]
        for y in range(table_y, height):
            ratio = (y - table_y) / (height - table_y)
            arr[y, :] = [int(185 - ratio * 25), int(172 - ratio * 25), int(152 - ratio * 25)]

    bg = Image.fromarray(arr)
    bg = bg.filter(ImageFilter.GaussianBlur(radius=8))
    return bg

def enhance_product_image(img_path, output_path, bg_style='wooden_table'):
    img = Image.open(img_path).convert("RGB")
    
    # Enhance product contrast and sharpness while keeping details 100% faithful
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.15)
    sharpener = ImageEnhance.Sharpness(img)
    img = sharpener.enhance(1.25)
    
    w, h = img.size
    np_img = np.array(img)
    
    # Estimate corner paper scan background
    corner_bg = np_img[:20, :20].mean(axis=(0,1))
    bg_dist = np.sqrt(np.sum((np_img.astype(float) - corner_bg)**2, axis=2))
    
    brightness = np_img.mean(axis=2)
    mask = (bg_dist > 28) & (brightness < 245)
    
    alpha = (mask * 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode='L')
    
    # Refine mask edges
    alpha_img = alpha_img.filter(ImageFilter.MinFilter(3))
    alpha_img = alpha_img.filter(ImageFilter.GaussianBlur(radius=2))
    
    target_w, target_h = 800, 600
    bg = create_contextual_background(target_w, target_h, bg_style)
    
    scale = min((target_w * 0.72) / w, (target_h * 0.72) / h)
    new_w, new_h = max(int(w * scale), 10), max(int(h * scale), 10)
    
    resized_img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    resized_alpha = alpha_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    pos_x = (target_w - new_w) // 2
    pos_y = (target_h - new_h) // 2 + 15
    
    # Drop shadow
    shadow_mask = resized_alpha.filter(ImageFilter.GaussianBlur(radius=10))
    shadow_np = (np.array(shadow_mask).astype(float) * 0.40).astype(np.uint8)
    shadow_img = Image.fromarray(shadow_np, mode='L')
    
    shadow_bg = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    shadow_black = Image.new("RGBA", (new_w, new_h), (15, 12, 10, 160))
    shadow_bg.paste(shadow_black, (pos_x, pos_y + 12), mask=shadow_img)
    
    bg = bg.convert("RGBA")
    bg.alpha_composite(shadow_bg)
    
    product_rgba = resized_img.convert("RGBA")
    bg.paste(product_rgba, (pos_x, pos_y), mask=resized_alpha)
    
    final_rgb = bg.convert("RGB")
    final_rgb.save(output_path, "PNG", quality=95)
    print(f"Enhanced {img_path} -> {output_path} (Style: {bg_style})")

def process_all_remaining_bad_images():
    products_file = "src/products_mapped.json"
    with open(products_file, "r", encoding="utf-8") as f:
        products = json.load(f)
        
    bg_styles = ['wooden_table', 'marble_vanity', 'resort_patio', 'suite_desk', 'linen_studio', 'festive_warmth']
    
    updated_count = 0
    for p in products:
        current_img = p['image']
        if current_img.startswith('images/page_') and current_img.endswith('.jpeg'):
            pid = p['id']
            primary_ind = (p.get('industries') or ['lifestyle'])[0]
            output_filename = f"{primary_ind}_{pid}_enhanced.png"
            output_rel_path = f"images/{output_filename}"
            output_full_path = os.path.join("public", "images", output_filename)
            
            input_full_path = os.path.join("public", current_img)
            if os.path.exists(input_full_path):
                # Pick background style based on category / industry
                if 'wedding' in p.get('category', '').lower() or 'gift' in p.get('name', '').lower():
                    style = 'festive_warmth'
                elif 'bag' in p.get('category', '').lower() or 'bag' in p.get('name', '').lower():
                    style = 'linen_studio'
                else:
                    style = bg_styles[pid % len(bg_styles)]
                    
                enhance_product_image(input_full_path, output_full_path, bg_style=style)
                p['image'] = output_rel_path
                updated_count += 1
            else:
                print(f"Warning: File not found {input_full_path}")
                
    with open(products_file, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)
        
    print(f"\nSuccessfully upgraded ALL remaining {updated_count} bad images across the catalog!")

if __name__ == "__main__":
    process_all_remaining_bad_images()
