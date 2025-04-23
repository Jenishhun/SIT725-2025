<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/add-expense', expenseController.addExpense);
=======
// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Import Expense model

// Render the index page
router.get('/', (req, res) => {
  res.render('index');
});

// Show all expenses
router.get('/expenses', (req, res) => {
  Expense.find()
    .then(expenses => {
      res.render('expenses', { expenses });
    })
    .catch(err => console.log('Error fetching expenses:', err));
});

// Add a new expense (this will be expanded for POST requests)
router.post('/add-expense', (req, res) => {
  const { description, amount } = req.body;

  const newExpense = new Expense({
    description,
    amount,
  });

  newExpense.save()
    .then(() => res.redirect('/expenses'))
    .catch(err => console.log('Error saving expense:', err));
});
>>>>>>> 6644656ce6896855e6e3e726b2b9dd548f730961

module.exports = router;
