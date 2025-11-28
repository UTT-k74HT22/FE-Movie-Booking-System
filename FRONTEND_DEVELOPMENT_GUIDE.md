# 🎨 HƯỚNG DẪN PHÁT TRIỂN FRONTEND HOÀN THIỆN

> **Mục đích:** Hướng dẫn chi tiết để hoàn thiện Frontend Movie Booking System  
> **Thời gian ước tính:** 3-4 tuần  
> **Độ khó:** ⭐⭐⭐⭐☆ (Trung bình - Khá)

---

## 📊 TRẠNG THÁI HIỆN TẠI

### ✅ Đã hoàn thành (60%)

```
✅ Core Infrastructure (100%)
   - API client với auto token refresh
   - Route configuration
   - Protected routes
   - Environment config

✅ Auth Module (75%)
   - Login page (MUI)
   - Register page (Tailwind)
   - Activate account (OTP)
   - Auth context + useAuth hook
   - useLogin, useRegister hooks

✅ Layouts (100%)
   - AdminLayout (sidebar collapsible)
   - ClientLayout (header + footer)
   - Error pages (404, 403)

✅ Shared Resources (100%)
   - Constants (routes, API, app)
   - Utils (validators, formatters, helpers)
   - Custom hooks (useDebounce, useFetch, etc.)
   - Token service, storage service
```

### ❌ Còn thiếu (40%)

```
❌ Movie Features (20% done)
   - MovieListPage (placeholder)
   - MovieDetailPage (placeholder)
   - Search & filters UI
   
❌ Booking Features (0% done)
   - SeatSelectionPage (CRITICAL!)
   - BookingConfirmationPage
   - MyBookingsPage
   - Booking history
   
❌ Payment Features (0% done)
   - PaymentPage
   - Payment status page
   - Payment callback handling
   
❌ Admin Features (0% done)
   - Dashboard với charts
   - Movies CRUD
   - Bookings management
   - Users management
   - Settings
   
❌ Additional Features
   - Search functionality
   - Notifications
   - User profile
   - Responsive optimization
```

---

## 🎯 ROADMAP - 4 TUẦN

### TUẦN 1: Movie Features ⭐⭐⭐☆☆

#### Day 1-2: MovieListPage (16h)
**Mục tiêu:** Hiển thị danh sách phim với search, filter, pagination

**Tasks:**
1. **Layout & UI** (4h)
```jsx
// src/features/movies/pages/MovieListPage.jsx
import { useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { MovieGrid, MovieFilter, Pagination } from '@/shared/components';

export default function MovieListPage() {
  const [filters, setFilters] = useState({
    status: 'NOW_SHOWING',
    genre: '',
    language: '',
    sortBy: 'releaseDate',
    page: 0,
    size: 12
  });
  
  const { movies, loading, error, totalPages } = useMovies(filters);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Movies</h1>
        <p className="text-gray-600">Discover the latest movies</p>
      </section>
      
      {/* Filters */}
      <MovieFilter 
        filters={filters}
        onChange={setFilters}
      />
      
      {/* Movie Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination 
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={(page) => setFilters({ ...filters, page })}
          />
        </>
      )}
    </div>
  );
}
```

2. **MovieFilter Component** (3h)
```jsx
// src/shared/components/MovieFilter/MovieFilter.jsx
export default function MovieFilter({ filters, onChange }) {
  const genres = ['ACTION', 'COMEDY', 'DRAMA', 'HORROR', 'SCI_FI'];
  const languages = ['ENGLISH', 'VIETNAMESE'];
  const statuses = ['NOW_SHOWING', 'COMING_SOON'];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select 
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All</option>
            {statuses.map(s => (
              <option key={s} value={s}>{s.replace('_', ' ')}</option>
            ))}
          </select>
        </div>
        
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select 
            value={filters.genre}
            onChange={(e) => onChange({ ...filters, genre: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        
        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select 
            value={filters.language}
            onChange={(e) => onChange({ ...filters, language: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">All Languages</option>
            {languages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        
        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <select 
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="releaseDate">Release Date</option>
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
      
      {/* Reset Button */}
      <button
        onClick={() => onChange({
          status: '',
          genre: '',
          language: '',
          sortBy: 'releaseDate',
          page: 0,
          size: 12
        })}
        className="mt-4 text-blue-600 hover:text-blue-800"
      >
        Reset Filters
      </button>
    </div>
  );
}
```

