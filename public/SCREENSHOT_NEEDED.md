# Screenshot Assets Needed

## Required Images

### 1. Main App Screenshot (`app-screenshot.png`)
**Location:** `/public/app-screenshot.png`
**Dimensions:** 1200x800px minimum (2400x1600px for Retina)
**Format:** PNG or WebP
**Content:** Full ColorClip Pro interface showing:
- Color picker with swatches visible
- At least 2 rows of colors
- All 4 dark mode themes (or medium-dark theme)
- Clean, professional appearance

### 2. Feature Screenshots (Optional but Recommended)
Create smaller screenshots showing specific features:
- `palette-selector.png` - Palette dropdown with multiple palettes
- `cloud-sync.png` - Sync indicator or settings
- `theme-comparison.png` - Side-by-side of 4 themes
- `color-conversion.png` - RGB/Normalized value display
- `eyedropper.png` - Eyedropper in action

## How to Capture

1. **Windows:**
   - Open ColorClip Pro
   - Set to medium-dark theme for best contrast
   - Press `Win + Shift + S` for Snipping Tool
   - Save as PNG

2. **macOS:**
   - Open ColorClip Pro
   - Press `Cmd + Shift + 4` then Space to capture window
   - Save as PNG

## Optimization

After capturing, optimize with:
```bash
# Using ImageMagick (if installed)
magick app-screenshot.png -resize 1200x800 -quality 85 app-screenshot.png

# Or use online tools
# - TinyPNG.com
# - Squoosh.app
```

## Temporary Placeholder

Currently using a simple colored background as placeholder. Replace with actual screenshot for production.
