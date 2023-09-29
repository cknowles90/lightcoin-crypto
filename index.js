let balance = 500.00;

class Account { // super class to hold all potentially duplicated properties;

  constructor(username) { // name of the account/user
    this.username = username;
    this.transactions = []; // their transaction history;
  }

  get balance() { // get feature to obtain the users balance
    let balance = 0; // balance starts at 0
    for (let t of this.transactions) { // records the type of transactions (deposit)
      balance += t.value; // adds the deposited amount to the new balance total
    }
    return balance;
  }

  addTransaction(transaction) { // keeps a log of the transactions completed under their account (despoit, withdrawal);
    this.transactions.push(transaction); // pushes a new transaction to the transaction logbook (constructors)
  }
}

class Transaction { // abstract class containing the necessary functions and information logging regarding the topic of transactions;

  constructor(amount, account) { // records the amount of the transaction (deposit or withdrawal);
    this.amount = amount;       // records the account such a transaction is being conducted on;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false; // if the account does not have enough remaining funds in the balance for the withdraw amount requested, it fails;
    this.time = new Date(); // records the time/date of the transaction (attempt - success or failure);
    this.account.addTransaction(this); // adds this information to the accounts 'addTransaction' function (in turn to their log histroy);
    return true; // if the requested amount for withdrawl does not exceed their balance total, the function is committed/executed;
  }
}

class Deposit extends Transaction { // sub-class of transaction as all its methods are related to a 'transaction';

  get value() { // gets the amount $$ requested by the user;
    return this.amount; // adds that amount to their amount - in turn, their balance;
  }

  isAllowed() { // checks with a method of 'can i deposit this amount?' - yes, because why wouldn't you be able too?;
    return true; // so it's always true;
  }

}

class Withdrawal extends Transaction { // sub-class of transaction for same reasons as depoisit it, it's just it's opposite method/function;

  get value() { // gets the amount of $$ requested by the user;
    return -this.amount; // as it is a withdrawal, the syntax is negative to reflect the loss of value;
  }
                        // before finalizing the method, it checks;
  isAllowed() { // executes the final 'failsafe' of checking the users balance;
    return (this.account.balance - this.amount >= 0); // their current balance - minus - the requested (withdrawal) amount if it leaves the account;
  }                                                   // with 0 or more remaining (in the balance);
}

// DRIVER CODE BELOW //

// We use the code below to "drive" the application logic above and make sure it's working as expected

// const myAccount = new Account("snow-patrol");
const myAccount = new Account();

console.log('Starting Balance:', myAccount.balance);

console.log('Your starting balance is $0, this should not work');
t1 = new Withdrawal(50.25, myAccount);
console.log('Commit result', t1.commit());
console.log('Account Balance: ', myAccount.balance);

t2 = new Deposit(9.99, myAccount);
console.log('Commit result', t2.commit());
console.log('Account Balance: ', myAccount.balance);

t3 = new Deposit(120.00, myAccount);
console.log('Commit result', t3.commit());
console.log('Acount Balance:', myAccount.balance);

t4 = new Withdrawal(129.99, myAccount);
console.log('Commit result', t4.commit());

console.log('Ending Balance:', myAccount.balance);

console.log('Account Transaction History', myAccount.transactions);
