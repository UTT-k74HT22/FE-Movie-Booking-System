import Home from '../pages/Home/Home.js';
import LoginForm from '../components/Auth/LoginForm/LoginForm.jsx';
import RegisterForm from '../components/Auth/RegisterForm/RegisterForm.jsx';
import { Dashboard, Setting } from '../pages/admin';
const publicRouter = [
    { path: '/', component: Home },
    { path: '/Login', component: LoginForm },
    { path: '/Register', component: RegisterForm },

]
const privateRouter = [
    { path: '/Dashboard', component: Dashboard },
    { path: '/Setting', component: Setting },
]
export { publicRouter, privateRouter }