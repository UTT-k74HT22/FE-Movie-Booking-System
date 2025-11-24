# Movie Booking System - UI Components & Design System

## 🎨 Design System Overview

This project now features a comprehensive design system inspired by modern cinema booking platforms. The design focuses on:

- **Dark Theme**: Immersive movie-watching experience
- **Purple Gradient**: Primary brand color for CTAs and highlights
- **Heebo Font**: Clean, modern typography
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant with proper focus states

---

## 📁 Project Structure

```
src/
├── assets/
│   └── styles/
│       ├── variables.css      # Design tokens (colors, spacing, typography)
│       └── global.css          # Global styles and utilities
├── shared/
│   └── components/
│       ├── Button/            # Reusable button component
│       ├── Badge/             # Badge component for ratings, tags
│       ├── MovieCard/         # Movie card component
│       ├── MovieGrid/         # Grid layout for movies
│       ├── HeroSection/       # Hero banner component
│       └── ui-components.js   # Component exports
└── features/
    ├── home/
    │   └── pages/
    │       ├── HomePage-new.jsx    # New beautiful homepage
    │       └── HomePage.css        # Homepage styles
    └── movies/
        └── pages/
            ├── BrowseShowtimePage.jsx   # Showtime browsing
            └── BrowseShowtimePage.css   # Showtime styles
```

---

## 🎯 Components

### Button Component

Versatile button with multiple variants and states.

**Variants:**
- `primary` - Purple gradient background
- `secondary` - Transparent with purple border
- `icon` - Icon-only button
- `ghost` - Minimal transparent button

**Sizes:**
- `sm` - Small (8px 16px)
- `md` - Medium (12px 32px) - Default
- `lg` - Large (16px 40px)

**Usage:**
```jsx
import { Button } from '../../../shared/components/ui-components';

<Button variant="primary" size="lg" onClick={handleClick}>
  Get Ticket
</Button>

<Button 
  variant="secondary" 
  icon={<PlayIcon />}
  iconPosition="left"
>
  Watch Trailer
</Button>

<Button variant="icon">
  <SearchIcon />
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'icon' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: React node
- `iconPosition`: 'left' | 'right'
- `fullWidth`: boolean
- `disabled`: boolean
- `loading`: boolean
- `onClick`: function

---

### Badge Component

Display status, ratings, or categories.

**Variants:**
- `rating` - For movie ratings with star icon
- `age` - Age rating (PG-13, R, etc.)
- `genre` - Genre tags
- `success`, `warning`, `error`, `info` - Status badges

**Usage:**
```jsx
import { Badge } from '../../../shared/components/ui-components';

<Badge variant="rating" icon={<StarIcon />}>
  5.0
</Badge>

<Badge variant="age">PG-13</Badge>

<Badge variant="genre">Action</Badge>
```

---

### MovieCard Component

Card for displaying movie information in grids.

**Features:**
- Hover effects with scale animation
- Rating and age rating badges
- Responsive aspect ratio (2:3)
- Click/keyboard navigation support

**Usage:**
```jsx
import { MovieCard } from '../../../shared/components/ui-components';

<MovieCard
  movie={{
    id: '1',
    title: 'Avatar: The Way of Water',
    posterUrl: 'https://...',
    rating: 5.0,
    ageRating: 'PG-13',
    duration: '3h 12m',
    genre: 'Sci-Fi, Action',
  }}
  onClick={handleMovieClick}
/>
```

---

### MovieGrid Component

Grid layout for displaying multiple movies.

**Features:**
- Responsive grid (2 cols mobile, 3-5 cols desktop)
- Loading skeleton states
- Empty state handling
- "View All" button

**Usage:**
```jsx
import { MovieGrid } from '../../../shared/components/ui-components';

<MovieGrid
  title="Now Showing"
  movies={moviesList}
  onMovieClick={handleMovieClick}
  onViewAll={handleViewAll}
  loading={isLoading}
  showViewAll={true}
/>
```

---

### HeroSection Component

Large hero banner for featured movies.

**Features:**
- Full-screen background image with gradient overlay
- Movie metadata (rating, duration, director, genre)
- Primary and secondary CTA buttons
- Scroll indicator animation
- Responsive poster display (desktop only)

**Usage:**
```jsx
import { HeroSection } from '../../../shared/components/ui-components';

<HeroSection
  movie={{
    title: 'Avatar: The Way of Water',
    description: 'Jake Sully lives with his newfound family...',
    posterUrl: 'https://...',
    backdropUrl: 'https://...',
    rating: 5.0,
    ageRating: 'PG-13',
    duration: '3h 12m',
    releaseDate: '2022-12-16',
    director: 'James Cameron',
    genre: 'Sci-Fi, Action',
  }}
  onGetTicket={handleGetTicket}
  onWatchTrailer={handleWatchTrailer}
/>
```

---

## 🎨 Design Tokens

### Colors

```css
/* Primary Purple Palette */
--purple-primary: #7B2CBF
--purple-medium: #9D4EDD
--purple-light: #C77DFF
--purple-pale: #E0AAFF

/* Neutrals */
--base-white: #FFFFFF
--base-black: #0A0E27
--gray-900: #1A1F37
--gray-800: #252B42
--gray-700: #343B53
--gray-500: #718096
--gray-400: #A0AEC0

/* Semantic */
--rating-gold: #FFC107
--success-main: #10B981
--warning-main: #F59E0B
--error-main: #EF4444
```

### Typography

```css
/* Font Family */
font-family: 'Heebo', sans-serif

