const express = require('express');
const router = express.Router();
const { createExpenseController, getExpensesController } = require('../controllers/expense.controller');

router.post('/expenses', createExpenseController);
router.get('/expenses', getExpensesController);

module.exports = router;