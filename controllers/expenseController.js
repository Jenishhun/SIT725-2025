const Expense = require('../models/expense');

// Create a new expense
exports.createExpense = async (req, res) => {
  const newExpense = new Expense({
    name: req.body.name,
    amount: req.body.amount,
    paidBy: req.body.paidBy,
    participants: req.body.participants.split(','),
  });

  try {
    await newExpense.save();
    res.redirect('/expenses'); // Redirect to the expenses list
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('expenses', { expenses });
  } catch (err) {
    res.status(500).send(err);
  }
};
