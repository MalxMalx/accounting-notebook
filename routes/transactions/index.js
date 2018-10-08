const Router = require('koa-router');
const validateUuid = require('uuid-validate');
const { validateTransactionBody } = require('./validation');

class TransactionController {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
    this.router = new Router({ prefix: '/api/transactions' });
    this.router.get('/', ctx => this.getAllTransactions(ctx));
    this.router.post('/', ctx => this.createTransaction(ctx));
    this.router.get('/:id', ctx => this.getTransactionById(ctx));
  }

  getAllTransactions(ctx) {
    ctx.body = this.transactionModel.getAll();
  }

  getTransactionById(ctx) {
    const { id } = ctx.params;
  
    if (!validateUuid(id)) {
      return ctx.throw(400, 'invalid ID supplied')
    }
  
    const transaction = this.transactionModel.findById(id);
  
    if (typeof transaction === 'undefined') {
      return ctx.throw(404, 'transaction not found')
    }
  
    ctx.response.body = transaction;
  }

  createTransaction(ctx) {
    const transactionBody = ctx.request.body;
  
    if (!validateTransactionBody(transactionBody)) {
      return ctx.throw(400, 'invalid input')
    }
  
    const [success, transaction] = this.transactionModel.create(transactionBody);
  
    if (!success) {
      return ctx.throw(422, 'transaction rejected: insufficient funds');
    }
  
    ctx.response.body = transaction;
    ctx.status = 201;
  }

  routes() {
    return this.router.routes();
  }
}

module.exports = TransactionController;
