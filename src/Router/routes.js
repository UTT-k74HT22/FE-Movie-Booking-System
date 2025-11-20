import Home from "../pages/Home/Home";
import LoginForm from "../components/Auth/LoginForm/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm/RegisterForm";
import ActiveForm from "../components/Auth/ActiveForm/ActiveForm";
import ForgotPassword from "../components/Auth/ForgotPassword/ForgotPassword";
import { Dashboard, Setting } from "../pages/admin";
import AdminLayout from "../layouts/AdminLayout";
import AddMovies from "../pages/admin/movies/addMovies";
import listMovies from "../pages/admin/movies/listMovies";

const routes = [
  { path: "/", component: Home, layout: null },
  { path: "/login", component: LoginForm, layout: null },
  { path: "/register", component: RegisterForm, layout: null },
  { path: "/active", component: ActiveForm, layout: null },
  { path: "/forgot-password", component: ForgotPassword, layout: null },
  { path: "/admin", component: AdminLayout, layout: AdminLayout },

  // { path: "/profile", component: Profile, layout: null, role: ['admin','user'] },
  {
    path: "/setting",
    component: Setting,
    layout: AdminLayout,
    role: ["ROLE_ADMIN"],
  },
  {
    path: "/dashboard",
    component: Dashboard,
    layout: AdminLayout,
    role: ["ROLE_ADMIN"],
  },
  {
    path: "/addMovies",
    component: AddMovies,
    layout: AdminLayout,
    role: ["ROLE_ADMIN"],
  },
  {
    path: "/listMovies",
    component: listMovies,
    layout: AdminLayout,
    role: ["ROLE_ADMIN"],
  },
];

const publicRouter = routes.filter((route) => !route.role);
const privateRouter = routes.filter((route) => route.role);
export { publicRouter, privateRouter };
