import os
import json
import torch

# Disable incompatible SDP kernels if needed
try:
    torch.backends.cuda.enable_flash_sdp(False)
    torch.backends.cuda.enable_mem_efficient_sdp(False)
    torch.backends.cuda.enable_math_sdp(True)
except Exception:
    pass

from diffusers import AutoPipelineForImage2Image
from diffusers.utils import load_image
from PIL import Image

# 1. Device Selection & Pipeline Init
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Initializing Stable Diffusion Pipeline on device: {device}...")

try:
    pipe = AutoPipelineForImage2Image.from_pretrained(
        "runwayml/stable-diffusion-v1-5", 
        torch_dtype=torch.float32, 
        use_safetensors=True
    ).to(device)
    print(f"Pipeline successfully loaded on {device}.")
except Exception as e:
    print(f"Failed to load on {device}: {e}. Falling back to CPU...")
    device = "cpu"
    pipe = AutoPipelineForImage2Image.from_pretrained(
        "runwayml/stable-diffusion-v1-5", 
        torch_dtype=torch.float32, 
        use_safetensors=True
    ).to("cpu")
    print("Pipeline loaded on CPU.")

# 2. Load Product Data
products_file = "src/products_mapped.json"
with open(products_file, "r", encoding="utf-8") as f:
    products = json.load(f)

enhanced_count = 0

# Mapping of industries to contextual prompts
industry_prompts = {
    'hotels': 'premium boutique hotel room setting, wooden side table, warm luxurious lighting, interior design',
    'corporate': 'premium corporate gifting setup, elegant modern desk, high quality stationery, professional aesthetic',
    'weddings': 'elegant festive Indian wedding setup, marigold flowers, soft warm lighting, premium festive aesthetic',
    'lifestyle': 'tasteful retail display, modern home interior, minimalist decor, natural soft lighting',
    'food': 'premium gourmet food store display, artisan bakery, warm retail lighting, high quality',
    'wellness': 'calm premium yoga studio, wellness retreat setting, soft natural light, indoor plants, wooden floor',
    'interiors': 'warm premium interior styling, hospitality project, design-led space, architectural lighting'
}

print("\nStarting generation process for remaining catalog images...")

for product in products:
    # Skip images that are already enhanced PNGs
    if product['image'].endswith('.png'):
        print(f"Skipping ID {product['id']} - {product['name']} (already enhanced).")
        continue

    print(f"Processing ID {product['id']}: {product['name']}...")
    
    primary_industry = product.get('industries', ['hotels'])[0]
    context_prompt = industry_prompts.get(primary_industry, industry_prompts['hotels'])
    
    prompt = f"Enhance this {product['name']}. Place it in a {context_prompt}. Highly detailed, 8k resolution, photorealistic, keep original object structure exactly the same."
    negative_prompt = "deformed, blurry, low quality, bad lighting, different shape, distorted object, text, watermark"

    original_image_path = os.path.join("public", product['image'])
    if not os.path.exists(original_image_path):
        print(f"  Warning: Could not find {original_image_path}")
        continue
    
    try:
        init_image = load_image(original_image_path).convert("RGB")
        init_image = init_image.resize((512, 512))
        
        image = pipe(
            prompt=prompt, 
            negative_prompt=negative_prompt, 
            image=init_image, 
            strength=0.35, 
            guidance_scale=7.5
        ).images[0]
        
        new_filename = f"{primary_industry}_{product['id']}_enhanced.png"
        output_path = os.path.join("public", "images", new_filename)
        image.save(output_path)
        
        product['image'] = f"images/{new_filename}"
        enhanced_count += 1
        print(f"  -> Saved to {new_filename}")
        
        # Save progress after each item
        with open(products_file, "w", encoding="utf-8") as f:
            json.dump(products, f, indent=2)
            
    except Exception as e:
        print(f"  Error processing {product['name']}: {e}")

print(f"\nCompleted! Enhanced {enhanced_count} new images.")
