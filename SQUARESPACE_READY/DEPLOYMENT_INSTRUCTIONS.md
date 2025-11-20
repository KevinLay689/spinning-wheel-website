# 🎯 Squarespace Deployment Instructions

## 📁 Files Ready for Squarespace

All spinning wheels are now available as **standalone HTML files** that you can directly copy and paste into Squarespace. Each file contains all necessary CSS and JavaScript inline - no external dependencies needed!

## 🎰 Available Wheels

| Wheel | File | Purpose |
|-------|------|---------|
| 🍽️ Main Restaurant Wheel | `main-wheel.html` | Original restaurant spinner |
| 🎨 Custom Wheel | `custom-wheel.html` | Create your own wheel |
| 😠 Mad GF Wheel | `mad-wheel.html` | "Is my GF mad at me?" |
| 🛍️ Shopping Wheel | `shopping-wheel.html` | "Should I take my GF shopping?" |
| ✈️ Vacation Wheel | `vacation-wheel.html` | "Do I take my GF on vacation?" |
| 😏 Laid Wheel | `laid-wheel.html` | "Am I getting laid?" |

## 🚀 How to Deploy to Squarespace

### Method 1: Code Block (Easiest)

1. **Open any HTML file** from the `SQUARESPACE_READY` folder
2. **Copy the entire content** (Ctrl+A / Cmd+A, then Ctrl+C / Cmd+C)
3. **Go to your Squarespace site**
4. **Add a Code Block**: `+` → `Code` → `HTML`
5. **Paste the code** into the code block
6. **Save** and **publish** your page

### Method 2: Page Settings

1. **Go to Pages** in Squarespace
2. **Create a new page** or edit existing
3. **Click the gear icon** for page settings
4. **Go to Advanced** → **Page Header Code Injection**
5. **Paste the entire HTML content**
6. **Save** and **publish**

### Method 3: Multiple Wheels on One Page

1. **Create separate code blocks** for each wheel
2. **Copy only the body content** from each file (everything between `<body>` and `</body>`)
3. **Paste each wheel** into its own code block
4. **Add the CSS and JavaScript** once at the top of the page

## 🎨 Customization Tips

### Change Colors
Find the CSS section and modify these variables:
```css
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

### Change Wheel Options
Edit the `segments` array in the JavaScript section:
```javascript
this.segments = [
    { text: 'Your Option', color: '#FF6B6B', logo: '🎯' },
    // Add more options...
];
```

### Change Spin Duration
Modify the `spinDuration` variable:
```javascript
const spinDuration = 3000 + Math.random() * 2000; // 3-5 seconds
```

## 📱 Mobile Optimization

All wheels are already mobile-responsive with:
- Adaptive sizing for different screen sizes
- Touch-friendly buttons
- Optimized text display
- Smooth animations on all devices

## 🔧 Troubleshooting

### Wheel Not Spinning?
- Check that all JavaScript code is included
- Ensure no syntax errors in the code
- Try refreshing the page

### Styling Issues?
- Make sure all CSS is included
- Check for conflicting Squarespace styles
- Use `!important` if needed (but try to avoid)

### Modal Not Working?
- Verify all modal HTML is included
- Check that event listeners are properly set up
- Ensure no JavaScript errors in console

## 🎯 Best Practices

1. **Test on mobile** - Most users will be on phones
2. **Keep it simple** - Don't add too many options
3. **Use clear text** - Make wheel options easy to read
4. **Check performance** - Ensure smooth spinning
5. **Backup your code** - Save copies before making changes

## 📊 Analytics & SEO

Each wheel includes:
- **Google AdSense** integration (your client ID: `ca-pub-1558645610834958`)
- **Semantic HTML** for better SEO
- **Meta tags** for social sharing
- **Responsive design** for mobile-first indexing

## 🔄 Updates & Maintenance

To update any wheel:
1. **Edit the HTML file** in the `SQUARESPACE_READY` folder
2. **Copy the updated code**
3. **Replace the old code** in Squarespace
4. **Save and publish**

## 🎉 You're Ready!

Your spinning wheels are now:
- ✅ **Fully functional** with smooth animations
- ✅ **Mobile responsive** for all devices
- ✅ **AdSense ready** for monetization
- ✅ **Easy to customize** for your needs
- ✅ **Standalone** - no external files needed

Just copy, paste, and spin! 🎰✨

---

**Need help?** Each wheel file is self-contained and includes comments explaining the code structure. Feel free to modify colors, options, or styling to match your brand!
