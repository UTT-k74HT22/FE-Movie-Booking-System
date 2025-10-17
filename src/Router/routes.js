import Home from '../pages/Home/Home';
import LoginForm from '../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm/RegisterForm';
import { Dashboard, Setting } from '../pages/admin';

const publicRouter = [
    { path: "/", component: Home, layout: null },
    { path: "/login", component: LoginForm, layout: null },
    { path: "/register", component: RegisterForm, layout: null },
];

const privateRouter = [
    { path: "/dashboard", component: Dashboard },
    { path: "/setting", component: Setting },
];
export { publicRouter, privateRouter }