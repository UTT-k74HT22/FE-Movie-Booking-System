# 🎨 CineMax UI/UX Components - Complete Guide

## ✨ Overview
Professional movie booking interface với thiết kế hiện đại, lấy cảm hứng từ Beta Cinemas và các cinema chains hàng đầu thế giới.

---

## 🎯 Design System

### Color Palette
```css
/* Primary Colors */
--purple-primary: #7B2CBF    /* Main brand color */
--purple-secondary: #9D4EDD  /* Secondary actions */
--purple-light: #C77DFF      /* Hover states */

/* Accent Colors */
--accent-pink: #EC4899       /* CTA buttons, highlights */

/* Backgrounds */
--bg-primary: #0A0E27        /* Deep navy black */
--card-bg: #1A1F37           /* Card background */

/* Text Colors */
--text-primary: #FFFFFF      /* Headings */
--text-secondary: #9CA3AF    /* Body text */
```

### Typography
- **Font Family**: Heebo (Google Fonts)
- **Heading Sizes**: 64px → 36px → 24px
- **Body Text**: 16px → 14px
- **Font Weights**: 800 (headings), 600 (buttons), 500 (body)

---

## 🧩 Components Guide

### 1. MovieFilter Component
**Location**: `src/shared/components/MovieFilter/`

**Purpose**: Advanced filtering system for movies

**Features**:
- ✅ Genre filter (12 options)
- ✅ Rating filter (4.5+, 4.0+, 3.5+, 3.0+)
- ✅ Format filter (2D, 3D, IMAX, 4DX)
- ✅ Sort options (Popularity, Rating, Release Date, A-Z)
- ✅ Active filter count badge
- ✅ Reset all functionality

**Usage**:
```jsx
import MovieFilter from '@/shared/components/MovieFilter';

<MovieFilter 
  onFilterChange={(filters) => {
    console.log('Genre:', filters.genre);
    console.log('Rating:', filters.rating);
    console.log('Format:', filters.format);
    console.log('Sort:', filters.sortBy);
  }}
/>
```

**Props**:
- `onFilterChange`: Function - Callback khi filters thay đổi

---

### 2. Pagination Component
**Location**: `src/shared/components/Pagination/`

**Purpose**: Beautiful pagination for movie lists

**Features**:
- ✅ Smart page number calculation
- ✅ First/Last page shortcuts
- ✅ Ellipsis for long page ranges
- ✅ Mobile-friendly (shows page X/Y)
- ✅ Smooth scroll to top
- ✅ Gradient hover effects

**Usage**:
```jsx
import Pagination from '@/shared/components/Pagination';

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={(page) => setCurrentPage(page)}
  showPageNumbers={true}
  maxPageButtons={5}
/>
```

**Props**:
- `currentPage`: Number - Current active page
- `totalPages`: Number - Total number of pages
- `onPageChange`: Function - Callback when page changes
- `showPageNumbers`: Boolean - Show page numbers (default: true)
- `maxPageButtons`: Number - Max visible page buttons (default: 5)

---

### 3. MovieCarousel Component
**Location**: `src/shared/components/MovieCarousel/`

**Purpose**: Slider carousel for coming soon movies

**Features**:
- ✅ Auto-play with 5s interval
- ✅ Shows 4 movies per slide (responsive)
- ✅ Prev/Next navigation buttons
- ✅ Pagination dots indicator
- ✅ Smooth slide transitions
- ✅ "Notify Me" button on hover
- ✅ "Coming Soon" badge with animation

**Usage**:
```jsx
import MovieCarousel from '@/shared/components/MovieCarousel';

<MovieCarousel
  movies={comingSoonMovies}
  onMovieClick={(movie) => navigate(`/movies/${movie.id}`)}
  autoPlay={true}
  interval={5000}
/>
```

**Props**:
- `movies`: Array - Array of movie objects
- `onMovieClick`: Function - Callback when movie is clicked
- `autoPlay`: Boolean - Enable auto-play (default: true)
- `interval`: Number - Auto-play interval in ms (default: 5000)

**Movie Object Structure**:
```javascript
{
  id: '1',
  title: 'Movie Title',
  posterUrl: 'https://...',
  genre: 'Action, Sci-Fi',
  releaseDate: '2025-12-25'
}
```

---

### 4. HeroSection Component
**Location**: `src/shared/components/HeroSection/`

**Purpose**: Full-screen hero banner for featured movies

**Features**:
- ✅ Full-screen background with gradient overlay
- ✅ Movie poster on the right (desktop)
- ✅ Metadata badges (rating, age rating, duration)
- ✅ Director & genre information
- ✅ Two CTA buttons (Get Ticket, Watch Trailer)
- ✅ Staggered fade-in animations
- ✅ Scroll indicator with animation

**Enhanced Features**:
- Beautiful gradient overlays
- Responsive poster positioning
- Smooth hover effects
- Animated scroll mouse indicator

---

### 5. MovieGrid Component
**Location**: `src/shared/components/MovieGrid/`

