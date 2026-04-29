import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
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