# 🎯 Squarespace Deployment Guide

## 📋 Step 1: Enable GitHub Pages

1. **Go to**: https://github.com/KevinLay689/spinning-wheel-website/settings/pages
2. **Source**: Select "Deploy from a branch"
3. **Branch**: Select `main`
4. **Folder**: Select `/ (root)`
5. **Click**: "Save"

Wait 2-3 minutes for deployment. Your site will be live at:
https://kevinlay689.github.io/spinning-wheel-website/

## 🎯 Step 2: Add to Squarespace

### Method A: Code Block (Recommended)
1. **In Squarespace**, edit the page where you want the wheel
2. **Add** a "Code Block" (+ → Code)
3. **Paste** this HTML:

```html
<!-- Spinning Wheel Container -->
<div style="position: relative; width: 100%; max-width: 600px; margin: 0 auto;">
  <iframe 
    src="https://kevinlay689.github.io/spinning-wheel-website/" 
    width="100%" 
    height="650" 
    frameborder="0"
    style="border: none; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"
    title="Interactive Spinning Wheel">
  </iframe>
</div>

<!-- Fallback message for browsers that don't support iframes -->
<noscript>
  <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
    <p>🎰 <strong>Spinning Wheel</strong></p>
    <p>Please enable JavaScript to use the interactive spinning wheel.</p>
    <a href="https://kevinlay689.github.io/spinning-wheel-website/" target="_blank">
      Open Spinning Wheel in New Tab
    </a>
  </div>
</noscript>
```

### Method B: Embed Block
1. **Add** an "Embed Block" (+ → Embed)
2. **Click** "Code Snippet" (</>)
3. **Paste** the same HTML code above

## 🎨 Step 3: Styling Options

### Responsive Sizing
```html
<!-- Mobile-friendly version -->
<iframe 
  src="https://kevinlay689.github.io/spinning-wheel-website/" 
  width="100%" 
  height="500" 
  frameborder="0"
  style="border: none; border-radius: 15px;"
  title="Interactive Spinning Wheel">
</iframe>
```

### Full Width Version
```html
<!-- Full page experience -->
<iframe 
  src="https://kevinlay689.github.io/spinning-wheel-website/" 
  width="100%" 
  height="800" 
  frameborder="0"
  style="border: none; min-height: 100vh;"
  title="Interactive Spinning Wheel">
</iframe>
```

## 🎮 Step 4: Test Your Wheel

1. **Save** your Squarespace page
2. **Preview** the page
3. **Test** the spinning functionality
4. **Check** mobile responsiveness

## 🔄 Step 5: Updates

When you want to update the wheel:
1. **Edit files** in your local project
2. **Push to GitHub**: `git push origin main`
3. **Wait** 2-3 minutes for auto-deployment
4. **Refresh** your Squarespace page

## 🎯 Alternative Wheels

You can embed different wheel variations by changing the URL:

- **Custom Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/custom-wheel.html`
- **Mad Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/mad-wheel.html`
- **Shopping Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/shopping-wheel.html`
- **Vacation Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/vacation-wheel.html`
- **Laid Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/laid-wheel.html`
- **Create Wheel**: `https://kevinlay689.github.io/spinning-wheel-website/create-wheel.html`

Example for Shopping Wheel:
```html
<iframe 
  src="https://kevinlay689.github.io/spinning-wheel-website/shopping-wheel.html" 
  width="100%" 
  height="650" 
  frameborder="0"
  style="border: none; border-radius: 15px;"
  title="Shopping Decision Wheel">
</iframe>
```

## 🚀 Troubleshooting

### Wheel Not Showing?
- Check if GitHub Pages is enabled
- Verify the URL is correct
- Check browser console for errors

### Not Responsive?
- Adjust the `height` value
- Use CSS media queries in the iFrame style

### Sound Not Working?
- Some browsers block audio in iFrames
- Users may need to interact with the wheel first

## 🎉 Success!

Your spinning wheel is now live on feedmygf.com! 🎰✨
