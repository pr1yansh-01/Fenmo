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

async function getExpenses(query) {
  const { category, sort } = query;

  const where = {};
  if (category) {
    where.category = category;
  }

  const orderBy = sort === 'oldest' || sort === 'date_asc'
    ? { date: 'asc' }
    : { date: 'desc' };

  const expenses = await prisma.expense.findMany({
    where,
    orderBy
  });

return expenses.map(formatExpense);
}

async function getCategorySummary() {
  const summary = await prisma.expense.groupBy({
    by: ['category'],
    _sum: {
      amountPaise: true
    }
  });

  return summary.map(item => ({
    category: item.category,
    total: item._sum.amountPaise || 0
  }));
}

module.exports = {
  createExpense,
  getExpenses,
  getCategorySummary
};
