/**
 * Activate Account Page
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { authService } from "../services/auth.service";
import { ROUTES } from "../../../shared/constants";

const ActivateAccountPage = () => {
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    location.state?.email ||
    sessionStorage.getItem("pendingVerificationEmail") ||
    localStorage.getItem("pendingActivationEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Vui lòng nhập mã OTP!");
      return;
    }

    setSubmitting(true);
    try {
      await authService.activateAccount(email, otp);
      toast.success("Kích hoạt tài khoản thành công! Vui lòng đăng nhập.");
      localStorage.removeItem("pendingActivationEmail");
      sessionStorage.removeItem("pendingVerificationEmail");
      navigate(ROUTES.LOGIN);
    } catch (err) {
      const msg = err?.message || "OTP không hợp lệ!";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    try {
      // TODO: Implement resend OTP in auth service
      toast.success("Mã OTP đã được gửi lại đến email của bạn.");
    } catch (err) {
      const msg = err?.message || "Gửi OTP thất bại. Vui lòng thử lại!";
      toast.error(msg);
    }
  };

  return (
    <div className="relative overflow-hidden h-screen bg-purple-animated">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-md bg-white p-6 w-full md:w-96 border-none">
          <div className="flex flex-col gap-2 p-0 w-full">
            <div className="text-center mb-6 font-bold text-xl">Activate Account</div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="text-center mb-6 text-gray-600">
                Email xác thực: <strong>{email}</strong>
              </div>
              <div className="relative w-full">
                <input
                  label="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="block w-full p-4 text-sm rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed"
                  disabled={submitting}
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span>Đang xác thực...</span>
                    </>
                  ) : (
                    "Xác thực"
                  )}
                </button>
              </div>
              <div className="mt-6 flex justify-between text-base">
                <div>
                  <Link to={ROUTES.HOME} className="text-blue-500 hover:underline">
                    Quay về trang chủ
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={submitting}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    Gửi lại OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccountPage;
