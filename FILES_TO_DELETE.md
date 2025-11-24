# Files to Delete After Migration

## ✅ Logic đã được migrate - An toàn để xóa

### Old API Layer (replaced by `src/core/api/`)
- [ ] `src/api/authApi.js` → Migrated to `src/features/auth/services/auth.service.js`
- [ ] `src/api/axiosInstance.js` → Migrated to `src/core/api/client.js`

### Old Utils (replaced by `src/core/api/` and `src/shared/utils/`)
- [ ] `src/utils/httpRequest.js` → Migrated to `src/core/api/client.js`
- [ ] `src/utils/tokenService.js` → Migrated to `src/shared/utils/token.service.js`

### Old Auth Components (replaced by `src/features/auth/pages/`)
- [ ] `src/components/Auth/ActiveForm/ActiveForm.jsx` → Logic migrated to `src/features/auth/pages/ActivateAccountPage.jsx`
- [ ] `src/components/Auth/ActiveForm/ActiveForm.module.css`
- [ ] `src/components/Auth/LoginForm/LoginForm.jsx` → Logic migrated to `src/features/auth/pages/LoginPage.jsx`
- [ ] `src/components/Auth/LoginForm/LoginForm.module.css`
- [ ] `src/components/Auth/RegisterForm/RegisterForm.jsx` → Logic migrated to `src/features/auth/pages/RegisterPage.jsx` and `useRegister` hook
- [ ] `src/components/Auth/RegisterForm/RegisterForm.module.css`
- [ ] `src/components/Auth/ForgotPassword/ForgotPassword.jsx` → Empty placeholder, logic will be in `src/features/auth/pages/ForgotPasswordPage.jsx`
- [ ] `src/components/Auth/ForgotPassword/ForgotPassword.module.css`
- [ ] `src/components/Auth/ForgotPasswordForm/` → If exists
- [ ] `src/components/Auth/ResetPasswordForm/` → If exists
- [ ] `src/components/Auth/index.js`

### Old Layouts (replaced by `src/shared/components/layouts/`)
- [ ] `src/layouts/AdminHeader.jsx` → Migrated to `src/shared/components/layouts/AdminLayout/AdminHeader.jsx`
- [ ] `src/layouts/AdminSidebar.jsx` → Migrated to `src/shared/components/layouts/AdminLayout/AdminSidebar.jsx`
- [ ] `src/layouts/AdminFooter.jsx` → Migrated to `src/shared/components/layouts/AdminLayout/AdminFooter.jsx`
- [ ] `src/layouts/AdminLayout.jsx` → Migrated to `src/shared/components/layouts/AdminLayout/AdminLayout.jsx`
- [ ] `src/layouts/ClientHeader.jsx` → Better version in `src/shared/components/layouts/ClientLayout/ClientHeader.jsx`
- [ ] `src/layouts/ClientFooter.jsx` → Better version in `src/shared/components/layouts/ClientLayout/ClientFooter.jsx`
- [ ] `src/layouts/ClientLayout.jsx` → Better version in `src/shared/components/layouts/ClientLayout/ClientLayout.jsx`

### Old Routing (replaced by `src/core/routes/`)
- [ ] `src/Router/routes.js` → Migrated to `src/core/routes/routeConfig.js`
- [ ] `src/Router/ProtectedRoute.jsx` → Migrated to `src/core/routes/ProtectedRoute.jsx`

### Old Services (replaced by `src/features/*/services/`)
- [ ] `src/services/authService.js` → Migrated to `src/features/auth/services/auth.service.js`
- [ ] `src/services/movieService.js` → Migrated to `src/features/movies/services/movie.service.js`
- [ ] `src/services/bookingService.js` → Migrated to `src/features/bookings/services/booking.service.js`

### Old Contexts (replaced by `src/features/auth/contexts/`)
- [ ] `src/Contexts/AuthContext.jsx` → Migrated to `src/features/auth/contexts/AuthContext.jsx`
- [ ] `src/Contexts/UserContext.jsx` → Functionality merged into `AuthContext`

