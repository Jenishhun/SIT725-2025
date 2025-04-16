import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
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
