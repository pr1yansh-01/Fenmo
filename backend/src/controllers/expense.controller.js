const { validateCreateExpense } = require('../validators/expense.validator');
const { createExpense, getExpenses } = require('../services/expense.service');

async function createExpenseController(req, res) {
  try {
    const data = validateCreateExpense(req.body);
    const idempotencyKey = req.headers['idempotency-key'] || null;

    const expense = await createExpense(data, idempotencyKey);

    return res.status(201).json(expense);
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }

    console.error('Create expense error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getExpensesController(req, res) {
  try {
    const { category, sort } = req.query;

    const expenses = await getExpenses({ category, sort });

    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createExpenseController,
  getExpensesController
};