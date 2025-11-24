# 🚀 Migration Guide - Enterprise React Refactor

## ✅ What's Been Done

Dự án đã được refactor hoàn toàn theo **Enterprise Architecture Standards**:

### 🏗️ New Structure

```
src/
├── core/                          ✅ Core infrastructure
│   ├── api/                       ✅ Unified API client (merged httpRequest + axiosInstance)
│   │   ├── client.js             ✅ Axios instance with interceptors
│   │   ├── interceptors.js       ✅ Auto token refresh, error handling
│   │   └── index.js
│   ├── config/                    ✅ App configuration
│   │   ├── app.config.js         ✅ App-wide settings
│   │   └── env.config.js         ✅ Environment variables
│   └── routes/                    ✅ Routing with lazy loading
│       ├── index.jsx             ✅ Main routes component
│       ├── ProtectedRoute.jsx    ✅ Auth guard
│       └── routeConfig.js        ✅ Route definitions
│
├── features/                      ✅ Feature modules
│   ├── auth/                     ✅ Complete auth module
│   │   ├── services/             ✅ Auth API service
│   │   ├── contexts/             ✅ Auth context & useAuth hook
│   │   ├── hooks/                ✅ useLogin, useRegister
│   │   └── pages/                ✅ Login, Register pages
│   ├── movies/                   ✅ Movies module
│   │   ├── services/             ✅ Movie API service
│   │   ├── hooks/                ✅ useMovies, useMovieDetail
│   │   └── pages/                ✅ Placeholder pages
│   ├── bookings/                 ✅ Bookings module
│   └── admin/                    ✅ Admin module
│
├── shared/                        ✅ Shared resources
│   ├── components/               ✅ Reusable components
│   │   └── layouts/              ✅ AdminLayout, ClientLayout
│   ├── hooks/                    ✅ Custom hooks (useDebounce, useToggle, etc.)
│   ├── utils/                    ✅ Utilities
│   │   ├── validators.js         ✅ Validation functions
│   │   ├── formatters.js         ✅ Date, currency formatters
│   │   ├── helpers.js            ✅ Helper functions
│   │   ├── token.service.js      ✅ Token management
│   │   └── storage.service.js    ✅ localStorage wrapper
│   └── constants/                ✅ App constants
│       ├── routes.constant.js    ✅ Route paths
│       ├── api.constant.js       ✅ API endpoints
│       └── app.constant.js       ✅ App-wide constants
```

---

## 📋 Next Steps - Manual Migration Required

### Step 1: Update App.jsx

Replace your current `src/App.jsx` with `src/App-new.jsx`:

```bash
# Backup old App.jsx
mv src/App.jsx src/App-old.jsx

# Use new App.jsx
mv src/App-new.jsx src/App.jsx
```

---

### Step 2: Migrate Component Content

Copy content from old files to new structure:

#### Auth Components
```
OLD → NEW
src/components/Auth/LoginForm/LoginForm.jsx → Already migrated (useLogin hook)
src/components/Auth/RegisterForm/RegisterForm.jsx → Already migrated (useRegister hook)
src/components/Auth/ActiveForm/ActiveForm.jsx → src/features/auth/pages/ActivateAccountPage.jsx
src/components/Auth/ForgotPassword/ForgotPassword.jsx → src/features/auth/pages/ForgotPasswordPage.jsx
```

#### Pages
```
OLD → NEW
src/pages/Home/Home.jsx → src/features/home/pages/HomePage.jsx
src/client/MovieList.jsx → src/features/movies/pages/MovieListPage.jsx
src/client/Booking.jsx → src/features/bookings/pages/MyBookingsPage.jsx
```

#### Admin Pages
```
OLD → NEW
src/pages/admin/Dashboard/Dashboard.jsx → src/features/admin/pages/DashboardPage.jsx
src/admin/Movies.jsx → src/features/admin/pages/AdminMoviesPage.jsx
src/pages/admin/movies/addMovies/addMovies.jsx → src/features/admin/pages/AddMoviePage.jsx
src/admin/Bookings.jsx → src/features/admin/pages/AdminBookingsPage.jsx
src/admin/Users.jsx → src/features/admin/pages/AdminUsersPage.jsx
src/pages/admin/Setting/Setting.jsx → src/features/admin/pages/SettingsPage.jsx
```

#### Layouts
```
OLD → NEW
src/layouts/AdminHeader.jsx → src/shared/components/layouts/AdminLayout/AdminHeader.jsx (copy content)
src/layouts/AdminSidebar.jsx → src/shared/components/layouts/AdminLayout/AdminSidebar.jsx (copy content)
src/layouts/AdminFooter.jsx → src/shared/components/layouts/AdminLayout/AdminFooter.jsx (copy content)
src/layouts/ClientHeader.jsx → src/shared/components/layouts/ClientLayout/ClientHeader.jsx (copy content)
src/layouts/ClientFooter.jsx → src/shared/components/layouts/ClientLayout/ClientFooter.jsx (copy content)
```

