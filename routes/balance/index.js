const Router = require('koa-router');

class BalanceController {
  constructor(balanceModel) {
    this.balanceModel = balanceModel;
    this.router = new Router({ prefix: '/api/balance' });
    this.router.get('/', ctx => this.getBalance(ctx));
  }

  getBalance(ctx) {
    ctx.body = this.balanceModel.getBalance();
  }

  routes() {
    return this.router.routes();
  }
}

module.exports = BalanceController;
