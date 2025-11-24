/**
 * useRegister Hook
 * Register form logic
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES } from '../../../shared/constants';
import { toast } from 'react-toastify';
import { isValidEmail, isEmpty } from '../../../shared/utils';

export const useRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form
   */
  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (isEmpty(formData.firstName)) {
      newErrors.firstName = 'First name không được để trống!';
    }

    // Last name validation
    if (isEmpty(formData.lastName)) {
      newErrors.lastName = 'Last name không được để trống!';
    }

    // Username validation
    if (isEmpty(formData.username)) {
      newErrors.username = 'Username không được để trống!';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username phải có ít nhất 3 ký tự!';
    }

    // Email validation
    if (isEmpty(formData.email)) {
      newErrors.email = 'Email không được để trống!';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }

    // Phone validation
    if (isEmpty(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number không được để trống!';
    }

    // Password validation
    if (isEmpty(formData.password)) {
      newErrors.password = 'Password không được để trống!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password phải có ít nhất 6 ký tự!';
    }

    // Confirm password validation
    if (isEmpty(formData.confirmPassword)) {
      newErrors.confirmPassword = 'Confirm password không được để trống!';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password không khớp!';
    }

    setErrors(newErrors);
    
    // Show first error as toast
    const firstError = Object.values(newErrors).find(msg => msg);
    if (firstError) {
      toast.error(firstError);
    }
    
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Remove confirmPassword before sending
      const { confirmPassword, ...registerData } = formData;
      
      const result = await register(registerData);

      toast.success(result?.message || 'Đăng ký thành công!');
      
      // Save email for activation
      sessionStorage.setItem('pendingVerificationEmail', formData.email);
      
      // Navigate to activation page with email
      navigate(ROUTES.ACTIVATE_ACCOUNT, {
        state: { email: formData.email },
      });
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      if (status === 409) {
        toast.error('Email đã được sử dụng!');
        setErrors(prev => ({ ...prev, email: 'Email đã được sử dụng!' }));
      } else {
        const msg = data?.message || error.message || 'Đăng ký thất bại!';
        toast.error(msg);
        setErrors(prev => ({ ...prev, submit: msg }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;
