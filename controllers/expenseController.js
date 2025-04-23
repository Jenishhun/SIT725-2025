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