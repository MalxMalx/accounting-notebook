const { transactionTypes } = require('./../../constants');

function isTypeValid(type) {
  return type === transactionTypes.DEBIT || type === transactionTypes.CREDIT;
}

function isAmountValid(amount) {
  return isNumber(amount) && isValidMoneyFormat(amount);
}

function isNumber(amount) {
  return typeof amount === "number" && !Number.isNaN(amount);
}

function isValidMoneyFormat(amount) {
  // valid amount must have no decimal part or a scale of 1 or 2
  const numberParts = amount.toString().split('.');

  return numberParts.length === 1 || numberParts[1].length <= 2;
}

function validateTransactionBody({ type, amount }) {
  if (isTypeValid(type) && isAmountValid(amount)) {
    return true;
  }
  return false;
}

module.exports = { validateTransactionBody };
