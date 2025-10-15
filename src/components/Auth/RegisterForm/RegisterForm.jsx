import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import authApi from "../../../api/authApi";
import styles from "./RegisterForm.module.css";

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
    <div className={styles.Wrapper}>
      <form className={styles.RegisterForm} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className={styles.FormContainer}>
          {["username", "email", "password", "confirmPassword"].map((field) => (
            <div key={field} className={styles.FormGroup}>
              <input
                type={
                  field.includes("password")
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                placeholder=" "
                value={form[field]}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor={field} className={styles.FormLabel}>
                {field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login" className={styles.registerLink}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
