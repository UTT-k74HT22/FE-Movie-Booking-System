# Migration Checklist

## Pre-Cleanup Verification ✅

### 1. Core Infrastructure
- [x] API client unified (`src/core/api/client.js`)
- [x] Interceptors with auto token refresh (`src/core/api/interceptors.js`)
- [x] Environment configuration (`src/core/config/env.config.js`)
- [x] App configuration (`src/core/config/app.config.js`)
- [x] Route configuration (`src/core/routes/routeConfig.js`)
- [x] Protected routes (`src/core/routes/ProtectedRoute.jsx`)

### 2. Shared Resources
- [x] All constants (routes, API endpoints, app constants)
- [x] All validators (email, password, phone, etc.)
- [x] All formatters (date, currency, number, etc.)
- [x] All helpers (debounce, throttle, clone, etc.)
- [x] Token service (get/set/remove/decode tokens)
- [x] Storage service (localStorage wrapper)
- [x] Custom hooks (useDebounce, useLocalStorage, useToggle, useFetch, useClickOutside)

### 3. Features - Auth Module
- [x] Auth service (`src/features/auth/services/auth.service.js`)
- [x] Auth context with useAuth hook (`src/features/auth/contexts/AuthContext.jsx`)
- [x] useLogin hook with validation
- [x] useRegister hook with validation
- [x] Login page with full UI (MUI)
- [x] Register page with full UI (Tailwind CSS)
- [x] Activate account page with OTP logic (MUI)
- [ ] Forgot password page (placeholder exists)
- [ ] Reset password page (placeholder exists)

### 4. Features - Movies Module
- [x] Movie service (CRUD, search, popular, upcoming)
- [x] useMovies hook (pagination)
- [x] useMovieDetail hook
- [ ] Movies list page (placeholder)
- [ ] Movie detail page (placeholder)

### 5. Features - Bookings Module
- [x] Booking service (get, create, cancel)
- [ ] My bookings page (placeholder)
- [ ] Create booking page (placeholder)

### 6. Features - Admin Module
- [x] Admin layout with sidebar (400+ lines, collapsible menu)
- [x] Admin header
- [x] Admin footer
- [ ] Dashboard page (placeholder)
- [ ] Movies management page (placeholder)
- [ ] Add movie page (placeholder)
- [ ] Bookings management page (placeholder)
- [ ] Users management page (placeholder)
- [ ] Settings page (placeholder)

### 7. Layouts
- [x] Admin layout structure
- [x] Admin header (migrated)
- [x] Admin sidebar (migrated with full collapsible logic)
- [x] Admin footer
- [x] Client layout structure
- [x] Client header (with navigation)
- [x] Client footer
- [x] Unauthorized page
- [x] Not found page

## Cleanup Process 🧹

### Step 1: Backup (CRITICAL)
- [ ] Create git commit with current state
- [ ] Or create manual backup of `src/` folder

### Step 2: Replace Main Entry Point
- [ ] Replace `src/App.jsx` with `src/App-new.jsx`
- [ ] Verify imports are correct
- [ ] Test app starts without errors

### Step 3: Run Cleanup Script
```powershell
# From project root
.\cleanup-old-files.ps1
```

**Or manually delete these folders:**
- [ ] `src/api/`
- [ ] `src/utils/httpRequest.js` and `src/utils/tokenService.js`
- [ ] `src/components/Auth/`
- [ ] `src/components/ProtectedRoute/`
- [ ] `src/components/UnauthorizedPage/`
- [ ] `src/layouts/`
- [ ] `src/Router/`
- [ ] `src/services/`
- [ ] `src/Contexts/`
- [ ] `src/pages/`
- [ ] `src/admin/`
- [ ] `src/client/`
- [ ] `src/hooks/` (if empty)

### Step 4: Update Package Imports
Check for any remaining imports from old paths:
```bash
# Search for old imports
grep -r "from '../api/authApi'" src/
grep -r "from '../utils/httpRequest'" src/
grep -r "from '../Router/" src/
grep -r "from '../services/" src/
grep -r "from '../Contexts/" src/
```

## Post-Cleanup Testing 🧪

### Test 1: Build Check
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] No build errors

### Test 2: Development Server
- [ ] Run `npm run dev`
- [ ] App loads without console errors
- [ ] No 404 errors for missing modules

### Test 3: Authentication Flow
- [ ] Navigate to `/register`
- [ ] Fill registration form
- [ ] Submit registration
- [ ] Toast notification appears
- [ ] Navigate to `/activate`
- [ ] Enter OTP code
- [ ] Resend OTP works
- [ ] Navigate to `/login`
- [ ] Login with credentials
- [ ] Token stored in localStorage
- [ ] User redirected to home

### Test 4: Protected Routes
- [ ] Try accessing `/admin/dashboard` without login → redirected to `/unauthorized`
- [ ] Login as admin
- [ ] Access `/admin/dashboard` → works
- [ ] Logout
- [ ] Access `/admin/dashboard` again → redirected

### Test 5: API Integration
- [ ] Check Network tab for API calls
- [ ] Verify Authorization header with token
- [ ] Verify API base URL is correct
- [ ] Test token refresh on 401 error

### Test 6: Layout & Navigation
- [ ] Client header displays correctly
- [ ] Client footer displays correctly
- [ ] Admin sidebar is collapsible
- [ ] Admin sidebar menu items navigate correctly
- [ ] Routes use constants (no hardcoded paths)

### Test 7: Error Handling
- [ ] Try invalid email in register → shows error
- [ ] Try password mismatch → shows error
- [ ] Try login with wrong credentials → shows error
- [ ] Try accessing invalid route → shows 404 page

## Final Verification ✨

### Code Quality
- [ ] No console errors
- [ ] No console warnings about deprecated code
- [ ] All imports are absolute (from `src/`)
- [ ] No magic strings (all use constants)
- [ ] No duplicate code

### Documentation
- [ ] README-NEW.md is complete
- [ ] MIGRATION_GUIDE.md is accurate
- [ ] REFACTOR_SUMMARY.md is updated
- [ ] FILES_TO_DELETE.md is archived

### Git
- [ ] Commit cleaned code
- [ ] Tag release (e.g., `v2.0.0-refactored`)
- [ ] Update .gitignore if needed
- [ ] Push to remote

## Rollback Plan 🔄

If something goes wrong:

1. **If using git:**
   ```bash
   git reset --hard HEAD~1
   git clean -fd
   ```

2. **If using backup:**
   ```powershell
   Remove-Item -Recurse -Force src/
   Copy-Item -Recurse backup/src/ src/
   ```

3. **If App.jsx was replaced:**
   ```powershell
   Copy-Item src/App.jsx.backup src/App.jsx -Force
   ```

## Success Criteria ✅

Migration is successful when:
- ✅ All tests pass
- ✅ No console errors
- ✅ Authentication flow works end-to-end
- ✅ Protected routes work correctly
- ✅ API calls use unified client
- ✅ All constants are centralized
- ✅ Code is clean and maintainable
- ✅ Build size is optimized
- ✅ Development experience is improved

## Notes

**Estimated Time:** 30-60 minutes for cleanup + testing

**Risk Level:** LOW (all logic migrated, tests available)

**Recommended Approach:**
1. Do this during low-traffic time
2. Have backup ready
3. Test on dev environment first
4. Keep old branch as backup for 1-2 weeks

**Common Issues:**
- Import path errors → Check console, update imports
- Missing modules → Verify file was migrated, not deleted
- API errors → Check environment variables in `.env`
- Route not found → Verify route config in `routeConfig.js`
