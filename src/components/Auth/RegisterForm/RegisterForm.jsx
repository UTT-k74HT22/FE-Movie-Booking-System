import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import authApi from "../../../api/authApi";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = (values) => {
    if (!values.username.trim()) return "Username không được để trống!";
    if (!values.email.trim()) return "Email không được để trống!";
    if (!values.password.trim()) return "Password không được để trống!";
    if (!values.confirmPassword.trim())
      return "Confirm Password không được để trống!";
    if (values.confirmPassword !== values.password)
      return "Password không khớp!";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate(form);
    if (errorMsg) {
      toast.warning(errorMsg); 
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để kích hoạt tài khoản.");
      navigate("/active", { state: { email: form.email } });
    } catch (error) {
      console.error("[REGISTER] error:", error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minWidth: 340 }}>
        <Typography variant="h5" color="success.main" mb={2} fontWeight={700} align="center">Đăng ký</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Tên đăng nhập"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            fullWidth
            autoFocus
            disabled={loading}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Mật khẩu"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
          />
          <TextField
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            disabled={loading}
          />
          <Button type="submit" variant="contained" color="success" disabled={loading} size="large" sx={{ mt: 1, borderRadius: 2 }}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
          <Typography align="center" mt={2} fontSize={15}>
            Đã có tài khoản?{' '}
            <Link to="/login" style={{ color: '#388e3c', fontWeight: 600, textDecoration: 'none' }}>Đăng nhập</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
