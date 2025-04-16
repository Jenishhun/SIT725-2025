import request from 'supertest';
import app from '../index.js';
import { expect } from 'chai';

describe('Expense API', () => {
  it('should add an expense', async () => {
    const res = await request(app)
      .post('/add-expense')
      .send({
        amount: 100,
        description: 'Lunch',
      });

    expect(res.status).to.equal(201);
    expect(res.text).to.equal('Expense added!');
  });

  it('should get all expenses', async () => {
    const res = await request(app).get('/expenses');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
