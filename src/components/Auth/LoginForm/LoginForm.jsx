import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import authApi from '../../../api/authApi';
import { Link } from 'react-router-dom';


const LoginForm = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // mỗi khi người dùng nhập thì xóa lỗi đi
        setErrors({ ...errors, [e.target.name]: ''});
        setServerError('');
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setServerError('');
        setErrors({});

        let newErrors = { username: '', password: '' };
        let isValid = true;

        // validate
        if (!form.username.trim()) {
            newErrors.username = "username không được để trống!";
            isValid = false;
        }
        if (!form.password.trim()) {
            newErrors.password = "Password không được để trống!";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;
        setSubmitting(true);
            try {

                const result = await authApi.login(form.username, form.password);
                console.log("login thành công:", result);

                navigate('/home');
            
            } catch (error) {
                const msg = 
                error?.message ||
                setServerError(string(msg));
                console.error('login error:',error);
            } finally{
                setSubmitting(false);
            }  
    };
    return (

        <div className={styles.Wrapper}>
            <form className={styles.LoginForm} onSubmit={handleSubmit}>
                <h1>login</h1>
                
                {serverError && (
                <div className='{style.ServerError}' role="alert">
                    {serverError}
                </div>
                )}

                <div className={styles.FormContainer}>
                    <div className={styles.FormGroup}>
                        <input
                            type="text"
                            name='username'
                            placeholder=" "
                            value={form.username}
                            onChange={handleChange}
                        />
                        <label htmlFor="username" className={styles.FormLabel}>username</label>
                        {errors.username && <p className={styles.Error}>{errors.username}</p>}
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
                <button type="submit" disabled={submitting}>{submitting ? 'Đang đăng ký...' : 'Login'}</button>
                <div className={styles.ForgotPassword}>
                    <a href="#">Forgot Password?</a>
                </div>
                    <p>Don't have an account? <Link to="/Register" className={styles.registerLink}>
                    Register
                    </Link></p>
            </form>
        </div>
    );
}

export default LoginForm;