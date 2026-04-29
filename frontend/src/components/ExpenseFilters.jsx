import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

function ExpenseFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    };
    if (name === 'sort') {
      newFilters.sort = checked ? 'newest' : 'oldest';
    }
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <div style={styles.container}>
      <div style={styles.field}>
        <label style={styles.label}>Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="sort"
            checked={filters.sort}
            onChange={handleChange}
            style={styles.checkbox}
          />
          Newest First
        </label>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '16px',
    alignItems: 'flex-end'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontWeight: '500',
    fontSize: '14px',
    color: '#333'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    backgroundColor: 'white',
    minWidth: '150px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
    padding: '8px 0'
  },
  checkbox: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
};

export default ExpenseFilters;