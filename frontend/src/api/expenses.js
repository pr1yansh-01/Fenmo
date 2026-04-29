import axios from 'axios';

function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return '/api';
  }

  return 'http://localhost:5000/api';
}

export const api = axios.create({
  baseURL: getApiBaseUrl()
});

export async function fetchExpenses({ category, sort } = {}) {
  const params = {};
  if (category) params.category = category;
  if (sort) params.sort = sort;

  const response = await api.get('/expenses', { params });
  return response.data;
}

export async function createExpense(expenseData) {
  const idempotencyKey = crypto.randomUUID();
  const response = await api.post('/expenses', expenseData, {
    headers: { 'Idempotency-Key': idempotencyKey }
  });
  return response.data;
}
