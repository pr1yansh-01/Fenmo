import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilters from './components/ExpenseFilters';
import ExpenseTable from './components/ExpenseTable';
import { fetchExpenses } from './api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', sort: 'newest' });

  const loadExpenses = async (newFilters) => {
    const filterParams = newFilters || filters;
    setLoading(true);
    setError('');
    try {
      const data = await fetchExpenses({
        category: filterParams.category || undefined,
        sort: filterParams.sort || undefined
      });
      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    loadExpenses(newFilters);
  };

  useEffect(() => {
    fetchExpenses({
        category: filters.category || undefined,
        sort: filters.sort || undefined
      })
      .then(setExpenses)
      .catch((err) => setError(err.response?.data?.error || 'Failed to load expenses'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onSuccess={loadExpenses} />
      <ExpenseFilters onFilterChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <ExpenseTable expenses={expenses} />}
    </div>
  );
}

export default App;