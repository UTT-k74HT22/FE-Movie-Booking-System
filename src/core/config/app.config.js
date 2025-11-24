/**
 * Application Configuration
 * App-wide settings and constants
 */

export const appConfig = {
  // Toast notifications
  toast: {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },

  // Pagination
  pagination: {
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  },

  // Date formats
  dateFormats: {
    display: 'DD/MM/YYYY',
    displayWithTime: 'DD/MM/YYYY HH:mm',
    api: 'YYYY-MM-DD',
    apiWithTime: 'YYYY-MM-DDTHH:mm:ss',
  },

  // File upload
  upload: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
};

export default appConfig;
