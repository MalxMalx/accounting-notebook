const Koa = require('koa');
const bodyParser = require('koa-body');
const serve = require('koa-static');
const BalanceModel = require('./models/balance');
const TransactionModel = require('./models/transaction');
const TransactionController = require('./routes/transactions');
const BalanceController = require('./routes/balance');

const app = new Koa();
const port = process.env.PORT || 3000;

const balanceModel = new BalanceModel();
const transactionModel = new TransactionModel(balanceModel);
const transactionsController = new TransactionController(transactionModel);
const balanceController = new BalanceController(balanceModel);

app.use(bodyParser());
app.use(transactionsController.routes());
app.use(balanceController.routes());
app.use(serve('./client'));

app.listen(port, () =>
  console.log('listening on port ' + port)
);
