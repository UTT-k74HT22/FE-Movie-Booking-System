import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import authApi from "../../../api/authApi";

export default function ActiveForm() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.active({ email, otp });

      if (response.success) {
        toast.success("Kích hoạt tài khoản thành công!");
        navigate("/login");
      } else {
        toast.error("Mã OTP không hợp lệ hoặc đã hết hạn!");
      }
    } catch (err) {
      console.error("[ACTIVE] Error:", err);
      toast.error("Kích hoạt thất bại, vui lòng thử lại.");
      setError(err?.response?.data?.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minWidth: 340 }}>
        <Typography variant="h5" color="warning.main" mb={2} fontWeight={700} align="center">Kích hoạt tài khoản</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Mã OTP"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            fullWidth
            disabled={loading}
          />
          {error && <Typography color="error" fontSize={14}>{error}</Typography>}
          <Button type="submit" variant="contained" color="warning" disabled={loading} size="large" sx={{ mt: 1, borderRadius: 2 }}>
            {loading ? "Đang kích hoạt..." : "Xác nhận"}
          </Button>
          <Typography align="center" mt={2} fontSize={15}>
            Mã OTP đã được gửi đến email: <strong>{email}</strong>
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/register" style={{ color: '#fbc02d', fontWeight: 600, textDecoration: 'none' }}>← Quay lại đăng ký</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
