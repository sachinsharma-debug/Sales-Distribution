
const BASE_URL = 'https://api-sales-distribution.prudent360.in/api/v1/';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  USERS: '/users',
  USER_DETAIL: (id) => `/users/${id}`
};

module.exports = {
  BASE_URL,
  ENDPOINTS
};
