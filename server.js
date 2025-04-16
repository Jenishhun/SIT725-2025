import express from 'express';
import mongoose from 'mongoose';
import expenseRoutes from './routes/expenses.js';

const app = express();
app.use(express.json());

// Set strictQuery to avoid the deprecation warning
mongoose.set('strictQuery', false);

// Use the routes
app.use('/expenses', expenseRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/expenses', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Start the server
const server = app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

export default server;  // Export the server as default
