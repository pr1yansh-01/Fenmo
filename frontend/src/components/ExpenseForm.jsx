import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

function ExpenseForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { createExpense } = await import('../api/expenses');
      await createExpense(formData);
      setFormData({ amount: '', category: '', description: '', date: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
            style={styles.input}
            placeholder="0.00"
            disabled={isSubmitting}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.select}
            disabled={isSubmitting}
          >
            <option value="">Select category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.input}
          placeholder="Optional description"
          disabled={isSubmitting}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={styles.input}
          disabled={isSubmitting}
        />
      </div>

      <button type="submit" disabled={isSubmitting} style={styles.button}>
        {isSubmitting ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  row: {
    display: 'flex',
    gap: '16px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  label: {
    fontWeight: '500',
    fontSize: '14px',
    color: '#333'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px'
  },
  select: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  button: {
    padding: '12px',
    backgroundColor: '#4a90d9',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '500',
    opacity: 1
  },
  error: {
    padding: '10px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '6px',
    fontSize: '14px'
  }
};

export default ExpenseForm;