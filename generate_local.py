import os
import json
import torch
from diffusers import AutoPipelineForImage2Image
from diffusers.utils import load_image
from PIL import Image

# 1. Initialize Pipeline
print("Loading Stable Diffusion Pipeline to GPU...")
pipe = AutoPipelineForImage2Image.from_pretrained(
    "runwayml/stable-diffusion-v1-5", 
    torch_dtype=torch.float16, 
    use_safetensors=True
).to("cuda")
print("Pipeline loaded.")

# Optional: Enable memory efficient attention if available
# pipe.enable_xformers_memory_efficient_attention()

# 2. Load Product Data
products_file = "src/products_mapped.json"
with open(products_file, "r") as f:
    products = json.load(f)

# Keep track of enhanced files
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

print("Starting generation process...")

for product in products:
    # Check if the product has already been manually enhanced (the ones we did previously)
    if product['image'].startswith('images/') and product['image'].endswith('.png'):
        print(f"Skipping {product['name']} (already enhanced).")
        continue

    print(f"Processing: {product['name']}...")
    
    # Identify primary industry for prompt context
    primary_industry = product.get('industries', ['hotels'])[0]
    context_prompt = industry_prompts.get(primary_industry, industry_prompts['hotels'])
    
    # Construct full prompt
    prompt = f"Enhance this {product['name']}. Place it in a {context_prompt}. Highly detailed, 8k resolution, photorealistic, keep original object structure exactly the same."
    negative_prompt = "deformed, blurry, low quality, bad lighting, different shape, distorted object, text, watermark"

    # Load original image
    original_image_path = os.path.join("public", product['image'])
    if not os.path.exists(original_image_path):
        print(f"  Warning: Could not find {original_image_path}")
        continue
    
    try:
        init_image = load_image(original_image_path).convert("RGB")
        # Resize for Stable Diffusion (must be multiple of 8)
        init_image = init_image.resize((512, 512))
        
        # Run inference (strength=0.3 keeps it very close to the original)
        image = pipe(
            prompt=prompt, 
            negative_prompt=negative_prompt, 
            image=init_image, 
            strength=0.4, 
            guidance_scale=7.5
        ).images[0]
        
        # Save output
        new_filename = f"{primary_industry}_{product['id']}_enhanced.png"
        output_path = os.path.join("public", "images", new_filename)
        image.save(output_path)
        
        # Update product mapping
        product['image'] = f"images/{new_filename}"
        enhanced_count += 1
        print(f"  -> Saved to {new_filename}")
        
    except Exception as e:
        print(f"  Error processing {product['name']}: {e}")

# 3. Save Updated JSON
with open(products_file, "w") as f:
    json.dump(products, f, indent=2)

print(f"\nCompleted! Enhanced {enhanced_count} new images.")
