<<<<<<< HEAD
import mongoose from 'mongoose';
=======
// models/Expense.js
const mongoose = require('mongoose');
>>>>>>> 14215a1931df15106c4f78764ec98b5fa8960ef2

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
<<<<<<< HEAD
  participants: {
    type: [String],  // Array of participants' names
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Expense = mongoose.model('Expense', expenseSchema);
=======
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
>>>>>>> 14215a1931df15106c4f78764ec98b5fa8960ef2
