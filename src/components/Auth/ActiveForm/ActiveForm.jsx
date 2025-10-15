import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../../../api/authApi";
import styles from "./ActiveForm.module.css";

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
    <div className={styles.Wrapper}>
      <form className={styles.ActiveForm} onSubmit={handleSubmit}>
        <h2>Kích hoạt tài khoản</h2>

        <div className={styles.FormContainer}>
          <div className={styles.FormGroup}>
            <input
              type="text"
              name="otp"
              placeholder=" "
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="otp" className={styles.FormLabel}>
              Mã OTP
            </label>
            {error && <p className={styles.Error}>{error}</p>}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang kích hoạt..." : "Xác nhận"}
        </button>

        <p className={styles.SubText}>
          Mã OTP đã được gửi đến email: <br />
          <strong>{email}</strong>
        </p>

        <Link to="/register" className={styles.BackLink}>
          ← Quay lại đăng ký
        </Link>
      </form>
    </div>
  );
}
