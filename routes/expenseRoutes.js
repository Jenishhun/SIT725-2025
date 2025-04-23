const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/add-expense', expenseController.addExpense);

module.exports = router;
