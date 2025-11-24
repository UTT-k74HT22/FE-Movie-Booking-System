# Movie Booking System - Refactor Plan

## 🎯 Mục tiêu
Refactor dự án theo chuẩn Enterprise React Application với:
- Feature-based architecture
- Scalability & Maintainability
- Code reusability
- Clear separation of concerns

## 📁 Cấu trúc mới (Enterprise Standard)

```
src/
├── core/                          # Core functionality
│   ├── api/                       # API configuration
│   │   ├── client.js             # Axios instance với interceptors
│   │   ├── interceptors.js       # Request/Response interceptors
│   │   └── endpoints.js          # API endpoints constants
│   ├── config/                    # App configuration
│   │   ├── app.config.js         # App-wide config
│   │   └── env.config.js         # Environment variables
│   └── routes/                    # Global routing
│       ├── index.jsx             # Route configuration
│       ├── ProtectedRoute.jsx    # Auth guard
│       └── routeConfig.js        # Route definitions
│
├── features/                      # Feature modules (domain-driven)
│   ├── auth/                     # Authentication feature
│   │   ├── components/           # Auth-specific components
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   ├── ForgotPasswordForm/
│   │   │   └── index.js
│   │   ├── hooks/                # Auth hooks
│   │   │   ├── useAuth.js
│   │   │   └── useLogin.js
│   │   ├── services/             # Auth API calls
│   │   │   └── auth.service.js
│   │   ├── contexts/             # Auth context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                # Auth pages
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   └── index.js              # Feature exports
│   │
│   ├── movies/                   # Movies feature
│   │   ├── components/
│   │   │   ├── MovieCard/
│   │   │   ├── MovieList/
│   │   │   └── MovieForm/
│   │   ├── hooks/
│   │   │   └── useMovies.js
│   │   ├── services/
│   │   │   └── movie.service.js
│   │   ├── pages/
│   │   │   ├── MovieListPage.jsx
│   │   │   └── AddMoviePage.jsx
│   │   └── index.js
│   │
│   ├── bookings/                 # Bookings feature
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── pages/
│   │   └── index.js
│   │
│   └── admin/                    # Admin feature
│       ├── components/
│       │   ├── Dashboard/
│       │   └── Settings/
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   └── SettingsPage.jsx
│       └── index.js
│
├── shared/                        # Shared across features
│   ├── components/               # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Layout/
│   │   │   ├── AdminLayout/
│   │   │   ├── ClientLayout/
│   │   │   └── index.js
│   │   └── index.js
│   │
│   ├── hooks/                    # Shared custom hooks
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── index.js
│   │
│   ├── utils/                    # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   ├── helpers.js
│   │   └── index.js
│   │
│   ├── constants/                # App constants
│   │   ├── routes.constant.js
│   │   ├── api.constant.js
│   │   ├── app.constant.js
│   │   └── index.js
│   │
│   └── types/                    # TypeScript types (if needed)
│       └── index.js
│
├── assets/                        # Static assets
│   ├── images/
│   ├── icons/
│   └── styles/
│       ├── tailwind.css
│       └── global.css
│
├── App.jsx                        # Root component
├── main.jsx                       # Entry point
└── index.css                      # Global styles
```

## 🔑 Key Improvements

### 1. **Feature-Based Organization**
- Mỗi feature độc lập (auth, movies, bookings, admin)
- Dễ scale, maintain và test
- Team có thể work parallel trên các features khác nhau

### 2. **Clear Separation**
- `core/`: Infrastructure code (API, routes, config)
- `features/`: Business logic theo domain
- `shared/`: Reusable code across features

### 3. **Consistent Naming**
- Folders: lowercase (components, services, hooks)
- Components: PascalCase (LoginForm.jsx)
- Utilities: camelCase (formatDate.js)
- Constants: UPPER_CASE

### 4. **Single Responsibility**
- API client riêng, không duplicate
- Services chỉ handle API calls
- Hooks handle business logic
- Components chỉ handle UI

### 5. **Scalability**
- Dễ add features mới
- Dễ refactor từng feature
- Dễ lazy load routes
- Dễ implement code splitting

## 📋 Migration Steps

1. ✅ Create new folder structure
2. ✅ Setup core (API, config, constants)
3. ✅ Migrate Auth feature
4. ✅ Migrate Movies feature
5. ✅ Migrate Bookings feature
6. ✅ Migrate Admin feature
7. ✅ Migrate shared components
8. ✅ Update all imports
9. ✅ Test & cleanup old structure
