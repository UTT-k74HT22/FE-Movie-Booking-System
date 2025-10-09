import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import authApi from '../../../api/authApi';
import { Link } from 'react-router-dom';

const RegisterForm = () => {

    const [form, setForm] = useState({ 
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    // hàm xử lý khi người dùng nhập dữ liệu vào input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });  //lấy giá trị người dùng nhập theo thuộc tính name
        // mỗi khi người dùng nhập thì xóa lỗi đi
        setErrors({ ...errors, [e.target.name]: ''});
    };

    // const validate = () => {
    //     const newErrors = {};


    // hàm xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault(); // ngăn chặn reload trang

        let newErrors = { username: '', email: '', password: '' };
        let isValid = true;

        if (!form.username.trim()) {
            newErrors.username = "Username không được để trống!";
            isValid = false;
        }

        // validate email
        if (!form.email.trim()) {
            newErrors.email = "Email không được để trống!";
            isValid = false;
        }
        
        // validate password
        if (!form.password.trim()) {
            newErrors.password = 'Password không được để trống!';
            isValid = false;
        } if (!form.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password không được để trống!";
            isValid = false;

        } else if (form.confirmPassword !== form.password) {
                newErrors.confirmPassword = "Password không khớp!";
                isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setSubmitting(true);

            try {
                const result = await authApi.register(form.username, form.email, form.password);
                console.log("Kết quả trả về từ API:", result);
            } catch (error) {
                console.error("Lỗi khi gọi API register:", error);
            } finally {
                setSubmitting(false);
            }
        }
    }
    return (
        // form register
        <form className={styles.RegisterForm} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className={styles.FormContainer}>
                <div className={styles.FormGroup}>
                    <input
                        type="text"
                        name='username'
                        placeholder=" "
                        value={form.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="username" className={styles.FormLabel}>Username</label>
                    {errors.username && <p className={styles.Error}>{errors.username}</p>}
                </div>
                <div className={styles.FormGroup}>
                    <input
                        type="email"
                        name='email'
                        placeholder=" "
                        value={form.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="email" className={styles.FormLabel}>Email</label>
                    {errors.email && <p className={styles.Error}>{errors.email}</p>}
                </div>
                <div className={styles.FormGroup}>
                    <input
                        type="password"
                        name='password'
                        placeholder=" "
                        value={form.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="password" className={styles.FormLabel}>Password</label>
                    {errors.password && <p className={styles.Error}>{errors.password}</p>}
                </div>
                <div className={styles.FormGroup}>
                    <input
                        type="password"
                        name='confirmPassword'
                        placeholder=" "
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword" className={styles.FormLabel}>Confirm Password</label>
                    {errors.confirmPassword && <p className={styles.Error}>{errors.confirmPassword}</p>}
                </div>
            </div>
            <button type="submit" disabled={submitting}>Register</button>
                <p>You already have an account <Link to="/" className={styles.registerLink}>
                Login
                </Link></p>
        </form>
    );
}
export default RegisterForm;