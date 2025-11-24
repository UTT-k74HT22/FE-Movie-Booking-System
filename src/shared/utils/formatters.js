/**
 * Formatting Utilities
 * Common formatting functions for dates, numbers, currency, etc.
 */

import dayjs from 'dayjs';
import { appConfig } from '../../core/config/app.config';

/**
 * Format date
 */
export const formatDate = (date, format = appConfig.dateFormats.display) => {
  if (!date) return '';
  return dayjs(date).format(format);
};

/**
 * Format date with time
 */
export const formatDateTime = (date) => {
  return formatDate(date, appConfig.dateFormats.displayWithTime);
};

/**
 * Format currency (VND)
 */
export const formatCurrency = (amount, currency = 'VND') => {
  if (!amount && amount !== 0) return '';
  
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

/**
 * Format number with thousand separator
 */
export const formatNumber = (number, decimals = 0) => {
  if (!number && number !== 0) return '';
  
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Convert to title case
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ');
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format duration (in minutes)
 */
export const formatDuration = (minutes) => {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

/**
 * Format phone number (Vietnamese)
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as: 0xxx xxx xxx
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  
  return phone;
};

export default {
  formatDate,
  formatDateTime,
  formatCurrency,
  formatNumber,
  truncateText,
  capitalize,
  toTitleCase,
  formatFileSize,
  formatDuration,
  formatPhoneNumber,
};
