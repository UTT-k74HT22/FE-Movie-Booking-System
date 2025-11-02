import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../../api/authApi';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './ActiveForm.module.css';
import { use } from 'react';

const ActiveForm = () => {
  const [otp, setOtp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('pendingActivationEmail');

  // useEffect(() => {
  //   if (!email) {
  //     toast.error('Không tìm thấy email để kích hoạt. Vui lòng đăng ký lại.');
  //     navigate('/register');
  //   }
  // }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Vui lòng nhập mã OTP!');
      return;
    }

    setSubmitting(true);
    try {
      await authApi.active(email, otp);
      toast.success('Kích hoạt tài khoản thành công! Vui lòng đăng nhập.');
      localStorage.removeItem('pendingActivationEmail');
      navigate('/login');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'OTP không hợp lệ!';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      await authApi.resend(email);
      toast.success('Mã OTP đã được gửi lại đến email của bạn.');
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Gửi OTP thất bại. Vui lòng thử lại!';
      toast.error(msg);
    }
  };
    return (
   <Box className={styles.activeFormContainer}>
      <Paper elevation={4} className={styles.formPaper}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <Typography variant="h5" component="h2" className={styles.title}>
            Kích Hoạt Tài Khoản
          </Typography>

          <Typography variant="body2" className={styles.emailText}>
            Email xác thực <strong>{email || '---'}</strong>
          </Typography>

          <TextField
            label="Nhập mã OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            className={styles.input}
            inputProps={{ maxLength: 10 }}
            disabled={submitting}
          />

          <Stack direction="row" spacing={2} className={styles.actions}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              className={styles.submitButton}
              fullWidth
            >
              {submitting ? (
                <>
                  <CircularProgress size={18} thickness={5} className={styles.progress} />
                  <span className={styles.btnText}>Đang xác thực...</span>
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
              className={styles.resendButton}
            >
              Gửi lại OTP
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default ActiveForm;