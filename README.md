# ketan  & nikita - Indian Wedding Website Template

A professional, responsive wedding landing page template designed for Indian weddings.
  Please view the digital wedding invitation and share your wishes:
     https://flexabhicode.netlify.app/

## Features

- **Hero Section**: Elegant full-screen intro with a countdown timer.
- **Couple Section**: Introduction to the bride and groom.
- **Events Timeline**: Details for Haldi, Sangeet, Wedding, and Reception.
- **Gallery**: Grid layout for photos.
- **RSVP Form**: Functional-looking form (requires backend integration for real emails).
- **Responsive Design**: Works on mobile, tablet, and desktop.
- **Animations**: Smooth scrolling and fade-in effects.

## Customization

### 1. Images

Replace the placeholder images in `css/style.css` and `index.html`.

- Look for `background-image` urls in `css/style.css`.
- Look for `.img-placeholder` in `index.html` or `css/style.css`.

### 2. Colors

Edit the variables in `css/style.css` to change the theme:

```css
:root {
  --primary-color: #800000; /* Change this */
  --secondary-color: #d4af37; /* Change this */
  /* ... */
}
```

### 3. Date

Update the wedding date in `js/script.js`:

```javascript
const weddingDate = new Date("March 26, 2026 11:0:00").getTime();
```

### 4. Content

Edit `index.html` to change names, descriptions, and event details.

## How to Run

Simply open `index.html` in any web browser.
