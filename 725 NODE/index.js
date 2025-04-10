const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to the Simple Calculator API!');
});

const calculate = (operation, num1, num2) => {
    switch (operation) {
        case 'add': return num1 + num2;
        case 'subtract': return num1 - num2;
        case 'multiply': return num1 * num2;
        case 'divide': return num2 !== 0 ? num1 / num2 : 'Error: Cannot divide by zero';
        default: return 'Error: Invalid operation';
    }
};

app.get('/calculate', (req, res) => {
    const { num1, num2, operation } = req.query;

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: 'Invalid input. Please provide two numbers.' });
    }

    const result = calculate(operation, number1, number2);

    res.json({
        num1: number1,
        num2: number2,
        operation,
        result
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
