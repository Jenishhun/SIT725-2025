const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Expense = require('./models/expenseModel');
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseSplitter', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));

// Serve the index page and retrieve expenses
app.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    console.log(expenses);  // Log expenses to the console
    res.render('index', { expenses });
  } catch (err) {
    console.error('Error retrieving expenses:', err);  // Log the error
    res.send('Error retrieving expenses');
  }
});

// Add a new expense
app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, paidBy, splitBetween } = req.body;
    const newExpense = new Expense({
      description,
      amount,
      paidBy,
      splitBetween: splitBetween.split(','),
    });
    
    await newExpense.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error adding expense:', err);
    res.send('Error adding expense');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
