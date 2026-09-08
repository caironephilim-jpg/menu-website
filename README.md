# Interactive Menu System

A beautiful, interactive menu system built with HTML, CSS, and JavaScript. Inspired by game mod menus with smooth animations, theme support, and keyboard navigation.

## Features

✨ **Modern Design**
- Purple gradient theme (customizable)
- Smooth animations and transitions
- Professional UI/UX

🎮 **Interactive Controls**
- Keyboard navigation (Arrow keys, Enter)
- Mouse support
- Multiple control types (toggles, sliders, selectors)

⚙️ **Customizable**
- Multiple themes (Purple, Red, Blue, Green)
- Adjustable menu scale
- Animation controls

📱 **Responsive**
- Works on desktop and tablet
- Mobile-friendly layout

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Press `1` or click the menu button to toggle

## Keyboard Controls

- **Arrow Up/Down** - Navigate items
- **Arrow Left/Right** - Switch tabs
- **Enter** - Toggle/Select item
- **1** - Toggle menu visibility

## File Structure

```
menu-website/
├── index.html       # Main HTML structure
├── styles.css       # All styling and animations
├── menu.js          # Menu logic and interactions
└── README.md        # Documentation
```

## Customization

### Changing Theme Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --accent-color: #9400d3;  /* Purple accent */
  --dark-bg: #1a1a1a;       /* Dark background */
  --text-white: #ffffff;    /* White text */
}
```

### Adding Menu Items

Edit the `categories` array in `menu.js`:

```javascript
{
  name: 'New Item',
  type: 'toggle',
  value: false
}
```

Supported types: `toggle`, `slider`, `selector`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - Feel free to use and modify!

## Credits

Designed and built with ❤️
