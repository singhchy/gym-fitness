#!/bin/bash

# Create hero image
cat > images/hero/hero-bg.jpg.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect width="1920" height="1080" fill="#1a1a1a"/>
  <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" fill="#fff" text-anchor="middle">HERO BACKGROUND IMAGE</text>
  <text x="960" y="620" font-family="Arial, sans-serif" font-size="24" fill="#ccc" text-anchor="middle">1920x1080 - Premium Fitness Center</text>
</svg>
SVGEOF

# Create program images
for i in {1..6}; do
  cat > images/programs/program-$i.jpg.svg << "SVGEOF"
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#2a2a2a"/>
  <rect x="20" y="20" width="360" height="200" fill="#3a3a3a"/>
  <text x="200" y="140" font-family="Arial, sans-serif" font-size="24" fill="#fff" text-anchor="middle">PROGRAM $i</text>
  <text x="200" y="170" font-family="Arial, sans-serif" font-size="16" fill="#ccc" text-anchor="middle">400x300</text>
</svg>
SVGEOF
done

# Create trainer images
for i in {1..4}; do
  cat > images/trainers/trainer-$i.jpg.svg << "SVGEOF"
<svg xmlns="http://www.w3.org/2000/svg" width="350" height="450" viewBox="0 0 350 450">
  <rect width="350" height="450" fill="#2a2a2a"/>
  <circle cx="175" cy="175" r="120" fill="#3a3a3a"/>
  <text x="175" y="175" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle" dy="5">TRAINER $i</text>
  <text x="175" y="350" font-family="Arial, sans-serif" font-size="18" fill="#ccc" text-anchor="middle">350x450</text>
</svg>
SVGEOF
done

# Create transformation images
cat > images/transformations/before.jpg.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#2a2a2a"/>
  <text x="300" y="200" font-family="Arial, sans-serif" font-size="36" fill="#fff" text-anchor="middle">BEFORE TRANSFORMATION</text>
  <text x="300" y="250" font-family="Arial, sans-serif" font-size="20" fill="#ccc" text-anchor="middle">600x400</text>
</svg>
SVGEOF

cat > images/transformations/after.jpg.svg << 'SVGEOF'
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#1a3a1a"/>
  <text x="300" y="200" font-family="Arial, sans-serif" font-size="36" fill="#fff" text-anchor="middle">AFTER TRANSFORMATION</text>
  <text x="300" y="250" font-family="Arial, sans-serif" font-size="20" fill="#ccc" text-anchor="middle">600x400</text>
</svg>
SVGEOF

# Create gallery images
for i in {1..8}; do
  cat > images/gallery/gallery-$i.jpg.svg << "SVGEOF"
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
  <rect width="300" height="200" fill="#2a2a2a"/>
  <rect x="20" y="20" width="260" height="160" fill="#3a3a3a"/>
  <text x="150" y="110" font-family="Arial, sans-serif" font-size="18" fill="#fff" text-anchor="middle">GALLERY $i</text>
  <text x="150" y="135" font-family="Arial, sans-serif" font-size="14" fill="#ccc" text-anchor="middle">300x200</text>
</svg>
SVGEOF
done

echo "Placeholder SVG images created successfully"
