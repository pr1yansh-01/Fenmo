function ExpenseTotal({ expenses = [] }) {
  const totalRupees = expenses.reduce((sum, expense) => {
    const amount = typeof expense.amount === 'string'
      ? Number.parseFloat(expense.amount)
      : expense.amount;

    return sum + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  return (
    <div className="card total">
      <span>Total:</span>
      <span>{`Rs. ${totalRupees.toFixed(2)}`}</span>
    </div>
  );
}

export default ExpenseTotal;
