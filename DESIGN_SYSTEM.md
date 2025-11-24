# Movie Booking System - Design System Documentation

## Overview
This design system is crafted for an immersive movie booking experience with a modern, dark-themed aesthetic that puts visual content first.

---

## Color Palette

### Brand Colors
```css
/* Primary Purple Gradient */
--purple-gradient: linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 50%, #C77DFF 100%);
--purple-primary: #7B2CBF;      /* Deep Purple - Main brand color */
--purple-medium: #9D4EDD;       /* Medium Purple - Hover states */
--purple-light: #C77DFF;        /* Light Purple - Accents */
--purple-pale: #E0AAFF;         /* Pale Purple - Subtle highlights */
```

### Neutrals (Dark Theme)
```css
/* Base Colors */
--base-white: #FFFFFF;          /* Pure white - Text on dark backgrounds */
--base-black: #0A0E27;          /* Deep Navy Black - Main background */

/* Gray Scale */
--gray-900: #1A1F37;            /* Darkest - Cards and panels */
--gray-800: #252B42;            /* Dark - Elevated surfaces */
--gray-700: #343B53;            /* Medium Dark - Borders */
--gray-600: #4A5568;            /* Medium - Disabled states */
--gray-500: #718096;            /* Mid Gray - Secondary text */
--gray-400: #A0AEC0;            /* Light Gray - Tertiary text */
--gray-300: #CBD5E0;            /* Lighter - Dividers */
--gray-200: #E2E8F0;            /* Very Light - Subtle borders */
```

### Semantic Colors
```css
/* Success */
--success-dark: #059669;
--success-main: #10B981;
--success-light: #34D399;

/* Warning */
--warning-dark: #D97706;
--warning-main: #F59E0B;
--warning-light: #FBB038;

/* Error */
--error-dark: #DC2626;
--error-main: #EF4444;
--error-light: #F87171;

/* Info */
--info-dark: #0284C7;
--info-main: #0EA5E9;
--info-light: #38BDF8;
```

### Rating & Badges
```css
--rating-gold: #FFC107;
--rating-bg: rgba(255, 193, 7, 0.15);
--pg-13-badge: #7B2CBF;
--age-rating-bg: rgba(123, 44, 191, 0.2);
```

---

## Typography

### Font Family
```css
/* Primary Font */
--font-primary: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Fallback Stack */
--font-stack: 'Heebo', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

### Font Weights
```css
--font-regular: 400;
--font-medium: 500;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Scale
```css
/* Display Sizes */
--text-display-xl: 64px;        /* Hero titles */
--text-display-lg: 48px;        /* Section headers */
--text-display-md: 36px;        /* Card titles */

/* Heading Sizes */
--text-h1: 32px;
--text-h2: 28px;
--text-h3: 24px;
--text-h4: 20px;
--text-h5: 18px;
--text-h6: 16px;

/* Body Sizes */
--text-body-xl: 18px;
--text-body-lg: 16px;
--text-body-md: 14px;
--text-body-sm: 12px;
--text-body-xs: 10px;

/* Line Heights */
--leading-tight: 1.2;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Text Styles
```css
/* Hero Title */
.text-hero {
  font-size: var(--text-display-xl);
  font-weight: var(--font-extrabold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

/* Section Title */
.text-section-title {
  font-size: var(--text-h2);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
}

/* Movie Title */
.text-movie-title {
  font-size: var(--text-h3);
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
}

/* Body Text */
.text-body {
  font-size: var(--text-body-lg);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}

/* Caption */
.text-caption {
  font-size: var(--text-body-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  letter-spacing: 0.02em;
}
```

---

## Spacing System

### Base Unit: 4px

```css
--spacing-1: 4px;      /* 0.25rem */
--spacing-2: 8px;      /* 0.5rem */
--spacing-3: 12px;     /* 0.75rem */
--spacing-4: 16px;     /* 1rem */
--spacing-5: 20px;     /* 1.25rem */
--spacing-6: 24px;     /* 1.5rem */
--spacing-8: 32px;     /* 2rem */
--spacing-10: 40px;    /* 2.5rem */
--spacing-12: 48px;    /* 3rem */
--spacing-16: 64px;    /* 4rem */
--spacing-20: 80px;    /* 5rem */
--spacing-24: 96px;    /* 6rem */
--spacing-32: 128px;   /* 8rem */
```

### Container & Layout
```css
--container-xs: 480px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
--container-full: 1920px;
```

---

## Border Radius

```css
--radius-sm: 4px;      /* Small elements, badges */
--radius-md: 8px;      /* Buttons, inputs */
--radius-lg: 12px;     /* Cards */
--radius-xl: 16px;     /* Large cards, modals */
--radius-2xl: 24px;    /* Hero sections */
--radius-full: 9999px; /* Pills, circular elements */
```

---

## Shadows & Effects

### Box Shadows
```css
/* Elevation Shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.7);

/* Colored Shadows */
--shadow-purple: 0 8px 24px rgba(123, 44, 191, 0.4);
--shadow-purple-lg: 0 16px 48px rgba(123, 44, 191, 0.5);

/* Inner Shadows */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.4);
```

### Glows
```css
--glow-purple: 0 0 20px rgba(157, 78, 221, 0.5);
--glow-purple-intense: 0 0 40px rgba(157, 78, 221, 0.8);
```

### Gradients
```css
/* Background Gradients */
--gradient-primary: linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 100%);
--gradient-dark: linear-gradient(180deg, #0A0E27 0%, #1A1F37 100%);
--gradient-overlay: linear-gradient(to top, rgba(10, 14, 39, 0.95) 0%, rgba(10, 14, 39, 0) 100%);

/* Image Overlays */
--overlay-dark: linear-gradient(to right, rgba(10, 14, 39, 0.98) 0%, rgba(10, 14, 39, 0.7) 50%, transparent 100%);
--overlay-bottom: linear-gradient(to top, rgba(10, 14, 39, 1) 0%, transparent 100%);
```

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--gradient-primary);
  color: var(--base-white);
  padding: 12px 32px;
  border-radius: var(--radius-md);
  font-weight: var(--font-bold);
  font-size: var(--text-body-lg);
  box-shadow: var(--shadow-purple);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  box-shadow: var(--shadow-purple-lg);
  transform: translateY(-2px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--base-white);
  border: 2px solid var(--purple-medium);
  padding: 12px 32px;
  border-radius: var(--radius-md);
  font-weight: var(--font-bold);
  font-size: var(--text-body-lg);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(157, 78, 221, 0.1);
  border-color: var(--purple-light);
}
```

#### Icon Button
```css
.btn-icon {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: var(--base-white);
  padding: 12px;
  border-radius: var(--radius-full);
  transition: all 0.3s ease;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

### Cards

#### Movie Card
```css
.movie-card {
  background: var(--gray-900);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
}

.movie-card-image {
  aspect-ratio: 2/3;
  object-fit: cover;
  width: 100%;
}

.movie-card-content {
  padding: var(--spacing-4);
}
```

### Badges

#### Rating Badge
```css
.badge-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  background: var(--rating-bg);
  color: var(--rating-gold);
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-body-sm);
  font-weight: var(--font-bold);
}
```

#### Age Rating Badge
```css
.badge-age {
  background: var(--age-rating-bg);
  color: var(--purple-light);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--text-body-sm);
  font-weight: var(--font-bold);
  border: 1px solid var(--purple-primary);
}
```

### Inputs & Forms

```css
.input {
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  color: var(--base-white);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: var(--text-body-lg);
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--purple-medium);
  box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.2);
  outline: none;
}

