import React from "react";
import LoginForm from "../../components/Client/LoginForm/LoginForm";
import styles from './Login.module.css';
import authApi from "../../api/authApi";
import { Link } from "react-router-dom";

export default function Login() {
    const handleLogin = async (form) => {
        form = {email: form.email, password: form.password};
        console.log("Dữ liệu từ form:", form);
        try {
            const result = await authApi.login(form.email, form.password);
            console.log("Kết quả trả về từ API:", result);
        } catch (error) {
            console.error("Lỗi khi gọi API login:", error);
        }
    }

    return (
        <div>
            <div className={styles.loginPage}>
                <div className={styles.loginContainer}>
                    <h1>LOGIN</h1>
                    <LoginForm onSubmit={handleLogin} />
                    <p>Don't have an account? <Link to="/Register" className={styles.registerLink}>
                    Register
                    </Link></p>
                </div>
            </div>
        </div>
    );

}