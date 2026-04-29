function ExpenseTotal({ expenses = [] }) {
  const totalPaise = expenses.reduce((sum, expense) => {
    const amount = expense.amountPaise ? expense.amountPaise / 100 : expense.amount;
    return sum + (amount || 0);
  }, 0);

  const totalRupees = (totalPaise / 100).toFixed(2);

  return (
    <div style={styles.container}>
      <span style={styles.label}>Total:</span>
      <span style={styles.amount}>₹{totalRupees}</span>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333'
  },
  amount: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333'
  }
};

export default ExpenseTotal;