import React from "react";
import LoginForm from "../../components/Client/LoginForm/LoginForm";
import styles from './Login.module.css';
export default function Login() {
return (
    <body>
        <div className={styles.loginPage}>
            <div className={styles.loginContainer}>
                <h1>LOGIN</h1>
                <LoginForm/>
            </div>
        </div>
    </body>

);
}