const prisma = require('../lib/prisma');
const { rupeesToPaise } = require('../utils/money');
const { formatExpense } = require('../utils/format');

async function createExpense(data, idempotencyKey) {
  if (idempotencyKey) {
    const existing = await prisma.expense.findUnique({
      where: { idempotencyKey }
    });
    if (existing) {
      return formatExpense(existing);
    }
  }

  const amountPaise = rupeesToPaise(data.amount);

  const expense = await prisma.expense.create({
    data: {
      amountPaise,
      category: data.category,
      description: data.description || null,
      date: new Date(data.date),
      idempotencyKey
    }
  });

  return formatExpense(expense);
}

module.exports = {
  createExpense
};