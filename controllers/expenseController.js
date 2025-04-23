<<<<<<< HEAD
const Expense = require('../models/expenseModel');

exports.addExpense = async (req, res) => {
  const { description, amount, paidBy, splitBetween } = req.body;
  try {
    const newExpense = new Expense({ description, amount, paidBy, splitBetween });
    await newExpense.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding expense: ' + error.message);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('index', { expenses });
  } catch (error) {
    res.status(500).send('Error loading expenses: ' + error.message);
  }
};
=======
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
>>>>>>> 6644656ce6896855e6e3e726b2b9dd548f730961
