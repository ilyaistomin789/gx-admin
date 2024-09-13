export const AUTH_SERVICE_URL =
  process.env.NODE_ENV !== 'development'
    ? `${import.meta.env.AUTH_SERVICE_URL}`
    : 'http://localhost:3001/api';

export const STORE_SERVICE_URL =
  process.env.NODE_ENV !== 'development'
    ? `${import.meta.env.AUTH_SERVICE_URL}`
    : 'http://localhost:3000/api';

export const MEDIA_SERVICE_URL =
  process.env.NODE_ENV !== 'development'
    ? `${import.meta.env.AUTH_SERVICE_URL}`
    : 'http://localhost:3002/api';