3. **MovieGrid Component** (3h)
```jsx
// src/shared/components/MovieGrid/MovieGrid.jsx
import { MovieCard } from '@/shared/components';

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No movies found</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

4. **MovieCard Component** (3h)
```jsx
// src/shared/components/MovieCard/MovieCard.jsx
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

export default function MovieCard({ movie }) {
  return (
    <Link 
      to={ROUTES.MOVIE_DETAIL.replace(':id', movie.id)}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={movie.posterUrl || '/placeholder-movie.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            ⭐ {movie.rating}
          </div>
        )}
        
        {/* Status Badge */}
        {movie.status === 'COMING_SOON' && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Coming Soon
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {movie.title}
        </h3>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p>🎭 {movie.genre}</p>
          <p>⏱️ {movie.duration} min</p>
          <p>🗣️ {movie.language}</p>
        </div>
        
        {/* Action Button */}
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </Link>
  );
}
```

5. **Pagination Component** (3h)
```jsx
// src/shared/components/Pagination/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  
  // Show max 7 page numbers
  const visiblePages = pages.filter(p => {
    if (totalPages <= 7) return true;
    if (p === 0 || p === totalPages - 1) return true; // First & last
    if (Math.abs(p - currentPage) <= 2) return true; // Current ± 2
    return false;
  });
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        const prev = visiblePages[index - 1];
        const showEllipsis = prev !== undefined && page - prev > 1;
        
        return (
          <div key={page} className="flex items-center">
            {showEllipsis && <span className="px-2">...</span>}
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                page === currentPage ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {page + 1}
            </button>
          </div>
        );
      })}
      
      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