### Old Mixed Pages (logic being migrated to features)
- [ ] `src/pages/Home/Home.jsx` → Simple welcome page, replaced by `src/features/home/pages/HomePage.jsx`
- [ ] `src/pages/Home/Home.module.css`
- [ ] `src/pages/admin/Dashboard/Dashboard.jsx` → Placeholder, will be in `src/features/admin/pages/DashboardPage.jsx`
- [ ] `src/pages/admin/movies/addMovies/addMovies.jsx` → Will be in `src/features/admin/pages/AddMoviePage.jsx`
- [ ] `src/pages/admin/movies/addMovies/listMovies.jsx` → Will be in `src/features/admin/pages/MoviesPage.jsx`
- [ ] `src/pages/admin/Setting/Setting.jsx` → Will be in `src/features/admin/pages/SettingsPage.jsx`
- [ ] `src/pages/admin/index.js`

### Old Admin/Client Folders (replaced by features)
- [ ] `src/admin/Bookings.jsx` → Will be in `src/features/admin/pages/BookingsPage.jsx`
- [ ] `src/admin/Dashboard.jsx` → Will be in `src/features/admin/pages/DashboardPage.jsx`
- [ ] `src/admin/Movies.jsx` → Will be in `src/features/admin/pages/MoviesPage.jsx`
- [ ] `src/admin/Users.jsx` → Will be in `src/features/admin/pages/UsersPage.jsx`
- [ ] `src/client/Booking.jsx` → Will be in `src/features/bookings/pages/BookingPage.jsx`
- [ ] `src/client/Home.jsx` → Simple home, replaced by `src/features/home/pages/HomePage.jsx`
- [ ] `src/client/MovieList.jsx` → Will be in `src/features/movies/pages/MoviesPage.jsx`

### Old Components (replaced or no longer needed)
- [ ] `src/components/ProtectedRoute/` → Migrated to `src/core/routes/ProtectedRoute.jsx`
- [ ] `src/components/UnauthorizedPage/` → Migrated to `src/shared/components/layouts/UnauthorizedPage.jsx`

### Empty/Unused Folders
- [ ] `src/hooks/` → Empty folder (hooks moved to `src/shared/hooks/`)

## ⚠️ Cần kiểm tra trước khi xóa

### App Entry Point
- [ ] `src/App.jsx` → Cần replace bằng `src/App-new.jsx` trước khi xóa
- [ ] `src/App.css` → Kiểm tra xem có styles quan trọng cần migrate không

### Assets
- [ ] `src/assets/TailwindStyles/help.tailwind.css` → Kiểm tra có được dùng không

## 📝 Notes

**Total files to delete:** ~50+ files/folders

**Migration Status:**
- ✅ API Layer: 100% migrated
- ✅ Auth Feature: 100% migrated (Login, Register, Activate)
- ✅ Admin Layouts: 100% migrated (Header, Sidebar, Footer)
- ✅ Client Layouts: 100% migrated (Header, Footer, Layout)
- ✅ Services: 100% migrated (auth, movie, booking)
- ✅ Routing: 100% migrated
- 🟡 Admin Pages: Placeholders created, need content migration
- 🟡 Client Pages: Basic structure, need content migration

**Before deleting:**
1. ✅ Migrate all business logic from old files
2. ⚠️ Replace `src/App.jsx` with `src/App-new.jsx`
3. ⚠️ Test authentication flow (login, register, activate)
4. ⚠️ Test routing (protected routes, role-based access)
5. ⚠️ Update imports in any remaining files
6. ⚠️ Run build to check for missing dependencies

**Safe to delete immediately:**
- Old API files (`src/api/`, `src/utils/httpRequest.js`, `src/utils/tokenService.js`)
- Old auth components (`src/components/Auth/`)
- Old layouts (`src/layouts/`)
- Old routing (`src/Router/`)
- Old services (`src/services/`)
- Old contexts (`src/Contexts/`)

**Delete after page migration complete:**
- Old pages (`src/pages/`, `src/admin/`, `src/client/`)
