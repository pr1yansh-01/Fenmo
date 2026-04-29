const express = require('express');
const router = express.Router();
const { createExpenseController, getExpensesController, getCategorySummaryController } = require('../controllers/expense.controller');

router.post('/expenses', createExpenseController);
router.get('/expenses', getExpensesController);
router.get('/expenses/summary/categories', getCategorySummaryController);

module.exports = router;