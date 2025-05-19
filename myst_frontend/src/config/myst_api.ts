export const MYST_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Specific API endpoints
export const RWS_AUTH_ENDPOINTS = {

    COMMERCE: {
      PRODUCTS: `${MYST_API_BASE_URL}/commerce/products/`,
      PRODUCT: (id: Number) => `${MYST_API_BASE_URL}/commerce/products/${id}/`,
      ORDER: `${MYST_API_BASE_URL}/commerce/orders/`,
      ORDER_BY_ID: (id: Number) => `${MYST_API_BASE_URL}/commerce/orders/${id}/`,
    },
    USERS: {
        GET_CHECK_USER: `${MYST_API_BASE_URL}/auth/user/`,
        GET_BY_ID: (id: Number) => `${MYST_API_BASE_URL}/user/${id}`,
    },
  // Add other endpoints as needed
};