$(function() {
  var accordionContainer = $('#transactionHistory');

  $.ajax('/api/transactions').done(function(transactions) {
    if (transactions.length === 0) {
      createPlaceholder();
    } else {
      transactions.forEach(createAccordionItem);
      accordionContainer.accordion({ 
        collapsible: true,
        active: false
      });
    }
  });

  function createAccordionItem(transaction) {
    var header = $('<h3>Type: ' + transaction.type + '. Amount: ' + transaction.amount + '</h3>');
    var body = $('<div></div>');
    var id = $('<p>Transaction ID: ' + transaction.id + '</p>');
    var formattedDate = new Date(Date.parse(transaction.effectiveDate)).toLocaleString();
    var date = $('<p>Date & Time: ' + formattedDate + '</p>');

    if (transaction.type === 'credit') {
      header.addClass('credit');
    }
    if (transaction.type === 'debit') {
      header.addClass('debit');
    }

    body.append(id).append(date);
    accordionContainer.append(header).append(body);
  }

  function createPlaceholder() {
    accordionContainer.append('<span>No transactions yet.</span>')
  }
});
