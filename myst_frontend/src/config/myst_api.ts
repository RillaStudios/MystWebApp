export const MYST_API_BASE_URL = import.meta.env.VITE_API_URL;

/* 
A configuration file for the Myst API endpoints.
This file contains the base URL for the API and various endpoints for different functionalities such 
as contact submission, product retrieval, checkout session management, currency exchange rates, order retrieval, and review submission.

@author IFD
*/
export const MYST_AUTH_ENDPOINTS = {
    CONTACT: {
        SUBMIT: `${MYST_API_BASE_URL}/contact/`,
    },
    PRODUCT: {
        GET_BY_ID: (id: Number) => `${MYST_API_BASE_URL}/product/${id}/`,
    },
    CHECKOUT: {
        CREATE_SESSION: `${MYST_API_BASE_URL}/checkout-session/`,
        GET_SESSION: (sessionId: string) => `${MYST_API_BASE_URL}/checkout-session?session_id=${sessionId}`,
    },
    CURERENCY: {
        GET_EXCHANGE_RATE: (currency: string) => `${MYST_API_BASE_URL}/exchange?currency_code=${currency}`,
    },
    ORDER: {
        GET_ORDER_BY_ID: (id: Number) => `${MYST_API_BASE_URL}/order?order_id=${id}`,
    },
    REVIEW: {
        SUBMIT: `${MYST_API_BASE_URL}/review/`,
        GET: `${MYST_API_BASE_URL}/review/`,
    }
};