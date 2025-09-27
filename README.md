# 💍 Wedding Website - Hiro & Elena

A beautiful, responsive wedding website inspired by the Wix earthy wedding template. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

### 🎨 Design
- **Earthy Color Palette**: Warm beiges, browns, and natural tones
- **Elegant Typography**: Playfair Display (serif) + Montserrat (sans-serif)
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern Animations**: Smooth scrolling, fade-ins, and hover effects

### 📱 Sections
- **Hero Section**: Couple introduction with call-to-action
- **Save the Date**: Event details with venue information
- **Our Story**: Romantic narrative with photo gallery
- **RSVP Form**: Contact form with validation and submission
- **Footer**: Contact information and social links

### ⚡ Performance
- **Optimized Images**: SVG placeholders with lazy loading
- **Modern CSS**: CSS Grid, Flexbox, and custom properties
- **Smooth Animations**: Hardware-accelerated transitions
- **Accessibility**: WCAG compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or download** this repository
2. **Open** `index.html` in your browser, or
3. **Start a local server**:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

4. **Visit** `http://localhost:8000` in your browser

## 📁 Project Structure

```
wedding-website/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── responsive.css      # Mobile/tablet optimizations
│   └── animations.css      # Animations and transitions
├── js/
│   ├── main.js            # Core functionality
│   ├── smooth-scroll.js   # Navigation and scrolling
│   └── form.js            # Form validation and submission
├── assets/
│   ├── images/            # Images and graphics
│   └── fonts/             # Custom fonts (if any)
├── screenshots/           # Reference screenshots
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🎯 Customization Guide

### 1. Content Customization

#### **Update Couple Names**
Replace "Hiro & Elena" throughout the files:
- `index.html`: Update all text content
- `css/styles.css`: Update any name-specific styling
- Update page title and meta description

#### **Event Details**
In `index.html`, update the "Save the Date" section:
```html
<p class="date-text">Saturday, November 18th, 2023</p>
<p class="time-text">4:00 PM</p>
<p class="venue-name">The Old Chapel</p>
<p class="venue-address">Your venue address</p>
```

#### **Story Section**
Update the narrative in the "Our Story" section with your own love story.

### 2. Visual Customization

#### **Color Scheme**
Update CSS variables in `css/styles.css`:
```css
:root {
    --primary-bg: #FAF7F2;      /* Main background */
    --text-primary: #333333;     /* Primary text */
    --accent-brown: #8B7355;     /* Accent color */
    /* Add your custom colors */
}
```

#### **Typography**
Change fonts by updating Google Fonts imports in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

And update CSS:
```css
:root {
    --font-serif: 'YourSerif', Georgia, serif;
    --font-sans: 'YourSans', Arial, sans-serif;
}
```

### 3. Images

#### **Replace Placeholder Images**
Replace files in `assets/images/` with your photos:
- `hero-couple.jpg` - Main couple photo (recommended: 400x300px)
- `venue-background.jpg` - Venue photo (recommended: 800x500px)
- `story-1.jpg` to `story-4.jpg` - Story section photos
- `decorative-1.jpg`, `decorative-2.jpg` - Side decorative images

#### **Image Optimization Tips**
- Use WebP format for better compression
- Optimize for web (compress images)
- Maintain aspect ratios as specified
- Add proper alt text for accessibility

### 4. Form Configuration

#### **RSVP Form Submission**
Update the form submission endpoint in `js/form.js`:

```javascript
async submitForm(data) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}
```

#### **Email Integration Options**
- **EmailJS**: Free email service for static sites
- **Netlify Forms**: Built-in form handling
- **Formspree**: Simple form backend
- **Custom API**: Your own backend service

## 🛠️ Advanced Customization

### Adding New Sections

1. **Add HTML structure** in `index.html`
2. **Style the section** in `css/styles.css`
3. **Add responsive rules** in `css/responsive.css`
4. **Include animations** in `css/animations.css`
5. **Update navigation** if needed

### Animation Customization

Modify animation timings in `css/animations.css`:
```css
.fade-in {
    transition: all 0.8s ease-out; /* Adjust duration */
}
```

### Performance Optimization

1. **Minify CSS/JS** for production
2. **Optimize images** (WebP, compression)
3. **Enable gzip** compression on server
4. **Use CDN** for static assets

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and structure
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user motion preferences
- **Color Contrast**: WCAG AA compliant

## 🐛 Troubleshooting

### Common Issues

#### **Images not loading**
- Check file paths in `index.html`
- Ensure images exist in `assets/images/`
- Verify file extensions match

#### **Styles not applying**
- Check CSS file links in `index.html`
- Verify CSS syntax (use browser dev tools)
- Clear browser cache

#### **JavaScript errors**
- Open browser console for error details
- Check if all JS files are loaded
- Verify function names and calls

#### **Mobile layout issues**
- Test with browser dev tools mobile view
- Check `css/responsive.css` media queries
- Verify viewport meta tag

### Performance Issues

#### **Slow loading**
- Optimize/compress images
- Minify CSS and JavaScript
- Use browser caching
- Consider lazy loading for images

#### **Animation lag**
- Reduce animation complexity
- Use `transform` and `opacity` for better performance
- Test on slower devices

## 🚀 Deployment Options

### Static Hosting (Recommended)

#### **Netlify** (Free)
1. Connect GitHub repository
2. Auto-deploy on push
3. Custom domain support
4. Built-in form handling

#### **Vercel** (Free)
1. Import from Git
2. Automatic deployments
3. Edge network
4. Serverless functions

#### **GitHub Pages** (Free)
1. Enable in repository settings
2. Choose source branch
3. Custom domain support

### Traditional Hosting
- Upload files via FTP
- Configure web server
- Set up SSL certificate

## 🔧 Development Setup

### For Developers

```bash
# Install dependencies (if adding build tools)
npm install

# Development server with live reload
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💡 Inspiration

This website was inspired by the Wix "Earthy Wedding" template but built from scratch using modern web standards for better performance, customization, and ownership.

## 📞 Support

For questions or issues:
- Check the troubleshooting section above
- Open an issue in the repository
- Review browser console for errors

## 🎉 Credits

- **Design**: Inspired by Wix earthy wedding template
- **Fonts**: Google Fonts (Playfair Display, Montserrat)
- **Icons**: Custom SVG graphics
- **Development**: Built with love using vanilla HTML, CSS, and JavaScript

---

**Made with ❤️ for Hiro & Elena's special day**

## 📋 Original Template Reference

- **Original Wix Template**: https://www.wix.com/website-template/view/html/4331
- **Screenshots**: Available in `/screenshots/` directory
- **Inspiration**: Earthy wedding template design