/* Sizes */
--text-display-xl: 64px  /* Hero titles */
--text-h1: 32px          /* Page titles */
--text-h2: 28px          /* Section titles */
--text-h3: 24px          /* Card titles */
--text-body-lg: 16px     /* Body text */
--text-body-md: 14px     /* Secondary text */
--text-body-sm: 12px     /* Captions */

/* Weights */
--font-regular: 400
--font-medium: 500
--font-bold: 700
--font-extrabold: 800
```

### Spacing

Based on 4px unit system:

```css
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-6: 24px
--spacing-8: 32px
--spacing-12: 48px
--spacing-16: 64px
--spacing-20: 80px
```

### Border Radius

```css
--radius-sm: 4px    /* Badges */
--radius-md: 8px    /* Buttons */
--radius-lg: 12px   /* Cards */
--radius-xl: 16px   /* Large cards */
--radius-2xl: 24px  /* Hero sections */
--radius-full: 9999px /* Pills */
```

### Shadows

```css
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6)
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.7)

/* Colored Shadows */
--shadow-purple: 0 8px 24px rgba(123, 44, 191, 0.4)
--shadow-purple-lg: 0 16px 48px rgba(123, 44, 191, 0.5)
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px   /* Small devices */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Laptops */
--breakpoint-xl: 1280px  /* Desktops */
--breakpoint-2xl: 1536px /* Large screens */
```

**Usage:**
```css
/* Mobile (default) */
.component { }

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }
```

---

## 🎬 Pages

### HomePage (`HomePage-new.jsx`)

**Sections:**
1. **Hero Section** - Featured movie with large backdrop
2. **Now Showing** - Grid of currently playing movies
3. **Coming Soon** - Grid of upcoming movies
4. **Features** - Vote for Music section

**Key Features:**
- Automatic data loading from API
- Fallback to demo data
- Skeleton loading states
- Smooth scroll animations

---

### BrowseShowtimePage

**Features:**
1. **Theater Selection** - Dropdown for theater locations
2. **Date Picker** - Horizontal scrolling date selector
3. **Showtime Cards** - Movie details with available time slots
4. **Trailer Button** - Watch trailer functionality

**Interactive Elements:**
- Active state for selected date
- Hover effects on time slots
- Responsive grid layout
- Loading states

---

## 🚀 Getting Started

1. **Import Design System:**
```jsx
// In your main.jsx or App.jsx
import './assets/styles/global.css';
```

2. **Use Components:**
```jsx
import { Button, Badge, MovieCard, MovieGrid, HeroSection } from './shared/components/ui-components';
```

3. **Apply Utility Classes:**
```jsx
<h1 className="text-hero">Welcome</h1>
<div className="container">
  <p className="text-body">Content here</p>
</div>
```

---

## 🎯 Best Practices

### Do's ✅
- Use design tokens for consistency
- Follow the 4px spacing system
- Maintain color contrast for accessibility
- Use semantic HTML
- Add proper ARIA labels
- Test on multiple devices

### Don'ts ❌
- Don't use arbitrary colors
- Don't skip loading states
- Don't forget hover/focus states
- Don't use inline styles
- Don't ignore mobile responsiveness

---

## 🔧 Customization

To customize the design system, edit:

1. **Colors**: `src/assets/styles/variables.css`
2. **Typography**: Change font imports in `global.css`
3. **Spacing**: Adjust spacing scale in `variables.css`
4. **Components**: Modify component CSS files

---

## 📚 Documentation

For complete design system documentation, see:
- `DESIGN_SYSTEM.md` - Full design system guide
- Component JSDoc comments - Inline documentation
- CSS comments - Style explanations

---

## 🎨 Color Palette Reference

### Primary Brand Colors
- ![#7B2CBF](https://via.placeholder.com/15/7B2CBF/000000?text=+) `#7B2CBF` Purple Primary
- ![#9D4EDD](https://via.placeholder.com/15/9D4EDD/000000?text=+) `#9D4EDD` Purple Medium
- ![#C77DFF](https://via.placeholder.com/15/C77DFF/000000?text=+) `#C77DFF` Purple Light

### Neutrals
- ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+) `#FFFFFF` White
- ![#0A0E27](https://via.placeholder.com/15/0A0E27/000000?text=+) `#0A0E27` Black
- ![#1A1F37](https://via.placeholder.com/15/1A1F37/000000?text=+) `#1A1F37` Gray 900
- ![#252B42](https://via.placeholder.com/15/252B42/000000?text=+) `#252B42` Gray 800

### Accents
- ![#FFC107](https://via.placeholder.com/15/FFC107/000000?text=+) `#FFC107` Rating Gold
- ![#10B981](https://via.placeholder.com/15/10B981/000000?text=+) `#10B981` Success
- ![#F59E0B](https://via.placeholder.com/15/F59E0B/000000?text=+) `#F59E0B` Warning
- ![#EF4444](https://via.placeholder.com/15/EF4444/000000?text=+) `#EF4444` Error

---

## 📦 Component Exports

All components are exported from `ui-components.js`:

```javascript
export { default as Button } from './Button/Button';
export { default as Badge } from './Badge/Badge';
export { default as MovieCard } from './MovieCard/MovieCard';
export { default as MovieGrid } from './MovieGrid/MovieGrid';
export { default as HeroSection } from './HeroSection/HeroSection';
```

---

## 🎉 Result

You now have a beautiful, modern movie booking interface with:
- ✅ Comprehensive design system
- ✅ Reusable UI components
- ✅ Beautiful homepage with hero section
- ✅ Showtime browsing page
- ✅ Fully responsive design
- ✅ Accessibility features
- ✅ Loading states and animations
- ✅ Detailed documentation

Happy coding! 🚀🎬
