import express from 'express';
import mongoose from 'mongoose';
import { Expense } from './models/expense.js'; // Correct import
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory path in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Updated to work with ES modules

// Connect to MongoDB
mongoose.connect('mongodb://localhost/expenseSplitter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// GET route to render the index.ejs page
app.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.render('index', { expenses });
  } catch (err) {
    res.status(500).send('Error retrieving expenses');
  }
});

// POST route to add an expense
app.post('/expenses', async (req, res) => {
  try {
    const { description, amount, participants, date } = req.body;

    // Split participants by comma
    const participantsArray = participants.split(',').map(participant => participant.trim());

    const expense = new Expense({
      description,
      amount,
      participants: participantsArray,
      date,
    });

    await expense.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send('Error adding expense');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
