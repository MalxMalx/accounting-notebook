const uuidv4 = require('uuid/v4');
const { transactionTypes } = require('../constants');

class TransactionModel {
  constructor(balanceModel) {
    this.balance = balanceModel;
    this.history = [];
  }

  getAll() {
    return this.history;
  }

  findById(id) {
    return this.history.find(transaction => transaction.id === id);
  }

  create({ type, amount }) {
    if (type === transactionTypes.DEBIT) {
      const success = this.balance.decreaseBy(amount);

      if (!success) {
        return [false];
      }
    }

    if (type === transactionTypes.CREDIT) {
      this.balance.increaseBy(amount);
    }

    const transaction = {
      id: uuidv4(),
      type,
      amount,
      effectiveDate: new Date().toISOString()
    };

    this.history.push(transaction);
    return [true, transaction];
  }
}

module.exports = TransactionModel;
