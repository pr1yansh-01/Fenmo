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
    const numericAmount = typeof amount === 'string'
      ? Number.parseFloat(amount)
      : amount;

    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(Number.isFinite(numericAmount) ? numericAmount : 0);
  };

  if (!expenses || expenses.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <p>No expenses yet</p>
          <p>Add your first expense to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id || expense.id}>
              <td data-label="Date">{formatDate(expense.date)}</td>
              <td data-label="Category">
                <span className="category-badge">{expense.category}</span>
              </td>
              <td data-label="Description">{expense.description || '-'}</td>
              <td data-label="Amount">{formatAmount(expense.amount)}</td>
              <td data-label="Created">{formatDate(expense.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
