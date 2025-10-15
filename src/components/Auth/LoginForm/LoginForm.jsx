import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import authApi from '../../../api/authApi';

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = 'Username không được để trống!';
      isValid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password không được để trống!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await authApi.login({
        username: form.username,
        password: form.password,
      });
      localStorage.setItem('accessToken', result.accessToken);
      navigate('/dashboard');
    } catch (error) {
      setApiError(error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <form className={styles.LoginForm} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.FormContainer}>
          <div className={styles.FormGroup}>
            <input
              type="text"
              name="username"
              placeholder=" "
              value={form.username}
              onChange={handleChange}
            />
            <label className={styles.FormLabel}>Username</label>
            {errors.username && <p className={styles.Error}>{errors.username}</p>}
          </div>

          <div className={styles.FormGroup}>
            <input
              type="password"
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
            />
            <label className={styles.FormLabel}>Password</label>
            {errors.password && <p className={styles.Error}>{errors.password}</p>}
          </div>
        </div>

        {apiError && <p className={styles.Error}>{apiError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <div className={styles.ForgotPassword}>
          <a href="#">Forgot Password?</a>
        </div>

        <p>
          Don't have an account?{' '}
          <Link to="/register" className={styles.registerLink}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;