**Purpose**: Grid layout for movie cards

**Features**:
- ✅ Responsive grid (4 → 3 → 2 → 1 columns)
- ✅ Loading skeleton states
- ✅ Integrated with Pagination
- ✅ Custom section title support

---

### 6. MovieCard Component
**Location**: `src/shared/components/MovieCard/`

**Features**:
- ✅ Hover scale animation
- ✅ Rating badge with star icon
- ✅ Genre & duration display
- ✅ "Book Now" button
- ✅ Gradient hover overlay

---

## 📱 Layout Components

### ClientHeader
**Features**:
- ✅ Logo with hover scale
- ✅ Search bar with backdrop blur
- ✅ Navigation menu (Home, Movies, My Bookings)
- ✅ User menu dropdown
- ✅ Login/Register buttons
- ✅ Sticky positioning

**Inspired by**: Beta Cinemas header design

### ClientFooter
**Features**:
- ✅ 4-column grid layout
- ✅ Brand section with logo
- ✅ Quick links (Home, Movies, About)
- ✅ Support links (Help, FAQ, Contact)
- ✅ Social media icons (Facebook, Twitter, Instagram)
- ✅ App download buttons
- ✅ Copyright notice

---

## 🎬 HomePage Structure

### New Layout:
```
1. HeroSection (Featured Movie)
   - Full-screen background
   - Movie details
   - CTA buttons

2. Now Showing Section
   - Section header with title & Filter
   - MovieGrid with 8 movies per page
   - Pagination component
   - View All button

3. Coming Soon Section
   - Section header
   - MovieCarousel (slider with 4 movies)
   - Auto-play with pagination dots
   - View All button

4. Features Section
   - 3 feature cards (Easy Booking, Best Seats, Instant Confirmation)
   - Animated icons
   - Hover effects
```

---

## 🎨 UI/UX Best Practices

### Colors & Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 100%);

/* Section Background */
background: linear-gradient(180deg, #0A0E27 0%, rgba(26, 31, 55, 0.5) 100%);

/* Overlay */
background: linear-gradient(to top, rgba(10, 14, 39, 0.95) 0%, transparent 100%);
```

### Shadows
```css
/* Card Shadow */
box-shadow: 0 4px 12px rgba(123, 44, 191, 0.3);

/* Hover Shadow */
box-shadow: 0 12px 32px rgba(123, 44, 191, 0.4);
```

### Animations
```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Float */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Border Radius
- Small: `8px`
- Medium: `12px`
- Large: `16px`
- XL: `20px`

### Spacing Scale
- 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px

---

## 📊 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 480px)  { /* Small mobile */ }
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large desktop */ }
```

---

## ✅ Implementation Checklist

### Completed ✨
- [x] Modern Header with search & user menu
- [x] Comprehensive Footer with links & social media
- [x] MovieFilter component with 4 filter types
- [x] Pagination component with smart navigation
- [x] MovieCarousel slider for Coming Soon
- [x] Enhanced HeroSection with animations
- [x] Updated HomePage layout structure
- [x] Responsive design for all screen sizes
- [x] Smooth transitions & hover effects
- [x] Professional color scheme & typography

### Features
- [x] Filter by Genre, Rating, Format, Sort
- [x] Pagination with ellipsis & shortcuts
- [x] Auto-play carousel with controls
- [x] Loading skeleton states
- [x] Animated scroll indicators
- [x] Interactive hover effects
- [x] Mobile-optimized navigation

---

## 🚀 Getting Started

1. **Import Components**:
```jsx
import { 
  MovieFilter, 
  Pagination, 
  MovieCarousel 
} from '@/shared/components';
```

2. **Set up State**:
```jsx
const [currentPage, setCurrentPage] = useState(1);
const [filters, setFilters] = useState(null);
const moviesPerPage = 8;
```

3. **Handle Events**:
```jsx
const handleFilterChange = (newFilters) => {
  setFilters(newFilters);
  setCurrentPage(1);
};

const handlePageChange = (page) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

4. **Render Components**:
```jsx
<MovieFilter onFilterChange={handleFilterChange} />
<MovieGrid movies={paginatedMovies} />
<Pagination 
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

---

## 🎯 Pro Tips

1. **Performance**: Sử dụng `React.memo()` cho MovieCard để tránh re-render không cần thiết
2. **Accessibility**: Tất cả buttons đều có `aria-label`
3. **Mobile**: Filter panel auto-close sau khi chọn filter
4. **UX**: Smooth scroll to top khi đổi trang
5. **Loading**: Skeleton states trong khi fetch data
6. **SEO**: Semantic HTML với proper headings

---

## 📚 References

- **Design Inspiration**: [Beta Cinemas](https://betacinemas.vn/)
- **Color Palette**: Purple gradient theme (#7B2CBF → #9D4EDD)
- **Typography**: Heebo font family
- **Icons**: Heroicons (outline & solid)

---

**Created with ❤️ for CineMax Movie Booking System**
