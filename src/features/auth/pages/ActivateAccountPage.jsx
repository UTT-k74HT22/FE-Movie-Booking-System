/**
 * Activate Account Page
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../services/auth.service';
import { ROUTES } from '../../../shared/constants';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const ActivateAccountPage = () => {
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || sessionStorage.getItem('pendingVerificationEmail') || localStorage.getItem('pendingActivationEmail');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Vui lòng nhập mã OTP!');
      return;
    }

    setSubmitting(true);
    try {
      await authService.activateAccount(email, otp);
      toast.success('Kích hoạt tài khoản thành công! Vui lòng đăng nhập.');
      localStorage.removeItem('pendingActivationEmail');
      sessionStorage.removeItem('pendingVerificationEmail');
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const msg = err?.message || 'OTP không hợp lệ!';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      // TODO: Implement resend OTP in auth service
      toast.success('Mã OTP đã được gửi lại đến email của bạn.');
    } catch (err) {
      const msg = err?.message || 'Gửi OTP thất bại. Vui lòng thử lại!';
      toast.error(msg);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Paper elevation={4} className="p-8 w-full max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h5" component="h2" className="text-center mb-6 font-bold">
            Kích Hoạt Tài Khoản
          </Typography>

          <Typography variant="body2" className="text-center mb-4 text-gray-600">
            Email xác thực: <strong>{email || '---'}</strong>
          </Typography>

          <TextField
            label="Nhập mã OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            className="mb-4"
            inputProps={{ maxLength: 10 }}
            disabled={submitting}
          />

          <Stack direction="row" spacing={2} className="mt-6">
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              fullWidth
            >
              {submitting ? (
                <>
                  <CircularProgress size={18} thickness={5} className="mr-2" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                'Xác thực'
              )}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={handleResend}
              disabled={submitting}
            >
              Gửi lại OTP
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ActivateAccountPage;
