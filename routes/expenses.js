import express from 'express';
import Expense from '../models/Expense.js'; // Adjust model path if needed

const router = express.Router();

// Create a new expense
router.post('/', async (req, res) => {
    const { description, amount, paidBy, splitAmong } = req.body;

    const expense = new Expense({
        description,
        amount,
        paidBy,
        splitAmong,
        date: new Date()
    });

    try {
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: 'Error saving expense', error });
    }
});

// Get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses', error });
    }
});

// Get a single expense by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expense', error });
    }
});

export default router;
