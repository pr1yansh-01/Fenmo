const { z } = require('zod');

const createExpenseSchema = z.object({
  amount: z.string()
    .min(1, 'Amount is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Amount must be a positive number with up to 2 decimal places'),
  category: z.string()
    .min(1, 'Category is required')
    .max(100, 'Category must be less than 100 characters'),
  description: z.string().optional(),
  date: z.string()
    .min(1, 'Date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
});

function validateCreateExpense(data) {
  return createExpenseSchema.parse(data);
}

module.exports = {
  validateCreateExpense
};