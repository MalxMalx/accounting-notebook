class BalanceModel {
  constructor() {
    this.balance = 0;
  }

  getBalance() {
    return this.convertFromInt(this.balance);
  }

  increaseBy(amount) {
    const convertedAmount = this.convertToInt(amount);
    this.balance += convertedAmount;
  }

  decreaseBy(amount) {
    const convertedAmount = this.convertToInt(amount);
    const balanceAfterDecrease = this.balance - convertedAmount;

    if (balanceAfterDecrease < 0) {
      return false;
    }

    this.balance = balanceAfterDecrease;
    return true;
  }

  convertToInt(amount) {
    return Math.floor(amount * 100);
  }

  convertFromInt(amount) {
    return amount / 100;
  }
}

module.exports = BalanceModel;
