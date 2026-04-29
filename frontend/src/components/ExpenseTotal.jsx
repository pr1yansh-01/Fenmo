function ExpenseTotal({ expenses = [] }) {
  const totalPaise = expenses.reduce((sum, expense) => {
    const amount = expense.amountPaise ? expense.amountPaise / 100 : expense.amount;
    return sum + (amount || 0);
  }, 0);

  const totalRupees = (totalPaise / 100).toFixed(2);

  return (
    <div className="card total">
      <span>Total:</span>
      <span>₹{totalRupees}</span>
    </div>
  );
}

export default ExpenseTotal;