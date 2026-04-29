import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import { fetchExpenses } from './api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadExpenses = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses()
      .then(setExpenses)
      .catch((err) => setError(err.response?.data?.error || 'Failed to load expenses'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onSuccess={loadExpenses} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <ExpenseTable expenses={expenses} />}
    </div>
  );
}

export default App;