```

**Testing:**
- [ ] Filters hoạt động (status, genre, language, sort)
- [ ] Pagination hoạt động
- [ ] Loading state hiển thị
- [ ] Error state hiển thị
- [ ] Responsive trên mobile
- [ ] Click card → navigate to detail

---

#### Day 3-4: MovieDetailPage (16h)

**Mục tiêu:** Trang chi tiết phim với thông tin đầy đủ và CTA đặt vé

**Tasks:**
1. **Main Layout** (4h)
```jsx
// src/features/movies/pages/MovieDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovieDetail';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { movie, showtimes, loading, error } = useMovieDetail(id);
  
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!movie) return <NotFound />;
  
  return (
    <div className="min-h-screen">
      {/* Backdrop Hero */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-end gap-8">
              {/* Poster */}
              <img 
                src={movie.posterUrl}
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
              
              {/* Title & Meta */}
              <div className="text-white flex-1">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex items-center gap-6 text-lg">
                  <span className="flex items-center gap-2">
                    ⭐ {movie.rating}/10
                  </span>
                  <span>⏱️ {movie.duration} min</span>
                  <span>🗣️ {movie.language}</span>
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    {movie.genre}
                  </span>
                </div>
                
                <p className="mt-4 text-gray-300">
                  📅 Release: {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <MovieInfo movie={movie} />
            <MovieTrailer trailerUrl={movie.trailerUrl} />
            <MovieReviews movieId={movie.id} />
          </div>
          
          {/* Booking Sidebar */}
          <div>
            <BookingSidebar movie={movie} showtimes={showtimes} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

2. **MovieInfo Component** (2h)
```jsx
// src/features/movies/components/MovieInfo.jsx
export default function MovieInfo({ movie }) {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {movie.description}
      </p>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Director</h3>
          <p className="text-gray-600">{movie.director || 'N/A'}</p>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Cast</h3>
          <p className="text-gray-600">{movie.cast || 'N/A'}</p>
        </div>
      </div>
    </section>
  );
}
```

3. **BookingSidebar Component** (6h)
```jsx
// src/features/movies/components/BookingSidebar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import { formatDate, formatTime } from '@/shared/utils';

export default function BookingSidebar({ movie, showtimes }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  
  // Group showtimes by date
  const showtimesByDate = showtimes.reduce((acc, showtime) => {
    const date = showtime.showDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(showtime);
    return acc;
  }, {});
  
  const dates = Object.keys(showtimesByDate).sort();
  
  const handleBookNow = () => {
    if (!selectedShowtime) {
      toast.error('Please select a showtime');
      return;
    }
    
    navigate(ROUTES.SEAT_SELECTION.replace(':showtimeId', selectedShowtime.id));
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
      <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
      
      {/* Date Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Select Date</h3>
        <div className="grid grid-cols-3 gap-2">
          {dates.map(date => (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setSelectedShowtime(null);
              }}
              className={`p-3 border rounded-lg text-center ${
                selectedDate === date 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'hover:border-blue-600'
              }`}
            >
              <div className="text-xs">{formatDate(date, 'EEE')}</div>
              <div className="text-sm font-bold">{formatDate(date, 'dd')}</div>
              <div className="text-xs">{formatDate(date, 'MMM')}</div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Showtime Selection */}
      {selectedDate && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Select Showtime</h3>
          <div className="space-y-4">
            {showtimesByDate[selectedDate].map(showtime => (
              <div
                key={showtime.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedShowtime?.id === showtime.id
                    ? 'bg-blue-50 border-blue-600'
                    : 'hover:border-blue-600'
                }`}
                onClick={() => setSelectedShowtime(showtime)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg">
                      {formatTime(showtime.startTime)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {showtime.screen.theater.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      Screen {showtime.screen.name}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      ${showtime.price}
                    </div>
                    <div className="text-xs text-gray-600">
                      {showtime.availableSeats} seats left
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Book Button */}
      <button
        onClick={handleBookNow}
        disabled={!selectedShowtime}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {selectedShowtime ? 'Select Seats' : 'Select Showtime First'}
      </button>
      
      {/* Info */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>✓ Choose your favorite seats</p>
        <p>✓ Instant booking confirmation</p>
        <p>✓ Multiple payment methods</p>
      </div>
    </div>
  );
}
```

4. **MovieTrailer Component** (2h)
```jsx
// src/features/movies/components/MovieTrailer.jsx
export default function MovieTrailer({ trailerUrl }) {
  if (!trailerUrl) return null;
  
  // Extract YouTube video ID
  const videoId = trailerUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];
  
  if (!videoId) return null;
  
  return (
    <section className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Trailer</h2>
      
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Movie Trailer"
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
```

5. **MovieReviews Component** (2h)
```jsx
// src/features/movies/components/MovieReviews.jsx
export default function MovieReviews({ movieId }) {
  // TODO: Fetch reviews from API
  const reviews = [];
  
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">{review.user.name}</span>
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <span className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
```

**Testing:**
- [ ] Backdrop hero hiển thị đúng
- [ ] Movie info đầy đủ
- [ ] Trailer embed hoạt động
- [ ] Date selection hoạt động
- [ ] Showtime selection hoạt động
- [ ] Book button navigate đúng
- [ ] Responsive mobile

---

### TUẦN 2: Booking Features (CRITICAL!) ⭐⭐⭐⭐⭐

#### Day 5-7: SeatSelectionPage (24h) - MOST IMPORTANT!

**Mục tiêu:** Interactive seat map, hold seats, validate selection

**Tasks:**
1. **Main Layout** (6h)
```jsx
// src/features/bookings/pages/SeatSelectionPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSeatSelection } from '../hooks/useSeatSelection';
import { seatService } from '../services/seat.service';

export default function SeatSelectionPage() {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  
  const {
    showtime,
    seats,
    selectedSeats,
    holdingSeats,
    loading,
    error,
    selectSeat,
    deselectSeat,
    holdSeats,
    releaseSeats
  } = useSeatSelection(showtimeId);
  
  // Auto-hold selected seats every 30s
  useEffect(() => {
    if (selectedSeats.length === 0) return;
    
    const interval = setInterval(() => {
      holdSeats(selectedSeats);
    }, 30000); // Refresh hold every 30s
    
    return () => clearInterval(interval);
  }, [selectedSeats]);
  
  // Hold seats immediately when selected
  useEffect(() => {
    if (selectedSeats.length > 0) {
      holdSeats(selectedSeats);
    }
  }, [selectedSeats]);
  
  // Release seats on unmount
  useEffect(() => {
    return () => {
      if (selectedSeats.length > 0) {
        releaseSeats(selectedSeats);
      }
    };
  }, []);
  
  const handleContinue = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    
    try {
      // Final hold before booking
      await holdSeats(selectedSeats);
      
      navigate(ROUTES.BOOKING_CONFIRMATION, {
        state: {
          showtimeId,
          seatIds: selectedSeats.map(s => s.id)
        }
      });
    } catch (error) {
      toast.error('Failed to hold seats. Please try again.');
    }
  };
  
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-2">{showtime.movie.title}</h1>
          <div className="flex items-center gap-6 text-gray-600">
            <span>📅 {formatDate(showtime.showDate)}</span>
            <span>⏰ {formatTime(showtime.startTime)}</span>
            <span>🏢 {showtime.screen.theater.name}</span>
            <span>🎬 Screen {showtime.screen.name}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <SeatMap 
              seats={seats}
              selectedSeats={selectedSeats}
              holdingSeats={holdingSeats}
              onSeatClick={(seat) => {
                if (selectedSeats.includes(seat)) {
                  deselectSeat(seat);
                } else {
                  selectSeat(seat);
                }
              }}
            />
          </div>
          
          {/* Booking Summary */}
          <div>
            <BookingSummary 
              showtime={showtime}
              selectedSeats={selectedSeats}
              onContinue={handleContinue}
              onCancel={() => navigate(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

2. **SeatMap Component** (10h) - CORE FEATURE!
```jsx
// src/features/bookings/components/SeatMap.jsx
export default function SeatMap({ seats, selectedSeats, holdingSeats, onSeatClick }) {
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.rowLabel]) acc[seat.rowLabel] = [];
    acc[seat.rowLabel].push(seat);
    return acc;
  }, {});
  
  const rows = Object.keys(seatsByRow).sort();
  
  const getSeatStatus = (seat) => {
    if (seat.status === 'BOOKED') return 'booked';
    if (holdingSeats.some(s => s.id === seat.id)) return 'holding';
    if (selectedSeats.some(s => s.id === seat.id)) return 'selected';
    if (seat.status === 'AVAILABLE') return 'available';
    return 'unavailable';
  };
  
  const getSeatColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600 cursor-pointer';
      case 'selected': return 'bg-blue-600 cursor-pointer';
      case 'holding': return 'bg-yellow-500 cursor-not-allowed';
      case 'booked': return 'bg-gray-400 cursor-not-allowed';
      case 'unavailable': return 'bg-gray-300 cursor-not-allowed';
      default: return 'bg-gray-300';
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {/* Screen */}
      <div className="mb-12">
        <div className="bg-gradient-to-b from-gray-700 to-gray-900 h-2 rounded-full mb-2"></div>
        <p className="text-center text-gray-500 text-sm">SCREEN</p>
      </div>
      
      {/* Seat Grid */}
      <div className="space-y-4">
        {rows.map(row => (
          <div key={row} className="flex items-center gap-2">
            {/* Row Label */}
            <div className="w-8 text-center font-bold text-gray-600">
              {row}
            </div>
            
            {/* Seats */}
            <div className="flex gap-2 flex-1 justify-center">
              {seatsByRow[row].map(seat => {
                const status = getSeatStatus(seat);
                const isClickable = status === 'available' || status === 'selected';
                
                return (
                  <button
                    key={seat.id}
                    onClick={() => isClickable && onSeatClick(seat)}
                    disabled={!isClickable}
                    className={`
                      w-10 h-10 rounded-t-lg text-white text-xs font-semibold
                      transition-all duration-200
                      ${getSeatColor(status)}
                      ${seat.seatType === 'VIP' ? 'ring-2 ring-yellow-400' : ''}
                    `}
                    title={`${row}${seat.seatNumber} - ${seat.seatType} - ${status}`}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
            
            {/* Row Label (right side) */}
            <div className="w-8 text-center font-bold text-gray-600">
              {row}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-12 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded"></div>
          <span>Available</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded"></div>
          <span>Selected</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-500 rounded"></div>
          <span>Holding (by you)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span>Booked</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded ring-2 ring-yellow-400"></div>
          <span>VIP</span>
        </div>
      </div>
    </div>
  );
}
```

3. **BookingSummary Component** (4h)
```jsx
// src/features/bookings/components/BookingSummary.jsx
export default function BookingSummary({ showtime, selectedSeats, onContinue, onCancel }) {
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => {
      const price = seat.seatType === 'VIP' 
        ? showtime.price * 1.3 
        : showtime.price;
      return total + price;
    }, 0);
  };
  
  const total = calculateTotal();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      
      {/* Selected Seats */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Selected Seats</h3>
        
        {selectedSeats.length === 0 ? (
          <p className="text-gray-500 text-sm">No seats selected</p>
        ) : (
          <div className="space-y-2">
            {selectedSeats.map(seat => (
              <div key={seat.id} className="flex justify-between text-sm">
                <span>
                  {seat.rowLabel}{seat.seatNumber}
                  {seat.seatType === 'VIP' && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      VIP
                    </span>
                  )}
                </span>
                <span className="font-semibold">
                  ${seat.seatType === 'VIP' ? showtime.price * 1.3 : showtime.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Total */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            ${total.toFixed(2)}
          </span>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {selectedSeats.length} seat(s) selected
        </p>
      </div>
      
      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={onContinue}
          disabled={selectedSeats.length === 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Payment
        </button>
        
        <button
          onClick={onCancel}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
      
      {/* Timer Warning */}
      {selectedSeats.length > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-xs text-yellow-800">
            ⏰ Your seats are held for 2 minutes. Please complete booking soon.
          </p>
        </div>
      )}
      
      {/* Info */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>✓ Seats auto-held when selected</p>
        <p>✓ 2-minute hold time</p>
        <p>✓ Instant confirmation</p>
      </div>
    </div>
  );
}
```

4. **useSeatSelection Hook** (4h)
```jsx
// src/features/bookings/hooks/useSeatSelection.js
import { useState, useEffect } from 'react';
import { seatService } from '../services/seat.service';
import { showtimeService } from '@/features/movies/services/showtime.service';

export function useSeatSelection(showtimeId) {
  const [showtime, setShowtime] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [holdingSeats, setHoldingSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load showtime & seats
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        
        const [showtimeData, seatsData] = await Promise.all([
          showtimeService.getById(showtimeId),
          seatService.getAvailableSeats(showtimeId)
        ]);
        
        setShowtime(showtimeData);
        setSeats(seatsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [showtimeId]);
  
  const selectSeat = (seat) => {
    if (selectedSeats.find(s => s.id === seat.id)) return;
    setSelectedSeats([...selectedSeats, seat]);
  };
  
  const deselectSeat = (seat) => {
    setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    setHoldingSeats(holdingSeats.filter(s => s.id !== seat.id));
  };
  
  const holdSeats = async (seats) => {
    try {
      await seatService.holdSeats({
        showtimeId,
        seatIds: seats.map(s => s.id),
        ttlSeconds: 120
      });
      
      setHoldingSeats(seats);
      toast.success('Seats held for 2 minutes');
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  
  const releaseSeats = async (seats) => {
    try {
      await seatService.releaseSeats({
        showtimeId,
        seatIds: seats.map(s => s.id)
      });
      
      setHoldingSeats([]);
    } catch (error) {
      console.error('Failed to release seats:', error);
    }
  };
  
  return {
    showtime,
    seats,
    selectedSeats,
    holdingSeats,
    loading,
    error,
    selectSeat,
    deselectSeat,
    holdSeats,
    releaseSeats
  };
}
```

**Testing:**
- [ ] Seat map renders correctly
- [ ] Click seat → select/deselect works
- [ ] VIP seats có visual khác biệt
- [ ] Booked seats không click được
- [ ] Hold seats API call thành công
- [ ] Auto-refresh hold every 30s
- [ ] Release seats khi unmount
- [ ] Total price tính đúng (VIP = 1.3x)
- [ ] Continue button navigate đúng
- [ ] Responsive mobile

---

(Tiếp tục với Week 2 Day 8-10, Week 3, Week 4...)

**Lưu ý:** File này rất dài (3000+ lines). Tôi đã viết phần quan trọng nhất (Week 1 & Week 2). Bạn có muốn tôi tiếp tục phần còn lại không?

## 🎯 QUICK START

Để bắt đầu ngay:

1. **Week 1, Day 1:** Implement MovieListPage
2. **Week 1, Day 3:** Implement MovieDetailPage
3. **Week 2, Day 5:** Implement SeatSelectionPage (CRITICAL!)

Sau đó follow roadmap theo tuần.

## 📚 RESOURCES

- **Backend API Docs:** http://localhost:8080/swagger-ui.html
- **Postman Collection:** Backend-Movie-Booking-System/Movie_Booking_System_V1_Collection.postman_collection.json
- **Design Reference:** Figma, Dribbble, existing movie booking sites

## 💡 TIPS

1. Test từng component nhỏ trước khi integrate
2. Commit thường xuyên (mỗi feature nhỏ)
3. Mobile-first approach
4. Accessibility từ đầu (ARIA labels)
5. Error handling cho mọi API call

---

**Success Criteria:** Hoàn thành 100% frontend trong 4 tuần, production-ready!
