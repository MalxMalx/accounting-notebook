# Acconting Notebook

Web app that emulates the financial transactions logic (debit and credit).
A single financial account, no security, no persistence.

## Installation

```bash
$ npm install
```

## Run the app

```bash
$ npm start
```

The UI will be available on
```http://localhost:3000/```

Port can be configured through the environment variable ```PORT``` if necessary.

## API documentation

### Transactions

#### GET http://localhost:3000/api/transactions

Retrieves all transactions.

Response status:
 - 200 - OK

Example response:
```
[
  {
      "id": "d93e1e76-7722-4daa-8a31-2219cf9fb1fb",
      "type": "credit",
      "amount": 11.2,
      "effectiveDate": "2018-10-07T18:12:08.330Z"
  },
  {
      "id": "05b5dffe-326f-4d95-bfa1-3fd63ddfd2c6",
      "type": "debit",
      "amount": 2,
      "effectiveDate": "2018-10-07T18:23:43.110Z"
  },
  {
      "id": "6038f361-06c8-4d15-90e7-240dbac3d0b2",
      "type": "credit",
      "amount": 10.3,
      "effectiveDate": "2018-10-07T18:23:51.750Z"
  }
]
```
 
#### POST http://localhost:3000/api/transactions

Creates a new transaction.

`amount` is an integer or a float with a scale of 1 or 2 (for example `9.1` or `2.99`)

`type` can be either `"credit"` or `"debit"`.

Credit adds to the balance, debit substracts from it.

Request body format:
```
{
  "type": String,
  "amount": Number
}
```

Response statuses:
- 201 Created

  Example response:
  ```
  {
      "id": "8e503bd4-4001-4623-9c08-d4012963722e",
      "type": "debit",
      "amount": 10.3,
      "effectiveDate": "2018-10-07T18:37:51.108Z"
  }
  ```

- 400 Bad Request

  Response body:

  ```
  invalid input
  ```

- 422 Unprocessable Entity

  Response body:
  
  ```
  transaction rejected: insufficient funds
  ```

#### GET http://localhost:3000/api/transactions/[transactionId]
Retrieves a single transaction object

Response statuses:
  - 200 OK

    Example response:
    ```
    {
        "id": "d93e1e76-7722-4daa-8a31-2219cf9fb1fb",
        "type": "credit",
        "amount": 20,
        "effectiveDate": "2018-10-07T18:12:08.330Z"
    }
    ```

  - 404 Not Found

    Response body:
    ```
    transaction not found
    ```
  
  - 400 Bad Request

    Response body:
    ```
    invalid ID supplied
    ```

### Balance

#### GET http://localhost:3000/api/balance

Retrieves the balance on the account

Response status:
- 200 OK

Example response:
```
1150
```

### Note: possible improvements
- Better UI: fonts, some kind of grid, adaptibility
- Build step for UI (minification etc) was skipped for now, but can be intoduced later, when there is more client-side code.
