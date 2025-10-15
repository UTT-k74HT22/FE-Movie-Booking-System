import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import authApi from '../../../api/authApi';


// ...existing code...

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
      navigate('/admin/dashboard');
    } catch (error) {
      setApiError(error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minWidth: 340 }}>
        <Typography variant="h5" color="primary" mb={2} fontWeight={700} align="center">Đăng nhập</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Tên đăng nhập"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            fullWidth
            autoFocus
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
          />
          {apiError && <Typography color="error" fontSize={14}>{apiError}</Typography>}
          <Button type="submit" variant="contained" color="primary" disabled={submitting} size="large" sx={{ mt: 1, borderRadius: 2 }}>
            {submitting ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <Link to="#" style={{ color: '#1976d2', textDecoration: 'none', fontSize: 14 }}>Quên mật khẩu?</Link>
          </Box>
          <Typography align="center" mt={2} fontSize={15}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: '#1976d2', fontWeight: 600, textDecoration: 'none' }}>Đăng ký</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;