import { useState } from 'react';
import styles from './LoginForm.module.css';
import {UserOutlined, LockOutlined} from "@ant-design/icons"

function LoginForm({ onSubmit }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    // hàm xử lý khi người dùng nhập dữ liệu vào input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });  //lấy giá trị người dùng nhập theo thuộc tính name
        // mỗi khi người dùng nhập thì xóa lỗi đi
        setErrors({ ...errors, [e.target.name]: ''});
    };
    // hàm xử lý khi người dùng submit form
    const handleSubmit = (e) => {
        e.preventDefault(); // ngăn chặn reload trang
                let newErrors = { email: '', password: '' };
        let isValid = true;

        // validate email
        if (!form.email.trim()) {
            newErrors.email = "Email không được để trống!";
            isValid = false;
        }
        // validate password
        else if (!form.password.trim()) {
            newErrors.password = "Password không được để trống!";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            onSubmit(form);
        }
    }
    return (
        // form login
        <form className={styles.LoginForm} onSubmit={handleSubmit}>
            <div className={styles.FormContainer}>
                <div className={styles.FormGroup}>
                    <UserOutlined className={styles.InputIcon} />
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
                    <LockOutlined className={styles.InputIcon} />
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
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;