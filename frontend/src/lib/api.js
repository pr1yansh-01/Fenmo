import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function createExpense(data) {
  const idempotencyKey = crypto.randomUUID();
  const response = await api.post('/expenses', data, {
    headers: { 'Idempotency-Key': idempotencyKey }
  });
  return response.data;
}

export async function getExpenses(params = {}) {
  const response = await api.get('/expenses', { params });
  return response.data;
}

export default api;