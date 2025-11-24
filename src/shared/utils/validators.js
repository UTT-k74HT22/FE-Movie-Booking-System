/**
 * Validation Utilities
 * Common validation functions
 */

/**
 * Email validation
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Phone number validation (Vietnamese format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  return phoneRegex.test(phone);
};

/**
 * URL validation
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is empty or whitespace
 */
export const isEmpty = (value) => {
  return !value || value.trim().length === 0;
};

/**
 * Check if value is numeric
 */
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Min length validation
 */
export const minLength = (value, min) => {
  return value && value.length >= min;
};

/**
 * Max length validation
 */
export const maxLength = (value, max) => {
  return value && value.length <= max;
};

/**
 * Form field validator
 */
export const validateField = (fieldName, value, rules = {}) => {
  const errors = [];

  if (rules.required && isEmpty(value)) {
    errors.push(`${fieldName} is required`);
  }

  if (rules.email && !isEmpty(value) && !isValidEmail(value)) {
    errors.push(`${fieldName} must be a valid email`);
  }

  if (rules.password && !isEmpty(value) && !isValidPassword(value)) {
    errors.push(
      `${fieldName} must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number`
    );
  }

  if (rules.minLength && !isEmpty(value) && !minLength(value, rules.minLength)) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
  }

  if (rules.maxLength && !isEmpty(value) && !maxLength(value, rules.maxLength)) {
    errors.push(`${fieldName} must be at most ${rules.maxLength} characters`);
  }

  if (rules.pattern && !isEmpty(value) && !rules.pattern.test(value)) {
    errors.push(rules.patternMessage || `${fieldName} format is invalid`);
  }

  return errors;
};

export default {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidUrl,
  isEmpty,
  isNumeric,
  minLength,
  maxLength,
  validateField,
};