.input::placeholder {
  color: var(--gray-500);
}
```

### Date Picker (Showtime Selection)

```css
.date-button {
  background: var(--gray-800);
  border: 2px solid transparent;
  padding: 16px;
  border-radius: var(--radius-lg);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.date-button.active {
  background: var(--gradient-primary);
  border-color: var(--purple-light);
  box-shadow: var(--shadow-purple);
}

.date-button:hover:not(.active) {
  border-color: var(--purple-medium);
  background: var(--gray-700);
}
```

### Showtime Slots

```css
.showtime-slot {
  background: var(--gray-800);
  border: 1px solid var(--gray-700);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  font-weight: var(--font-bold);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.showtime-slot:hover {
  border-color: var(--purple-medium);
  background: var(--gray-700);
}
```

---

## Animations

### Transitions
```css
--transition-fast: 150ms ease;
--transition-base: 300ms ease;
--transition-slow: 500ms ease;
```

### Keyframe Animations

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

---

## Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Media Query Usage
```css
/* Mobile */
@media (max-width: 639px) { }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-fixed: 1200;
--z-modal-backdrop: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--purple-medium);
  outline-offset: 2px;
}

.focus-ring {
  transition: box-shadow 0.2s ease;
}

.focus-ring:focus-visible {
  box-shadow: 0 0 0 3px rgba(157, 78, 221, 0.4);
  outline: none;
}
```

### Screen Reader Only
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Usage Guidelines

### Do's ✅
- Use the purple gradient for primary CTAs
- Maintain consistent spacing using the 4px base unit
- Keep text readable with proper contrast ratios
- Use shadows to create depth and hierarchy
- Apply hover states to interactive elements
- Use the dark theme for immersive movie browsing

### Don'ts ❌
- Don't use bright backgrounds that compete with movie images
- Don't mix different spacing systems
- Don't use low contrast text on dark backgrounds
- Don't overuse animations
- Don't ignore mobile responsiveness
- Don't skip accessibility features

---

## Implementation Examples

### Hero Section
```jsx
<section className="hero-section">
  <div className="hero-background">
    <img src={moviePoster} alt="" className="hero-image" />
    <div className="hero-overlay" />
  </div>
  <div className="hero-content">
    <h1 className="text-hero">Avatar: The Way of Water</h1>
    <div className="hero-meta">
      <span className="badge-age">PG-13</span>
      <span className="badge-rating">⭐ 5.00</span>
    </div>
    <p className="text-body">Experience the magic of Pandora...</p>
    <div className="hero-actions">
      <button className="btn-primary">Get Ticket</button>
      <button className="btn-secondary">Watch Trailer</button>
    </div>
  </div>
</section>
```

---

This design system provides a solid foundation for building a beautiful, consistent, and accessible movie booking interface. All components follow these guidelines to ensure a cohesive user experience.
