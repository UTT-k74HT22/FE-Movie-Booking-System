# Movie Booking System - Enterprise React Application

## 🎯 Project Overview

A modern, scalable movie booking system built with **React** following **Enterprise Architecture** best practices.

## ✨ Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Auto token refresh
  - Role-based access control (Admin/User)
  
- 🎬 **Movie Management**
  - Browse movies
  - Search & filter
  - Movie details
  - Admin CRUD operations

- 🎫 **Booking System**
  - Create bookings
  - View booking history
  - Cancel bookings

- 👨‍💼 **Admin Panel**
  - Dashboard with statistics
  - Manage movies, bookings, users
  - Settings

## 🏗️ Architecture

### Feature-Based Structure
```
src/
├── core/          # Infrastructure (API, routes, config)
├── features/      # Business features (auth, movies, bookings, admin)
├── shared/        # Reusable code (components, hooks, utils)
└── assets/        # Static assets
```

### Key Architectural Decisions

✅ **Single Responsibility Principle**
- Services: API calls only
- Hooks: Business logic
- Components: UI rendering

✅ **DRY (Don't Repeat Yourself)**
- Shared utilities & constants
- Reusable custom hooks
- Component composition

✅ **Scalability**
- Feature modules
- Lazy loading
- Code splitting

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=Movie Booking System
VITE_APP_VERSION=1.0.0
```

## 📁 Project Structure

```
src/
├── core/
│   ├── api/              # API client & interceptors
│   ├── config/           # App & env configuration
│   └── routes/           # Route configuration with lazy loading
│
├── features/
│   ├── auth/             # Authentication module
│   │   ├── services/     # Auth API calls
│   │   ├── contexts/     # Auth context provider
│   │   ├── hooks/        # useLogin, useRegister
│   │   └── pages/        # Login, Register pages
│   │
│   ├── movies/           # Movies module
│   ├── bookings/         # Bookings module
│   └── admin/            # Admin module
│
└── shared/
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom hooks
    ├── utils/            # Utilities (validators, formatters, etc.)
    └── constants/        # App-wide constants
```

## 🛠️ Tech Stack

- **React** 18+ - UI library
- **React Router** v7 - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications
- **dayjs** - Date handling
- **jwt-decode** - JWT parsing

## 📚 Key Concepts

### 1. API Client

Unified API client with automatic token refresh:

```javascript
import { httpClient } from './core/api';

const data = await httpClient.get('/movies');
await httpClient.post('/bookings', bookingData);
```

### 2. Authentication

Context-based auth with custom hooks:

```javascript
import { useAuth } from './features/auth';

function MyComponent() {
  const { user, login, logout, hasRole } = useAuth();
  
  if (hasRole(USER_ROLES.ADMIN)) {
    return <AdminPanel />;
  }
}
```

### 3. Protected Routes

Role-based route protection:

```javascript
<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
  <AdminDashboard />
</ProtectedRoute>
```

### 4. Custom Hooks

Reusable business logic:

```javascript
import { useMovies } from './features/movies';

function MovieList() {
  const { movies, loading, error, refetch } = useMovies();
  // ...
}
```

## 🎨 Styling

Uses **Tailwind CSS** for utility-first styling:

```jsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Click me
  </button>
</div>
```

## 🔒 Security

- JWT-based authentication
- Auto token refresh on expiry
- Protected routes with role checking
- XSS protection
- CSRF token support (if needed)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run tests (when configured)
npm test
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Team

- Development Team
- QA Team
- Product Team

## 📞 Support

For support, email: support@moviebooking.com

---

**Built with ❤️ using Enterprise React Architecture**
