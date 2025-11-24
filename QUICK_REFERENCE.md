# Quick Reference Guide - New Architecture

## 📁 Folder Structure Quick Access

### Adding New Features

**1. Create a new feature module:**
```
src/features/[feature-name]/
├── services/          # API calls
├── contexts/          # State management (if needed)
├── hooks/            # Custom hooks
├── pages/            # Page components
├── components/       # Feature-specific components
├── utils/            # Feature-specific utilities
└── index.js          # Barrel export
```

**Example: Adding "Theaters" feature**
```bash
mkdir -p src/features/theaters/{services,pages,components,hooks}
```

### Common File Locations

| What you need | Where to find it |
|--------------|------------------|
| API client | `src/core/api/client.js` |
| API endpoints | `src/shared/constants/api.constant.js` |
| Route paths | `src/shared/constants/routes.constant.js` |
| App settings | `src/core/config/app.config.js` |
| Environment variables | `src/core/config/env.config.js` |
| Validators | `src/shared/utils/validators.js` |
| Formatters | `src/shared/utils/formatters.js` |
| Custom hooks | `src/shared/hooks/` |
| Layouts | `src/shared/components/layouts/` |

## 🔌 Common Imports

### API Client
```javascript
import { apiClient } from '@/core/api/client';

// GET request
const response = await apiClient.get('/movies');

// POST request
const response = await apiClient.post('/auth/login', { email, password });

// With params
const response = await apiClient.get('/movies', { 
  params: { page: 1, limit: 10 } 
});
```

### Constants
```javascript
// Routes
import { ROUTES } from '@/shared/constants';
navigate(ROUTES.ADMIN.DASHBOARD);
navigate(ROUTES.LOGIN);

// API Endpoints
import { API_ENDPOINTS } from '@/shared/constants';
apiClient.get(API_ENDPOINTS.MOVIES.BASE);

// App Constants
import { USER_ROLES, HTTP_STATUS, TOAST_TYPES } from '@/shared/constants';
```

### Utilities
```javascript
// Validators
import { isValidEmail, isValidPassword } from '@/shared/utils';

// Formatters
import { formatDate, formatCurrency } from '@/shared/utils';

// Helpers
import { debounce, throttle, deepClone } from '@/shared/utils';

// Token Service
import { tokenService } from '@/shared/utils';
const token = tokenService.getAccessToken();

// Storage Service
import { storageService } from '@/shared/utils';
storageService.setItem('key', { data: 'value' });
```

### Custom Hooks
```javascript
import { useDebounce, useLocalStorage, useToggle } from '@/shared/hooks';

// In component
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

const [user, setUser] = useLocalStorage('user', null);

const [isOpen, toggleOpen] = useToggle(false);
```

### Auth Context
```javascript
import { useAuth } from '@/features/auth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  
  return <div>Welcome {user.firstName}</div>;
}
```

## 🛠️ Common Tasks

### 1. Create a New Service

**File:** `src/features/[feature]/services/[feature].service.js`

```javascript
import { apiClient } from '@/core/api/client';
import { API_ENDPOINTS } from '@/shared/constants';

export const featureService = {
  /**
   * Get all items
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get(API_ENDPOINTS.FEATURE.BASE, { params });
    return response.data;
  },

  /**
   * Get item by ID
   */
  getById: async (id) => {
    const response = await apiClient.get(`${API_ENDPOINTS.FEATURE.BASE}/${id}`);
    return response.data;
  },

  /**
   * Create new item
   */
  create: async (data) => {
    const response = await apiClient.post(API_ENDPOINTS.FEATURE.BASE, data);
    return response.data;
  },

  /**
   * Update item
   */
  update: async (id, data) => {
    const response = await apiClient.put(`${API_ENDPOINTS.FEATURE.BASE}/${id}`, data);
    return response.data;
  },

  /**
   * Delete item
   */
  delete: async (id) => {
    const response = await apiClient.delete(`${API_ENDPOINTS.FEATURE.BASE}/${id}`);
    return response.data;
  },
};
```

### 2. Create a New Hook

**File:** `src/features/[feature]/hooks/use[Feature].js`

```javascript
import { useState, useEffect } from 'react';
import { featureService } from '../services/feature.service';
import { toast } from 'react-toastify';

export const useFeature = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await featureService.getAll();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
```

### 3. Create a New Page

**File:** `src/features/[feature]/pages/[Page]Page.jsx`

```javascript
import React from 'react';
import { useFeature } from '../hooks/useFeature';

const FeaturePage = () => {
  const { data, loading, error } = useFeature();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Feature Page</h1>
      {/* Your content */}
    </div>
  );
};

export default FeaturePage;
```

### 4. Add a New Route

**File:** `src/core/routes/routeConfig.js`

```javascript
// 1. Add route constant
import { ROUTES } from '@/shared/constants';

// 2. Lazy load component
const FeaturePage = lazy(() => import('@/features/feature/pages/FeaturePage'));

// 3. Add to routes array
export const routeConfig = [
  // ... existing routes
  {
    path: ROUTES.FEATURE,
    element: <FeaturePage />,
    protected: true,
    roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
  },
];
```

