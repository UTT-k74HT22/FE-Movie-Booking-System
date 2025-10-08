import { useState } from 'react';
import styles from './LoginForm.module.css';
import authApi from '../../../api/authApi';


function LoginForm({ onSubmit }) {
    const [form, setForm] = useState({ email: '', password: '' });
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
        
        let newErrors = { email: '', password: '' };
        let isValid = true;

        // validate email
        if (!form.email.trim()) {
            newErrors.email = "Email không được để trống!";
            isValid = false;
        }
        // validate password
        if (!form.password.trim()) {
            newErrors.password = "Password không được để trống!";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            setSubmitting(true);

            try {

                if (typeof onSubmit === 'function') {
                    await onSubmit(form);
                    setSubmitting(false);
                    return;
                }

                const result = await authApi.login(form.email, form.password);
                console.log("Kết quả trả về từ API:", result);
            
            } catch (error) {
                    console.error("Lỗi khi gọi API login:", error);
                    setSubmitting(false);
            }
        }
    }
    return (
        // form login
        <form className={styles.LoginForm} onSubmit={handleSubmit}>
            <div className={styles.FormContainer}>
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
            </div>
            <button type="submit" disabled={submitting}>Login</button>
            <div className={styles.ForgotPassword}>
                <a href="#">Forgot Password?</a>
            </div>
        </form>
    );
}

export default LoginForm;