---

### Step 3: Update Imports in Migrated Files

After copying content, update imports to use new paths:

**Example - Old imports:**
```javascript
import authApi from '../../../api/authApi';
import { tokenService } from '../../../utils/tokenService';
```

**New imports:**
```javascript
import { authService } from '../services/auth.service';
import { tokenService } from '../../../shared/utils';
```

**Common import patterns:**

```javascript
// Constants
import { ROUTES, API_ENDPOINTS, USER_ROLES } from '../../../shared/constants';

// Utilities
import { formatDate, formatCurrency, isValidEmail } from '../../../shared/utils';

// Hooks
import { useDebounce, useLocalStorage } from '../../../shared/hooks';

// Auth
import { useAuth } from '../../../features/auth';

// Services
import { movieService } from '../services/movie.service';
import { bookingService } from '../../../features/bookings';

// Components
import { AdminLayout, ClientLayout } from '../../../shared/components';
```

---

### Step 4: Clean Up Old Files (After Testing)

Once everything works, remove old structure:

```bash
# Remove old folders
rm -rf src/api
rm -rf src/admin
rm -rf src/client
rm -rf src/components/Auth
rm -rf src/Contexts
rm -rf src/layouts
rm -rf src/pages
rm -rf src/Router
rm -rf src/utils/httpRequest.js
rm -rf src/utils/tokenService.js

# Keep only new structure
```

---

### Step 5: Test Application

1. **Install dependencies** (if needed):
```bash
npm install
```

2. **Start dev server**:
```bash
npm run dev
```

3. **Test features**:
   - ✅ Login/Register
   - ✅ Protected routes
   - ✅ Token refresh
   - ✅ API calls
   - ✅ Admin pages
   - ✅ Client pages

---

## 🎯 Key Improvements

### 1. **Unified API Client**
- ❌ Before: `httpRequest.js` AND `axiosInstance.js` (duplicate)
- ✅ After: Single `apiClient` with interceptors

### 2. **Smart Token Management**
- ✅ Auto token refresh
- ✅ Request queuing during refresh
- ✅ Centralized error handling

### 3. **Type-Safe Constants**
```javascript
// No more magic strings!
navigate(ROUTES.ADMIN.DASHBOARD);
httpClient.get(API_ENDPOINTS.MOVIES.BASE);
hasRole(USER_ROLES.ADMIN);
```

### 4. **Reusable Hooks**
```javascript
const { data, loading, error } = useFetch(() => movieService.getMovies());
const [value, toggle] = useToggle(false);
const debouncedSearch = useDebounce(searchTerm, 500);
```

### 5. **Better Code Organization**
- Each feature is self-contained
- Easy to test
- Easy to scale
- Team can work in parallel

---

## 📚 Usage Examples

### Using Auth
```javascript
import { useAuth } from './features/auth';

function MyComponent() {
  const { user, login, logout, hasRole } = useAuth();
  
  if (hasRole(USER_ROLES.ADMIN)) {
    // Admin-only code
  }
}
```

### Using Services
```javascript
import { movieService } from './features/movies';

async function loadMovies() {
  const movies = await movieService.getMovies({ page: 1 });
}
```

### Using Constants
```javascript
import { ROUTES, formatDate, isValidEmail } from './shared/constants';

<Link to={ROUTES.ADMIN.MOVIES}>Movies</Link>
const formatted = formatDate(new Date());
const valid = isValidEmail(email);
```

---

## 🔥 Best Practices

1. **Always use barrel exports** (`index.js`)
2. **Use constants instead of magic strings**
3. **Services only handle API calls**
4. **Hooks handle business logic**
5. **Components only handle UI**
6. **Use TypeScript types** (optional but recommended)

---

## 🆘 Troubleshooting

### Import errors?
- Check barrel exports in `index.js` files
- Use absolute paths from `src/`

### Token not refreshing?
- Check `src/core/api/interceptors.js`
- Verify API_ENDPOINTS.AUTH.REFRESH_TOKEN

### Routes not working?
- Check `src/core/routes/routeConfig.js`
- Verify route paths in ROUTES constant

---

## 📞 Support

Need help? Check:
1. `REFACTOR_PLAN.md` - Full refactor plan
2. Each feature's `README.md` (create as needed)
3. Code comments in each file

---

**Happy Coding! 🎉**
