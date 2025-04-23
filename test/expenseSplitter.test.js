const mongoose = require('mongoose');
const expect = require('chai').expect;
const Expense = require('../models/expenseModel');  // Import the Expense model

describe('ExpenseSplitter Tests', function() {
  this.timeout(5000);

  // Connect to the MongoDB test database before running tests
  before(async function() {
    await mongoose.connect('mongodb://localhost:27017/ExpenseSplitterTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Close the MongoDB connection after tests are complete
  after(async function() {
    await mongoose.connection.close();
  });

  it('should add a user', async function() {
    const user = {
      name: 'John Doe',
      email: 'john@example.com',
      total: 100,
      contributions: [
        { name: 'John Doe', amount: 50 },
        { name: 'Jane Doe', amount: 50 },
      ],
    };

    // Create a new expense record
    const expense = await Expense.create(user);

    // Check that the user was added correctly
    expect(expense).to.have.property('name').equal('John Doe');
    expect(expense).to.have.property('email').equal('john@example.com');
    expect(expense).to.have.property('total').equal(100);
    expect(expense.contributions).to.have.lengthOf(2);
  });

  it('should split expense correctly', async function() {
    // Create a test expense
    const expense = await Expense.create({
      name: 'Test Expense',
      email: 'test@example.com',
      total: 100,
      contributions: [
        { name: 'John Doe', amount: 50 },
        { name: 'Jane Doe', amount: 50 },
      ],
    });

    // Check if the expense is correctly split
    const totalContributed = expense.contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
    expect(totalContributed).to.equal(expense.total);
  });

  it('should calculate total correctly', async function() {
    // Create a test expense
    const expense = await Expense.create({
      name: 'Test Expense',
      email: 'test@example.com',
      total: 200,
      contributions: [
        { name: 'John Doe', amount: 100 },
        { name: 'Jane Doe', amount: 100 },
      ],
    });

    // Check if the total is correct
    expect(expense.total).to.equal(200);
  });

  it('should track contributions correctly', async function() {
    // Create a test expense
    const expense = await Expense.create({
      name: 'Test Expense',
      email: 'test@example.com',
      total: 200,
      contributions: [
        { name: 'John Doe', amount: 100 },
        { name: 'Jane Doe', amount: 100 },
      ],
    });

    const contributions = expense.contributions;
    expect(contributions).to.have.lengthOf(2);
    expect(contributions[0]).to.have.property('name').equal('John Doe');
    expect(contributions[0]).to.have.property('amount').equal(100);
    expect(contributions[1]).to.have.property('name').equal('Jane Doe');
    expect(contributions[1]).to.have.property('amount').equal(100);
  });
});
