const { paiseToRupees } = require('./money');

function formatExpense(expense) {
  return {
    id: expense.id,
    amountPaise: expense.amountPaise,
    amount: paiseToRupees(expense.amountPaise),
    category: expense.category,
    description: expense.description || null,
    date: expense.date.toISOString(),
    createdAt: expense.createdAt.toISOString()
  };
}

module.exports = {
  formatExpense
};