**File:** `src/shared/constants/routes.constant.js`

```javascript
export const ROUTES = {
  // ... existing routes
  FEATURE: '/feature',
};
```

### 5. Add New API Endpoint

**File:** `src/shared/constants/api.constant.js`

```javascript
const API_VERSION = '/api/v1';

export const API_ENDPOINTS = {
  // ... existing endpoints
  FEATURE: {
    BASE: `${API_VERSION}/features`,
    BY_ID: (id) => `${API_VERSION}/features/${id}`,
    SEARCH: `${API_VERSION}/features/search`,
  },
};
```

### 6. Add New Constant

**File:** `src/shared/constants/app.constant.js`

```javascript
export const FEATURE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

export const FEATURE_TYPES = {
  TYPE_A: 'type_a',
  TYPE_B: 'type_b',
};
```

## 🎨 Styling Guide

### Using Tailwind CSS (Recommended)
```jsx
<div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Title</h1>
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Click Me
  </button>
</div>
```

### Using CSS Modules
```jsx
// Component.jsx
import styles from './Component.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Title</h1>
</div>
```

```css
/* Component.module.css */
.container {
  padding: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
}
```

### Using Material-UI
```jsx
import { TextField, Button, CircularProgress } from '@mui/material';

<TextField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  fullWidth
  margin="normal"
/>

<Button
  variant="contained"
  color="primary"
  onClick={handleSubmit}
  disabled={loading}
>
  {loading ? <CircularProgress size={24} /> : 'Submit'}
</Button>
```

## 🔐 Authentication Examples

### Protect a Component
```javascript
import { useAuth } from '@/features/auth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';

const ProtectedComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <div>Protected Content</div>;
};
```

### Check User Role
```javascript
import { useAuth } from '@/features/auth';
import { USER_ROLES } from '@/shared/constants';

const AdminComponent = () => {
  const { user } = useAuth();

  if (user?.role !== USER_ROLES.ADMIN) {
    return <div>Access Denied</div>;
  }

  return <div>Admin Content</div>;
};
```

### Login Example
```javascript
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/constants';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful');
      navigate(ROUTES.HOME);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
};
```

## 📊 State Management

### Using React Context (Recommended for Feature State)
```javascript
// src/features/[feature]/contexts/FeatureContext.jsx
import { createContext, useContext, useState } from 'react';

const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [state, setState] = useState({});

  const value = {
    state,
    setState,
  };

  return <FeatureContext.Provider value={value}>{children}</FeatureContext.Provider>;
};

export const useFeature = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeature must be used within FeatureProvider');
  }
  return context;
};
```

### Using Local Storage (For Persistence)
```javascript
import { useLocalStorage } from '@/shared/hooks';

const MyComponent = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'en',
  });

  const updateTheme = (theme) => {
    setPreferences({ ...preferences, theme });
  };

  return <div>Current theme: {preferences.theme}</div>;
};
```

## 🧪 Testing Tips

### Mock API Calls
```javascript
// In test file
jest.mock('@/core/api/client');

import { apiClient } from '@/core/api/client';

apiClient.get.mockResolvedValue({ data: mockData });
```

### Test Protected Routes
```javascript
import { render } from '@testing-library/react';
import { AuthProvider } from '@/features/auth';

test('redirects when not authenticated', () => {
  render(
    <AuthProvider>
      <ProtectedPage />
    </AuthProvider>
  );
  // assertions
});
```

## 🚀 Performance Optimization

### Lazy Loading
```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### Memoization
```javascript
import { useMemo, useCallback } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

const handleClick = useCallback(() => {
  doSomething(data);
}, [data]);
```

### Debouncing Search
```javascript
import { useDebounce } from '@/shared/hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearch) {
    searchAPI(debouncedSearch);
  }
}, [debouncedSearch]);
```

## 📝 Environment Variables

### Access in Code
```javascript
import { envConfig } from '@/core/config/env.config';

const apiUrl = envConfig.apiBaseUrl;
const isDev = envConfig.isDevelopment;
```

### Available Variables
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Version number

## 🐛 Debugging

### Check Auth State
```javascript
import { useAuth } from '@/features/auth';

const { user, isAuthenticated } = useAuth();
console.log('User:', user);
console.log('Authenticated:', isAuthenticated);
```

### Check API Calls
```javascript
// Network tab in browser DevTools
// Look for Authorization header
// Check response status and data
```

### Check Token
```javascript
import { tokenService } from '@/shared/utils';

const token = tokenService.getAccessToken();
const decoded = tokenService.decodeToken(token);
console.log('Token:', decoded);
console.log('Expired:', tokenService.isTokenExpired(token));
```

---

**Last Updated:** 2025-01-XX  
**Version:** 2.0.0 (Post-Refactor)
