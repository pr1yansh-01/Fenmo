function ExpenseTable({ expenses = [] }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>No expenses yet</p>
        <p style={styles.emptySubtext}>Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Created</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id || expense.id} style={styles.tr}>
              <td style={styles.td}>{formatDate(expense.date)}</td>
              <td style={styles.td}>
                <span style={styles.category}>{expense.category}</span>
              </td>
              <td style={styles.td}>{expense.description || '-'}</td>
              <td style={styles.td}>{formatAmount(expense.amount)}</td>
              <td style={styles.td}>{formatDate(expense.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: '1px solid #e5e5e5'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
    fontWeight: '600',
    color: '#333',
    borderBottom: '1px solid #e5e5e5'
  },
  td: {
    padding: '12px 16px',
    color: '#333',
    borderBottom: '1px solid #e5e5e5'
  },
  tr: {
    backgroundColor: 'white'
  },
  category: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#e8f4fd',
    color: '#4a90d9',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  emptyContainer: {
    padding: '40px 20px',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #e5e5e5'
  },
  emptyText: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '8px'
  },
  emptySubtext: {
    fontSize: '14px',
    color: '#666'
  }
};

export default ExpenseTable;