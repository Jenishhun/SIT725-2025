const mongoose = require('mongoose');

// Define the Expense schema
const expenseSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  paidBy: String,
  splitBetween: [String], // Array of people involved in the expense
});

// Create the Expense model
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
