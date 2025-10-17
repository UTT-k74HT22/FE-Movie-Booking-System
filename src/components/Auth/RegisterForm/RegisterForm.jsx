import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import authApi from '../../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {

    const [form, setForm] = useState({ 
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
});
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: ''});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        } else if (form.confirmPassword !== form.password) {
                newErrors.confirmPassword = "Password không khớp!";
                isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;
            setSubmitting(true);
            setErrors({});
            setSuccess('');

            try {
                const result = await authApi.register(form.username, form.email, form.password);
                setSuccess(result.message);
                sessionStorage.setItem('pendingVerificationEmail', form.email);

                setTimeout(() => {
                  navigate('/active', { state: { email: form.email }});
                }, 1200);
            } catch (error) {

                if (error.response?.status === 409) {
                  setErrors("Email đã được sử dụng!");
                } else {
                  setErrors(error.reponse?.data?.message || "Đăng ký thất bại!");
                }
            } finally {
                setSubmitting(false);
            }
        
    };
    return (
        // form register
        <div className={styles.Wrapper}>
            <form className={styles.RegisterForm} onSubmit={handleSubmit}>
                <h2>Register</h2>

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
                <button type="submit" disabled={submitting}>{submitting ? 'Đang đăng ký...' : 'Register'}</button>
                    <p>You already have an account <Link to="/login" className={styles.registerLink}>
                    Login
                    </Link></p>
            </form>
        </div>
    );
}
export default RegisterForm;