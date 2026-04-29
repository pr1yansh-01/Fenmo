import { useState } from 'react';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

function ExpenseFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    sort: 'newest'
  });

  const handleCategoryChange = (e) => {
    const newFilters = { ...filters, category: e.target.value };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    const newFilters = {
      ...filters,
      sort: e.target.checked ? 'newest' : 'oldest'
    };
    setFilters(newFilters);
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <div className="card filters">
      <div className="form-field">
        <label>Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="sort"
            checked={filters.sort === 'newest'}
            onChange={handleSortChange}
          />
          Newest First
        </label>
      </div>
    </div>
  );
}

export default ExpenseFilters;