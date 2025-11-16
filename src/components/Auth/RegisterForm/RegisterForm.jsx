import React, { useState } from 'react';
import styles from './RegisterForm.module.css';
import authApi from '../../../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
  const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors(prev => ({ ...prev, [name]: '' }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!form.firstName) { newErrors.firstName = "First name không được để trống!"; isValid = false; }
    if (!form.lastName) { newErrors.lastName = "Last name không được để trống!"; isValid = false; }
    if (!form.username) { newErrors.username = "Username không được để trống!"; isValid = false; }
    if (!form.email) { newErrors.email = "Email không được để trống!"; isValid = false; }
    else if (!form.email) { newErrors.email = "Email không hợp lệ!"; isValid = false; }
    if (!form.phoneNumber) { newErrors.phoneNumber = "Phone number không được để trống!"; isValid = false; }
    else if (!form.phoneNumber) { newErrors.phoneNumber = "Phone number không hợp lệ!"; isValid = false; }
    if (!form.password) { newErrors.password = "Password không được để trống!"; isValid = false; }
    else if (form.password.length < 6) { newErrors.password = "Password phải có ít nhất 6 ký tự!"; isValid = false; }
    if (!form.confirmPassword) { newErrors.confirmPassword = "Confirm password không được để trống!"; isValid = false; }
    else if (form.confirmPassword !== form.password) { newErrors.confirmPassword = "Password không khớp!"; isValid = false; }

    setErrors(newErrors);

    if (!isValid) {
      const firstError = Object.values(newErrors).find(msg => msg);
      if (firstError) toast.error(firstError);
      return;
    }

    setSubmitting(true);

    try {
      // Gửi lên API
      const result = await authApi.register(
        form.username,
        form.email,
        form.password,
        form.firstName,
        form.lastName,
        form.phoneNumber
      );
      toast.success(result?.message || "Đăng ký thành công!");
      sessionStorage.setItem('pendingVerificationEmail', form.email);
      navigate('/active', { state: { email: form.email } });
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 409) {
        toast.error("Email đã được sử dụng!");
        setErrors(prev => ({ ...prev, email: "Email đã được sử dụng!" }));
      } else {
        const msg = data?.message || "Đăng ký thất bại!";
        toast.error(msg);
        setErrors(prev => ({ ...prev, submit: msg }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.Wrapper}>
      <form className={styles.RegisterForm} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.h2}>Register</h2>
        <div className={styles.FormContainer}>
          <div className={styles.FormGroup}>
            <input id="firstName" className={styles.Input} type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="lastName" className={styles.Input} type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="username" className={styles.Input} type="text" name="username" placeholder="User Name" value={form.username} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="email" className={styles.Input} type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="phoneNumber" className={styles.Input} type="text" name="phoneNumber" placeholder="Phone" value={form.phoneNumber} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="password" className={styles.Input} type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          </div>
          <div className={styles.FormGroup}>
            <input id="confirmPassword" className={styles.Input} type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />   
          </div>
        </div>
        <button className={styles.Button} type="submit" disabled={submitting}>
          {submitting ? 'Đang đăng ký...' : 'Register'}
        </button>

        <p>
          You already have an account?{' '}
          <Link to="/login" className={styles.registerLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
