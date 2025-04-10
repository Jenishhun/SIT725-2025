// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes'); // Import routes
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseSplitter')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB", err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', expenseRoutes); // Use the routes defined in expenseRoutes.js

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
