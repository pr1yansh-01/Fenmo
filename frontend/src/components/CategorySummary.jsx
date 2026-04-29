import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
});

function CategorySummary() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/expenses/summary/categories')
      .then(res => res.data)
      .then(data => {
        setSummary(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatAmount = (paise) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(paise / 100);
  };

  if (loading || summary.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>Category Totals</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {summary.map(item => (
          <div key={item.category} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.category}</span>
            <span style={{ fontWeight: '500' }}>{formatAmount(item.total)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorySummary;